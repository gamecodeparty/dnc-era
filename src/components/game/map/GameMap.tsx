"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Territory } from "./Territory";
import type { TerritoryWithDetails, HordaPreview } from "@/game/types";
import type { TerritoryIntel, IncomingAttack } from "@/stores/gameStore";
import { TERRITORY_ADJACENCY } from "@/game/constants/balance";

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
  currentTurn?: number;
  playerHasTroops?: boolean;
  revealedTerritories?: Record<string, { units: { type: string; quantity: number }[] }>;
  territoryIntel?: TerritoryIntel[];
  incomingAttacks?: IncomingAttack[];
  showBadges?: boolean;
  /** F-061: Diplomacy map — clanId -> relation, to show allied territory info */
  diplomacy?: Record<string, string>;
  /** F-069: Horda preview for showing the weakest target territory badge */
  hordaPreview?: HordaPreview | null;
  onTerritoryClick?: (territoryId: string) => void;
}

// Precomputed deduplicated adjacency pairs (id < neighbor → no duplicates)
const ADJACENCY_LINES: [number, number][] = [];
for (const [posStr, neighbors] of Object.entries(TERRITORY_ADJACENCY)) {
  const pos = Number(posStr);
  for (const neighbor of neighbors) {
    if (pos < neighbor) ADJACENCY_LINES.push([pos, neighbor]);
  }
}

const GRID_COLS = 3;
const GRID_ROWS = 4;
const GRID_GAP = 12; // gap-3 = 0.75rem = 12px

function getCellCenter(pos: number, w: number, h: number) {
  const col = pos % GRID_COLS;
  const row = Math.floor(pos / GRID_COLS);
  const cellW = (w - (GRID_COLS - 1) * GRID_GAP) / GRID_COLS;
  const cellH = (h - (GRID_ROWS - 1) * GRID_GAP) / GRID_ROWS;
  return {
    x: col * (cellW + GRID_GAP) + cellW / 2,
    y: row * (cellH + GRID_GAP) + cellH / 2,
  };
}

export function GameMap({
  territories,
  playerClanId,
  selectedTerritoryId,
  currentEra,
  currentTurn = 0,
  playerHasTroops = false,
  revealedTerritories = {},
  territoryIntel = [],
  incomingAttacks = [],
  showBadges = true,
  diplomacy = {},
  hordaPreview = null,
  onTerritoryClick,
}: GameMapProps) {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const [gridDims, setGridDims] = useState({ width: 0, height: 0 });
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

  useEffect(() => {
    const el = gridWrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) {
        setGridDims({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // F-093: Compute active position (hover takes precedence over click selection)
  const selectedPosition = selectedTerritoryId
    ? territories.find(t => t.id === selectedTerritoryId)?.position ?? null
    : null;
  const activePosition = hoveredPosition ?? selectedPosition;

  // F-093: Set of positions adjacent to the active territory
  const adjacentToActive = useMemo<Set<number>>(() => {
    if (activePosition === null) return new Set();
    return new Set(TERRITORY_ADJACENCY[activePosition] ?? []);
  }, [activePosition]);

  // F-093: Stable callbacks per territory position to avoid re-creating inline fns
  const handleHoverChange = useCallback((pos: number, hovered: boolean) => {
    setHoveredPosition(hovered ? pos : null);
  }, []);

  // Sort territories by position
  const sortedTerritories = [...territories].sort(
    (a, b) => a.position - b.position
  );

  // Calculate average defense power across player territories for color thresholds
  const playerTerritories = sortedTerritories.filter(t => t.ownerId === playerClanId);
  const avgDefensePower = playerTerritories.length > 0
    ? playerTerritories.reduce((sum, t) => sum + calcDefensePower(t.units), 0) / playerTerritories.length
    : 0;

  // Compute Horda target (clan with most territories) — only relevant during INVASION era
  let hordaTargetClanId: string | null = null;
  if (currentEra === "INVASION") {
    const clanCounts: Record<string, number> = {};
    for (const t of sortedTerritories) {
      if (t.ownerId) clanCounts[t.ownerId] = (clanCounts[t.ownerId] ?? 0) + 1;
    }
    let maxCount = 0;
    for (const [clanId, count] of Object.entries(clanCounts)) {
      if (count > maxCount) {
        maxCount = count;
        hordaTargetClanId = clanId;
      }
    }
  }

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
      <div ref={gridWrapperRef} className="relative">
        {/* SVG adjacency lines — rendered below territory cells */}
        {gridDims.width > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={gridDims.width}
            height={gridDims.height}
            style={{ zIndex: -1 }}
            aria-hidden="true"
          >
            {ADJACENCY_LINES.map(([a, b]) => {
              const ca = getCellCenter(a, gridDims.width, gridDims.height);
              const cb = getCellCenter(b, gridDims.width, gridDims.height);
              const isActive = activePosition !== null &&
                (a === activePosition || b === activePosition);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={ca.x}
                  y1={ca.y}
                  x2={cb.x}
                  y2={cb.y}
                  stroke={isActive ? "#fbbf24" : "#475569"}
                  strokeOpacity={isActive ? 0.7 : 0.3}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ transition: "stroke 0.15s, stroke-opacity 0.15s" }}
                />
              );
            })}
          </svg>
        )}
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
          const isHordaTarget = hordaTargetClanId !== null && territory.ownerId === hordaTargetClanId;

          const intel = !isPlayerOwned ? territoryIntel.find(i => i.territoryId === territory.id) : undefined;
          const intelSource = intel?.source;
          const intelDefensePower = intel?.defensePower ?? null;
          const intelTurnsRemaining = intel ? Math.max(0, intel.expiresAt - currentTurn) : undefined;
          const hasIncomingAttack = isPlayerOwned && incomingAttacks.some((a) => a.targetTerritoryId === territory.id);

          // F-061: Allied visibility — TRUSTED clan territories show real defense power
          const isAllied = !isPlayerOwned && territory.ownerId !== null && diplomacy[territory.ownerId] === "TRUSTED";
          const alliedDefensePower = isAllied ? calcDefensePower(territory.units) : null;

          // F-069/F-100: Horda preview target — specific weakest player territory highlighted 1 turn before attack
          const isHordaPreviewTarget = isPlayerOwned && hordaPreview !== null && hordaPreview.targetTerritoryPosition === territory.position;

          const isAdjacentToSelected = adjacentToActive.has(territory.position);

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
              isHordaTarget={isHordaTarget}
              intelSource={intelSource}
              intelDefensePower={intelDefensePower}
              intelTurnsRemaining={intelTurnsRemaining}
              showBadges={showBadges}
              hasIncomingAttack={hasIncomingAttack}
              isAllied={isAllied}
              alliedDefensePower={alliedDefensePower}
              isHordaPreviewTarget={isHordaPreviewTarget}
              isAdjacentToSelected={isAdjacentToSelected}
              onClick={() => onTerritoryClick?.(territory.id)}
              onHoverChange={(hovered) => handleHoverChange(territory.position, hovered)}
            />
          );
        })}
        </div>
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
