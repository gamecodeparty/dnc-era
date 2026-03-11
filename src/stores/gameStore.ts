import { create } from "zustand";
import { TURN_DURATION_MS, MARKET, TERRITORY_ADJACENCY, STRUCTURE_COSTS, PRODUCTION_PER_LEVEL, TERRITORY_BONUS_MULTIPLIER, ORIGIN_BONUSES } from "@/game/constants/balance";

// Tipos
export type Era = "PEACE" | "WAR" | "INVASION";
export type ResourceType = "GRAIN" | "WOOD" | "GOLD";
export type StructureType = "FARM" | "SAWMILL" | "MINE" | "BARRACKS" | "STABLE" | "WALL" | "TAVERN" | "SHADOW_GUILD";
export type UnitType = "SOLDIER" | "ARCHER" | "KNIGHT" | "SPY";
export type DiplomacyRelation = "TRUSTED" | "NEUTRAL" | "HOSTILE";
export type AIPersonality = "CONQUEROR" | "DEFENDER" | "OPPORTUNIST" | "MERCHANT";
export type ClanOrigin = "FERRONATOS" | "VERDANEOS" | "UMBRAL";
export type ExpeditionType = "ATTACK" | "EXPLORE" | "RETURN_VICTORY" | "RETURN_DEFEAT" | "RETURN_EXPLORE" | "REINFORCE" | "SPY" | "RETURN_SPY";

// Tipos de locais de exploracao
export type ExplorationSiteType =
  | "ABANDONED_MINE"
  | "SPIRIT_FOREST"
  | "ARCANE_RUINS"
  | "GHOST_FARM"
  | "WYRM_CAVE"
  | "BANDIT_CAMP"
  | "SUNKEN_SHIP"
  | "HERMIT_TOWER";

export interface ExplorationSite {
  id: string;
  type: ExplorationSiteType;
  name: string;
  description: string;
  position: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minUnits: number;
  rewards: {
    grainMin: number;
    grainMax: number;
    woodMin: number;
    woodMax: number;
    goldMin: number;
    goldMax: number;
  };
  cooldownTurns: number;
  lastExploredTurn: number | null;
  narratives: {
    intro: string;
    success: string;
    partial: string;
    failure: string;
  };
}

export interface Structure {
  id: string;
  type: StructureType;
  level: number;
}

export interface Unit {
  type: UnitType;
  quantity: number;
}

export interface Territory {
  id: string;
  position: number;
  bonusResource: ResourceType;
  ownerId: string | null;
  ownerName: string;
  structures: Structure[];
  units: Unit[];
}

export interface Clan {
  id: string;
  name: string;
  isPlayer: boolean;
  grain: number;
  wood: number;
  gold: number;
  origin?: ClanOrigin;
  personality?: AIPersonality;
}

export interface DiplomacyState {
  [clanId: string]: DiplomacyRelation;
}

export interface GameEvent {
  turn: number;
  message: string;
  type: "info" | "success" | "warning" | "danger" | "hint";
  // Optional COMBAT fields (F-015)
  eventKind?: "COMBAT" | "HINT";
  result?: "victory" | "defeat" | "draw";
  attackerClanId?: string;
  attackerClanName?: string;
  defenderClanId?: string;
  defenderClanName?: string;
  territoryId?: string;
  territoryName?: string;
  attackerLosses?: number;
  defenderLosses?: number;
  territoryConquered?: boolean;
  isPlayerInvolved?: boolean;
}

export interface Expedition {
  id: string;
  ownerId: string;
  ownerName: string;
  fromTerritoryId: string;
  toTerritoryId: string;
  fromPosition: number;
  toPosition: number;
  units: Unit[];
  carriedResources: {
    grain: number;
    wood: number;
    gold: number;
  };
  turnsRemaining: number;
  totalTurns: number;
  departedTurn: number;
  type: ExpeditionType;
  cardType?: string | null;
}

export interface RevealedTerritory {
  units: Unit[];
  structures: Structure[];
  revealedAt: number;  // turno em que foi revelado
  expiresAt: number;   // revealedAt + 5
}

export interface TerritoryIntel {
  territoryId: string;
  source: 'SPY' | 'COMBAT' | 'NONE';
  defensePower: number | null;
  revealedAt: number;
  expiresAt: number;
}

export interface IncomingAttack {
  targetTerritoryId: string;
  sourceClanId: string;
  arrivesTurn: number;
  /** Poder de ataque real da expedição inimiga (usado para classifyThreat + fog of war) */
  attackPower: number;
}

export interface HordaPreview {
  targetClanId: string;
  targetTerritoryId: string;
  arrivesTurn: number;
  strength: number;
}

// Constantes
export const SPY_SUCCESS_CHANCE_BASE = 0.7;   // 70% base
export const SPY_UMBRAL_BONUS = 0.3;           // +30% para Umbral = 100%
export const SPY_REVEAL_DURATION = 5;          // expira após 5 turnos
export { TURN_DURATION_MS };
/** @deprecated Use TURN_DURATION_MS from balance.ts */
export const TURN_INTERVAL_MS = TURN_DURATION_MS;
export const TOTAL_TURNS = 50;

export interface CostWarning {
  resource: "grain" | "wood" | "gold";
  resourceLabel: string;
  percent: number;
}

/** Returns warnings for resources where cost exceeds 80% of current stock. */
export function getProportionalCostWarnings(
  cost: { grain?: number; wood?: number; gold?: number },
  resources: { grain: number; wood: number; gold: number }
): CostWarning[] {
  const warnings: CostWarning[] = [];
  const check = (
    resource: "grain" | "wood" | "gold",
    resourceLabel: string,
    costAmount: number | undefined,
    stock: number
  ) => {
    if (costAmount && costAmount > 0 && stock > 0) {
      const percent = (costAmount / stock) * 100;
      if (percent > 80) warnings.push({ resource, resourceLabel, percent });
    }
  };
  check("grain", "Grão", cost.grain, resources.grain);
  check("wood", "Madeira", cost.wood, resources.wood);
  check("gold", "Ouro", cost.gold, resources.gold);
  return warnings;
}


export interface ProductionBreakdownItem {
  territoryId: string;
  territoryPosition: number;
  structureType: StructureType;
  structureLevel: number;
  baseGrain: number;
  baseWood: number;
  baseGold: number;
  bonusGrain: number;
  bonusWood: number;
  bonusGold: number;
}

export interface ProductionResult {
  grain: number;
  wood: number;
  gold: number;
  breakdown: ProductionBreakdownItem[];
}

/** Calcula a produção total de recursos por turno do jogador.
 *  Usa PRODUCTION_PER_LEVEL de balance.ts como fonte canônica.
 *  Inclui bônus de território (bonusResource) e bônus de facção (origin).
 */
export function calculateTotalProduction(
  playerClan: Clan,
  playerTerritories: Territory[]
): ProductionResult {
  let grain = 0;
  let wood = 0;
  let gold = 0;
  const breakdown: ProductionBreakdownItem[] = [];

  for (const territory of playerTerritories) {
    for (const structure of territory.structures) {
      const levelIndex = structure.level - 1;
      let baseGrain = 0;
      let baseWood = 0;
      let baseGold = 0;
      let bonusGrain = 0;
      let bonusWood = 0;
      let bonusGold = 0;

      if (structure.type === "FARM") {
        const base = PRODUCTION_PER_LEVEL.FARM[levelIndex] ?? 0;
        baseGrain = base;
        if (territory.bonusResource === "GRAIN") {
          bonusGrain = Math.floor(base * (TERRITORY_BONUS_MULTIPLIER - 1));
        }
      } else if (structure.type === "SAWMILL") {
        const base = PRODUCTION_PER_LEVEL.SAWMILL[levelIndex] ?? 0;
        baseWood = base;
        if (territory.bonusResource === "WOOD") {
          bonusWood = Math.floor(base * (TERRITORY_BONUS_MULTIPLIER - 1));
        }
      } else if (structure.type === "MINE") {
        const base = PRODUCTION_PER_LEVEL.MINE[levelIndex] ?? 0;
        baseGold = base;
        if (territory.bonusResource === "GOLD") {
          bonusGold = Math.floor(base * (TERRITORY_BONUS_MULTIPLIER - 1));
        }
      }

      if (baseGrain + baseWood + baseGold > 0) {
        breakdown.push({
          territoryId: territory.id,
          territoryPosition: territory.position,
          structureType: structure.type,
          structureLevel: structure.level,
          baseGrain,
          baseWood,
          baseGold,
          bonusGrain,
          bonusWood,
          bonusGold,
        });
        grain += baseGrain + bonusGrain;
        wood += baseWood + bonusWood;
        gold += baseGold + bonusGold;
      }
    }
  }

  // Apply origin bonus (Verdaneos: +20% grain production)
  if (playerClan.origin === "VERDANEOS") {
    const verdaneosBonus = Math.floor(grain * ORIGIN_BONUSES.VERDANEOS.value);
    grain += verdaneosBonus;
  }

  return { grain, wood, gold, breakdown };
}

export const STRUCTURE_PRODUCTION: Record<StructureType, { resource?: ResourceType; amount?: number }> = {
  FARM: { resource: "GRAIN", amount: 10 },
  SAWMILL: { resource: "WOOD", amount: 8 },
  MINE: { resource: "GOLD", amount: 5 },
  BARRACKS: {},
  STABLE: {},
  WALL: {},
  TAVERN: {},
  SHADOW_GUILD: {},
};

export const UNIT_COSTS: Record<UnitType, { grain?: number; wood?: number; gold?: number }> = {
  SOLDIER: { grain: 10, gold: 5 },
  ARCHER: { grain: 8, wood: 5, gold: 8 },
  KNIGHT: { grain: 20, gold: 25 },
  SPY: { grain: 5, gold: 10 },
};

export const UNIT_STATS: Record<UnitType, { atk: number; def: number; speed: number; carryCapacity: number }> = {
  SOLDIER: { atk: 10, def: 8, speed: 1, carryCapacity: 20 },
  ARCHER: { atk: 12, def: 5, speed: 1, carryCapacity: 10 },
  KNIGHT: { atk: 20, def: 15, speed: 2, carryCapacity: 30 },
  SPY: { atk: 0, def: 0, speed: 2, carryCapacity: 0 },
};

// Constantes de mapa (4 colunas x 3 linhas = 12 territórios)
export const MAP_COLUMNS = 4;
export const MAP_ROWS = 3;

