// ==============================================================================
// DICE&CARDS ERA - AI CONTROLLER
// ==============================================================================

import prisma from "@/lib/db";
import { AIPersonality, Era } from "@prisma/client";
import type { AIAction, AIDecisionContext } from "../types";
import { UNIT_STATS, STRUCTURE_COSTS, TERRITORY_ADJACENCY } from "../constants";

export class AIController {
  constructor(private gameId: string) {}

  /**
   * Process AI decisions for all AI clans
   */
  async processAllAI(): Promise<void> {
    const aiClans = await prisma.clan.findMany({
      where: {
        gameId: this.gameId,
        isAI: true,
        isAlive: true,
      },
      include: {
        territories: {
          include: {
            structures: true,
          },
        },
        units: true,
        diplomacyFrom: true,
        diplomacyTo: true,
      },
    });

    const game = await prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });

    for (const clan of aiClans) {
      const context: AIDecisionContext = {
        clan,
        territories: clan.territories,
        units: clan.units,
        resources: {
          grain: clan.grain,
          wood: clan.wood,
          gold: clan.gold,
        },
        enemies: await this.getEnemyClans(clan.id),
        currentEra: game.currentEra,
        currentTurn: game.currentTurn,
        diplomacyRelations: [...clan.diplomacyFrom, ...clan.diplomacyTo],
      };

      const actions = this.decideActions(clan.aiPersonality!, context);

      for (const action of actions) {
        await this.executeAction(clan.id, action, context);
      }
    }
  }

  /**
   * Decide actions based on AI personality
   */
  private decideActions(
    personality: AIPersonality,
    context: AIDecisionContext
  ): AIAction[] {
    switch (personality) {
      case "CONQUEROR":
        return this.conquerorStrategy(context);
      case "DEFENDER":
        return this.defenderStrategy(context);
      case "OPPORTUNIST":
        return this.opportunistStrategy(context);
      case "MERCHANT":
        return this.merchantStrategy(context);
      default:
        return [];
    }
  }

  /**
   * CONQUEROR: Aggressive, attacks frequently
   */
  private conquerorStrategy(context: AIDecisionContext): AIAction[] {
    const actions: AIAction[] = [];

    // Priority 1: Attack if in War era and have military
    if (context.currentEra === Era.WAR || context.currentEra === Era.INVASION) {
      const target = this.findWeakestNeighbor(context);
      if (target && this.hasEnoughMilitary(context, 10)) {
        actions.push({
          type: "ATTACK",
          target: target.territoryId,
          data: { fromTerritory: target.fromTerritory },
        });
      }
    }

    // Priority 2: Build military structures
    if (this.canBuild(context, "BARRACKS")) {
      actions.push({ type: "BUILD", data: { structureType: "BARRACKS" } });
    } else if (this.canBuild(context, "STABLE")) {
      actions.push({ type: "BUILD", data: { structureType: "STABLE" } });
    }

    // Priority 3: Train troops
    if (this.canTrain(context, "KNIGHT")) {
      actions.push({ type: "TRAIN", data: { unitType: "KNIGHT", quantity: 2 } });
    } else if (this.canTrain(context, "SOLDIER")) {
      actions.push({ type: "TRAIN", data: { unitType: "SOLDIER", quantity: 5 } });
    }

    // Priority 4: Build economy to support military
    if (this.canBuild(context, "FARM")) {
      actions.push({ type: "BUILD", data: { structureType: "FARM" } });
    }

    return actions;
  }

  /**
   * DEFENDER: Fortifies, only attacks if threatened
   */
  private defenderStrategy(context: AIDecisionContext): AIAction[] {
    const actions: AIAction[] = [];

    // Priority 1: Build walls
    if (this.canBuild(context, "WALL")) {
      actions.push({ type: "BUILD", data: { structureType: "WALL" } });
    }

    // Priority 2: Build economy
    if (this.canBuild(context, "FARM")) {
      actions.push({ type: "BUILD", data: { structureType: "FARM" } });
    } else if (this.canBuild(context, "MINE")) {
      actions.push({ type: "BUILD", data: { structureType: "MINE" } });
    }

    // Priority 3: Train archers (better for defense)
    if (this.canTrain(context, "ARCHER")) {
      actions.push({ type: "TRAIN", data: { unitType: "ARCHER", quantity: 3 } });
    } else if (this.canTrain(context, "SOLDIER")) {
      actions.push({ type: "TRAIN", data: { unitType: "SOLDIER", quantity: 3 } });
    }

    // Priority 4: Only attack if being attacked (revenge)
    // This would require tracking recent attacks, simplified for MVP

    return actions;
  }

  /**
   * OPPORTUNIST: Attacks weak, allies with strong
   */
  private opportunistStrategy(context: AIDecisionContext): AIAction[] {
    const actions: AIAction[] = [];

    // Find weakest neighbor
    const weakTarget = this.findWeakestNeighbor(context);

    // Priority 1: Attack weak neighbors in War era
    if (
      (context.currentEra === Era.WAR || context.currentEra === Era.INVASION) &&
      weakTarget &&
      this.hasEnoughMilitary(context, 5)
    ) {
      actions.push({
        type: "ATTACK",
        target: weakTarget.territoryId,
        data: { fromTerritory: weakTarget.fromTerritory },
      });
    }

    // Priority 2: Balanced building
    if (this.canBuild(context, "FARM")) {
      actions.push({ type: "BUILD", data: { structureType: "FARM" } });
    }
    if (this.canBuild(context, "BARRACKS")) {
      actions.push({ type: "BUILD", data: { structureType: "BARRACKS" } });
    }

    // Priority 3: Train mixed troops
    if (this.canTrain(context, "SOLDIER")) {
      actions.push({ type: "TRAIN", data: { unitType: "SOLDIER", quantity: 3 } });
    }
    if (this.canTrain(context, "ARCHER")) {
      actions.push({ type: "TRAIN", data: { unitType: "ARCHER", quantity: 2 } });
    }

    return actions;
  }

  /**
   * MERCHANT: Economy focus, avoids war
   */
  private merchantStrategy(context: AIDecisionContext): AIAction[] {
    const actions: AIAction[] = [];

    // Priority 1: Build economy
    if (this.canBuild(context, "MINE")) {
      actions.push({ type: "BUILD", data: { structureType: "MINE" } });
    } else if (this.canBuild(context, "FARM")) {
      actions.push({ type: "BUILD", data: { structureType: "FARM" } });
    } else if (this.canBuild(context, "SAWMILL")) {
      actions.push({ type: "BUILD", data: { structureType: "SAWMILL" } });
    }

    // Priority 2: Build tavern for population
    if (this.canBuild(context, "TAVERN")) {
      actions.push({ type: "BUILD", data: { structureType: "TAVERN" } });
    }

    // Priority 3: Minimal defense
    if (this.canBuild(context, "WALL")) {
      actions.push({ type: "BUILD", data: { structureType: "WALL" } });
    }

    // Priority 4: Some troops for defense
    if (this.canTrain(context, "ARCHER")) {
      actions.push({ type: "TRAIN", data: { unitType: "ARCHER", quantity: 2 } });
    }

    return actions;
  }

  /**
   * Execute an AI action
   */
  private async executeAction(
    clanId: string,
    action: AIAction,
    context: AIDecisionContext
  ): Promise<void> {
    try {
      switch (action.type) {
        case "BUILD":
          await this.executeBuild(clanId, action.data as any, context);
          break;
        case "TRAIN":
          await this.executeTrain(clanId, action.data as any, context);
          break;
        case "ATTACK":
          await this.executeAttack(clanId, action, context);
          break;
        case "PASS":
        default:
          break;
      }
    } catch (error) {
      // AI action failed, continue with other actions
      console.error(`AI action failed for clan ${clanId}:`, error);
    }
  }

  /**
   * Execute build action
   */
  private async executeBuild(
    clanId: string,
    data: { structureType: string },
    context: AIDecisionContext
  ): Promise<void> {
    // Find a territory with available slots
    const territory = context.territories.find(
      (t) => t.structures.length < t.structureSlots
    );

    if (!territory) return;

    const costs = STRUCTURE_COSTS[data.structureType as keyof typeof STRUCTURE_COSTS];
    if (!costs) return;

    const cost = costs[0]; // Level 1 cost

    // Check resources
    if (
      context.resources.wood >= (cost.wood || 0) &&
      context.resources.gold >= (cost.gold || 0)
    ) {
      // Deduct resources
      await prisma.clan.update({
        where: { id: clanId },
        data: {
          wood: { decrement: cost.wood || 0 },
          gold: { decrement: cost.gold || 0 },
        },
      });

      // Create structure
      await prisma.structure.create({
        data: {
          territoryId: territory.id,
          type: data.structureType as any,
          level: 1,
        },
      });
    }
  }

  /**
   * Execute train action
   */
  private async executeTrain(
    clanId: string,
    data: { unitType: string; quantity: number },
    context: AIDecisionContext
  ): Promise<void> {
    const stats = UNIT_STATS[data.unitType as keyof typeof UNIT_STATS];
    if (!stats) return;

    const totalCost = {
      grain: stats.grainCost * data.quantity,
      gold: stats.goldCost * data.quantity,
    };

    // Check resources
    if (
      context.resources.grain >= totalCost.grain &&
      context.resources.gold >= totalCost.gold
    ) {
      // Find a territory with appropriate structure
      let targetTerritory = context.territories[0];

      // Deduct resources
      await prisma.clan.update({
        where: { id: clanId },
        data: {
          grain: { decrement: totalCost.grain },
          gold: { decrement: totalCost.gold },
        },
      });

      // Create or update units
      await prisma.unit.upsert({
        where: {
          clanId_territoryId_type: {
            clanId,
            territoryId: targetTerritory.id,
            type: data.unitType as any,
          },
        },
        update: {
          quantity: { increment: data.quantity },
        },
        create: {
          clanId,
          territoryId: targetTerritory.id,
          type: data.unitType as any,
          quantity: data.quantity,
        },
      });
    }
  }

  /**
   * Execute attack action (simplified for MVP)
   */
  private async executeAttack(
    clanId: string,
    action: AIAction,
    context: AIDecisionContext
  ): Promise<void> {
    // Simplified: just log intent, actual combat would be more complex
    // In a full implementation, this would use CombatSystem
  }

  /**
   * Helper: Get enemy clans
   */
  private async getEnemyClans(clanId: string) {
    return prisma.clan.findMany({
      where: {
        gameId: this.gameId,
        id: { not: clanId },
        isAlive: true,
      },
    });
  }

  /**
   * Helper: Find weakest neighboring territory
   */
  private findWeakestNeighbor(
    context: AIDecisionContext
  ): { territoryId: string; fromTerritory: string } | null {
    for (const territory of context.territories) {
      const adjacentPositions = TERRITORY_ADJACENCY[territory.position] || [];

      // This would require more complex logic to find enemy territories
      // Simplified for MVP
    }
    return null;
  }

  /**
   * Helper: Check if clan has enough military
   */
  private hasEnoughMilitary(context: AIDecisionContext, minimum: number): boolean {
    const totalUnits = context.units.reduce((sum, u) => sum + u.quantity, 0);
    return totalUnits >= minimum;
  }

  /**
   * Helper: Check if clan can build a structure
   */
  private canBuild(context: AIDecisionContext, structureType: string): boolean {
    const costs = STRUCTURE_COSTS[structureType as keyof typeof STRUCTURE_COSTS];
    if (!costs) return false;

    const cost = costs[0];
    const hasSlots = context.territories.some(
      (t) => t.structures.length < t.structureSlots
    );

    return (
      hasSlots &&
      context.resources.wood >= (cost.wood || 0) &&
      context.resources.gold >= (cost.gold || 0)
    );
  }

  /**
   * Helper: Check if clan can train a unit type
   */
  private canTrain(context: AIDecisionContext, unitType: string): boolean {
    const stats = UNIT_STATS[unitType as keyof typeof UNIT_STATS];
    if (!stats) return false;

    return (
      context.resources.grain >= stats.grainCost &&
      context.resources.gold >= stats.goldCost
    );
  }
}

export default AIController;
