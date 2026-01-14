import { create } from "zustand";

// Tipos
export type Era = "PEACE" | "WAR" | "INVASION";
export type ResourceType = "GRAIN" | "WOOD" | "GOLD";
export type StructureType = "FARM" | "SAWMILL" | "MINE" | "BARRACKS" | "STABLE" | "WALL";
export type UnitType = "SOLDIER" | "ARCHER" | "KNIGHT";
export type DiplomacyRelation = "TRUSTED" | "NEUTRAL" | "HOSTILE";
export type AIPersonality = "CONQUEROR" | "DEFENDER" | "OPPORTUNIST" | "MERCHANT";
export type ClanOrigin = "FERRONATOS" | "VERDANEOS" | "UMBRAL";
export type ExpeditionType = "ATTACK" | "EXPLORE" | "RETURN_VICTORY" | "RETURN_DEFEAT" | "RETURN_EXPLORE" | "REINFORCE";

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
  type: "info" | "success" | "warning" | "danger";
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
}

// Constantes
export const TURN_INTERVAL_MS = 10 * 1000; // 10 segundos para teste
export const TOTAL_TURNS = 50;

export const STRUCTURE_COSTS: Record<StructureType, { grain?: number; wood?: number; gold?: number }> = {
  FARM: { wood: 20, gold: 10 },
  SAWMILL: { grain: 15, gold: 10 },
  MINE: { grain: 20, wood: 20 },
  BARRACKS: { grain: 30, wood: 40 },
  STABLE: { grain: 50, wood: 60, gold: 30 },
  WALL: { wood: 50, gold: 20 },
};

export const STRUCTURE_PRODUCTION: Record<StructureType, { resource?: ResourceType; amount?: number }> = {
  FARM: { resource: "GRAIN", amount: 10 },
  SAWMILL: { resource: "WOOD", amount: 8 },
  MINE: { resource: "GOLD", amount: 5 },
  BARRACKS: {},
  STABLE: {},
  WALL: {},
};

export const UNIT_COSTS: Record<UnitType, { grain?: number; wood?: number; gold?: number }> = {
  SOLDIER: { grain: 10, gold: 5 },
  ARCHER: { grain: 8, wood: 5, gold: 8 },
  KNIGHT: { grain: 20, gold: 25 },
};

