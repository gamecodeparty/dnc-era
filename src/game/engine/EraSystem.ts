// ==============================================================================
// DICE&CARDS ERA - ERA SYSTEM
// ==============================================================================

import prisma from "@/lib/db";
import { Era } from "@prisma/client";
import { ERA_DURATION } from "../constants";
import { STARTING_CARDS, CARDS_PER_ERA_TRANSITION, CARD_LIST } from "../constants/cards";

export class EraSystem {
  constructor(private gameId: string) {}

  /**
   * Check if era should transition and update if needed
   */
  async checkTransition(
    currentTurn: number
  ): Promise<{ changed: boolean; newEra?: Era }> {
    const game = await prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });

    // Era 1 -> Era 2 transition (after 15 turns)
    if (game.currentEra === Era.PEACE && currentTurn >= ERA_DURATION.PEACE) {
      await this.transitionToWar();
      return { changed: true, newEra: Era.WAR };
    }

    // Era 2 -> Era 3 transition (after 15 + 20 = 35 turns)
    if (
      game.currentEra === Era.WAR &&
      currentTurn >= ERA_DURATION.PEACE + ERA_DURATION.WAR
    ) {
      await this.transitionToInvasion();
      return { changed: true, newEra: Era.INVASION };
    }

    return { changed: false };
  }

  /**
   * Transition to Era 2: War
   */
  private async transitionToWar(): Promise<void> {
    await prisma.game.update({
      where: { id: this.gameId },
      data: { currentEra: Era.WAR },
    });

    // Grant cards to all clans
    await this.grantCardsToAllClans();

    // Log era transition event
    await prisma.gameEvent.create({
      data: {
        gameId: this.gameId,
        turn: ERA_DURATION.PEACE,
        type: "ERA_TRANSITION",
        data: {
          fromEra: "PEACE",
          toEra: "WAR",
          message: "O Pacto das Cinzas foi rompido! A Era da Guerra comeca.",
        },
      },
    });
  }

  /**
   * Transition to Era 3: Invasion
   */
  private async transitionToInvasion(): Promise<void> {
    await prisma.game.update({
      where: { id: this.gameId },
      data: { currentEra: Era.INVASION },
    });

    // Grant cards to all clans
    await this.grantCardsToAllClans();

    // Log era transition event
    await prisma.gameEvent.create({
      data: {
        gameId: this.gameId,
        turn: ERA_DURATION.PEACE + ERA_DURATION.WAR,
        type: "ERA_TRANSITION",
        data: {
          fromEra: "WAR",
          toEra: "INVASION",
          message: "A Horda chegou! A Invasao comeca. Sobreviva ou pereca.",
        },
      },
    });
  }

  /**
   * Grant random cards to all clans during era transition
   */
  private async grantCardsToAllClans(): Promise<void> {
    const clans = await prisma.clan.findMany({
      where: { gameId: this.gameId, isAlive: true },
    });

    for (const clan of clans) {
      // Get unused card types for this clan
      const existingCards = await prisma.clanCard.findMany({
        where: { clanId: clan.id },
        select: { type: true },
      });

      const usedTypes = new Set(existingCards.map((c) => c.type));
      const availableCardTypes = CARD_LIST.filter((c) => !usedTypes.has(c.id as any));

      if (availableCardTypes.length > 0) {
        // Grant random card
        const randomCard =
          availableCardTypes[Math.floor(Math.random() * availableCardTypes.length)];

        await prisma.clanCard.create({
          data: {
            clanId: clan.id,
            type: randomCard.id as any,
          },
        });
      }
    }
  }

  /**
   * Initialize starting cards for a clan
   */
  async initializeStartingCards(clanId: string): Promise<void> {
    const cardTypes = [...CARD_LIST];

    // Shuffle and pick starting cards
    for (let i = cardTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardTypes[i], cardTypes[j]] = [cardTypes[j], cardTypes[i]];
    }

    const startingCards = cardTypes.slice(0, STARTING_CARDS);

    for (const card of startingCards) {
      await prisma.clanCard.create({
        data: {
          clanId,
          type: card.id as any,
        },
      });
    }
  }

  /**
   * Check if action is allowed in current era
   */
  async isActionAllowed(action: string): Promise<{ allowed: boolean; reason?: string }> {
    const game = await prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });

    // In Era 1 (Peace), attacks are forbidden
    if (game.currentEra === Era.PEACE && action === "ATTACK") {
      return {
        allowed: false,
        reason: "Ataques sao proibidos durante a Paz das Cinzas (Era 1).",
      };
    }

    // Alliance proposals only in Era 3
    if (game.currentEra !== Era.INVASION && action === "PROPOSE_ALLIANCE") {
      return {
        allowed: false,
        reason: "Aliancas so podem ser propostas durante a Invasao (Era 3).",
      };
    }

    return { allowed: true };
  }
}

export default EraSystem;
