// ==============================================================================
// DICE&CARDS ERA - UNIT DEFINITIONS
// ==============================================================================

import type { UnitDefinition } from "../types";
import { UNIT_STATS, COMBAT } from "./balance";

export const UNITS: Record<string, UnitDefinition> = {
  SOLDIER: {
    id: "SOLDIER",
    name: "Soldado",
    description: "Unidade basica de infantaria. Equilibrada em ataque e defesa.",
    attack: UNIT_STATS.SOLDIER.attack,
    defense: UNIT_STATS.SOLDIER.defense,
    cost: {
      grain: UNIT_STATS.SOLDIER.grainCost,
      gold: UNIT_STATS.SOLDIER.goldCost,
    },
    requiredStructure: "BARRACKS",
  },
  ARCHER: {
    id: "ARCHER",
    name: "Arqueiro",
    description: "Unidade a distancia. Ataca antes do combate principal.",
    attack: UNIT_STATS.ARCHER.attack,
    defense: UNIT_STATS.ARCHER.defense,
    cost: {
      grain: UNIT_STATS.ARCHER.grainCost,
      gold: UNIT_STATS.ARCHER.goldCost,
    },
    special: "attacks_first",
    requiredStructure: "BARRACKS",
  },
  KNIGHT: {
    id: "KNIGHT",
    name: "Cavaleiro",
    description: `Cavalaria pesada. +${COMBAT.KNIGHT_ATTACK_BONUS * 100}% de bonus em ataques.`,
    attack: UNIT_STATS.KNIGHT.attack,
    defense: UNIT_STATS.KNIGHT.defense,
    cost: {
      grain: UNIT_STATS.KNIGHT.grainCost,
      gold: UNIT_STATS.KNIGHT.goldCost,
    },
    special: "attack_bonus",
    specialValue: COMBAT.KNIGHT_ATTACK_BONUS,
    requiredStructure: "STABLE",
  },
  SPY: {
    id: "SPY",
    name: "Espiao",
    description: "Revela as tropas inimigas em um territorio.",
    attack: UNIT_STATS.SPY.attack,
    defense: UNIT_STATS.SPY.defense,
    cost: {
      grain: UNIT_STATS.SPY.grainCost,
      gold: UNIT_STATS.SPY.goldCost,
    },
    special: "reveals_enemy",
    requiredStructure: "SHADOW_GUILD",
  },
} as const;

export const UNIT_LIST = Object.values(UNITS);

// Helper to get unit by type
export function getUnitDefinition(type: string): UnitDefinition {
  return UNITS[type];
}
