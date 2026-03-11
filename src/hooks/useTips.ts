"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGameStore,
  type Era,
  type Territory,
  type Clan,
  type Expedition,
  type PlayerCard,
} from "@/stores/gameStore";
import { PRODUCTION_PER_LEVEL } from "@/game/constants/balance";

interface AllianceBreakAlert {
  clanId: string;
  clanName: string;
}

const DISMISSED_TIPS_KEY = "dnc-dismissed-tips";

export interface Tip {
  id: string;
  message: string;
  icon: string;
}

interface TipDefinition {
  id: string;
  message: string;
  icon: string;
  trigger: (state: {
    currentTurn: number;
    currentEra: string;
    playerStructureTypes: Set<string>;
    playerGold: number;
    playerTotalUnits: number;
    playerTerritoriesWithUnits: number;
    playerCards: { used: boolean }[];
    hasUsedCard: boolean;
    hasActiveReinforcement: boolean;
    playerGrainProduction: number;
    playerWoodProduction: number;
    playerGoldProduction: number;
    playerOrigin: string | undefined;
  }) => boolean;
}

const TIP_DEFINITIONS: TipDefinition[] = [
  {
    id: "tip-11-umbral-economy",
    icon: "💡",
    message:
      "**Dica Umbral:** Sua facção brilha com espiões, mas espiões custam ouro. Construa uma **Fazenda** e **Mina** antes da Guilda das Sombras para garantir renda.",
    trigger: ({ currentTurn, playerOrigin }) =>
      currentTurn === 1 && playerOrigin === "UMBRAL",
  },
  {
    id: "tip-08-zero-production",
    icon: "🚨",
    message:
      "🚨 Produção zerada! Você não está gerando nenhum recurso. Construa Farm (grão), Sawmill (madeira) ou Mine (ouro) para sair do deadlock.",
    trigger: ({ currentTurn, playerGrainProduction, playerWoodProduction, playerGoldProduction }) =>
      currentTurn >= 3 &&
      playerGrainProduction === 0 &&
      playerWoodProduction === 0 &&
      playerGoldProduction === 0,
  },
  {
    id: "tip-07-deadlock-warning",
    icon: "⚠",
    message:
      "⚠ Atenção: você não tem estruturas de produção! Sem Farm, Sawmill ou Mine, seus recursos não vão crescer. Construa uma estrutura produtiva o quanto antes.",
    trigger: ({ currentTurn, playerStructureTypes }) =>
      currentTurn >= 1 &&
      currentTurn <= 5 &&
      playerStructureTypes.size > 0 &&
      !playerStructureTypes.has("FARM") &&
      !playerStructureTypes.has("SAWMILL") &&
      !playerStructureTypes.has("MINE"),
  },
  {
    id: "tip-01-build-farm",
    icon: "🌾",
    message:
      "Boa primeira jogada: construa uma **Farm** para gerar grão. Clique num território seu para ver opções.",
    trigger: ({ currentTurn, playerStructureTypes }) =>
      currentTurn === 1 && playerStructureTypes.size === 0,
  },
  {
    id: "tip-02-build-mine",
    icon: "⛏️",
    message:
      "Construa uma **Mine** o quanto antes! Ouro é o recurso mais escasso e necessário para quase tudo.",
    trigger: ({ currentTurn, playerStructureTypes, playerGold }) =>
      currentTurn >= 2 &&
      currentTurn <= 3 &&
      !playerStructureTypes.has("MINE") &&
      playerGold < 20,
  },
  {
    id: "tip-03-train-units",
    icon: "⚔️",
    message:
      "Você tem um Quartel! Treine soldados para defender seus territórios e expandir na Era da Guerra.",
    trigger: ({ currentTurn, playerStructureTypes, playerTotalUnits }) =>
      currentTurn >= 3 &&
      currentTurn <= 4 &&
      playerStructureTypes.has("BARRACKS") &&
      playerTotalUnits === 0,
  },
  {
    id: "tip-04-reinforce",
    icon: "🛡️",
    message:
      "Sabia que pode **mover tropas** entre seus territórios? Use a opção 'Reforçar' no menu de expedição.",
    trigger: ({ playerTerritoriesWithUnits, hasActiveReinforcement }) =>
      playerTerritoriesWithUnits >= 2 && !hasActiveReinforcement,
  },
  {
    id: "tip-05-war-coming",
    icon: "⚠️",
    message:
      "A Era da Guerra começa no turno 16! Certifique-se de ter tropas para defender e atacar.",
    trigger: ({ currentTurn, currentEra }) =>
      currentTurn >= 13 && currentTurn <= 14 && currentEra === "PEACE",
  },
  {
    id: "tip-09-cards-intro",
    icon: "🃏",
    message:
      "🃏 Você tem cartas na mão! Cartas dão vantagem em batalha — use ao enviar expedições de ataque. Toque no ícone de cartas para ver suas opções.",
    trigger: ({ currentTurn, playerCards, hasUsedCard }) =>
      currentTurn >= 3 &&
      currentTurn <= 5 &&
      playerCards.length > 0 &&
      !hasUsedCard,
  },
  {
    id: "tip-10-cards-reminder",
    icon: "🃏",
    message:
      "🃏 Você tem cartas acumuladas sem uso! Use-as em expedições para vantagem estratégica.",
    trigger: ({ currentTurn, playerCards, hasUsedCard }) =>
      currentTurn >= 10 && playerCards.length >= 3 && !hasUsedCard,
  },
  {
    id: "tip-06-cards",
    icon: "🃏",
    message:
      "Você tem cartas! Use-as ao enviar expedições de ataque para vantagem extra.",
    trigger: ({ playerCards }) =>
      playerCards.length > 0 && playerCards.every((c) => !c.used),
  },
];

function loadDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(DISMISSED_TIPS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set<string>(parsed);
  } catch {
    // ignore parse errors
  }
  return new Set();
}

function saveDismissed(ids: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DISMISSED_TIPS_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore storage errors
  }
}

export function useTips(): { currentTip: Tip | null; dismissTip: (id: string) => void } {
  const [dismissed, setDismissed] = useState<Set<string>>(() => loadDismissed());

  // Load from localStorage on mount (handles SSR hydration)
  useEffect(() => {
    setDismissed(loadDismissed());
  }, []);

  const currentTurn = useGameStore((s: { currentTurn: number }) => s.currentTurn);
  const currentEra = useGameStore((s: { currentEra: Era }) => s.currentEra);
  const territories = useGameStore((s: { territories: Territory[] }) => s.territories);
  const clans = useGameStore((s: { clans: Clan[] }) => s.clans);
  const expeditions = useGameStore((s: { expeditions: Expedition[] }) => s.expeditions);
  const playerCards = useGameStore((s: { playerCards: PlayerCard[] }) => s.playerCards);
  const allianceBreakAlerts = useGameStore(
    (s: { allianceBreakAlerts: AllianceBreakAlert[] }) => s.allianceBreakAlerts
  );

  // Auto-dismiss tip-04 when player completes a REINFORCE expedition
  const prevHasReinforcement = useRef(false);
  const hasActiveReinforcement = useMemo(
    () => expeditions.some((e: Expedition) => e.ownerId === "player" && e.type === "REINFORCE"),
    [expeditions]
  );

  useEffect(() => {
    if (!prevHasReinforcement.current && hasActiveReinforcement) {
      // Player just started a REINFORCE — auto-dismiss the tip
      setDismissed((prev) => {
        const next = new Set(prev);
        next.add("tip-04-reinforce");
        saveDismissed(next);
        return next;
      });
    }
    prevHasReinforcement.current = hasActiveReinforcement;
  }, [hasActiveReinforcement]);

  // Auto-dismiss card tips when any card is used
  const anyCardUsed = useMemo(() => playerCards.some((c: PlayerCard) => c.used), [playerCards]);
  useEffect(() => {
    if (anyCardUsed) {
      setDismissed((prev) => {
        const toAdd = ["tip-06-cards", "tip-09-cards-intro", "tip-10-cards-reminder"].filter(
          (id) => !prev.has(id)
        );
        if (toAdd.length === 0) return prev;
        const next = new Set(prev);
        for (const id of toAdd) next.add(id);
        saveDismissed(next);
        return next;
      });
    }
  }, [anyCardUsed]);

  const triggerState = useMemo(() => {
    const playerClan = clans.find((c: Clan) => c.isPlayer);
    const playerTerritories = territories.filter((t: Territory) => t.ownerId === "player");

    const playerStructureTypes = new Set<string>();
    for (const t of playerTerritories) {
      for (const s of t.structures) {
        playerStructureTypes.add(s.type);
      }
    }

    let playerTotalUnits = 0;
    let playerTerritoriesWithUnits = 0;
    for (const t of playerTerritories) {
      const territoryTotal = t.units.reduce((sum: number, u: { quantity: number }) => sum + u.quantity, 0);
      playerTotalUnits += territoryTotal;
      if (territoryTotal > 0) playerTerritoriesWithUnits++;
    }

    let playerGrainProduction = 0;
    let playerWoodProduction = 0;
    let playerGoldProduction = 0;
    for (const t of playerTerritories) {
      for (const s of t.structures) {
        const level = s.level - 1; // 0-indexed
        if (s.type === "FARM") {
          playerGrainProduction += PRODUCTION_PER_LEVEL.FARM[level] ?? 0;
        } else if (s.type === "SAWMILL") {
          playerWoodProduction += PRODUCTION_PER_LEVEL.SAWMILL[level] ?? 0;
        } else if (s.type === "MINE") {
          playerGoldProduction += PRODUCTION_PER_LEVEL.MINE[level] ?? 0;
        }
      }
    }

    const hasUsedCard = playerCards.some((c: PlayerCard) => c.used);

    return {
      currentTurn,
      currentEra,
      playerStructureTypes,
      playerGold: playerClan?.gold ?? 0,
      playerTotalUnits,
      playerTerritoriesWithUnits,
      playerCards,
      hasUsedCard,
      hasActiveReinforcement,
      playerGrainProduction,
      playerWoodProduction,
      playerGoldProduction,
      playerOrigin: playerClan?.origin,
    };
  }, [currentTurn, currentEra, territories, clans, playerCards, hasActiveReinforcement]);

  const currentTip = useMemo<Tip | null>(() => {
    // F-064: Alliance break alerts have highest priority
    for (const alert of allianceBreakAlerts) {
      const tipId = `tip-alliance-break-${alert.clanId}-${currentTurn}`;
      if (!dismissed.has(tipId)) {
        return {
          id: tipId,
          icon: "⚠️",
          message: `Aliança rompida — seus territórios perto de **${alert.clanName}** estão vulneráveis`,
        };
      }
    }
    for (const def of TIP_DEFINITIONS) {
      if (dismissed.has(def.id)) continue;
      if (def.trigger(triggerState)) {
        return { id: def.id, message: def.message, icon: def.icon };
      }
    }
    return null;
  }, [dismissed, triggerState, allianceBreakAlerts, currentTurn]);

  const dismissTip = (id: string) => {
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveDismissed(next);
      return next;
    });
  };

  return { currentTip, dismissTip };
}
