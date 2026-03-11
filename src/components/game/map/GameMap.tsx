"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Territory } from "./Territory";
import type { TerritoryWithDetails } from "@/game/types";

const HINT_DISMISSED_KEY = "dnc-expedition-hint-dismissed";

const DEF_VALUES: Record<string, number> = { SOLDIER: 2, ARCHER: 1, KNIGHT: 3, SPY: 0 };

function calcDefensePower(units: { type: string; quantity: number }[]): number {
  return units.reduce((sum, u) => sum + u.quantity * (DEF_VALUES[u.type] ?? 0), 0);
}

interface ExpeditionHintProps {
  currentTurn: number;
  expeditionCount: number;
  hasNeutralTerritories: boolean;
}

export function ExpeditionHint({
  currentTurn,
  expeditionCount,
  hasNeutralTerritories,
}: ExpeditionHintProps) {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid SSR flash

  useEffect(() => {
    const isDismissed = localStorage.getItem(HINT_DISMISSED_KEY) === "true";
    setDismissed(isDismissed);
  }, []);

  const shouldShow =
    !dismissed &&
    currentTurn >= 3 &&
    expeditionCount === 0 &&
    hasNeutralTerritories;

  const handleDismiss = () => {
    localStorage.setItem(HINT_DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="mt-3 mx-1 rounded-xl border border-amber-500/40 bg-amber-950/60 backdrop-blur-sm p-3 flex items-start gap-3"
        >
          <div className="text-amber-400 text-lg leading-none mt-0.5">⚔</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-300 leading-snug">
              Territórios neutros aguardam!
            </p>
            <p className="text-xs text-amber-200/70 mt-0.5 leading-snug">
              Envie uma expedição para conquistar territórios e expandir seu clã. Toque em um território neutro e selecione &quot;Explorar&quot;.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 text-xs text-amber-400/80 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/50 rounded-md px-2 py-1 transition-colors"
          >
            Entendi
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface GameMapProps {
  territories: TerritoryWithDetails[];
  playerClanId: string;
  selectedTerritoryId?: string;
  currentEra?: string;
  playerHasTroops?: boolean;
  revealedTerritories?: Record<string, { units: { type: string; quantity: number }[] }>;
  onTerritoryClick?: (territoryId: string) => void;
}

export function GameMap({
  territories,
  playerClanId,
  selectedTerritoryId,
  currentEra,
  playerHasTroops = false,
  revealedTerritories = {},
  onTerritoryClick,
}: GameMapProps) {
  // Sort territories by position
  const sortedTerritories = [...territories].sort(
    (a, b) => a.position - b.position
  );

  // Calculate average defense power across player territories for color thresholds
  const playerTerritories = sortedTerritories.filter(t => t.ownerId === playerClanId);
  const avgDefensePower = playerTerritories.length > 0
    ? playerTerritories.reduce((sum, t) => sum + calcDefensePower(t.units), 0) / playerTerritories.length
    : 0;

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
      <div className="grid grid-cols-3 gap-3">
        {sortedTerritories.map((territory) => {
          const unitsCount = territory.units.reduce(
            (sum, u) => sum + u.quantity,
            0
          );
          const isPlayerOwned = territory.ownerId === playerClanId;
          const isEnemy = territory.ownerId !== null && !isPlayerOwned;
          const isNeutral = territory.ownerId === null;
          const isAttackable =
            isEnemy &&
            playerHasTroops &&
            (currentEra === "WAR" || currentEra === "INVASION");
          const isExpeditionAvailable = isNeutral && playerHasTroops;

          const revealedData = revealedTerritories[territory.id];
          const isRevealed = !!revealedData;
          const defensePower = isPlayerOwned ? calcDefensePower(territory.units) : undefined;
          const revealedDefensePower = isRevealed ? calcDefensePower(revealedData.units) : undefined;

          return (
            <Territory
              key={territory.id}
              id={territory.id}
              position={territory.position}
              ownerId={territory.ownerId}
              ownerName={territory.owner?.name}
              ownerOrigin={territory.owner?.origin}
              bonusResource={territory.bonusResource}
              structuresCount={territory.structures.length}
              unitsCount={unitsCount}
              isPlayerOwned={isPlayerOwned}
              isSelected={territory.id === selectedTerritoryId}
              isRevealed={isRevealed}
              isAttackable={isAttackable}
              isExpeditionAvailable={isExpeditionAvailable}
              defensePower={defensePower}
              avgDefensePower={avgDefensePower}
              revealedDefensePower={revealedDefensePower}
              currentEra={currentEra}
              onClick={() => onTerritoryClick?.(territory.id)}
            />
          );
        })}
      </div>

      {/* Map legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 rounded-sm bg-red-500/30 border border-red-500" />
          <span>Ferronatos</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 rounded-sm bg-green-500/30 border border-green-500" />
          <span>Verdaneos</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 rounded-sm bg-purple-500/30 border border-purple-500" />
          <span>Umbral</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-3 h-3 rounded-sm bg-slate-800/50 border border-slate-600" />
          <span>Neutro</span>
        </div>
      </div>
    </div>
  );
}

export default GameMap;
