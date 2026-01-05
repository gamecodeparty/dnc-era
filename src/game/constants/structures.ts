// ==============================================================================
// DICE&CARDS ERA - STRUCTURE DEFINITIONS
// ==============================================================================

import type { StructureDefinition } from "../types";
import { STRUCTURE_COSTS, PRODUCTION_PER_LEVEL, COMBAT } from "./balance";

export const STRUCTURES: Record<string, StructureDefinition> = {
  FARM: {
    id: "FARM",
    name: "Fazenda",
    description: "Produz graos para alimentar sua populacao e exercito.",
    type: "production",
    produces: "GRAIN",
    productionPerLevel: [...PRODUCTION_PER_LEVEL.FARM],
    costPerLevel: [...STRUCTURE_COSTS.FARM],
  },
  SAWMILL: {
    id: "SAWMILL",
    name: "Serraria",
    description: "Produz madeira para construcao de estruturas.",
    type: "production",
    produces: "WOOD",
    productionPerLevel: [...PRODUCTION_PER_LEVEL.SAWMILL],
    costPerLevel: [...STRUCTURE_COSTS.SAWMILL],
  },
  MINE: {
    id: "MINE",
    name: "Mina",
    description: "Extrai ouro das montanhas para financiar seu reino.",
    type: "production",
    produces: "GOLD",
    productionPerLevel: [...PRODUCTION_PER_LEVEL.MINE],
    costPerLevel: [...STRUCTURE_COSTS.MINE],
  },
  BARRACKS: {
    id: "BARRACKS",
    name: "Quartel",
    description: "Treina soldados e arqueiros para defender seu territorio.",
    type: "military",
    unlocks: ["SOLDIER", "ARCHER"],
    costPerLevel: [...STRUCTURE_COSTS.BARRACKS],
  },
  STABLE: {
    id: "STABLE",
    name: "Estabulo",
    description: "Treina cavaleiros de elite para cargas devastadoras.",
    type: "military",
    unlocks: ["KNIGHT"],
    costPerLevel: [...STRUCTURE_COSTS.STABLE],
  },
  WALL: {
    id: "WALL",
    name: "Muralha",
    description: `Fortificacao que aumenta a defesa em ${COMBAT.WALL_DEFENSE_BONUS * 100}% por nivel.`,
    type: "defense",
    defenseBonusPerLevel: COMBAT.WALL_DEFENSE_BONUS,
    costPerLevel: [...STRUCTURE_COSTS.WALL],
  },
  TAVERN: {
    id: "TAVERN",
    name: "Taverna",
    description: "Atrai novos habitantes para seu territorio.",
    type: "special",
    costPerLevel: [...STRUCTURE_COSTS.TAVERN],
  },
  SHADOW_GUILD: {
    id: "SHADOW_GUILD",
    name: "Guilda das Sombras",
    description: "Centro de espionagem e treinamento de espioes.",
    type: "special",
    unlocks: ["SPY"],
    costPerLevel: [...STRUCTURE_COSTS.SHADOW_GUILD],
  },
} as const;

export const STRUCTURE_LIST = Object.values(STRUCTURES);

// Helper to get structure by type
export function getStructureDefinition(type: string): StructureDefinition {
  return STRUCTURES[type];
}
