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
    hasActiveReinforcement: boolean;
  }) => boolean;
}

const TIP_DEFINITIONS: TipDefinition[] = [
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

  // Auto-dismiss tip-06 when any card is used
  const anyCardUsed = useMemo(() => playerCards.some((c: PlayerCard) => c.used), [playerCards]);
  useEffect(() => {
    if (anyCardUsed) {
      setDismissed((prev) => {
        if (prev.has("tip-06-cards")) return prev;
        const next = new Set(prev);
        next.add("tip-06-cards");
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

    return {
      currentTurn,
      currentEra,
      playerStructureTypes,
      playerGold: playerClan?.gold ?? 0,
      playerTotalUnits,
      playerTerritoriesWithUnits,
      playerCards,
      hasActiveReinforcement,
    };
  }, [currentTurn, currentEra, territories, clans, playerCards, hasActiveReinforcement]);

  const currentTip = useMemo<Tip | null>(() => {
    for (const def of TIP_DEFINITIONS) {
      if (dismissed.has(def.id)) continue;
      if (def.trigger(triggerState)) {
        return { id: def.id, message: def.message, icon: def.icon };
      }
    }
    return null;
  }, [dismissed, triggerState]);

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
