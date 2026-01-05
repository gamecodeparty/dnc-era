"use client";

import { Territory } from "./Territory";
import type { TerritoryWithDetails } from "@/game/types";

interface GameMapProps {
  territories: TerritoryWithDetails[];
  playerClanId: string;
  selectedTerritoryId?: string;
  onTerritoryClick?: (territoryId: string) => void;
}

export function GameMap({
  territories,
  playerClanId,
  selectedTerritoryId,
  onTerritoryClick,
}: GameMapProps) {
  // Sort territories by position
  const sortedTerritories = [...territories].sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
      <div className="grid grid-cols-3 gap-3">
        {sortedTerritories.map((territory) => {
          const unitsCount = territory.units.reduce(
            (sum, u) => sum + u.quantity,
            0
          );

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
              isPlayerOwned={territory.ownerId === playerClanId}
              isSelected={territory.id === selectedTerritoryId}
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
