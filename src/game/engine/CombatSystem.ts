// ==============================================================================
// DICE&CARDS ERA - COMBAT SYSTEM
// ==============================================================================

import prisma from "@/lib/db";
import { COMBAT, ORIGIN_BONUSES, UNIT_STATS } from "../constants";
import type { CombatResult, CombatPreview, UnitGroup } from "../types";

export class CombatSystem {
  constructor(private gameId: string) {}

  /**
   * Preview combat outcome (for UI)
   */
  async previewCombat(
    attackerClanId: string,
    defenderClanId: string,
    territoryId: string,
    attackingUnits: UnitGroup[]
  ): Promise<CombatPreview> {
    const attackerClan = await prisma.clan.findUniqueOrThrow({
      where: { id: attackerClanId },
    });

    const defenderClan = await prisma.clan.findUniqueOrThrow({
      where: { id: defenderClanId },
    });

    const territory = await prisma.territory.findUniqueOrThrow({
      where: { id: territoryId },
      include: { structures: true },
    });

    const defendingUnits = await prisma.unit.findMany({
      where: { territoryId, clanId: defenderClanId },
    });

    // Calculate attack power
    let attackPower = 0;
    const attackerModifiers: string[] = [];

    for (const unit of attackingUnits) {
      const stats = UNIT_STATS[unit.type as keyof typeof UNIT_STATS];
      attackPower += unit.quantity * stats.attack;

      // Knight attack bonus
      if (unit.type === "KNIGHT") {
        attackPower += unit.quantity * stats.attack * COMBAT.KNIGHT_ATTACK_BONUS;
        attackerModifiers.push(`Cavaleiros: +${COMBAT.KNIGHT_ATTACK_BONUS * 100}%`);
      }
    }

    // Origin bonus (Ferronatos: +20% military)
    if (attackerClan.origin === "FERRONATOS") {
      attackPower *= 1 + ORIGIN_BONUSES.FERRONATOS.value;
      attackerModifiers.push(`Ferronatos: +${ORIGIN_BONUSES.FERRONATOS.value * 100}%`);
    }

    // Calculate defense power
    let defensePower = 0;
    const defenderModifiers: string[] = [];

    for (const unit of defendingUnits) {
      const stats = UNIT_STATS[unit.type as keyof typeof UNIT_STATS];
      defensePower += unit.quantity * stats.defense;
    }

    // Wall defense bonus
    const wall = territory.structures.find((s) => s.type === "WALL");
    if (wall) {
      const wallBonus = wall.level * COMBAT.WALL_DEFENSE_BONUS;
      defensePower *= 1 + wallBonus;
      defenderModifiers.push(`Muralha Nv${wall.level}: +${wallBonus * 100}%`);
    }

    // Origin bonus for defender
    if (defenderClan.origin === "FERRONATOS") {
      defensePower *= 1 + ORIGIN_BONUSES.FERRONATOS.value;
      defenderModifiers.push(`Ferronatos: +${ORIGIN_BONUSES.FERRONATOS.value * 100}%`);
    }

    // Estimate outcome
    let estimatedOutcome: CombatPreview["estimatedOutcome"];
    if (attackPower > defensePower * COMBAT.DECISIVE_VICTORY_RATIO) {
      estimatedOutcome = "DECISIVE_VICTORY";
    } else if (attackPower > defensePower) {
      estimatedOutcome = "VICTORY";
    } else if (Math.abs(attackPower - defensePower) < defensePower * 0.1) {
      estimatedOutcome = "DRAW";
    } else {
      estimatedOutcome = "DEFEAT";
    }

    return {
      attackerPower: Math.floor(attackPower),
      defenderPower: Math.floor(defensePower),
      attackerModifiers,
      defenderModifiers,
      estimatedOutcome,
    };
  }