// Dados dos locais de exploracao (8 tipos, 5 sorteados por partida)
export const EXPLORATION_SITES_DATA: Record<ExplorationSiteType, Omit<ExplorationSite, "id" | "position" | "lastExploredTurn">> = {
  ABANDONED_MINE: {
    type: "ABANDONED_MINE",
    name: "Mina Abandonada dos Anoes",
    description: "Dizem que os anoes deixaram tesouros quando fugiram da Horda ha geracoes...",
    difficulty: 2,
    minUnits: 5,
    rewards: { grainMin: 0, grainMax: 0, woodMin: 0, woodMax: 10, goldMin: 30, goldMax: 60 },
    cooldownTurns: 5,
    narratives: {
      intro: "Seus soldados entram nas galerias escuras, tochas tremendo...",
      success: "Veios de ouro brilham nas paredes! Seus homens enchem os sacos com riquezas esquecidas.",
      partial: "Encontraram algo, mas criaturas das profundezas atacaram. Alguns nao voltaram.",
      failure: "As galerias desabaram! O eco dos gritos ainda ressoa... poucos escaparam com vida.",
    },
  },
  SPIRIT_FOREST: {
    type: "SPIRIT_FOREST",
    name: "Floresta dos Espiritos",
    description: "Os druidas antigos deixaram oferendas aos espiritos da floresta...",
    difficulty: 1,
    minUnits: 3,
    rewards: { grainMin: 0, grainMax: 20, woodMin: 40, woodMax: 80, goldMin: 0, goldMax: 10 },
    cooldownTurns: 4,
    narratives: {
      intro: "A neblina envolve suas tropas enquanto entram na floresta ancestral...",
      success: "Os espiritos guiaram suas tropas ate clareiras sagradas, cheias de madeira nobre!",
      partial: "Alguns homens se perderam seguindo luzes enganosas, mas trouxeram algo.",
      failure: "A floresta rejeitou os intrusos. Seus homens vagaram em circulos ate o desespero.",
    },
  },
  ARCANE_RUINS: {
    type: "ARCANE_RUINS",
    name: "Ruinas do Templo Arcano",
    description: "Magos de eras passadas selaram conhecimento proibido nestas pedras...",
    difficulty: 4,
    minUnits: 8,
    rewards: { grainMin: 0, grainMax: 0, woodMin: 0, woodMax: 0, goldMin: 40, goldMax: 100 },
    cooldownTurns: 6,
    narratives: {
      intro: "Runas antigas brilham quando suas tropas se aproximam das ruinas...",
      success: "Entre runas brilhantes, seus homens encontraram artefatos de valor inestimavel!",
      partial: "Armadilhas magicas cobraram seu preco, mas alguns tesouros foram resgatados.",
      failure: "Um feitico de protecao foi ativado! Relampagos arcanos dizimaram seus homens.",
    },
  },
  GHOST_FARM: {
    type: "GHOST_FARM",
    name: "Fazenda Fantasma",
    description: "Os fazendeiros fugiram, mas os celeiros ainda guardam provisoes...",
    difficulty: 1,
    minUnits: 2,
    rewards: { grainMin: 50, grainMax: 100, woodMin: 0, woodMax: 20, goldMin: 0, goldMax: 10 },
    cooldownTurns: 3,
    narratives: {
      intro: "Uma fazenda abandonada surge no horizonte, seus campos ainda verdes...",
      success: "Celeiros intocados ha anos, cheios de graos preservados! Uma fortuna em comida.",
      partial: "Parte dos graos estava estragada, mas ainda trouxeram algo util.",
      failure: "Ratos e pragas consumiram tudo. Seus homens voltaram de maos vazias.",
    },
  },
  WYRM_CAVE: {
    type: "WYRM_CAVE",
    name: "Caverna do Wyrm",
    description: "Um dragao adormecido guarda tesouros de reis caidos...",
    difficulty: 5,
    minUnits: 15,
    rewards: { grainMin: 0, grainMax: 0, woodMin: 0, woodMax: 0, goldMin: 100, goldMax: 200 },
    cooldownTurns: 8,
    narratives: {
      intro: "O calor aumenta conforme suas tropas descem para a caverna do wyrm...",
      success: "O wyrm dormia profundamente... seus homens sairam ricos, pisando suavemente!",
      partial: "O dragao se mexeu! Alguns conseguiram pegar ouro antes de fugir em panico.",
      failure: "O RUGIDO ecoou pela montanha! Chamas consumiram a maioria. Poucos escaparam...",
    },
  },
  BANDIT_CAMP: {
    type: "BANDIT_CAMP",
    name: "Acampamento de Bandidos",
    description: "Saqueadores acumularam espolios de viajantes incautos...",
    difficulty: 3,
    minUnits: 8,
    rewards: { grainMin: 20, grainMax: 40, woodMin: 0, woodMax: 20, goldMin: 40, goldMax: 70 },
    cooldownTurns: 4,
    narratives: {
      intro: "Fumaca de fogueiras revela o acampamento dos bandidos...",
      success: "Um combate rapido e brutal! Os bandidos fugiram deixando seus espolios.",
      partial: "A luta foi dura. Alguns homens cairam, mas trouxeram parte do butim.",
      failure: "Os bandidos estavam preparados! Uma emboscada devastou suas tropas.",
    },
  },
  SUNKEN_SHIP: {
    type: "SUNKEN_SHIP",
    name: "Navio Naufragado",
    description: "Na costa, os restos de um navio mercante ainda guardam carga...",
    difficulty: 2,
    minUnits: 4,
    rewards: { grainMin: 0, grainMax: 20, woodMin: 30, woodMax: 50, goldMin: 30, goldMax: 50 },
    cooldownTurns: 5,
    narratives: {
      intro: "As ondas batem contra o casco partido do navio mercante...",
      success: "Entre os destrocos, barris de especiarias e madeira nobre foram resgatados!",
      partial: "A mare subiu rapido. Conseguiram salvar algo antes de recuar.",
      failure: "Uma onda gigante varreu seus homens. O mar cobrou seu tributo.",
    },
  },
  HERMIT_TOWER: {
    type: "HERMIT_TOWER",
    name: "Torre do Eremita",
    description: "Um sabio recluso mora ali. Dizem que ensina segredos aos dignos...",
    difficulty: 1,
    minUnits: 2,
    rewards: { grainMin: 30, grainMax: 50, woodMin: 10, woodMax: 30, goldMin: 10, goldMax: 30 },
    cooldownTurns: 4,
    narratives: {
      intro: "Uma torre solitaria se ergue no topo da colina, luz brilhando na janela...",
      success: "O eremita sorriu e compartilhou provisoes e conhecimentos ancestrais.",
      partial: "O sabio estava de mau humor, mas ainda ofereceu algo aos visitantes.",
      failure: "A torre estava vazia. O eremita partiu, levando seus segredos consigo.",
    },
  },
};

// Funções utilitárias de mapa
export function getDistance(fromPosition: number, toPosition: number): number {
  const fromRow = Math.floor(fromPosition / MAP_COLUMNS);
  const fromCol = fromPosition % MAP_COLUMNS;
  const toRow = Math.floor(toPosition / MAP_COLUMNS);
  const toCol = toPosition % MAP_COLUMNS;
  return Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
}

// Shuffle array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Cria 5 locais de exploracao aleatorios para a partida
function createRandomExplorationSites(): ExplorationSite[] {
  const allTypes: ExplorationSiteType[] = [
    "ABANDONED_MINE", "SPIRIT_FOREST", "ARCANE_RUINS", "GHOST_FARM",
    "WYRM_CAVE", "BANDIT_CAMP", "SUNKEN_SHIP", "HERMIT_TOWER",
  ];

  // Sorteia 5 tipos
  const selectedTypes = shuffleArray(allTypes).slice(0, 5);

  // Posicoes preferenciais: territorios neutros e dos cantos
  const availablePositions = shuffleArray([0, 2, 3, 5, 6, 8, 9, 11]).slice(0, 5);

  return selectedTypes.map((type, i) => ({
    ...EXPLORATION_SITES_DATA[type],
    id: `site-${i}-${Date.now()}`,
    position: availablePositions[i],
    lastExploredTurn: null,
  }));
}

export function getTravelTime(distance: number, units: Unit[]): number {
  if (units.length === 0) return distance;

  // Expedição viaja na velocidade do mais lento
  let minSpeed = Infinity;
  for (const unit of units) {
    const speed = UNIT_STATS[unit.type].speed;
    if (speed < minSpeed) minSpeed = speed;
  }

  // Tempo = distância / velocidade (arredonda pra cima)
  return Math.ceil(distance / minSpeed);
}

export function getCarryCapacity(units: Unit[]): number {
  let capacity = 0;
  for (const unit of units) {
    capacity += unit.quantity * UNIT_STATS[unit.type].carryCapacity;
  }
  return capacity;
}

export function getAttackPower(units: Unit[]): number {
  let power = 0;
  for (const unit of units) {
    power += unit.quantity * UNIT_STATS[unit.type].atk;
  }
  return power;
}

export function getDefensePower(units: Unit[], wallLevel: number = 0): number {
  let power = 0;
  for (const unit of units) {
    power += unit.quantity * UNIT_STATS[unit.type].def;
  }
  // Bonus de muralha: +20% por nível
  return Math.floor(power * (1 + wallLevel * 0.2));
}

export type CombatPreviewOutcome = "decisive_victory" | "victory" | "uncertain" | "defeat";

export interface CombatPreview {
  attackPower: number;
  defensePower: number;
  ratio: number;
  outcome: CombatPreviewOutcome;
  attackerModifiers: string[];
  defenderModifiers: string[];
  /** True when defender territory is AI-owned and not in revealedTerritories — defense value is approximate */
  isApproximate: boolean;
}

const FACTION_MILITARY_BONUS = 0.20; // FERRONATOS: +20% attack and defense
const WALL_DEFENSE_BONUS_PER_LEVEL = 0.20; // +20% defense per wall level
const DECISIVE_VICTORY_RATIO = 1.5;

export function calculateCombatPreview(
  attackingUnits: Unit[],
  defenderTerritory: Territory,
  attackerOrigin: ClanOrigin | undefined,
  defenderOrigin: ClanOrigin | undefined,
  revealedTerritories?: Set<string>
): CombatPreview {
  const attackerModifiers: string[] = [];
  const defenderModifiers: string[] = [];

  // Calculate raw attack power
  let attackPower = 0;
  for (const unit of attackingUnits) {
    attackPower += unit.quantity * UNIT_STATS[unit.type].atk;
  }

  // Faction attack bonus (Ferronatos: +20% military)
  if (attackerOrigin === "FERRONATOS") {
    attackPower *= 1 + FACTION_MILITARY_BONUS;
    attackerModifiers.push(`Ferronatos: +${FACTION_MILITARY_BONUS * 100}% atk`);
  }

  // Calculate raw defense power from defending units
  let defensePower = 0;
  for (const unit of defenderTerritory.units) {
    defensePower += unit.quantity * UNIT_STATS[unit.type as UnitType].def;
  }

  // Wall defense bonus
  const wall = defenderTerritory.structures.find((s) => s.type === "WALL");
  if (wall) {
    const wallBonus = wall.level * WALL_DEFENSE_BONUS_PER_LEVEL;
    defensePower *= 1 + wallBonus;
    defenderModifiers.push(`Muralha Nv${wall.level}: +${wallBonus * 100}% def`);
  }

  // Faction defense bonus (Ferronatos: +20% military)
  if (defenderOrigin === "FERRONATOS") {
    defensePower *= 1 + FACTION_MILITARY_BONUS;
    defenderModifiers.push(`Ferronatos: +${FACTION_MILITARY_BONUS * 100}% def`);
  }

  attackPower = Math.floor(attackPower);
  defensePower = Math.floor(defensePower);

  // Fog-of-war: AI territory not revealed by SPY gets approximate defense value
  const isAiOwned = defenderTerritory.ownerId !== null && defenderTerritory.ownerId !== "player";
  const isRevealed = revealedTerritories ? revealedTerritories.has(defenderTerritory.id) : false;
  const isApproximate = isAiOwned && !isRevealed;

  if (isApproximate) {
    // Apply ±20% margin of error: show a rounded approximation
    const FOG_MARGIN = 0.2;
    defensePower = Math.floor(defensePower * (1 + FOG_MARGIN));
  }

  const ratio = defensePower > 0 ? Math.round((attackPower / defensePower) * 100) / 100 : 10;

  let outcome: CombatPreviewOutcome;
  if (ratio > DECISIVE_VICTORY_RATIO) {
    outcome = "decisive_victory";
  } else if (ratio > 1.0) {
    outcome = "victory";
  } else if (ratio > 0.7) {
    outcome = "uncertain";
  } else {
    outcome = "defeat";
  }

  return { attackPower, defensePower, ratio, outcome, attackerModifiers, defenderModifiers, isApproximate };
}

// Estado inicial
function createInitialTerritories(): Territory[] {
  const bonuses: ResourceType[] = ["GRAIN", "WOOD", "GOLD", "GRAIN", "WOOD", "GOLD", "GRAIN", "WOOD", "GOLD", "GRAIN", "WOOD", "GOLD"];

  return Array.from({ length: 12 }, (_, i) => ({
    id: `t${i + 1}`,
    position: i,
    bonusResource: bonuses[i],
    ownerId: i < 2 ? "player" : i < 4 ? "ai1" : i < 6 ? "ai2" : i < 8 ? "ai3" : i < 10 ? "ai4" : null,
    ownerName: i < 2 ? "Voce" : i < 4 ? "Cla do Norte" : i < 6 ? "Cla do Sul" : i < 8 ? "Cla do Leste" : i < 10 ? "Cla do Oeste" : "Neutro",
    structures: i === 0 ? [{ id: "s1", type: "FARM" as StructureType, level: 1 }] : [],
    units: i === 0 ? [{ type: "SOLDIER" as UnitType, quantity: 5 }] : [],
  }));
}

function createInitialClans(): Clan[] {
  return [
    { id: "player", name: "Voce", isPlayer: true, grain: 100, wood: 50, gold: 30, origin: "FERRONATOS" },
    { id: "ai1", name: "Cla do Norte", isPlayer: false, grain: 100, wood: 50, gold: 30, origin: "VERDANEOS", personality: "DEFENDER" },
    { id: "ai2", name: "Cla do Sul", isPlayer: false, grain: 100, wood: 50, gold: 30, origin: "UMBRAL", personality: "OPPORTUNIST" },
    { id: "ai3", name: "Cla do Leste", isPlayer: false, grain: 100, wood: 50, gold: 30, origin: "FERRONATOS", personality: "CONQUEROR" },
    { id: "ai4", name: "Cla do Oeste", isPlayer: false, grain: 100, wood: 50, gold: 30, origin: "VERDANEOS", personality: "MERCHANT" },
  ];
}

function createInitialDiplomacy(): DiplomacyState {
  return {
    ai1: "NEUTRAL",
    ai2: "HOSTILE",
    ai3: "NEUTRAL",
    ai4: "NEUTRAL",
  };
}

// Player card in the store (simpler than Prisma's ClanCard)
export interface PlayerCard {
  id: string;
  type: string;
  used: boolean;
}

