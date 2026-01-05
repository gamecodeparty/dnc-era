// ==============================================================================
// DICE&CARDS ERA - GAME ENGINE
// ==============================================================================
// Main orchestrator that coordinates all game systems
// ==============================================================================

import prisma from "@/lib/db";
import { TurnSystem } from "./TurnSystem";
import { ResourceSystem } from "./ResourceSystem";
import { CombatSystem } from "./CombatSystem";
import { EraSystem } from "./EraSystem";
import { AIController } from "../ai/AIController";
import type { TurnResult, GameState } from "../types";
import { Era } from "@prisma/client";
import { ERA_DURATION, HORDA } from "../constants";

export class GameEngine {
  private gameId: string;
  private turnSystem: TurnSystem;
  private resourceSystem: ResourceSystem;
  private combatSystem: CombatSystem;
  private eraSystem: EraSystem;
  private aiController: AIController;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.turnSystem = new TurnSystem(gameId);
    this.resourceSystem = new ResourceSystem(gameId);
    this.combatSystem = new CombatSystem(gameId);
    this.eraSystem = new EraSystem(gameId);
    this.aiController = new AIController(gameId);
  }

  /**
   * Process end of turn
   * 1. Process resource production for all clans
   * 2. Process AI decisions
   * 3. Check for era transition
   * 4. Process Horda attack (if Era 3)
   * 5. Advance turn counter
   */
  async processTurn(): Promise<TurnResult> {
    const game = await this.getGame();

    // 1. Process resource production for all clans
    await this.resourceSystem.processProduction();

    // 2. Process AI decisions
    await this.aiController.processAllAI();

    // 3. Check for era transition
    const eraResult = await this.eraSystem.checkTransition(game.currentTurn);
    const eraChanged = eraResult.changed;
    const newEra = eraResult.newEra;

    // 4. Process Horda attack in Era 3
    let hordeAttacked = false;
    let hordeTarget: string | undefined;
    let hordeStrength: number | undefined;

    if (game.currentEra === Era.INVASION) {
      const turnInEra = game.currentTurn - ERA_DURATION.PEACE - ERA_DURATION.WAR;
      if (turnInEra > 0 && turnInEra % HORDA.ATTACK_FREQUENCY === 0) {
        const waveIndex = Math.floor(turnInEra / HORDA.ATTACK_FREQUENCY) - 1;
        if (waveIndex < HORDA.STRENGTH.length) {
          const hordeResult = await this.processHordaAttack(
            HORDA.STRENGTH[waveIndex]
          );
          hordeAttacked = true;
          hordeTarget = hordeResult.targetClanId;
          hordeStrength = HORDA.STRENGTH[waveIndex];
        }
      }
    }

    // 5. Advance turn
    const newTurn = game.currentTurn + 1;
    await prisma.game.update({
      where: { id: this.gameId },
      data: {
        currentTurn: newTurn,
        currentEra: newEra || game.currentEra,
      },
    });

    // 6. Check for game end
    const gameEnded = await this.checkGameEnd(newTurn);

    // 7. Log turn end event
    await this.logEvent("TURN_END", {
      turn: game.currentTurn,
      newTurn,
      eraChanged,
      newEra,
    });

    // Get events from this turn
    const events = await prisma.gameEvent.findMany({
      where: {
        gameId: this.gameId,
        turn: game.currentTurn,
      },
      orderBy: { createdAt: "asc" },
    });

    return {
      success: true,
      newTurn,
      newEra: newEra || undefined,
      eraChanged,
      events,
      hordeAttacked,
      hordeTarget,
      hordeStrength,
      gameEnded: gameEnded.ended,
      winner: gameEnded.winner,
    };
  }

  /**
   * Process Horda attack during Era 3
   */
  private async processHordaAttack(
    strength: number
  ): Promise<{ targetClanId: string; defeated: boolean }> {
    // Find clan with most territories
    const clans = await prisma.clan.findMany({
      where: { gameId: this.gameId, isAlive: true },
      include: {
        territories: true,
      },
    });

    if (clans.length === 0) {
      return { targetClanId: "", defeated: false };
    }

    // Sort by territory count (descending)
    clans.sort((a, b) => b.territories.length - a.territories.length);
    const target = clans[0];

    // Calculate target's total defense
    const units = await prisma.unit.findMany({
      where: { clanId: target.id },
    });

    const totalDefense = units.reduce((sum, unit) => {
      const stats = {
        SOLDIER: 2,
        ARCHER: 1,
        KNIGHT: 3,
        SPY: 0,
      };
      return sum + unit.quantity * stats[unit.type];
    }, 0);

    // Log Horda attack
    await this.logEvent("HORDA_ATTACK", {
      targetClanId: target.id,
      targetClanName: target.name,
      hordeStrength: strength,
      defenderStrength: totalDefense,
    });

    // If Horda wins, remove a territory from target
    if (strength > totalDefense) {
      const territoryToLose = target.territories[0];
      if (territoryToLose) {
        await prisma.territory.update({
          where: { id: territoryToLose.id },
          data: { ownerId: null },
        });

        // Check if clan is eliminated
        const remainingTerritories = await prisma.territory.count({
          where: { ownerId: target.id },
        });

        if (remainingTerritories === 0) {
          await prisma.clan.update({
            where: { id: target.id },
            data: { isAlive: false },
          });

          await this.logEvent("CLAN_DEFEATED", {
            clanId: target.id,
            clanName: target.name,
            defeatedBy: "HORDA",
          });
        }
      }

      return { targetClanId: target.id, defeated: true };
    }

    return { targetClanId: target.id, defeated: false };
  }

  /**
   * Check if the game has ended
   */
  private async checkGameEnd(
    currentTurn: number
  ): Promise<{ ended: boolean; winner?: string }> {
    const totalTurns =
      ERA_DURATION.PEACE + ERA_DURATION.WAR + ERA_DURATION.INVASION;

    // Check if all turns completed
    if (currentTurn > totalTurns) {
      // Calculate scores and determine winner
      const clans = await prisma.clan.findMany({
        where: { gameId: this.gameId, isAlive: true },
        include: {
          territories: true,
          units: true,
        },
      });

      if (clans.length === 0) {
        await this.endGame(null);
        return { ended: true };
      }

      // Calculate scores
      const scores = clans.map((clan) => {
        const territoryPoints = clan.territories.length * 100;
        const populationPoints = clan.population * 10;
        const goldPoints = clan.gold;
        const unitPoints =
          clan.units.reduce((sum, u) => sum + u.quantity, 0) * 5;

        return {
          clanId: clan.id,
          clanName: clan.name,
          score: territoryPoints + populationPoints + goldPoints + unitPoints,
        };
      });

      scores.sort((a, b) => b.score - a.score);
      const winner = scores[0];

      await this.endGame(winner.clanId);

      return { ended: true, winner: winner.clanId };
    }

    // Check if only one clan remains
    const aliveClans = await prisma.clan.count({
      where: { gameId: this.gameId, isAlive: true },
    });

    if (aliveClans === 1) {
      const winner = await prisma.clan.findFirst({
        where: { gameId: this.gameId, isAlive: true },
      });

      if (winner) {
        await this.endGame(winner.id);
        return { ended: true, winner: winner.id };
      }
    }

    if (aliveClans === 0) {
      await this.endGame(null);
      return { ended: true };
    }

    return { ended: false };
  }

  /**
   * End the game
   */
  private async endGame(winnerId: string | null): Promise<void> {
    await prisma.game.update({
      where: { id: this.gameId },
      data: { status: "FINISHED" },
    });

    await this.logEvent("GAME_END", {
      winnerId,
    });
  }

  /**
   * Get current game state
   */
  async getGameState(clanId: string): Promise<GameState> {
    const game = await this.getGame();

    const playerClan = await prisma.clan.findUniqueOrThrow({
      where: { id: clanId },
      include: {
        cards: true,
      },
    });

    const allClans = await prisma.clan.findMany({
      where: { gameId: this.gameId },
    });

    const territories = await prisma.territory.findMany({
      where: { gameId: this.gameId },
      include: {
        structures: true,
        units: true,
        owner: true,
      },
    });

    const events = await prisma.gameEvent.findMany({
      where: { gameId: this.gameId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const diplomacy = await prisma.diplomacyRelation.findMany({
      where: {
        OR: [{ fromClanId: clanId }, { toClanId: clanId }],
      },
    });

    return {
      game,
      playerClan,
      allClans,
      territories,
      events,
      diplomacy,
    };
  }

  /**
   * Get game instance
   */
  private async getGame() {
    return prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });
  }

  /**
   * Log a game event
   */
  private async logEvent(
    type: string,
    data: Record<string, unknown>
  ): Promise<void> {
    const game = await this.getGame();

    await prisma.gameEvent.create({
      data: {
        gameId: this.gameId,
        turn: game.currentTurn,
        type: type as any,
        data: data as any,
      },
    });
  }
}

export default GameEngine;