  /**
   * Execute combat
   */
  async executeCombat(
    attackerClanId: string,
    defenderClanId: string,
    territoryId: string,
    attackingUnits: UnitGroup[],
    attackerCardBonus: number = 0,
    defenderCardBonus: number = 0
  ): Promise<CombatResult> {
    const preview = await this.previewCombat(
      attackerClanId,
      defenderClanId,
      territoryId,
      attackingUnits
    );

    // Apply card bonuses
    let attackPower = preview.attackerPower * (1 + attackerCardBonus);
    let defensePower = preview.defenderPower * (1 + defenderCardBonus);

    // Archer first strike
    const archerUnits = attackingUnits.find((u) => u.type === "ARCHER");
    if (archerUnits) {
      // Archers deal damage before main combat
      const archerDamage = archerUnits.quantity * UNIT_STATS.ARCHER.attack;
      defensePower = Math.max(0, defensePower - archerDamage * 0.5);
    }

    // Determine outcome
    let outcome: CombatResult["outcome"];
    let territoryConquered = false;
    const attackerLosses: UnitGroup[] = [];
    const defenderLosses: UnitGroup[] = [];

    if (attackPower > defensePower * COMBAT.DECISIVE_VICTORY_RATIO) {
      outcome = "DECISIVE_VICTORY";
      territoryConquered = true;

      // Attacker loses 10% of units
      for (const unit of attackingUnits) {
        const losses = Math.ceil(unit.quantity * 0.1);
        if (losses > 0) {
          attackerLosses.push({ type: unit.type, quantity: losses });
        }
      }

      // Defender loses all units
      const defenderUnits = await prisma.unit.findMany({
        where: { territoryId, clanId: defenderClanId },
      });
      for (const unit of defenderUnits) {
        defenderLosses.push({ type: unit.type, quantity: unit.quantity });
      }
    } else if (attackPower > defensePower) {
      outcome = "VICTORY";
      territoryConquered = true;

      // Attacker loses 30% of units
      for (const unit of attackingUnits) {
        const losses = Math.ceil(unit.quantity * 0.3);
        if (losses > 0) {
          attackerLosses.push({ type: unit.type, quantity: losses });
        }
      }

      // Defender loses all units
      const defenderUnits = await prisma.unit.findMany({
        where: { territoryId, clanId: defenderClanId },
      });
      for (const unit of defenderUnits) {
        defenderLosses.push({ type: unit.type, quantity: unit.quantity });
      }
    } else if (Math.abs(attackPower - defensePower) < defensePower * 0.1) {
      outcome = "DRAW";

      // Both lose 50%
      for (const unit of attackingUnits) {
        const losses = Math.ceil(unit.quantity * COMBAT.DRAW_LOSS_PERCENTAGE);
        if (losses > 0) {
          attackerLosses.push({ type: unit.type, quantity: losses });
        }
      }

      const defenderUnits = await prisma.unit.findMany({
        where: { territoryId, clanId: defenderClanId },
      });
      for (const unit of defenderUnits) {
        const losses = Math.ceil(unit.quantity * COMBAT.DRAW_LOSS_PERCENTAGE);
        if (losses > 0) {
          defenderLosses.push({ type: unit.type, quantity: losses });
        }
      }
    } else {
      outcome = "DEFEAT";

      // Attacker loses 50% and retreats
      for (const unit of attackingUnits) {
        const losses = Math.ceil(unit.quantity * 0.5);
        if (losses > 0) {
          attackerLosses.push({ type: unit.type, quantity: losses });
        }
      }

      // Defender loses 20%
      const defenderUnits = await prisma.unit.findMany({
        where: { territoryId, clanId: defenderClanId },
      });
      for (const unit of defenderUnits) {
        const losses = Math.ceil(unit.quantity * 0.2);
        if (losses > 0) {
          defenderLosses.push({ type: unit.type, quantity: losses });
        }
      }
    }

    // Apply losses
    await this.applyLosses(attackerClanId, attackerLosses);
    await this.applyLosses(defenderClanId, defenderLosses);

    // Handle territory conquest
    let lootedResources: CombatResult["lootedResources"];
    if (territoryConquered) {
      // Transfer territory ownership
      await prisma.territory.update({
        where: { id: territoryId },
        data: { ownerId: attackerClanId },
      });

      // Loot resources
      const defender = await prisma.clan.findUniqueOrThrow({
        where: { id: defenderClanId },
      });

      const lootGrain = Math.floor(defender.grain * COMBAT.VICTORY_LOOT_PERCENTAGE);
      const lootWood = Math.floor(defender.wood * COMBAT.VICTORY_LOOT_PERCENTAGE);
      const lootGold = Math.floor(defender.gold * COMBAT.VICTORY_LOOT_PERCENTAGE);

      lootedResources = {
        grain: lootGrain,
        wood: lootWood,
        gold: lootGold,
      };

      // Transfer resources
      await prisma.clan.update({
        where: { id: defenderClanId },
        data: {
          grain: { decrement: lootGrain },
          wood: { decrement: lootWood },
          gold: { decrement: lootGold },
        },
      });

      await prisma.clan.update({
        where: { id: attackerClanId },
        data: {
          grain: { increment: lootGrain },
          wood: { increment: lootWood },
          gold: { increment: lootGold },
        },
      });

      // Move surviving attackers to conquered territory
      for (const unit of attackingUnits) {
        const loss = attackerLosses.find((l) => l.type === unit.type);
        const surviving = unit.quantity - (loss?.quantity || 0);
        if (surviving > 0) {
          await prisma.unit.upsert({
            where: {
              clanId_territoryId_type: {
                clanId: attackerClanId,
                territoryId,
                type: unit.type,
              },
            },
            update: {
              quantity: surviving,
            },
            create: {
              clanId: attackerClanId,
              territoryId,
              type: unit.type,
              quantity: surviving,
            },
          });
        }
      }

      // Check if defender is eliminated
      const remainingTerritories = await prisma.territory.count({
        where: { ownerId: defenderClanId },
      });

      if (remainingTerritories === 0) {
        await prisma.clan.update({
          where: { id: defenderClanId },
          data: { isAlive: false },
        });
      }
    }

    return {
      outcome,
      attackerLosses,
      defenderLosses,
      territoryConquered,
      lootedResources,
      attackPower: Math.floor(attackPower),
      defensePower: Math.floor(defensePower),
    };
  }

  /**
   * Apply unit losses
   */
  private async applyLosses(clanId: string, losses: UnitGroup[]): Promise<void> {
    for (const loss of losses) {
      await prisma.unit.updateMany({
        where: {
          clanId,
          type: loss.type,
        },
        data: {
          quantity: { decrement: loss.quantity },
        },
      });
    }

    // Delete units with 0 or negative quantity
    await prisma.unit.deleteMany({
      where: {
        clanId,
        quantity: { lte: 0 },
      },
    });
  }
}

export default CombatSystem;