// Store
interface GameState {
  // Estado
  currentTurn: number;
  currentEra: Era;
  territories: Territory[];
  clans: Clan[];
  events: GameEvent[];
  gameOver: boolean;
  winner: string | null;
  diplomacy: DiplomacyState;
  expeditions: Expedition[];
  explorationSites: ExplorationSite[];
  timerPaused: boolean;
  timeRemaining: number;
  revealedTerritories: Record<string, RevealedTerritory>;
  territoryIntel: TerritoryIntel[];
  incomingAttacks: IncomingAttack[];
  playerCards: PlayerCard[];
  invasionModalShown: boolean;
  marketTradesUsed: string[]; // territoryIds that have used their trade this turn
  allianceTurnFormed: Record<string, number>; // clanId -> turn when TRUSTED was formed
  allianceHealth: Record<string, number>; // clanId -> alliance health (0-100)
  allianceBreakAlerts: Array<{ clanId: string; clanName: string }>; // F-064: clans that broke alliance this turn
  hordaPreview: HordaPreview | null; // F-068: provisional Horda target for next attack (T-1 preview)

  // Getters
  getPlayerClan: () => Clan;
  getPlayerTerritories: () => Territory[];
  getTerritory: (id: string) => Territory | undefined;
  canAfford: (costs: { grain?: number; wood?: number; gold?: number }) => boolean;
  getDiplomacy: (clanId: string) => DiplomacyRelation;
  getAIClans: () => Clan[];
  getExpeditions: () => Expedition[];
  getPlayerExpeditions: () => Expedition[];
  getIncomingAttacks: (territoryId: string) => Expedition[];
  getExplorationSites: () => ExplorationSite[];
  getExplorationSite: (id: string) => ExplorationSite | undefined;
  getPlayerProduction: () => ProductionResult;

  // Acoes
  build: (territoryId: string, structureType: StructureType) => boolean;
  train: (territoryId: string, unitType: UnitType, quantity: number) => boolean;
  sendExpedition: (
    fromTerritoryId: string,
    toTerritoryId: string,
    units: { type: UnitType; quantity: number }[],
    cardType?: string | null
  ) => { success: boolean; message: string; expeditionId?: string };
  cancelExpedition: (expeditionId: string) => { success: boolean; message: string };
  declareWar: (clanId: string) => { success: boolean; message: string };
  proposePeace: (clanId: string) => { success: boolean; message: string };
  cancelAlliance: (clanId: string) => { success: boolean; message: string };
  sendExploration: (
    fromTerritoryId: string,
    siteId: string,
    units: { type: UnitType; quantity: number }[]
  ) => { success: boolean; message: string; expeditionId?: string };
  sendSpy: (
    fromTerritoryId: string,
    toTerritoryId: string
  ) => { success: boolean; message: string; expeditionId?: string };
  marketTrade: (territoryId: string, trade: "GRAIN_TO_WOOD" | "GRAIN_TO_GOLD") => { success: boolean; message: string };
  processTurn: () => void;
  resetGame: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  tickTimer: () => void;
  markInvasionModalShown: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentTurn: 1,
  currentEra: "PEACE",
  territories: createInitialTerritories(),
  clans: createInitialClans(),
  events: [{ turn: 1, message: "Jogo iniciado! Construa e expanda seu imperio.", type: "info" }],
  gameOver: false,
  winner: null,
  diplomacy: createInitialDiplomacy(),
  expeditions: [],
  explorationSites: createRandomExplorationSites(),
  timerPaused: false,
  timeRemaining: TURN_DURATION_MS,
  revealedTerritories: {},
  territoryIntel: [],
  incomingAttacks: [],
  invasionModalShown: false,
  marketTradesUsed: [],
  allianceTurnFormed: {},
  allianceHealth: {},
  allianceBreakAlerts: [],
  hordaPreview: null,
  playerCards: [
    { id: "pc1", type: "REINFORCEMENTS", used: false },
    { id: "pc2", type: "INFORMANT", used: false },
    { id: "pc3", type: "SABOTAGE", used: false },
  ],

  getPlayerClan: () => {
    return get().clans.find((c) => c.isPlayer)!;
  },

  getPlayerTerritories: () => {
    return get().territories.filter((t) => t.ownerId === "player");
  },

  getTerritory: (id: string) => {
    return get().territories.find((t) => t.id === id);
  },

  canAfford: (costs) => {
    const player = get().getPlayerClan();
    return (
      (costs.grain || 0) <= player.grain &&
      (costs.wood || 0) <= player.wood &&
      (costs.gold || 0) <= player.gold
    );
  },

  getDiplomacy: (clanId: string) => {
    return get().diplomacy[clanId] || "NEUTRAL";
  },

  getAIClans: () => {
    return get().clans.filter((c) => !c.isPlayer);
  },

  getExpeditions: () => {
    return get().expeditions;
  },

  getPlayerExpeditions: () => {
    return get().expeditions.filter((e) => e.ownerId === "player");
  },

  getIncomingAttacks: (territoryId: string) => {
    return get().expeditions.filter(
      (e) => e.toTerritoryId === territoryId && e.type === "ATTACK"
    );
  },

  getExplorationSites: () => {
    return get().explorationSites;
  },

  getExplorationSite: (id: string) => {
    return get().explorationSites.find((s) => s.id === id);
  },

  getPlayerProduction: () => {
    const state = get();
    const playerClan = state.clans.find((c) => c.isPlayer)!;
    const playerTerritories = state.territories.filter((t) => t.ownerId === "player");
    return calculateTotalProduction(playerClan, playerTerritories);
  },

  build: (territoryId, structureType) => {
    const state = get();
    const territory = state.territories.find((t) => t.id === territoryId);

    if (!territory || territory.ownerId !== "player") return false;
    if (territory.structures.length >= 4) return false;
    if (territory.structures.some((s) => s.type === structureType)) return false;

    const currentLevel = territory.structures.find((s: Structure) => s.type === structureType)?.level ?? 0;
    const cost = STRUCTURE_COSTS[structureType as StructureType][currentLevel];
    if (!state.canAfford(cost)) return false;

    set((state) => ({
      clans: state.clans.map((c) =>
        c.isPlayer
          ? {
              ...c,
              grain: c.grain - ((cost as { grain?: number; wood?: number; gold?: number }).grain || 0),
              wood: c.wood - (cost.wood || 0),
              gold: c.gold - (cost.gold || 0),
            }
          : c
      ),
      territories: state.territories.map((t) =>
        t.id === territoryId
          ? {
              ...t,
              structures: [
                ...t.structures,
                { id: `s${Date.now()}`, type: structureType, level: 1 },
              ],
            }
          : t
      ),
      events: [
        { turn: state.currentTurn, message: `Construiu ${structureType} no territorio ${territory.position + 1}`, type: "success" as const },
        ...state.events.slice(0, 9),
      ],
    }));

    return true;
  },

  train: (territoryId, unitType, quantity) => {
    const state = get();
    const territory = state.territories.find((t) => t.id === territoryId);

    if (!territory || territory.ownerId !== "player") return false;

    // Verifica se tem quartel/estabulo/guilda
    const hasBarracks = territory.structures.some((s) => s.type === "BARRACKS");
    const hasStable = territory.structures.some((s) => s.type === "STABLE");
    const hasShadowGuild = territory.structures.some((s) => s.type === "SHADOW_GUILD");

    if (unitType === "KNIGHT" && !hasStable) return false;
    if ((unitType === "SOLDIER" || unitType === "ARCHER") && !hasBarracks) return false;
    if (unitType === "SPY" && !hasShadowGuild) return false;

    const cost = UNIT_COSTS[unitType];
    const totalCost = {
      grain: (cost.grain || 0) * quantity,
      wood: (cost.wood || 0) * quantity,
      gold: (cost.gold || 0) * quantity,
    };

    if (!state.canAfford(totalCost)) return false;

    set((state) => ({
      clans: state.clans.map((c) =>
        c.isPlayer
          ? {
              ...c,
              grain: c.grain - totalCost.grain,
              wood: c.wood - totalCost.wood,
              gold: c.gold - totalCost.gold,
            }
          : c
      ),
      territories: state.territories.map((t) => {
        if (t.id !== territoryId) return t;

        const existingUnit = t.units.find((u) => u.type === unitType);
        if (existingUnit) {
          return {
            ...t,
            units: t.units.map((u) =>
              u.type === unitType ? { ...u, quantity: u.quantity + quantity } : u
            ),
          };
        } else {
          return {
            ...t,
            units: [...t.units, { type: unitType, quantity }],
          };
        }
      }),
      events: [
        { turn: state.currentTurn, message: `Treinou ${quantity}x ${unitType}`, type: "success" as const },
        ...state.events.slice(0, 9),
      ],
    }));

    return true;
  },

  sendExpedition: (fromTerritoryId, toTerritoryId, units, cardType) => {
    const state = get();

    // Validações
    if (state.currentEra === "PEACE") {
      return { success: false, message: "Expedicoes bloqueadas na Era da Paz!" };
    }

    const from = state.territories.find((t) => t.id === fromTerritoryId);
    const to = state.territories.find((t) => t.id === toTerritoryId);

    if (!from || !to) return { success: false, message: "Territorio invalido" };
    if (from.ownerId !== "player") return { success: false, message: "Voce so pode enviar de seus territorios" };
    if (to.ownerId === "player") return { success: false, message: "Nao pode atacar a si mesmo" };

    // F-060: Bloquear ataque a clãs aliados (TRUSTED)
    if (to.ownerId && state.diplomacy[to.ownerId] === "TRUSTED") {
      return { success: false, message: "Aliado — cancele a aliança antes de atacar" };
    }

    // Validar unidades disponíveis
    for (const unit of units) {
      const available = from.units.find((u) => u.type === unit.type);
      if (!available || available.quantity < unit.quantity) {
        return { success: false, message: `Unidades insuficientes: ${unit.type}` };
      }
    }

    // Validar que está enviando pelo menos uma unidade
    const totalUnits = units.reduce((sum, u) => sum + u.quantity, 0);
    if (totalUnits <= 0) {
      return { success: false, message: "Selecione pelo menos uma unidade!" };
    }

    // Calcular distância e tempo
    const distance = getDistance(from.position, to.position);
    const expeditionUnits: Unit[] = units.map((u) => ({ type: u.type, quantity: u.quantity }));
    const travelTime = getTravelTime(distance, expeditionUnits);

    // Criar expedição
    const expeditionId = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expedition: Expedition = {
      id: expeditionId,
      ownerId: "player",
      ownerName: "Voce",
      fromTerritoryId,
      toTerritoryId,
      fromPosition: from.position,
      toPosition: to.position,
      units: expeditionUnits,
      carriedResources: { grain: 0, wood: 0, gold: 0 },
      turnsRemaining: travelTime,
      totalTurns: travelTime,
      departedTurn: state.currentTurn,
      type: "ATTACK",
      cardType: cardType ?? null,
    };

    // Remover unidades do território de origem; marcar carta como usada
    set((state) => ({
      territories: state.territories.map((t) => {
        if (t.id === fromTerritoryId) {
          const newUnits = t.units.map((u) => {
            const sent = units.find((sent) => sent.type === u.type);
            if (sent) {
              return { ...u, quantity: u.quantity - sent.quantity };
            }
            return u;
          }).filter((u) => u.quantity > 0);
          return { ...t, units: newUnits };
        }
        return t;
      }),
      // Se uma carta foi selecionada, marcar a primeira carta não usada desse tipo como usada
      ...(cardType ? {
        playerCards: (() => {
          let marked = false;
          return state.playerCards.map((c) => {
            if (!marked && c.type === cardType && !c.used) {
              marked = true;
              return { ...c, used: true };
            }
            return c;
          });
        })(),
      } : {}),
      expeditions: [...state.expeditions, expedition],
      events: [
        {
          turn: state.currentTurn,
          message: `Expedicao enviada! ${totalUnits} tropas marcham para territorio ${to.position + 1}. Chegada em ${travelTime} turno(s).`,
          type: "info" as const,
        },
        ...state.events.slice(0, 9),
      ],
    }));

    return {
      success: true,
      message: `Expedicao enviada! Chegada em ${travelTime} turno(s).`,
      expeditionId,
    };
  },