export const UNIT_STATS: Record<UnitType, { atk: number; def: number; speed: number; carryCapacity: number }> = {
  SOLDIER: { atk: 10, def: 8, speed: 1, carryCapacity: 20 },
  ARCHER: { atk: 12, def: 5, speed: 1, carryCapacity: 10 },
  KNIGHT: { atk: 20, def: 15, speed: 2, carryCapacity: 30 },
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

  // Acoes
  build: (territoryId: string, structureType: StructureType) => boolean;
  train: (territoryId: string, unitType: UnitType, quantity: number) => boolean;
  sendExpedition: (
    fromTerritoryId: string,
    toTerritoryId: string,
    units: { type: UnitType; quantity: number }[]
  ) => { success: boolean; message: string; expeditionId?: string };
  cancelExpedition: (expeditionId: string) => { success: boolean; message: string };
  declareWar: (clanId: string) => { success: boolean; message: string };
  proposePeace: (clanId: string) => { success: boolean; message: string };
  sendExploration: (
    fromTerritoryId: string,
    siteId: string,
    units: { type: UnitType; quantity: number }[]
  ) => { success: boolean; message: string; expeditionId?: string };
  processTurn: () => void;
  resetGame: () => void;
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

  build: (territoryId, structureType) => {
    const state = get();
    const territory = state.territories.find((t) => t.id === territoryId);

    if (!territory || territory.ownerId !== "player") return false;
    if (territory.structures.length >= 4) return false;
    if (territory.structures.some((s) => s.type === structureType)) return false;

    const cost = STRUCTURE_COSTS[structureType];
    if (!state.canAfford(cost)) return false;

    set((state) => ({
      clans: state.clans.map((c) =>
        c.isPlayer
          ? {
              ...c,
              grain: c.grain - (cost.grain || 0),
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

    // Verifica se tem quartel/estabulo
    const hasBarracks = territory.structures.some((s) => s.type === "BARRACKS");
    const hasStable = territory.structures.some((s) => s.type === "STABLE");

    if (unitType === "KNIGHT" && !hasStable) return false;
    if ((unitType === "SOLDIER" || unitType === "ARCHER") && !hasBarracks) return false;

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

  sendExpedition: (fromTerritoryId, toTerritoryId, units) => {
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

  processTurn: () => {
    const state = get();

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
    const exploredSites: { siteId: string; turn: number }[] = [];

    for (const exp of state.expeditions) {
      const newTurnsRemaining = exp.turnsRemaining - 1;

      if (newTurnsRemaining <= 0) {
        // Expedição chegou ao destino!
        if (exp.type === "ATTACK") {
          // Executar combate
          const targetTerritory = state.territories.find((t) => t.id === exp.toTerritoryId);
          if (targetTerritory) {
            const attackPower = getAttackPower(exp.units);
            const wallLevel = targetTerritory.structures.find((s) => s.type === "WALL")?.level || 0;
            const defensePower = getDefensePower(targetTerritory.units, wallLevel);

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

              expeditionEvents.push({
                turn: newTurn,
                message: `VITORIA! Territorio ${targetTerritory.position + 1} conquistado! Tropas retornando com saque.`,
                type: "success",
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

              expeditionEvents.push({
                turn: newTurn,
                message: `DERROTA! Ataque ao territorio ${targetTerritory.position + 1} falhou! Sobreviventes em fuga.`,
                type: "danger",
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

    // IA faz acoes simples
    const aiActions = processAI(updatedTerritories, updatedClans, newEra);

    aiActions.forEach((action) => {
      newEvents.push({ turn: newTurn, message: action.message, type: "warning" });
      if (action.territories) updatedTerritories = action.territories;
      if (action.clans) updatedClans = action.clans;
    });

    // Horda na Era 3
    if (newEra === "INVASION" && newTurn % 3 === 0) {
      const hordaStrength = 50 + (newTurn - 36) * 20;
      newEvents.push({
        turn: newTurn,
        message: `A HORDA ATACA com forca ${hordaStrength}!`,
        type: "danger",
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
            message: `Territorio ${t.position + 1} (${t.ownerName}) foi destruido pela Horda!`,
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

    // Combinar todos os eventos
    const allEvents = [...expeditionEvents, ...newEvents];

    // Atualizar cooldown dos sites explorados
    let updatedExplorationSites = [...state.explorationSites];
    for (const explored of exploredSites) {
      updatedExplorationSites = updatedExplorationSites.map((s) =>
        s.id === explored.siteId ? { ...s, lastExploredTurn: explored.turn } : s
      );
    }

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
    });
  },
}));

// IA simples
function processAI(territories: Territory[], clans: Clan[], era: Era) {
  const actions: { message: string; territories?: Territory[]; clans?: Clan[] }[] = [];

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

    // IA ataca na era de guerra
    if (era === "WAR" && Math.random() > 0.6) {
      const neutralTerritories = updatedTerritories.filter((t) => t.ownerId === null);
      if (neutralTerritories.length > 0) {
        const target = neutralTerritories[Math.floor(Math.random() * neutralTerritories.length)];
        updatedTerritories = updatedTerritories.map((t) =>
          t.id === target.id ? { ...t, ownerId: aiId, ownerName: clan.name } : t
        );
        actions.push({ message: `${clan.name} conquistou territorio ${target.position + 1}!` });
      }
    }
  });

  if (actions.length > 0) {
    actions[actions.length - 1].territories = updatedTerritories;
  }

  return actions;
}
