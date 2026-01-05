// ==============================================================================
// DICE&CARDS ERA - GAME BALANCE CONSTANTS
// ==============================================================================

// ==============================================================================
// ERA CONFIGURATION
// ==============================================================================

export const ERA_DURATION = {
  PEACE: 15,    // Era 1: Paz das Cinzas
  WAR: 20,      // Era 2: Era da Guerra
  INVASION: 15, // Era 3: Invasao
} as const;

export const TOTAL_TURNS = ERA_DURATION.PEACE + ERA_DURATION.WAR + ERA_DURATION.INVASION; // 50

// ==============================================================================
// STARTING VALUES
// ==============================================================================

export const STARTING_RESOURCES = {
  grain: 100,
  wood: 50,
  gold: 50,
} as const;

export const STARTING_POPULATION = 100;
export const STARTING_TERRITORIES = 2;
export const AI_STARTING_TERRITORIES = 2;
export const NEUTRAL_TERRITORIES = 2;

// ==============================================================================
// RESOURCE PRODUCTION
// ==============================================================================

// Production per structure level [level1, level2, level3]
export const PRODUCTION_PER_LEVEL = {
  FARM: [10, 15, 20],      // Grain production
  SAWMILL: [8, 12, 16],    // Wood production
  MINE: [5, 8, 11],        // Gold production
} as const;

// Territory bonus multiplier
export const TERRITORY_BONUS_MULTIPLIER = 1.25; // +25% for bonus resource

// ==============================================================================
// UNIT STATS
// ==============================================================================

export const UNIT_STATS = {
  SOLDIER: {
    attack: 2,
    defense: 2,
    grainCost: 10,
    goldCost: 5,
    maintenance: 1, // grain per turn
  },
  ARCHER: {
    attack: 3,
    defense: 1,
    grainCost: 10,
    goldCost: 8,
    maintenance: 1,
  },
  KNIGHT: {
    attack: 4,
    defense: 3,
    grainCost: 15,
    goldCost: 15,
    maintenance: 2,
  },
  SPY: {
    attack: 0,
    defense: 0,
    grainCost: 5,
    goldCost: 10,
    maintenance: 1,
  },
} as const;

// ==============================================================================
// STRUCTURE COSTS
// ==============================================================================

// Cost per level [level1, level2, level3]
export const STRUCTURE_COSTS = {
  FARM: [
    { wood: 10, gold: 5 },
    { wood: 20, gold: 10 },
    { wood: 30, gold: 15 },
  ],
  SAWMILL: [
    { wood: 5, gold: 10 },
    { wood: 10, gold: 20 },
    { wood: 15, gold: 30 },
  ],
  MINE: [
    { wood: 15, gold: 5 },
    { wood: 25, gold: 10 },
    { wood: 35, gold: 15 },
  ],
  BARRACKS: [
    { wood: 20, gold: 15 },
    { wood: 35, gold: 25 },
    { wood: 50, gold: 35 },
  ],
  STABLE: [
    { wood: 30, gold: 25 },
    { wood: 50, gold: 40 },
    { wood: 70, gold: 55 },
  ],
  WALL: [
    { wood: 25, gold: 10 },
    { wood: 40, gold: 20 },
    { wood: 60, gold: 30 },
  ],
  TAVERN: [
    { wood: 15, gold: 20 },
    { wood: 25, gold: 35 },
    { wood: 40, gold: 50 },
  ],
  SHADOW_GUILD: [
    { wood: 20, gold: 30 },
    { wood: 35, gold: 50 },
    { wood: 50, gold: 70 },
  ],
} as const;

// ==============================================================================
// COMBAT MODIFIERS
// ==============================================================================

export const COMBAT = {
  WALL_DEFENSE_BONUS: 0.20,        // +20% defense per wall level
  KNIGHT_ATTACK_BONUS: 0.30,       // +30% attack for knights
  DECISIVE_VICTORY_RATIO: 1.5,     // attack > defense * 1.5 = decisive victory
  DRAW_LOSS_PERCENTAGE: 0.50,      // Both sides lose 50% in a draw
  VICTORY_LOOT_PERCENTAGE: 0.50,   // Winner takes 50% of loser's resources
} as const;

// ==============================================================================
// DIPLOMACY
// ==============================================================================

export const DIPLOMACY = {
  PEACE_DURATION: 5,      // turns
  ALLIANCE_DURATION: 15,  // turns (until end of era 3 typically)
} as const;

// ==============================================================================
// HORDA (ERA 3 INVASION)
// ==============================================================================

export const HORDA = {
  ATTACK_FREQUENCY: 3,                    // Every 3 turns in Era 3
  STRENGTH: [50, 100, 150, 200, 300],     // Escalating strength per wave
  TARGET_MODE: "LARGEST_TERRITORY",       // Attacks clan with most territory
} as const;

// ==============================================================================
// ORIGIN BONUSES
// ==============================================================================

export const ORIGIN_BONUSES = {
  FERRONATOS: {
    type: "military_strength" as const,
    value: 0.20, // +20% attack and defense
  },
  VERDANEOS: {
    type: "grain_production" as const,
    value: 0.20, // +20% grain from farms
  },
  UMBRAL: {
    type: "spy_efficiency" as const,
    value: 0.30, // +30% spy effectiveness
  },
} as const;

// ==============================================================================
// CARD EFFECTS
// ==============================================================================

export const CARD_EFFECTS = {
  REINFORCEMENTS: {
    bonus: 0.50, // +50% troops in battle
  },
  IMPROVISED_WALLS: {
    bonus: 1.00, // +100% defense in one attack
  },
  BOUNTIFUL_HARVEST: {
    multiplier: 2, // Double grain production
    duration: 3,   // For 3 turns
  },
  INFORMANT: {
    // Reveals all troops of a clan (no numeric value)
  },
  SABOTAGE: {
    // Destroys 1 enemy structure (no numeric value)
  },
  FORCED_TRUCE: {
    duration: 3, // Prevents attacks for 3 turns
  },
} as const;

// ==============================================================================
// SCORING (Victory Calculation)
// ==============================================================================

export const SCORING = {
  TERRITORY_POINTS: 100,
  POPULATION_POINTS: 10,
  GOLD_POINTS: 1,
  UNIT_POINTS: 5,
} as const;

// ==============================================================================
// TERRITORY MAP
// ==============================================================================

// 4x3 grid adjacency
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]
// [9] [10][11]
export const TERRITORY_ADJACENCY: Record<number, number[]> = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7, 9],
  7: [4, 6, 8, 10],
  8: [5, 7, 11],
  9: [6, 10],
  10: [7, 9, 11],
  11: [8, 10],
} as const;

// ==============================================================================
// UI CONSTANTS
// ==============================================================================

export const UI = {
  MAP_ROWS: 4,
  MAP_COLS: 3,
  TOTAL_TERRITORIES: 12,
  MAX_STRUCTURE_SLOTS: 4,
  MAX_STRUCTURE_LEVEL: 3,
} as const;