  sendSpy: (fromTerritoryId, toTerritoryId) => {
    const state = get();

    const from = state.territories.find((t) => t.id === fromTerritoryId);
    const to = state.territories.find((t) => t.id === toTerritoryId);

    if (!from || !to) return { success: false, message: "Territorio invalido" };
    if (from.ownerId !== "player") return { success: false, message: "Voce so pode enviar de seus territorios" };
    if (to.ownerId === "player") return { success: false, message: "Nao pode espionar a si mesmo" };

    // Validar que território de origem tem pelo menos 1 SPY disponível
    const spiesAvailable = from.units.find((u) => u.type === "SPY");
    if (!spiesAvailable || spiesAvailable.quantity < 1) {
      return { success: false, message: "Nenhum Espiao disponivel neste territorio" };
    }

    // Travel time = distância Manhattan em turnos
    const distance = getDistance(from.position, to.position);
    const travelTime = Math.max(1, distance);

    const expeditionId = `spy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expedition: Expedition = {
      id: expeditionId,
      ownerId: "player",
      ownerName: "Voce",
      fromTerritoryId,
      toTerritoryId,
      fromPosition: from.position,
      toPosition: to.position,
      units: [{ type: "SPY", quantity: 1 }],
      carriedResources: { grain: 0, wood: 0, gold: 0 },
      turnsRemaining: travelTime,
      totalTurns: travelTime,
      departedTurn: state.currentTurn,
      type: "SPY",
    };

    // Remover 1 SPY do território de origem
    set((state) => ({
      territories: state.territories.map((t) => {
        if (t.id === fromTerritoryId) {
          const newUnits = t.units.map((u) => {
            if (u.type === "SPY") return { ...u, quantity: u.quantity - 1 };
            return u;
          }).filter((u) => u.quantity > 0);
          return { ...t, units: newUnits };
        }
        return t;
      }),
      expeditions: [...state.expeditions, expedition],
      events: [
        {
          turn: state.currentTurn,
          message: `Espiao enviado para territorio ${to.position + 1}. Chegada em ${travelTime} turno(s).`,
          type: "info" as const,
        },
        ...state.events.slice(0, 9),
      ],
    }));

    return {
      success: true,
      message: `Espiao enviado! Chegada em ${travelTime} turno(s).`,
      expeditionId,
    };
  },

  cancelExpedition: (expeditionId: string) => {
    const state = get();
    const expedition = state.expeditions.find((e) => e.id === expeditionId);

    if (!expedition) {
      return { success: false, message: "Expedicao nao encontrada" };
    }
    if (expedition.ownerId !== "player") {
      return { success: false, message: "Voce so pode cancelar suas expedicoes" };
    }
    if (expedition.type !== "ATTACK") {
      return { success: false, message: "Nao pode cancelar expedicoes de retorno" };
    }

    // Tropas voltam imediatamente para o território de origem
    set((state) => ({
      territories: state.territories.map((t) => {
        if (t.id === expedition.fromTerritoryId) {
          // Adicionar unidades de volta
          const newUnits = [...t.units];
          for (const unit of expedition.units) {
            const existing = newUnits.find((u) => u.type === unit.type);
            if (existing) {
              existing.quantity += unit.quantity;
            } else {
              newUnits.push({ ...unit });
            }
          }
          return { ...t, units: newUnits };
        }
        return t;
      }),
      expeditions: state.expeditions.filter((e) => e.id !== expeditionId),
      events: [
        {
          turn: state.currentTurn,
          message: `Expedicao cancelada! Tropas retornaram ao territorio de origem.`,
          type: "warning" as const,
        },
        ...state.events.slice(0, 9),
      ],
    }));

    return { success: true, message: "Expedicao cancelada!" };
  },

  declareWar: (clanId: string) => {
    const state = get();
    const clan = state.clans.find((c) => c.id === clanId);

    if (!clan) return { success: false, message: "Cla nao encontrado" };
    if (clan.isPlayer) return { success: false, message: "Nao pode declarar guerra a si mesmo" };

    const currentRelation = state.diplomacy[clanId];
    if (currentRelation === "HOSTILE") {
      return { success: false, message: "Voce ja esta em guerra com este cla!" };
    }

    set((state) => ({
      diplomacy: {
        ...state.diplomacy,
        [clanId]: "HOSTILE",
      },
      events: [
        { turn: state.currentTurn, message: `GUERRA! Voce declarou guerra ao ${clan.name}!`, type: "danger" as const },
        ...state.events.slice(0, 9),
      ],
    }));

    return { success: true, message: `Guerra declarada ao ${clan.name}!` };
  },

  proposePeace: (clanId: string) => {
    const state = get();
    const clan = state.clans.find((c) => c.id === clanId);

    if (!clan) return { success: false, message: "Cla nao encontrado" };
    if (clan.isPlayer) return { success: false, message: "Nao pode propor paz a si mesmo" };

    const currentRelation = state.diplomacy[clanId];
    if (currentRelation === "TRUSTED") {
      return { success: false, message: "Voce ja e aliado deste cla!" };
    }

    // 50% chance de aceitar paz (dependendo da personalidade)
    const acceptChance = clan.personality === "MERCHANT" ? 0.8 :
                         clan.personality === "DEFENDER" ? 0.6 :
                         clan.personality === "OPPORTUNIST" ? 0.4 : 0.2;

    const accepted = Math.random() < acceptChance;

    if (accepted) {
      const newRelation: DiplomacyRelation = currentRelation === "HOSTILE" ? "NEUTRAL" : "TRUSTED";
      set((state) => ({
        diplomacy: {
          ...state.diplomacy,
          [clanId]: newRelation,
        },
        allianceTurnFormed: newRelation === "TRUSTED"
          ? { ...state.allianceTurnFormed, [clanId]: state.currentTurn }
          : state.allianceTurnFormed,
        allianceHealth: newRelation === "TRUSTED"
          ? { ...state.allianceHealth, [clanId]: 100 }
          : state.allianceHealth,
        events: [
          { turn: state.currentTurn, message: `PAZ! ${clan.name} aceitou sua proposta de paz!`, type: "success" as const },
          ...state.events.slice(0, 9),
        ],
      }));
      return { success: true, message: `${clan.name} aceitou sua proposta de paz!` };
    } else {
      set((state) => ({
        events: [
          { turn: state.currentTurn, message: `${clan.name} rejeitou sua proposta de paz.`, type: "warning" as const },
          ...state.events.slice(0, 9),
        ],
      }));
      return { success: false, message: `${clan.name} rejeitou sua proposta de paz.` };
    }
  },

  cancelAlliance: (clanId: string) => {
    const state = get();
    const clan = state.clans.find((c) => c.id === clanId);
    if (!clan) return { success: false, message: "Clã não encontrado" };

    const currentRelation = state.diplomacy[clanId];
    if (currentRelation !== "TRUSTED") {
      return { success: false, message: "Você não tem aliança com este clã" };
    }

    const newAllianceTurnFormed = { ...state.allianceTurnFormed };
    delete newAllianceTurnFormed[clanId];
    const newAllianceHealth = { ...state.allianceHealth };
    delete newAllianceHealth[clanId];

    set((s) => ({
      diplomacy: {
        ...s.diplomacy,
        [clanId]: "NEUTRAL" as DiplomacyRelation,
      },
      allianceTurnFormed: newAllianceTurnFormed,
      allianceHealth: newAllianceHealth,
      events: [
        { turn: s.currentTurn, message: `Você cancelou a aliança com ${clan.name}. Relação agora Neutra.`, type: "warning" as const },
        ...s.events.slice(0, 9),
      ],
    }));
    return { success: true, message: `Aliança com ${clan.name} cancelada.` };
  },

  sendExploration: (fromTerritoryId, siteId, units) => {
    const state = get();

    // Apenas na Era da Paz
    if (state.currentEra !== "PEACE") {
      return { success: false, message: "Exploracoes so podem ser enviadas na Era da Paz!" };
    }

    const from = state.territories.find((t) => t.id === fromTerritoryId);
    const site = state.explorationSites.find((s) => s.id === siteId);

    if (!from) return { success: false, message: "Territorio invalido" };
    if (!site) return { success: false, message: "Local de exploracao invalido" };
    if (from.ownerId !== "player") return { success: false, message: "Voce so pode enviar de seus territorios" };

    // Verificar cooldown
    if (site.lastExploredTurn !== null) {
      const turnsSinceExplored = state.currentTurn - site.lastExploredTurn;
      if (turnsSinceExplored < site.cooldownTurns) {
        const turnsLeft = site.cooldownTurns - turnsSinceExplored;
        return { success: false, message: `Local em cooldown! Aguarde ${turnsLeft} turno(s).` };
      }
    }

    // Verificar se ja ha expedicao em andamento para este site
    const existingExpedition = state.expeditions.find(
      (e) => e.toTerritoryId === siteId && e.type === "EXPLORE"
    );
    if (existingExpedition) {
      return { success: false, message: "Ja ha uma expedicao em andamento para este local!" };
    }

    // Validar unidades disponíveis
    for (const unit of units) {
      const available = from.units.find((u) => u.type === unit.type);
      if (!available || available.quantity < unit.quantity) {
        return { success: false, message: `Unidades insuficientes: ${unit.type}` };
      }
    }

    // Validar quantidade minima de unidades
    const totalUnits = units.reduce((sum, u) => sum + u.quantity, 0);
    if (totalUnits < site.minUnits) {
      return { success: false, message: `Minimo de ${site.minUnits} unidades necessarias para este local!` };
    }

    // Calcular distância e tempo
    const distance = getDistance(from.position, site.position);
    const expeditionUnits: Unit[] = units.map((u) => ({ type: u.type, quantity: u.quantity }));
    const travelTime = getTravelTime(distance, expeditionUnits);

    // Criar expedição de exploração
    const expeditionId = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expedition: Expedition = {
      id: expeditionId,
      ownerId: "player",
      ownerName: "Voce",
      fromTerritoryId,
      toTerritoryId: siteId, // Usamos siteId como "territorio" destino
      fromPosition: from.position,
      toPosition: site.position,
      units: expeditionUnits,
      carriedResources: { grain: 0, wood: 0, gold: 0 },
      turnsRemaining: travelTime,
      totalTurns: travelTime,
      departedTurn: state.currentTurn,
      type: "EXPLORE",
    };

    // Remover unidades do território de origem
    set((state) => ({
      territories: state.territories.map((t) => {
        if (t.id === fromTerritoryId) {
          const newUnits = t.units.map((u) => {
            const sent = units.find((sent) => sent.type === u.type);
            if (sent) {
              return { ...u, quantity: u.quantity - sent.quantity };
            }
            return u;
          }).filter((u) => u.quantity > 0);
          return { ...t, units: newUnits };
        }
        return t;
      }),
      expeditions: [...state.expeditions, expedition],
      events: [
        {
          turn: state.currentTurn,
          message: `Expedicao de exploracao enviada! ${totalUnits} tropas partem para ${site.name}. Chegada em ${travelTime} turno(s).`,
          type: "info" as const,
        },
        ...state.events.slice(0, 9),
      ],
    }));

    return {
      success: true,
      message: `Expedicao enviada para ${site.name}! Chegada em ${travelTime} turno(s).`,
      expeditionId,
    };
  },

  marketTrade: (territoryId, trade) => {
    const state = get();
    const territory = state.territories.find((t) => t.id === territoryId);

    // Validate territory belongs to player
    if (!territory || territory.ownerId !== "player") {
      return { success: false, message: "Território inválido." };
    }

    // Validate territory has Tavern
    const hasTavern = territory.structures.some((s) => s.type === "TAVERN");
    if (!hasTavern) {
      return { success: false, message: "Este território não possui Taverna." };
    }

    // Validate trade limit per turn per territory (1 per Tavern, tracked by territoryId)
    const tradesUsedHere = state.marketTradesUsed.filter((id) => id === territoryId).length;
    if (tradesUsedHere >= MARKET.TRADES_PER_TURN_PER_TAVERN) {
      return { success: false, message: "Limite de trocas atingido este turno." };
    }

    const player = state.getPlayerClan();
    const cost = trade === "GRAIN_TO_WOOD" ? MARKET.GRAIN_TO_WOOD_COST : MARKET.GRAIN_TO_GOLD_COST;
    if (player.grain < cost) {
      return { success: false, message: `Grão insuficiente. Necessário: ${cost}.` };
    }

    const woodGain = trade === "GRAIN_TO_WOOD" ? MARKET.GRAIN_TO_WOOD_YIELD : 0;
    const goldGain = trade === "GRAIN_TO_GOLD" ? MARKET.GRAIN_TO_GOLD_YIELD : 0;

    set((s) => ({
      clans: s.clans.map((c) =>
        c.isPlayer
          ? { ...c, grain: c.grain - cost, wood: c.wood + woodGain, gold: c.gold + goldGain }
          : c
      ),
      marketTradesUsed: [...s.marketTradesUsed, territoryId],
      events: [
        ...s.events,
        {
          turn: s.currentTurn,
          message:
            trade === "GRAIN_TO_WOOD"
              ? `Mercado: -${cost} grão, +${woodGain} madeira`
              : `Mercado: -${cost} grão, +${goldGain} ouro`,
          type: "info" as const,
        },
      ],
    }));

    return { success: true, message: trade === "GRAIN_TO_WOOD" ? `+${woodGain} madeira` : `+${goldGain} ouro` };
  },

  processTurn: () => {
    const state = get();

    if (state.timerPaused) return;
    if (state.gameOver) return;
    if (state.currentTurn >= TOTAL_TURNS) {
      set({ gameOver: true, winner: "player" });
      return;
    }

    const newTurn = state.currentTurn + 1;
    let newEra: Era = "PEACE";
    if (newTurn > 15) newEra = "WAR";
    if (newTurn > 35) newEra = "INVASION";

    const newEvents: GameEvent[] = [];

    // Producao de recursos
    let grainProd = 0,
      woodProd = 0,
      goldProd = 0;

    state.territories
      .filter((t) => t.ownerId === "player")
      .forEach((t) => {
        t.structures.forEach((s) => {
          const prod = STRUCTURE_PRODUCTION[s.type];
          if (prod.resource && prod.amount) {
            const bonus = t.bonusResource === prod.resource ? 1.25 : 1;
            const amount = Math.floor(prod.amount * s.level * bonus);
            if (prod.resource === "GRAIN") grainProd += amount;
            if (prod.resource === "WOOD") woodProd += amount;
            if (prod.resource === "GOLD") goldProd += amount;
          }
        });
      });

    newEvents.push({
      turn: newTurn,
      message: `Producao: +${grainProd} graos, +${woodProd} madeira, +${goldProd} ouro`,
      type: "info",
    });

    // Processar expedições
    let updatedExpeditions: Expedition[] = [];
    const expeditionEvents: GameEvent[] = [];
    const conqueredTerritories: { id: string; newOwnerId: string; newOwnerName: string }[] = [];
    const returnedTroops: { territoryId: string; units: Unit[]; resources: { grain: number; wood: number; gold: number } }[] = [];
    const lootedClans: { clanId: string; grain: number; wood: number; gold: number }[] = [];
    const sabotageTargets: string[] = []; // IDs de territórios onde estrutura deve ser destruída
    const exploredSites: { siteId: string; turn: number }[] = [];
    const spyReveals: { territoryId: string; units: Unit[]; structures: Structure[]; revealedAt: number; expiresAt: number }[] = [];
    const combatIntelUpdates: TerritoryIntel[] = [];

    for (const exp of state.expeditions) {
      const newTurnsRemaining = exp.turnsRemaining - 1;

      if (newTurnsRemaining <= 0) {
        // Expedição chegou ao destino!
        if (exp.type === "ATTACK") {
          // Executar combate
          const targetTerritory = state.territories.find((t) => t.id === exp.toTerritoryId);
          if (targetTerritory) {
            // Efeito de carta INFORMANT: revelar território imediatamente
            if (exp.cardType === "INFORMANT") {
              spyReveals.push({
                territoryId: targetTerritory.id,
                units: [...targetTerritory.units],
                structures: [...targetTerritory.structures],
                revealedAt: newTurn,
                expiresAt: newTurn + 3,
              });
            }

            let attackPower = getAttackPower(exp.units);

            // Efeito de carta REINFORCEMENTS: +50% poder de ataque
            if (exp.cardType === "REINFORCEMENTS") {
              attackPower = Math.floor(attackPower * 1.5);
            }

            const wallLevel = targetTerritory.structures.find((s) => s.type === "WALL")?.level || 0;
            const defensePower = getDefensePower(targetTerritory.units, wallLevel);

            // Registrar intel de combate do território atacado (source: COMBAT, expira em 3 turnos)
            combatIntelUpdates.push({
              territoryId: targetTerritory.id,
              source: 'COMBAT',
              defensePower,
              revealedAt: newTurn,
              expiresAt: newTurn + 3,
            });

            const victory = attackPower > defensePower;
            const ratio = defensePower > 0 ? attackPower / defensePower : 10;

            if (victory) {
              // Calcular perdas (20-40% baseado na proporção)
              const lossRate = Math.max(0.1, Math.min(0.4, 0.5 / ratio));
              const survivors: Unit[] = exp.units.map((u) => ({
                type: u.type,
                quantity: Math.ceil(u.quantity * (1 - lossRate)),
              })).filter((u) => u.quantity > 0);

              // Saquear recursos (30-50% do clã inimigo)
              const targetClan = state.clans.find((c) => c.id === targetTerritory.ownerId);
              const carryCapacity = getCarryCapacity(survivors);
              let lootGrain = 0, lootWood = 0, lootGold = 0;

              if (targetClan && !targetClan.isPlayer) {
                const lootRate = 0.4;
                lootGrain = Math.min(Math.floor(targetClan.grain * lootRate), Math.floor(carryCapacity / 3));
                lootWood = Math.min(Math.floor(targetClan.wood * lootRate), Math.floor(carryCapacity / 3));
                lootGold = Math.min(Math.floor(targetClan.gold * lootRate), Math.floor(carryCapacity / 3));

                // Registrar saque do clã inimigo
                lootedClans.push({ clanId: targetClan.id, grain: lootGrain, wood: lootWood, gold: lootGold });
              }

              // Marcar território como conquistado
              conqueredTerritories.push({
                id: exp.toTerritoryId,
                newOwnerId: exp.ownerId,
                newOwnerName: exp.ownerName,
              });

              // Efeito de carta SABOTAGE: destruir estrutura do território após vitória
              if (exp.cardType === "SABOTAGE" && targetTerritory.structures.length > 0) {
                sabotageTargets.push(exp.toTerritoryId);
              }

              // Criar expedição de retorno com saque
              const returnTime = exp.totalTurns;
              updatedExpeditions.push({
                id: `ret-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ownerId: exp.ownerId,
                ownerName: exp.ownerName,
                fromTerritoryId: exp.toTerritoryId,
                toTerritoryId: exp.fromTerritoryId,
                fromPosition: exp.toPosition,
                toPosition: exp.fromPosition,
                units: survivors,
                carriedResources: { grain: lootGrain, wood: lootWood, gold: lootGold },
                turnsRemaining: returnTime,
                totalTurns: returnTime,
                departedTurn: newTurn,
                type: "RETURN_VICTORY",
              });

              const origCount = exp.units.reduce((s: number, u: Unit) => s + u.quantity, 0);
              const survivorCount = survivors.reduce((s: number, u: Unit) => s + u.quantity, 0);
              const atkLosses = origCount - survivorCount;
              const defLosses = targetTerritory.units.reduce((s: number, u: Unit) => s + u.quantity, 0);
              const lootParts: string[] = [];
              if (lootGrain > 0) lootParts.push(`+${lootGrain} grão`);
              if (lootWood > 0) lootParts.push(`+${lootWood} madeira`);
              if (lootGold > 0) lootParts.push(`+${lootGold} ouro`);
              const lootStr = lootParts.length > 0 ? lootParts.join(", ") : "nenhum";
              const sabotageNote = exp.cardType === "SABOTAGE" && targetTerritory.structures.length > 0 ? " Sabotagem: estrutura destruída." : "";
              const victoryMsg = `Você atacou Território ${targetTerritory.position + 1} de ${targetTerritory.ownerName}. VITÓRIA! Conquistou o território. Saqueou: ${lootStr}. Perdas: ${atkLosses} unidades.${sabotageNote}`;
              expeditionEvents.push({
                turn: newTurn,
                message: victoryMsg,
                type: "success",
                eventKind: "COMBAT",
                result: "victory",
                attackerClanId: exp.ownerId,
                attackerClanName: exp.ownerName,
                defenderClanId: targetTerritory.ownerId ?? "neutral",
                defenderClanName: targetTerritory.ownerName,
                territoryId: targetTerritory.id,
                territoryName: `Territorio ${targetTerritory.position + 1}`,
                attackerLosses: atkLosses,
                defenderLosses: defLosses,
                territoryConquered: true,
                isPlayerInvolved: true,
              });
            } else {
              // Derrota - calcular perdas (60-80%)
              const lossRate = Math.min(0.9, 0.5 + (1 - ratio) * 0.3);
              const survivors: Unit[] = exp.units.map((u) => ({
                type: u.type,
                quantity: Math.floor(u.quantity * (1 - lossRate)),
              })).filter((u) => u.quantity > 0);

              if (survivors.length > 0) {
                // Criar expedição de retorno (fuga - 1 turno mais rápido)
                const returnTime = Math.max(1, exp.totalTurns - 1);
                updatedExpeditions.push({
                  id: `ret-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  ownerId: exp.ownerId,
                  ownerName: exp.ownerName,
                  fromTerritoryId: exp.toTerritoryId,
                  toTerritoryId: exp.fromTerritoryId,
                  fromPosition: exp.toPosition,
                  toPosition: exp.fromPosition,
                  units: survivors,
                  carriedResources: { grain: 0, wood: 0, gold: 0 },
                  turnsRemaining: returnTime,
                  totalTurns: returnTime,
                  departedTurn: newTurn,
                  type: "RETURN_DEFEAT",
                });
              }

              const defOrigCount = exp.units.reduce((s: number, u: Unit) => s + u.quantity, 0);
              const defSurvivorCount = survivors.reduce((s: number, u: Unit) => s + u.quantity, 0);
              const defAtkLosses = defOrigCount - defSurvivorCount;
              const defDefLosses = Math.floor(attackPower / 10);
              const UNIT_NAMES: Record<UnitType, string> = { SOLDIER: "soldados", ARCHER: "arqueiros", KNIGHT: "cavaleiros", SPY: "espiões" };
              const unitLossParts: string[] = exp.units
                .map((u) => {
                  const survivorUnit = survivors.find((s) => s.type === u.type);
                  const lost = u.quantity - (survivorUnit?.quantity || 0);
                  return lost > 0 ? `${lost} ${UNIT_NAMES[u.type]}` : null;
                })
                .filter((s): s is string => s !== null);
              const unitLossStr = unitLossParts.length > 0 ? unitLossParts.join(", ") : `${defAtkLosses} unidades`;
              const defeatMsg = `Você atacou Território ${targetTerritory.position + 1} de ${targetTerritory.ownerName}. DERROTA. Perdeu ${unitLossStr}.`;
              expeditionEvents.push({
                turn: newTurn,
                message: defeatMsg,
                type: "danger",
                eventKind: "COMBAT",
                result: "defeat",
                attackerClanId: exp.ownerId,
                attackerClanName: exp.ownerName,
                defenderClanId: targetTerritory.ownerId ?? "neutral",
                defenderClanName: targetTerritory.ownerName,
                territoryId: targetTerritory.id,
                territoryName: `Territorio ${targetTerritory.position + 1}`,
                attackerLosses: defAtkLosses,
                defenderLosses: defDefLosses,
                territoryConquered: false,
                isPlayerInvolved: true,
              });
            }
          }
        } else if (exp.type === "RETURN_VICTORY" || exp.type === "RETURN_DEFEAT") {
          // Tropas chegando em casa
          const totalLoot = exp.carriedResources.grain + exp.carriedResources.wood + exp.carriedResources.gold;
          const totalTroops = exp.units.reduce((sum, u) => sum + u.quantity, 0);

          // Registrar retorno de tropas
          returnedTroops.push({
            territoryId: exp.toTerritoryId,
            units: exp.units,
            resources: exp.carriedResources,
          });

          if (exp.type === "RETURN_VICTORY" && totalLoot > 0) {
            expeditionEvents.push({
              turn: newTurn,
              message: `Tropas retornaram com saque! +${exp.carriedResources.grain} graos, +${exp.carriedResources.wood} madeira, +${exp.carriedResources.gold} ouro`,
              type: "success",
            });
          } else if (totalTroops > 0) {
            expeditionEvents.push({
              turn: newTurn,
              message: `${totalTroops} tropas retornaram ao territorio de origem.`,
              type: "info",
            });
          }
        } else if (exp.type === "EXPLORE") {
          // Expedição de exploração chegou ao local!
          const site = state.explorationSites.find((s) => s.id === exp.toTerritoryId);
          if (site) {
            // Calcular resultado da exploração
            const power = getAttackPower(exp.units);
            const threshold = site.difficulty * 30; // 30, 60, 90, 120, 150

            const roll = Math.random() * 100 + power;

            let result: "success" | "partial" | "failure";
            let lossRate: number;
            let rewardRate: number;

            if (roll > threshold * 1.5) {
              result = "success";
              lossRate = 0;
              rewardRate = 1.0;
            } else if (roll > threshold) {
              result = "partial";
              lossRate = 0.25;
              rewardRate = 0.6;
            } else {
              result = "failure";
              lossRate = 0.65;
              rewardRate = 0.1;
            }

            // Calcular sobreviventes
            const survivors: Unit[] = exp.units.map((u) => ({
              type: u.type,
              quantity: Math.ceil(u.quantity * (1 - lossRate)),
            })).filter((u) => u.quantity > 0);

            // Calcular recompensas
            const grainReward = Math.floor(
              (site.rewards.grainMin + Math.random() * (site.rewards.grainMax - site.rewards.grainMin)) * rewardRate
            );
            const woodReward = Math.floor(
              (site.rewards.woodMin + Math.random() * (site.rewards.woodMax - site.rewards.woodMin)) * rewardRate
            );
            const goldReward = Math.floor(
              (site.rewards.goldMin + Math.random() * (site.rewards.goldMax - site.rewards.goldMin)) * rewardRate
            );

            // Marcar site como explorado (para cooldown)
            exploredSites.push({ siteId: site.id, turn: newTurn });

            // Criar expedição de retorno
            const returnTime = exp.totalTurns;
            updatedExpeditions.push({
              id: `ret-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              ownerId: exp.ownerId,
              ownerName: exp.ownerName,
              fromTerritoryId: exp.toTerritoryId,
              toTerritoryId: exp.fromTerritoryId,
              fromPosition: exp.toPosition,
              toPosition: exp.fromPosition,
              units: survivors,
              carriedResources: { grain: grainReward, wood: woodReward, gold: goldReward },
              turnsRemaining: returnTime,
              totalTurns: returnTime,
              departedTurn: newTurn,
              type: "RETURN_EXPLORE",
            });

            // Evento narrativo
            const narrative = site.narratives[result];
            const totalReward = grainReward + woodReward + goldReward;
            const totalLost = exp.units.reduce((sum, u) => sum + u.quantity, 0) - survivors.reduce((sum, u) => sum + u.quantity, 0);

            if (result === "success") {
              expeditionEvents.push({
                turn: newTurn,
                message: `${site.name}: ${narrative}`,
                type: "success",
              });
            } else if (result === "partial") {
              expeditionEvents.push({
                turn: newTurn,
                message: `${site.name}: ${narrative} (${totalLost} baixas)`,
                type: "warning",
              });
            } else {
              expeditionEvents.push({
                turn: newTurn,
                message: `${site.name}: ${narrative} (${totalLost} baixas!)`,
                type: "danger",
              });
            }
          }
        } else if (exp.type === "RETURN_EXPLORE") {
          // Tropas de exploração retornando com recursos
          const totalLoot = exp.carriedResources.grain + exp.carriedResources.wood + exp.carriedResources.gold;
          const totalTroops = exp.units.reduce((sum, u) => sum + u.quantity, 0);

          // Registrar retorno de tropas
          returnedTroops.push({
            territoryId: exp.toTerritoryId,
            units: exp.units,
            resources: exp.carriedResources,
          });

          if (totalLoot > 0) {
            expeditionEvents.push({
              turn: newTurn,
              message: `Exploradores retornaram! +${exp.carriedResources.grain} graos, +${exp.carriedResources.wood} madeira, +${exp.carriedResources.gold} ouro`,
              type: "success",
            });
          } else if (totalTroops > 0) {
            expeditionEvents.push({
              turn: newTurn,
              message: `${totalTroops} exploradores retornaram de maos vazias.`,
              type: "info",
            });
          }
        } else if (exp.type === "SPY") {
          // Espião chegou ao território alvo — resolver espionagem
          const targetTerritory = state.territories.find((t) => t.id === exp.toTerritoryId);
          if (targetTerritory) {
            // Calcular chance de sucesso
            const spyOwnerClan = state.clans.find((c) => c.id === exp.ownerId);
            const isUmbral = spyOwnerClan?.origin === "UMBRAL";
            const successChance = isUmbral
              ? SPY_SUCCESS_CHANCE_BASE + SPY_UMBRAL_BONUS  // 100%
              : SPY_SUCCESS_CHANCE_BASE;                     // 70%

            const roll = Math.random();
            const spySuccess = roll < successChance;

            if (spySuccess) {
              // Sucesso: revelar território
              spyReveals.push({
                territoryId: exp.toTerritoryId,
                units: [...targetTerritory.units],
                structures: [...targetTerritory.structures],
                revealedAt: newTurn,
                expiresAt: newTurn + SPY_REVEAL_DURATION,
              });

              // Integrar intel de espião na interface TerritoryIntel
              const spyWallLevel = targetTerritory.structures.find((s) => s.type === "WALL")?.level || 0;
              combatIntelUpdates.push({
                territoryId: exp.toTerritoryId,
                source: 'SPY',
                defensePower: getDefensePower(targetTerritory.units, spyWallLevel),
                revealedAt: newTurn,
                expiresAt: newTurn + SPY_REVEAL_DURATION,
              });

              // Criar expedição de retorno para o espião
              const returnTime = exp.totalTurns;
              updatedExpeditions.push({
                id: `spy-ret-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ownerId: exp.ownerId,
                ownerName: exp.ownerName,
                fromTerritoryId: exp.toTerritoryId,
                toTerritoryId: exp.fromTerritoryId,
                fromPosition: exp.toPosition,
                toPosition: exp.fromPosition,
                units: [{ type: "SPY", quantity: 1 }],
                carriedResources: { grain: 0, wood: 0, gold: 0 },
                turnsRemaining: returnTime,
                totalTurns: returnTime,
                departedTurn: newTurn,
                type: "RETURN_SPY",
              });

              expeditionEvents.push({
                turn: newTurn,
                message: `Espiao infiltrado com sucesso! Territorio ${targetTerritory.position + 1} revelado por ${SPY_REVEAL_DURATION} turnos.`,
                type: "success",
              });
            } else {
              // Falha: espião capturado
              expeditionEvents.push({
                turn: newTurn,
                message: `Espiao capturado no territorio ${targetTerritory.position + 1}! Missao fracassou.`,
                type: "danger",
              });
            }
          }
        } else if (exp.type === "RETURN_SPY") {
          // Espião retornando para casa
          returnedTroops.push({
            territoryId: exp.toTerritoryId,
            units: exp.units,
            resources: exp.carriedResources,
          });
          expeditionEvents.push({
            turn: newTurn,
            message: `Espiao retornou com informacoes do territorio inimigo.`,
            type: "info",
          });
        }
      } else {
        // Expedição ainda em trânsito
        updatedExpeditions.push({
          ...exp,
          turnsRemaining: newTurnsRemaining,
        });
      }
    }

    // Aplicar conquistas de territórios
    let updatedTerritories = [...state.territories];
    for (const conquest of conqueredTerritories) {
      updatedTerritories = updatedTerritories.map((t) =>
        t.id === conquest.id
          ? { ...t, ownerId: conquest.newOwnerId, ownerName: conquest.newOwnerName, units: [] }
          : t
      );
    }

    // Aplicar sabotagem: destruir primeira estrutura do território conquistado
    for (const targetId of sabotageTargets) {
      updatedTerritories = updatedTerritories.map((t) => {
        if (t.id !== targetId || t.structures.length === 0) return t;
        return { ...t, structures: t.structures.slice(1) };
      });
    }

    // Aplicar tropas retornando
    for (const returned of returnedTroops) {
      updatedTerritories = updatedTerritories.map((t) => {
        if (t.id !== returned.territoryId) return t;
        const newUnits = [...t.units];
        for (const unit of returned.units) {
          const existing = newUnits.find((u) => u.type === unit.type);
          if (existing) {
            existing.quantity += unit.quantity;
          } else {
            newUnits.push({ ...unit });
          }
        }
        return { ...t, units: newUnits };
      });
    }

    // Calcular recursos de saque a adicionar ao jogador
    let lootGrainTotal = 0, lootWoodTotal = 0, lootGoldTotal = 0;
    for (const returned of returnedTroops) {
      lootGrainTotal += returned.resources.grain;
      lootWoodTotal += returned.resources.wood;
      lootGoldTotal += returned.resources.gold;
    }

    // Atualizar clãs (remover saque dos inimigos)
    let updatedClans = [...state.clans];
    for (const loot of lootedClans) {
      updatedClans = updatedClans.map((c) =>
        c.id === loot.clanId
          ? {
              ...c,
              grain: Math.max(0, c.grain - loot.grain),
              wood: Math.max(0, c.wood - loot.wood),
              gold: Math.max(0, c.gold - loot.gold),
            }
          : c
      );
    }

    // Resolver ataques iminentes que chegam neste turno (F-058)
    const resolvedIncomingAttacks = state.incomingAttacks.filter((a) => a.arrivesTurn <= newTurn);
    for (const incoming of resolvedIncomingAttacks) {
      const targetTerritory = updatedTerritories.find((t) => t.id === incoming.targetTerritoryId);
      if (!targetTerritory || targetTerritory.ownerId !== "player") continue;

      const attackerClan = updatedClans.find((c) => c.id === incoming.sourceClanId);
      if (!attackerClan) continue;

      const attackerTerritories = updatedTerritories.filter((t) => t.ownerId === incoming.sourceClanId);
      const allAiUnits: Unit[] = attackerTerritories.flatMap((t) => t.units);
      const attackPower = getAttackPower(allAiUnits);
      const wallLevel = targetTerritory.structures.find((s) => s.type === "WALL")?.level || 0;
      const defensePower = getDefensePower(targetTerritory.units, wallLevel);

      if (attackPower > defensePower) {
        // Atacante vence: captura o território
        updatedTerritories = updatedTerritories.map((t) =>
          t.id === targetTerritory.id
            ? { ...t, ownerId: incoming.sourceClanId, ownerName: attackerClan.name, units: [] }
            : t
        );
        newEvents.push({
          turn: newTurn,
          message: `${attackerClan.name} atacou e conquistou Território ${targetTerritory.position + 1}!`,
          type: "danger",
          eventKind: "COMBAT",
          result: "defeat",
          attackerClanId: incoming.sourceClanId,
          attackerClanName: attackerClan.name,
          defenderClanId: "player",
          defenderClanName: "Voce",
          territoryId: targetTerritory.id,
          territoryName: `Territorio ${targetTerritory.position + 1}`,
          attackerLosses: 0,
          defenderLosses: targetTerritory.units.reduce((s, u) => s + u.quantity, 0),
          territoryConquered: true,
          isPlayerInvolved: true,
        } as GameEvent);
      } else {
        // Defensor vence: ataque repelido
        newEvents.push({
          turn: newTurn,
          message: `Ataque de ${attackerClan.name} repelido em Território ${targetTerritory.position + 1}!`,
          type: "warning",
          eventKind: "COMBAT",
          result: "victory",
          attackerClanId: incoming.sourceClanId,
          attackerClanName: attackerClan.name,
          defenderClanId: "player",
          defenderClanName: "Voce",
          territoryId: targetTerritory.id,
          territoryName: `Territorio ${targetTerritory.position + 1}`,
          attackerLosses: allAiUnits.reduce((s, u) => s + u.quantity, 0),
          defenderLosses: 0,
          territoryConquered: false,
          isPlayerInvolved: true,
        } as GameEvent);
      }
    }

    // F-063: Compute alliance health decay for TRUSTED alliances
    const updatedAllianceHealth = { ...state.allianceHealth };
    const playerAttackExpeditions = state.expeditions.filter((e) => e.ownerId === "player" && e.type === "ATTACK");
    ["ai1", "ai2", "ai3", "ai4"].forEach((aiId) => {
      if (state.diplomacy[aiId] !== "TRUSTED") return;
      const currentHealth = updatedAllianceHealth[aiId] ?? 100;
      const aiClan = updatedClans.find((c) => c.id === aiId);
      let decay = 5; // -5% natural decay
      // -10% extra if AI personality is HOSTILE (CONQUEROR or OPPORTUNIST)
      if (aiClan?.personality === "CONQUEROR" || aiClan?.personality === "OPPORTUNIST") {
        decay += 10;
      }
      // -20% if player has active attack expedition targeting territory adjacent to or owned by ally
      const allyTerritoryPositions = updatedTerritories
        .filter((t) => t.ownerId === aiId)
        .map((t) => t.position);
      const playerAttacksNearAlly = playerAttackExpeditions.some((e) => {
        const targetTerritory = updatedTerritories.find((t) => t.id === e.toTerritoryId);
        if (!targetTerritory) return false;
        return allyTerritoryPositions.some((pos) => {
          const adjacentToAlly = TERRITORY_ADJACENCY[pos] ?? [];
          return adjacentToAlly.includes(targetTerritory.position) || allyTerritoryPositions.includes(targetTerritory.position);
        });
      });
      if (playerAttacksNearAlly) {
        decay += 20;
      }
      updatedAllianceHealth[aiId] = Math.max(0, currentHealth - decay);
    });

    // IA faz acoes simples
    const { actions: aiActions, newIncomingAttacks, diplomacyBreaks } = processAI(
      updatedTerritories, updatedClans, newEra, newTurn,
      state.diplomacy, state.allianceTurnFormed, updatedAllianceHealth
    );

    aiActions.forEach((action) => {
      newEvents.push({ turn: newTurn, message: action.message, type: "warning", ...(action.combatData ?? {}) });
      if (action.territories) updatedTerritories = action.territories;
      if (action.clans) updatedClans = action.clans;
    });

    // F-059: Notificação de ataque iminente no log de eventos
    // Apenas para novos ataques (newIncomingAttacks) — garante evento 1 vez por ataque
    for (const attack of newIncomingAttacks) {
      const targetTerritory = updatedTerritories.find((t) => t.id === attack.targetTerritoryId);
      if (!targetTerritory || targetTerritory.ownerId !== "player") continue;

      // Verificar se espião ativo em algum território do clã atacante
      const revealedWithNew: Record<string, boolean> = {};
      for (const [tid, rev] of Object.entries(state.revealedTerritories) as [string, RevealedTerritory][]) {
        if (rev.expiresAt > newTurn) revealedWithNew[tid] = true;
      }
      for (const reveal of spyReveals) {
        revealedWithNew[reveal.territoryId] = true;
      }
      const spyActiveOnSourceClan = updatedTerritories.some(
        (t) => t.ownerId === attack.sourceClanId && revealedWithNew[t.id]
      );

      let attackMessage: string;
      if (spyActiveOnSourceClan) {
        const sourceClan = updatedClans.find((c) => c.id === attack.sourceClanId);
        attackMessage = `⚠ Expedição inimiga de ${sourceClan?.name ?? "clã desconhecido"} detectada se movendo em direção ao Território ${targetTerritory.position + 1}!`;
      } else {
        attackMessage = `⚠ Expedição inimiga detectada se movendo em direção ao Território ${targetTerritory.position + 1}!`;
      }

      newEvents.push({ turn: newTurn, message: attackMessage, type: "warning" });
    }

    // Horda na Era 3
    if (newEra === "INVASION" && newTurn % 3 === 0) {
      const hordaStrength = 50 + (newTurn - 36) * 20;

      // Encontra o clã-alvo: o com mais territórios
      const clanTerritoryCount: Record<string, { count: number; name: string }> = {};
      for (const t of updatedTerritories) {
        if (t.ownerId !== null) {
          if (!clanTerritoryCount[t.ownerId]) {
            clanTerritoryCount[t.ownerId] = { count: 0, name: t.ownerName };
          }
          clanTerritoryCount[t.ownerId].count++;
        }
      }
      let primaryTargetId: string | null = null;
      let primaryTargetName = "";
      let primaryTargetCount = 0;
      for (const [clanId, info] of Object.entries(clanTerritoryCount)) {
        if (info.count > primaryTargetCount) {
          primaryTargetCount = info.count;
          primaryTargetId = clanId;
          primaryTargetName = info.name;
        }
      }

      // Calcula defesa total do clã-alvo (todos os territórios)
      const primaryTerritories = updatedTerritories.filter((t) => t.ownerId === primaryTargetId);
      let primaryTotalDefense = 0;
      for (const t of primaryTerritories) {
        for (const u of t.units) {
          primaryTotalDefense += u.quantity * UNIT_STATS[u.type].def;
        }
      }

      const isPlayerTarget = primaryTargetId === "player";
      const hordaWins = hordaStrength > primaryTotalDefense;
      const resultLabel = hordaWins ? "DERROTADO" : "REPELIDO";
      // Find weakest territory of target clan (recalculated at T — consistent with HordaPreview logic)
      const weakestPrimaryTerritory = primaryTerritories.reduce<Territory | null>((weakest, t) => {
        const wall = t.structures.find((s) => s.type === "WALL");
        const def = getDefensePower(t.units, wall?.level ?? 0);
        if (!weakest) return t;
        const weakestWall = weakest.structures.find((s) => s.type === "WALL");
        const weakestDef = getDefensePower(weakest.units, weakestWall?.level ?? 0);
        if (def < weakestDef || (def === weakestDef && t.structures.length < weakest.structures.length)) return t;
        return weakest;
      }, null);
      const territoryLost = hordaWins ? (weakestPrimaryTerritory ?? primaryTerritories[0] ?? null) : null;
      const lossLabel = territoryLost ? ` / Perdeu: Território ${territoryLost.position + 1}` : "";
      const nextAttackTurn = newTurn + 3;
      const nextStrength = 50 + (nextAttackTurn - 36) * 20;
      const nextLabel = nextAttackTurn <= 50 ? ` / Próximo ataque: Turno ${nextAttackTurn} | Força: ${nextStrength}` : "";
      const targetLabel = isPlayerTarget ? "Seu clã" : primaryTargetName;

      const hordaMessage = primaryTargetId
        ? `☠ A Horda atacou! Força: ${hordaStrength} / Alvo: ${targetLabel} (${primaryTargetCount} territórios — o maior) / Defesa total: ${primaryTotalDefense} — ${resultLabel}${lossLabel}${nextLabel}`
        : `☠ A Horda atacou com força ${hordaStrength}!`;

      newEvents.push({
        turn: newTurn,
        message: hordaMessage,
        type: isPlayerTarget ? "danger" : "warning",
      });

      // Ataca todos os territorios
      updatedTerritories = updatedTerritories.map((t) => {
        if (t.ownerId === null) return t;

        let defense = 0;
        t.units.forEach((u) => {
          defense += u.quantity * UNIT_STATS[u.type].def;
        });

        if (defense < hordaStrength) {
          // Territorio perdido para a horda
          newEvents.push({
            turn: newTurn,
            message: `Território ${t.position + 1} (${t.ownerName}) foi destruído pela Horda!`,
            type: "danger",
          });
          return { ...t, ownerId: null, ownerName: "Destruido", units: [], structures: [] };
        } else {
          // Sobreviveu mas perdeu unidades
          const losses = Math.ceil(hordaStrength / 10);
          return {
            ...t,
            units: t.units
              .map((u) => ({ ...u, quantity: Math.max(0, u.quantity - losses) }))
              .filter((u) => u.quantity > 0),
          };
        }
      });
    }

    // Verifica game over
    const playerTerritories = updatedTerritories.filter((t) => t.ownerId === "player");
    if (playerTerritories.length === 0) {
      set({
        gameOver: true,
        winner: null,
        events: [{ turn: newTurn, message: "GAME OVER - Voce perdeu todos os territorios!", type: "danger" }, ...newEvents, ...state.events.slice(0, 5)],
      });
      return;
    }

    // Evento HINT no turno 3 se jogador não enviou expedições
    if (newTurn === 3) {
      const playerExpeditions = state.expeditions.filter((e) => e.ownerId === "player");
      if (playerExpeditions.length === 0) {
        newEvents.push({
          turn: newTurn,
          message: "Seus batedores reportam locais inexplorados no mapa. Envie tropas a um território neutro para iniciar uma Expedição.",
          type: "hint",
          eventKind: "HINT",
        });
      }
    }

    // F-060: Gerar eventos de quebra de aliança pela AI
    for (const { clanId } of diplomacyBreaks) {
      const brokenClan = updatedClans.find((c) => c.id === clanId);
      if (brokenClan) {
        newEvents.push({
          turn: newTurn,
          message: `${brokenClan.name} rompeu a aliança! Relação mudou para Neutro.`,
          type: "warning",
        } as GameEvent);
      }
    }

    // Combinar todos os eventos
    const allEvents = [...expeditionEvents, ...newEvents];

    // Atualizar cooldown dos sites explorados
    let updatedExplorationSites = [...state.explorationSites];
    for (const explored of exploredSites) {
      updatedExplorationSites = updatedExplorationSites.map((s) =>
        s.id === explored.siteId ? { ...s, lastExploredTurn: explored.turn } : s
      );
    }

    // Atualizar revealedTerritories: aplicar novas revelações e remover expiradas
    let updatedRevealedTerritories: Record<string, RevealedTerritory> = {};
    // Manter entradas não expiradas
    for (const [territoryId, revealed] of Object.entries(state.revealedTerritories) as [string, RevealedTerritory][]) {
      if (revealed.expiresAt > newTurn) {
        updatedRevealedTerritories[territoryId] = revealed;
      }
    }
    // Adicionar novas revelações
    for (const reveal of spyReveals) {
      updatedRevealedTerritories[reveal.territoryId] = {
        units: reveal.units,
        structures: reveal.structures,
        revealedAt: reveal.revealedAt,
        expiresAt: reveal.expiresAt,
      };
    }

    // F-068: Compute HordaPreview — show provisional target 1 turn before Horda attack (T-1 preview)
    const nextHordaTurn = newTurn + 1;
    let hordaPreview: HordaPreview | null = null;
    if (newEra === "INVASION" && nextHordaTurn % 3 === 0 && nextHordaTurn <= TOTAL_TURNS) {
      // Find target clan: most territories (alive)
      const clanTerritoryCount: Record<string, number> = {};
      for (const t of updatedTerritories) {
        if (t.ownerId !== null) {
          clanTerritoryCount[t.ownerId] = (clanTerritoryCount[t.ownerId] ?? 0) + 1;
        }
      }
      let targetClanId: string | null = null;
      let maxCount = 0;
      for (const [clanId, count] of Object.entries(clanTerritoryCount)) {
        if (count > maxCount) {
          maxCount = count;
          targetClanId = clanId;
        }
      }
      if (targetClanId) {
        const clanTerritories = updatedTerritories.filter((t) => t.ownerId === targetClanId);
        // Find territory with lowest defensePower (tie: fewer structures)
        let weakestTerritory: Territory | null = null;
        let weakestDefense = Infinity;
        let weakestStructureCount = Infinity;
        for (const t of clanTerritories) {
          const wall = t.structures.find((s) => s.type === "WALL");
          const wallLevel = wall?.level ?? 0;
          const defense = getDefensePower(t.units, wallLevel);
          if (
            defense < weakestDefense ||
            (defense === weakestDefense && t.structures.length < weakestStructureCount)
          ) {
            weakestDefense = defense;
            weakestStructureCount = t.structures.length;
            weakestTerritory = t;
          }
        }
        if (weakestTerritory) {
          const strength = 50 + (nextHordaTurn - 36) * 20;
          hordaPreview = {
            targetClanId,
            targetTerritoryId: weakestTerritory.id,
            arrivesTurn: nextHordaTurn,
            strength,
          };
        }
      }
    }

    // Atualizar territoryIntel: remover expiradas e adicionar novas
    const updatedTerritoryIntel: TerritoryIntel[] = [
      // Manter entradas não expiradas (excluindo territórios com nova intel)
      ...state.territoryIntel.filter(
        (intel) => intel.expiresAt > newTurn && !combatIntelUpdates.some((u) => u.territoryId === intel.territoryId)
      ),
      // Adicionar/substituir com nova intel de combate e espião
      ...combatIntelUpdates,
    ];

    // Atualiza estado
    set((state) => ({
      currentTurn: newTurn,
      currentEra: newEra,
      territories: updatedTerritories,
      clans: updatedClans.map((c) =>
        c.isPlayer
          ? {
              ...c,
              grain: c.grain + grainProd + lootGrainTotal,
              wood: c.wood + woodProd + lootWoodTotal,
              gold: c.gold + goldProd + lootGoldTotal,
            }
          : c
      ),
      expeditions: updatedExpeditions,
      explorationSites: updatedExplorationSites,
      revealedTerritories: updatedRevealedTerritories,
      territoryIntel: updatedTerritoryIntel,
      // Atualizar incomingAttacks: remover resolvidos/expirados, adicionar novos (F-058)
      incomingAttacks: [
        ...state.incomingAttacks.filter((a) => a.arrivesTurn > newTurn),
        ...newIncomingAttacks,
      ],
      // Reset market trades used at start of new turn (F-066)
      marketTradesUsed: [],
      // F-064: Set alliance break alerts for TipBanner (cleared each turn)
      allianceBreakAlerts: diplomacyBreaks.map(({ clanId }) => {
        const clan = updatedClans.find((c) => c.id === clanId);
        return { clanId, clanName: clan?.name ?? clanId };
      }),
      // F-068: Horda preview (null if not T-1 before attack)
      hordaPreview,
      // F-060: Apply diplomacy breaks from AI (TRUSTED → NEUTRAL)
      diplomacy: diplomacyBreaks.length > 0
        ? diplomacyBreaks.reduce(
            (d, { clanId, newRelation }) => ({ ...d, [clanId]: newRelation }),
            state.diplomacy
          )
        : state.diplomacy,
      allianceTurnFormed: diplomacyBreaks.length > 0
        ? (() => {
            const updated = { ...state.allianceTurnFormed };
            diplomacyBreaks.forEach(({ clanId }) => { delete updated[clanId]; });
            return updated;
          })()
        : state.allianceTurnFormed,
      // F-063: Update alliance health, clear on breaks
      allianceHealth: (() => {
        const h = { ...updatedAllianceHealth };
        diplomacyBreaks.forEach(({ clanId }) => { delete h[clanId]; });
        return h;
      })(),
      events: [...allEvents, ...state.events.slice(0, 10 - allEvents.length)],
    }));

    // Verifica vitoria
    if (newTurn >= TOTAL_TURNS) {
      set({
        gameOver: true,
        winner: "player",
        events: [{ turn: newTurn, message: "VITORIA! Voce sobreviveu ate o fim!", type: "success" }, ...get().events.slice(0, 9)],
      });
    }
  },

  resetGame: () => {
    set({
      currentTurn: 1,
      currentEra: "PEACE",
      territories: createInitialTerritories(),
      clans: createInitialClans(),
      events: [{ turn: 1, message: "Novo jogo iniciado!", type: "info" }],
      gameOver: false,
      winner: null,
      diplomacy: createInitialDiplomacy(),
      expeditions: [],
      explorationSites: createRandomExplorationSites(),
      timerPaused: false,
      timeRemaining: TURN_DURATION_MS,
      revealedTerritories: {},
      territoryIntel: [],
      incomingAttacks: [],
      invasionModalShown: false,
      marketTradesUsed: [],
      allianceTurnFormed: {},
      allianceHealth: {},
      allianceBreakAlerts: [],
      hordaPreview: null,
    });
  },

  markInvasionModalShown: () => {
    set({ invasionModalShown: true });
  },

  pauseTimer: () => {
    set({ timerPaused: true });
  },

  resumeTimer: () => {
    set({ timerPaused: false });
  },

  tickTimer: () => {
    const state = get();
    if (state.timerPaused || state.gameOver) return;
    if (state.timeRemaining <= 1000) {
      set({ timeRemaining: TURN_DURATION_MS });
      get().processTurn();
    } else {
      set({ timeRemaining: state.timeRemaining - 1000 });
    }
  },
}));

// IA simples
type AIAction = {
  message: string;
  territories?: Territory[];
  clans?: Clan[];
  combatData?: Omit<GameEvent, "turn" | "message" | "type">;
};

function processAI(
  territories: Territory[],
  clans: Clan[],
  era: Era,
  currentTurn: number,
  diplomacy: DiplomacyState = {},
  allianceTurnFormed: Record<string, number> = {},
  allianceHealth: Record<string, number> = {}
): { actions: AIAction[], newIncomingAttacks: IncomingAttack[], diplomacyBreaks: { clanId: string; newRelation: DiplomacyRelation }[] } {
  const actions: AIAction[] = [];
  const newIncomingAttacks: IncomingAttack[] = [];
  const diplomacyBreaks: { clanId: string; newRelation: DiplomacyRelation }[] = [];

  const aiIds = ["ai1", "ai2", "ai3", "ai4"];
  let updatedTerritories = [...territories];

  aiIds.forEach((aiId) => {
    const aiTerritories = updatedTerritories.filter((t) => t.ownerId === aiId);
    if (aiTerritories.length === 0) return;

    const clan = clans.find((c) => c.id === aiId);
    if (!clan) return;

    // IA constroi fazenda se nao tiver
    const mainTerritory = aiTerritories[0];
    if (!mainTerritory.structures.some((s) => s.type === "FARM") && mainTerritory.structures.length < 4) {
      updatedTerritories = updatedTerritories.map((t) =>
        t.id === mainTerritory.id
          ? { ...t, structures: [...t.structures, { id: `ai-s-${Date.now()}`, type: "FARM" as StructureType, level: 1 }] }
          : t
      );
      actions.push({ message: `${clan.name} construiu uma Fazenda` });
    }

    // IA treina soldados
    if (mainTerritory.structures.some((s) => s.type === "BARRACKS") || Math.random() > 0.7) {
      const soldiers = mainTerritory.units.find((u) => u.type === "SOLDIER");
      if (!soldiers || soldiers.quantity < 20) {
        updatedTerritories = updatedTerritories.map((t) => {
          if (t.id !== mainTerritory.id) return t;
          const existing = t.units.find((u) => u.type === "SOLDIER");
          if (existing) {
            return { ...t, units: t.units.map((u) => (u.type === "SOLDIER" ? { ...u, quantity: u.quantity + 3 } : u)) };
          }
          return { ...t, units: [...t.units, { type: "SOLDIER" as UnitType, quantity: 3 }] };
        });
        actions.push({ message: `${clan.name} treinou soldados` });
      }
    }

    // F-062: Calcular relação com jogador antes dos blocos de ataque
    const relationWithPlayer = diplomacy[aiId] ?? "NEUTRAL";

    // IA ataca na era de guerra — F-062: HOSTILE pula neutros para focar no jogador
    if (era === "WAR" && Math.random() > 0.6 && relationWithPlayer !== "HOSTILE") {
      const neutralTerritories = updatedTerritories.filter((t) => t.ownerId === null);
      if (neutralTerritories.length > 0) {
        const target = neutralTerritories[Math.floor(Math.random() * neutralTerritories.length)];
        updatedTerritories = updatedTerritories.map((t) =>
          t.id === target.id ? { ...t, ownerId: aiId, ownerName: clan.name } : t
        );
        actions.push({
          message: `${clan.name} conquistou territorio ${target.position + 1}!`,
          combatData: {
            eventKind: "COMBAT",
            result: "victory",
            attackerClanId: aiId,
            attackerClanName: clan.name,
            defenderClanId: target.ownerId ?? "neutral",
            defenderClanName: target.ownerName,
            territoryId: target.id,
            territoryName: `Territorio ${target.position + 1}`,
            attackerLosses: 0,
            defenderLosses: target.units.reduce((s, u) => s + u.quantity, 0),
            territoryConquered: true,
            isPlayerInvolved: false,
          },
        });
      }
    }

    // F-060: Pacto de não-agressão — verificar relação com jogador
    const allianceTurn = allianceTurnFormed[aiId] ?? 0;
    const turnsSinceAlliance = currentTurn - allianceTurn;

    if (relationWithPlayer === "TRUSTED") {
      // Dentro dos primeiros 5 turnos: não ataca o jogador
      if (turnsSinceAlliance <= 5) {
        // Pacto ativo — pula ataque ao jogador
      } else {
        // Após 5 turnos: chance de quebrar aliança baseada em personalidade e saúde
        const baseBreakChance = clan.personality === "CONQUEROR" ? 0.20
          : clan.personality === "OPPORTUNIST" ? 0.15
          : clan.personality === "DEFENDER" ? 0.05
          : 0.03; // MERCHANT
        // F-063: When health < 30%, AI can break the alliance more easily
        const health = allianceHealth[aiId] ?? 100;
        const breakChance = health < 30 ? Math.min(0.90, baseBreakChance * 4) : baseBreakChance;

        if (Math.random() < breakChance) {
          diplomacyBreaks.push({ clanId: aiId, newRelation: "NEUTRAL" });
          // Quebrou aliança — pode atacar este turno ainda (vai cair no bloco abaixo sem TRUSTED)
        }
      }
    }

    // Verificar relação atualizada (pode ter quebrado acima)
    const updatedRelation = diplomacyBreaks.some((b) => b.clanId === aiId) ? "NEUTRAL" : relationWithPlayer;

    // IA telegrafar ataque contra território do jogador (F-058)
    // Normal: WAR=25%, INVASION=35%. F-062 HOSTILE: +50% relativo → WAR=37.5%, INVASION=52.5%
    // F-062: HOSTILE também ataca na era de Paz (20%) — comportamento perceptível
    // F-060: Não ataca jogador se aliança ativa (TRUSTED e sem quebra)
    const isHostile = updatedRelation === "HOSTILE";
    const basePlayerAttackProb = era === "INVASION" ? 0.35 : era === "WAR" ? 0.25 : 0;
    const playerAttackProb = isHostile
      ? (era === "PEACE" ? 0.20 : basePlayerAttackProb * 1.5)
      : basePlayerAttackProb;
    const canAttackPlayer = isHostile
      ? (era === "WAR" || era === "INVASION" || era === "PEACE")
      : (era === "WAR" || era === "INVASION");
    if (canAttackPlayer && Math.random() < playerAttackProb && updatedRelation !== "TRUSTED") {
      const playerTerritories = updatedTerritories.filter((t) => t.ownerId === "player");
      // Só atacar se AI tem soldados suficientes
      const aiSoldiers = aiTerritories.reduce((sum, t) => sum + t.units.reduce((s, u) => u.type === "SOLDIER" ? s + u.quantity : s, 0), 0);
      if (playerTerritories.length > 0 && aiSoldiers >= 5) {
        const target = playerTerritories[Math.floor(Math.random() * playerTerritories.length)];
        // Não telegrafar se já há ataque pendente para este território
        const alreadyPending = newIncomingAttacks.some((a) => a.targetTerritoryId === target.id);
        if (!alreadyPending) {
          // Calcular poder de ataque real para fog of war / classifyThreat (F-095)
          const allAiUnits = aiTerritories.flatMap((t) => t.units);
          const aiAttackPower = getAttackPower(allAiUnits);
          newIncomingAttacks.push({
            targetTerritoryId: target.id,
            sourceClanId: aiId,
            arrivesTurn: currentTurn + 1,
            attackPower: aiAttackPower,
          });
        }
      }
    }
  });

  if (actions.length > 0) {
    actions[actions.length - 1].territories = updatedTerritories;
  }

  return { actions, newIncomingAttacks, diplomacyBreaks };
}

// ─── F-044: Agregação de estatísticas da partida ─────────────────────────────

export interface EpicMoment {
  turn: number;
  territoryName: string;
  attackerName: string;
  defenderName: string;
  result: "victory" | "defeat" | "draw";
  attackerLosses: number;
  defenderLosses: number;
  message: string;
  powerScore: number; // defenderLosses + attackerLosses — proxy de impacto
}

export interface GameStats {
  turnsPlayed: number;
  territoriesCaptured: number;
  territoriesLost: number;
  battlesWon: number;
  battlesTotal: number;
  structuresBuilt: number;
  unitsTrained: number;
  cardsUsed: number;
  totalCards: number;
  hordeRepelled: number;
  epicMoment: EpicMoment | null;
}

export function getGameStats(events: GameEvent[], playerCards?: PlayerCard[]): GameStats {
  let turnsPlayed = 0;
  let territoriesCaptured = 0;
  let territoriesLost = 0;
  let battlesWon = 0;
  let battlesTotal = 0;
  let structuresBuilt = 0;
  let unitsTrained = 0;
  let cardsUsed = playerCards ? playerCards.filter((c) => c.used).length : 0;
  const totalCards = playerCards ? playerCards.length : 0;
  let hordeRepelled = 0;

  const playerVictories: EpicMoment[] = [];
  const playerDefeats: EpicMoment[] = [];

  for (const ev of events) {
    // turnsPlayed: max turn seen
    if (ev.turn > turnsPlayed) turnsPlayed = ev.turn;

    // Estruturas construídas: evento gerado por build action
    if (ev.message.includes("Construiu ")) {
      structuresBuilt += 1;
    }

    // Unidades treinadas: "Treinou Nx TIPO"
    const trainMatch = ev.message.match(/^Treinou (\d+)x /);
    if (trainMatch) {
      unitsTrained += parseInt(trainMatch[1], 10);
    }

    // Horda: cada evento de ataque da Horda = 1 ataque (repelido ou derrotado)
    if (ev.message.includes("A Horda atacou")) {
      hordeRepelled += 1;
    }

    // Cartas usadas: SABOTAGE deixa marca na mensagem (fallback quando playerCards não disponível)
    if (!playerCards && ev.message.includes("Sabotagem:")) {
      cardsUsed += 1;
    }

    // Eventos de combate do jogador
    if (ev.eventKind === "COMBAT" && ev.isPlayerInvolved) {
      battlesTotal += 1;

      const atkLosses = ev.attackerLosses ?? 0;
      const defLosses = ev.defenderLosses ?? 0;
      const powerScore = atkLosses + defLosses;

      if (ev.result === "victory" && ev.attackerClanId === "player") {
        battlesWon += 1;
        if (ev.territoryConquered) territoriesCaptured += 1;

        playerVictories.push({
          turn: ev.turn,
          territoryName: ev.territoryName ?? "Território desconhecido",
          attackerName: ev.attackerClanName ?? "Você",
          defenderName: ev.defenderClanName ?? "Inimigo",
          result: "victory",
          attackerLosses: atkLosses,
          defenderLosses: defLosses,
          message: ev.message,
          powerScore,
        });
      } else if (ev.result === "defeat" && ev.attackerClanId === "player") {
        playerDefeats.push({
          turn: ev.turn,
          territoryName: ev.territoryName ?? "Território desconhecido",
          attackerName: ev.attackerClanName ?? "Você",
          defenderName: ev.defenderClanName ?? "Inimigo",
          result: "defeat",
          attackerLosses: atkLosses,
          defenderLosses: defLosses,
          message: ev.message,
          powerScore,
        });
      } else if (ev.result === "victory" && ev.defenderClanId === "player" && ev.territoryConquered) {
        // Inimigo atacou e conquistou território do jogador
        territoriesLost += 1;
      }
    }
  }

  // Momento épico: preferir vitória com maior powerScore; fallback para derrota mais dramática
  let epicMoment: EpicMoment | null = null;
  if (playerVictories.length > 0) {
    epicMoment = playerVictories.reduce((best, cur) =>
      cur.powerScore > best.powerScore ? cur : best
    );
  } else if (playerDefeats.length > 0) {
    // Derrota mais dramática = menor margem (menor defenderLosses, i.e., quase venceu)
    epicMoment = playerDefeats.reduce((best, cur) =>
      cur.defenderLosses < best.defenderLosses ? cur : best
    );
  }

  return {
    turnsPlayed,
    territoriesCaptured,
    territoriesLost,
    battlesWon,
    battlesTotal,
    structuresBuilt,
    unitsTrained,
    cardsUsed,
    totalCards,
    hordeRepelled,
    epicMoment,
  };
}
