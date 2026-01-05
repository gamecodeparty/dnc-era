// ==============================================================================
// DICE&CARDS ERA - RESOURCE SYSTEM
// ==============================================================================

import prisma from "@/lib/db";
import {
  PRODUCTION_PER_LEVEL,
  TERRITORY_BONUS_MULTIPLIER,
  ORIGIN_BONUSES,
} from "../constants";

export class ResourceSystem {
  constructor(private gameId: string) {}

  /**
   * Process resource production for all clans
   */
  async processProduction(): Promise<void> {
    const clans = await prisma.clan.findMany({
      where: { gameId: this.gameId, isAlive: true },
      include: {
        territories: {
          include: {
            structures: true,
          },
        },
      },
    });

    for (const clan of clans) {
      let grainProduction = 0;
      let woodProduction = 0;
      let goldProduction = 0;

      // Calculate production from each territory
      for (const territory of clan.territories) {
        for (const structure of territory.structures) {
          const level = structure.level - 1; // 0-indexed

          switch (structure.type) {
            case "FARM":
              let farmProd = PRODUCTION_PER_LEVEL.FARM[level] || 0;
              // Apply territory bonus
              if (territory.bonusResource === "GRAIN") {
                farmProd *= TERRITORY_BONUS_MULTIPLIER;
              }
              grainProduction += farmProd;
              break;

            case "SAWMILL":
              let sawmillProd = PRODUCTION_PER_LEVEL.SAWMILL[level] || 0;
              if (territory.bonusResource === "WOOD") {
                sawmillProd *= TERRITORY_BONUS_MULTIPLIER;
              }
              woodProduction += sawmillProd;
              break;

            case "MINE":
              let mineProd = PRODUCTION_PER_LEVEL.MINE[level] || 0;
              if (territory.bonusResource === "GOLD") {
                mineProd *= TERRITORY_BONUS_MULTIPLIER;
              }
              goldProduction += mineProd;
              break;
          }
        }
      }

      // Apply origin bonus (Verdaneos: +20% grain)
      if (clan.origin === "VERDANEOS") {
        grainProduction *= 1 + ORIGIN_BONUSES.VERDANEOS.value;
      }

      // Apply harvest boost card effect
      if (clan.harvestBoostTurns > 0) {
        grainProduction *= 2;
      }

      // Update clan resources
      await prisma.clan.update({
        where: { id: clan.id },
        data: {
          grain: { increment: Math.floor(grainProduction) },
          wood: { increment: Math.floor(woodProduction) },
          gold: { increment: Math.floor(goldProduction) },
        },
      });
    }
  }

  /**
   * Check if clan can afford a cost
   */
  async canAfford(
    clanId: string,
    cost: { grain?: number; wood?: number; gold?: number }
  ): Promise<boolean> {
    const clan = await prisma.clan.findUniqueOrThrow({
      where: { id: clanId },
    });

    if (cost.grain && clan.grain < cost.grain) return false;
    if (cost.wood && clan.wood < cost.wood) return false;
    if (cost.gold && clan.gold < cost.gold) return false;

    return true;
  }

  /**
   * Deduct resources from clan
   */
  async deductResources(
    clanId: string,
    cost: { grain?: number; wood?: number; gold?: number }
  ): Promise<void> {
    await prisma.clan.update({
      where: { id: clanId },
      data: {
        grain: { decrement: cost.grain || 0 },
        wood: { decrement: cost.wood || 0 },
        gold: { decrement: cost.gold || 0 },
      },
    });
  }

  /**
   * Add resources to clan
   */
  async addResources(
    clanId: string,
    resources: { grain?: number; wood?: number; gold?: number }
  ): Promise<void> {
    await prisma.clan.update({
      where: { id: clanId },
      data: {
        grain: { increment: resources.grain || 0 },
        wood: { increment: resources.wood || 0 },
        gold: { increment: resources.gold || 0 },
      },
    });
  }
}

export default ResourceSystem;
