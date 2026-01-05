// ==============================================================================
// DICE&CARDS ERA - TYPE DEFINITIONS
// ==============================================================================

import type {
  Game,
  Clan,
  Territory,
  Structure,
  Unit,
  ClanCard,
  DiplomacyRelation,
  GameEvent,
  GameStatus,
  Era,
  ClanOrigin,
  AIPersonality,
  Reputation,
  ResourceType,
  StructureType,
  UnitType,
  CardType,
  DiplomacyStatus,
  EventType,
} from "@prisma/client";

// Re-export Prisma types
export type {
  Game,
  Clan,
  Territory,
  Structure,
  Unit,
  ClanCard,
  DiplomacyRelation,
  GameEvent,
  GameStatus,
  Era,
  ClanOrigin,
  AIPersonality,
  Reputation,
  ResourceType,
  StructureType,
  UnitType,
  CardType,
  DiplomacyStatus,
  EventType,
};

// ==============================================================================
// RESOURCES
// ==============================================================================

export interface Resources {
  grain: number;
  wood: number;
  gold: number;
}

export interface ResourceCost {
  grain?: number;
  wood?: number;
  gold?: number;
}

// ==============================================================================
// STRUCTURES
// ==============================================================================

export interface StructureDefinition {
  id: StructureType;
  name: string;
  description: string;
  type: "production" | "military" | "defense" | "special";
  produces?: ResourceType;
  unlocks?: UnitType[];
  productionPerLevel?: number[];
  defenseBonusPerLevel?: number;
  costPerLevel: ResourceCost[];
}

// ==============================================================================
// UNITS
// ==============================================================================

export interface UnitDefinition {
  id: UnitType;
  name: string;
  description: string;
  attack: number;
  defense: number;
  cost: ResourceCost;
  special?: "attacks_first" | "attack_bonus" | "reveals_enemy";
  specialValue?: number;
  requiredStructure: StructureType;
}

export interface UnitGroup {
  type: UnitType;
  quantity: number;
}

// ==============================================================================
// COMBAT
// ==============================================================================

export type CombatOutcome =
  | "DECISIVE_VICTORY"
  | "VICTORY"
  | "DRAW"
  | "DEFEAT";

export interface CombatResult {
  outcome: CombatOutcome;
  attackerLosses: UnitGroup[];
  defenderLosses: UnitGroup[];
  territoryConquered: boolean;
  lootedResources?: Resources;
  attackPower: number;
  defensePower: number;
}

export interface CombatPreview {
  attackerPower: number;
  defenderPower: number;
  attackerModifiers: string[];
  defenderModifiers: string[];
  estimatedOutcome: CombatOutcome;
}

// ==============================================================================
// CARDS
// ==============================================================================

export interface CardDefinition {
  id: CardType;
  name: string;
  description: string;
  effect: string;
  context: "combat" | "defense" | "economy" | "espionage" | "aggression";
  value?: number;
  duration?: number;
}

// ==============================================================================
// ORIGINS
// ==============================================================================

export interface OriginDefinition {
  id: ClanOrigin;
  name: string;
  description: string;
  specialization: string;
  bonus: {
    type: "military_strength" | "grain_production" | "spy_efficiency";
    value: number;
  };
  color: string;
}

// ==============================================================================
// AI
// ==============================================================================

export interface AIAction {
  type:
    | "BUILD"
    | "UPGRADE"
    | "TRAIN"
    | "ATTACK"
    | "MOVE"
    | "DIPLOMACY"
    | "USE_CARD"
    | "PASS";
  target?: string;
  data?: Record<string, unknown>;
}

export interface TerritoryWithStructures extends Territory {
  structures: Structure[];
}

export interface AIDecisionContext {
  clan: Clan;
  territories: TerritoryWithStructures[];
  units: Unit[];
  resources: Resources;
  enemies: Clan[];
  currentEra: Era;
  currentTurn: number;
  diplomacyRelations: DiplomacyRelation[];
}

// ==============================================================================
// GAME STATE
// ==============================================================================

export interface GameState {
  game: Game;
  playerClan: Clan;
  allClans: Clan[];
  territories: TerritoryWithDetails[];
  events: GameEvent[];
  diplomacy: DiplomacyRelation[];
}

export interface TerritoryWithDetails extends Territory {
  structures: Structure[];
  units: Unit[];
  owner: Clan | null;
}

export interface ClanWithDetails extends Clan {
  territories: Territory[];
  units: Unit[];
  cards: ClanCard[];
}

// ==============================================================================
// TURN ACTIONS
// ==============================================================================

export interface BuildAction {
  territoryId: string;
  structureType: StructureType;
}

export interface UpgradeAction {
  structureId: string;
}

export interface TrainAction {
  territoryId: string;
  unitType: UnitType;
  quantity: number;
}

export interface MoveAction {
  fromTerritoryId: string;
  toTerritoryId: string;
  units: UnitGroup[];
}

export interface AttackAction {
  fromTerritoryId: string;
  toTerritoryId: string;
  units: UnitGroup[];
  cardId?: string;
}

export interface DiplomacyAction {
  targetClanId: string;
  action: "PROPOSE_PEACE" | "DECLARE_WAR" | "PROPOSE_ALLIANCE";
}

export interface UseCardAction {
  cardId: string;
  targetClanId?: string;
  targetStructureId?: string;
}

export type TurnAction =
  | { type: "BUILD"; data: BuildAction }
  | { type: "UPGRADE"; data: UpgradeAction }
  | { type: "TRAIN"; data: TrainAction }
  | { type: "MOVE"; data: MoveAction }
  | { type: "ATTACK"; data: AttackAction }
  | { type: "DIPLOMACY"; data: DiplomacyAction }
  | { type: "USE_CARD"; data: UseCardAction }
  | { type: "END_TURN" };

// ==============================================================================
// TURN RESULTS
// ==============================================================================

export interface TurnResult {
  success: boolean;
  newTurn: number;
  newEra?: Era;
  eraChanged: boolean;
  events: GameEvent[];
  hordeAttacked?: boolean;
  hordeTarget?: string;
  hordeStrength?: number;
  gameEnded?: boolean;
  winner?: string;
}
