"use client";

import { cn } from "@/lib/utils";
import { Wheat, Trees, Coins, Swords, Home } from "lucide-react";

interface TerritoryProps {
  id: string;
  position: number;
  ownerId: string | null;
  ownerName?: string;
  ownerOrigin?: string;
  bonusResource: string;
  structuresCount: number;
  unitsCount: number;
  isPlayerOwned: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const ORIGIN_BORDER_COLORS = {
  FERRONATOS: "border-red-500",
  VERDANEOS: "border-green-500",
  UMBRAL: "border-purple-500",
};

const ORIGIN_BG_COLORS = {
  FERRONATOS: "bg-red-500/10",
  VERDANEOS: "bg-green-500/10",
  UMBRAL: "bg-purple-500/10",
};

const RESOURCE_ICONS = {
  GRAIN: Wheat,
  WOOD: Trees,
  GOLD: Coins,
};

const RESOURCE_COLORS = {
  GRAIN: "text-amber-400",
  WOOD: "text-lime-400",
  GOLD: "text-yellow-400",
};

export function Territory({
  id,
  position,
  ownerId,
  ownerName,
  ownerOrigin,
  bonusResource,
  structuresCount,
  unitsCount,
  isPlayerOwned,
  isSelected = false,
  onClick,
}: TerritoryProps) {
  const ResourceIcon = RESOURCE_ICONS[bonusResource as keyof typeof RESOURCE_ICONS] || Wheat;
  const resourceColor = RESOURCE_COLORS[bonusResource as keyof typeof RESOURCE_COLORS] || "text-slate-400";

  const isNeutral = !ownerId;
  const borderColor = isNeutral
    ? "border-slate-600"
    : ORIGIN_BORDER_COLORS[ownerOrigin as keyof typeof ORIGIN_BORDER_COLORS] || "border-slate-600";
  const bgColor = isNeutral
    ? "bg-slate-800/30"
    : ORIGIN_BG_COLORS[ownerOrigin as keyof typeof ORIGIN_BG_COLORS] || "bg-slate-800/30";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-lg border-2 p-2 transition-all",
        "hover:scale-105 hover:shadow-lg hover:z-10",
        "flex flex-col items-center justify-center gap-1",
        borderColor,
        bgColor,
        isSelected && "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900",
        isPlayerOwned && "shadow-md"
      )}
    >
      {/* Position indicator */}
      <span className="absolute top-1 left-1 text-xs text-slate-500">
        {position + 1}
      </span>

      {/* Resource bonus icon */}
      <ResourceIcon className={cn("w-6 h-6", resourceColor)} />

      {/* Owner name or Neutral */}
      <span className="text-xs text-slate-300 truncate max-w-full">
        {isNeutral ? "Neutro" : ownerName}
      </span>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-xs">
        {structuresCount > 0 && (
          <div className="flex items-center gap-0.5 text-slate-400">
            <Home className="w-3 h-3" />
            <span>{structuresCount}</span>
          </div>
        )}
        {unitsCount > 0 && (
          <div className="flex items-center gap-0.5 text-red-400">
            <Swords className="w-3 h-3" />
            <span>{unitsCount}</span>
          </div>
        )}
      </div>
    </button>
  );
}

export default Territory;
