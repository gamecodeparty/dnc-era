// ==============================================================================
// DICE&CARDS ERA - CARD DEFINITIONS
// ==============================================================================

import type { CardDefinition } from "../types";
import { CARD_EFFECTS } from "./balance";

export const CARDS: Record<string, CardDefinition> = {
  REINFORCEMENTS: {
    id: "REINFORCEMENTS",
    name: "Reforcos",
    description: `+${CARD_EFFECTS.REINFORCEMENTS.bonus * 100}% de forca em uma batalha.`,
    effect: "troops_bonus",
    context: "combat",
    value: CARD_EFFECTS.REINFORCEMENTS.bonus,
  },
  IMPROVISED_WALLS: {
    id: "IMPROVISED_WALLS",
    name: "Muralhas Improvisadas",
    description: `+${CARD_EFFECTS.IMPROVISED_WALLS.bonus * 100}% de defesa em um ataque.`,
    effect: "defense_bonus",
    context: "defense",
    value: CARD_EFFECTS.IMPROVISED_WALLS.bonus,
  },
  BOUNTIFUL_HARVEST: {
    id: "BOUNTIFUL_HARVEST",
    name: "Colheita Farta",
    description: `Dobra a producao de graos por ${CARD_EFFECTS.BOUNTIFUL_HARVEST.duration} turnos.`,
    effect: "grain_production_multiplier",
    context: "economy",
    value: CARD_EFFECTS.BOUNTIFUL_HARVEST.multiplier,
    duration: CARD_EFFECTS.BOUNTIFUL_HARVEST.duration,
  },
  INFORMANT: {
    id: "INFORMANT",
    name: "Informante",
    description: "Revela todas as tropas de um cla inimigo.",
    effect: "reveal_enemy_units",
    context: "espionage",
  },
  SABOTAGE: {
    id: "SABOTAGE",
    name: "Sabotagem",
    description: "Destroi uma estrutura inimiga.",
    effect: "destroy_structure",
    context: "aggression",
  },
  FORCED_TRUCE: {
    id: "FORCED_TRUCE",
    name: "Tregua Forcada",
    description: `Impede ataques a voce por ${CARD_EFFECTS.FORCED_TRUCE.duration} turnos.`,
    effect: "block_attacks",
    context: "defense",
    duration: CARD_EFFECTS.FORCED_TRUCE.duration,
  },
} as const;

export const CARD_LIST = Object.values(CARDS);

// Helper to get card by type
export function getCardDefinition(type: string): CardDefinition {
  return CARDS[type];
}

// Starting cards distribution
export const STARTING_CARDS = 2;
export const CARDS_PER_ERA_TRANSITION = 1;
