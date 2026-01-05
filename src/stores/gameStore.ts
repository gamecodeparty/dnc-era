import { create } from "zustand";

// Tipos
export type Era = "PEACE" | "WAR" | "INVASION";
export type ResourceType = "GRAIN" | "WOOD" | "GOLD";
export type StructureType = "FARM" | "SAWMILL" | "MINE" | "BARRACKS" | "STABLE" | "WALL";
export type UnitType = "SOLDIER" | "ARCHER" | "KNIGHT";

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
}

export interface GameEvent {
  turn: number;
  message: string;
  type: "info" | "success" | "warning" | "danger";
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

export const UNIT_STATS: Record<UnitType, { atk: number; def: number }> = {
  SOLDIER: { atk: 10, def: 8 },
  ARCHER: { atk: 12, def: 5 },
  KNIGHT: { atk: 20, def: 15 },
};

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
    { id: "player", name: "Voce", isPlayer: true, grain: 100, wood: 50, gold: 30 },
    { id: "ai1", name: "Cla do Norte", isPlayer: false, grain: 100, wood: 50, gold: 30 },
    { id: "ai2", name: "Cla do Sul", isPlayer: false, grain: 100, wood: 50, gold: 30 },
    { id: "ai3", name: "Cla do Leste", isPlayer: false, grain: 100, wood: 50, gold: 30 },
    { id: "ai4", name: "Cla do Oeste", isPlayer: false, grain: 100, wood: 50, gold: 30 },
  ];
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

  // Getters
  getPlayerClan: () => Clan;
  getPlayerTerritories: () => Territory[];
  getTerritory: (id: string) => Territory | undefined;
  canAfford: (costs: { grain?: number; wood?: number; gold?: number }) => boolean;

  // Acoes
  build: (territoryId: string, structureType: StructureType) => boolean;
  train: (territoryId: string, unitType: UnitType, quantity: number) => boolean;
  attack: (fromTerritoryId: string, toTerritoryId: string) => { success: boolean; message: string };
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

  attack: (fromTerritoryId, toTerritoryId) => {
    const state = get();

    if (state.currentEra === "PEACE") {
      return { success: false, message: "Ataques bloqueados na Era da Paz!" };
    }

    const from = state.territories.find((t) => t.id === fromTerritoryId);
    const to = state.territories.find((t) => t.id === toTerritoryId);

    if (!from || !to) return { success: false, message: "Territorio invalido" };
    if (from.ownerId !== "player") return { success: false, message: "Voce so pode atacar de seus territorios" };
    if (to.ownerId === "player") return { success: false, message: "Nao pode atacar a si mesmo" };

    // Calcula poder de ataque
    let attackPower = 0;
    from.units.forEach((u) => {
      attackPower += u.quantity * UNIT_STATS[u.type].atk;
    });

    // Calcula poder de defesa
    let defensePower = 0;
    to.units.forEach((u) => {
      defensePower += u.quantity * UNIT_STATS[u.type].def;
    });

    // Bonus de muralha
    const wallLevel = to.structures.find((s) => s.type === "WALL")?.level || 0;
    defensePower *= 1 + wallLevel * 0.2;

    if (attackPower <= 0) {
      return { success: false, message: "Sem unidades para atacar!" };
    }

    const victory = attackPower > defensePower;

    if (victory) {
      // Conquista territorio
      set((state) => ({
        territories: state.territories.map((t) => {
          if (t.id === fromTerritoryId) {
            // Perde metade das unidades
            return {
              ...t,
              units: t.units.map((u) => ({ ...u, quantity: Math.ceil(u.quantity / 2) })),
            };
          }
          if (t.id === toTerritoryId) {
            // Conquista
            return {
              ...t,
              ownerId: "player",
              ownerName: "Voce",
              units: [],
            };
          }
          return t;
        }),
        events: [
          { turn: state.currentTurn, message: `VITORIA! Conquistou territorio ${to.position + 1}!`, type: "success" as const },
          ...state.events.slice(0, 9),
        ],
      }));
      return { success: true, message: `Vitoria! Territorio ${to.position + 1} conquistado!` };
    } else {
      // Derrota - perde unidades
      set((state) => ({
        territories: state.territories.map((t) => {
          if (t.id === fromTerritoryId) {
            return {
              ...t,
              units: t.units.map((u) => ({ ...u, quantity: Math.floor(u.quantity / 3) })).filter((u) => u.quantity > 0),
            };
          }
          return t;
        }),
        events: [
          { turn: state.currentTurn, message: `DERROTA! Ataque ao territorio ${to.position + 1} falhou!`, type: "danger" as const },
          ...state.events.slice(0, 9),
        ],
      }));
      return { success: false, message: `Derrota! Defesa muito forte.` };
    }
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

    // IA faz acoes simples
    const aiActions = processAI(state.territories, state.clans, newEra);
    let updatedTerritories = [...state.territories];
    let updatedClans = [...state.clans];

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

    // Atualiza estado
    set((state) => ({
      currentTurn: newTurn,
      currentEra: newEra,
      territories: updatedTerritories,
      clans: updatedClans.map((c) =>
        c.isPlayer
          ? {
              ...c,
              grain: c.grain + grainProd,
              wood: c.wood + woodProd,
              gold: c.gold + goldProd,
            }
          : c
      ),
      events: [...newEvents, ...state.events.slice(0, 10 - newEvents.length)],
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
