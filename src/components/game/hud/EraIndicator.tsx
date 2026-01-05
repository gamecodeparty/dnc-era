"use client";

import { cn } from "@/lib/utils";
import { Shield, Swords, Skull } from "lucide-react";
import { ERA_DURATION } from "@/game/constants";

interface EraIndicatorProps {
  currentEra: string;
  currentTurn: number;
}

const ERA_CONFIG = {
  PEACE: {
    name: "Paz das Cinzas",
    icon: Shield,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    duration: ERA_DURATION.PEACE,
    startTurn: 1,
  },
  WAR: {
    name: "Era da Guerra",
    icon: Swords,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    duration: ERA_DURATION.WAR,
    startTurn: ERA_DURATION.PEACE + 1,
  },
  INVASION: {
    name: "Invasao",
    icon: Skull,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    duration: ERA_DURATION.INVASION,
    startTurn: ERA_DURATION.PEACE + ERA_DURATION.WAR + 1,
  },
};

export function EraIndicator({ currentEra, currentTurn }: EraIndicatorProps) {
  const config = ERA_CONFIG[currentEra as keyof typeof ERA_CONFIG] || ERA_CONFIG.PEACE;
  const Icon = config.icon;

  // Calculate turn within era
  const turnInEra = currentTurn - config.startTurn + 1;
  const progress = (turnInEra / config.duration) * 100;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg border",
        config.bgColor,
        config.borderColor
      )}
    >
      <Icon className={cn("w-5 h-5", config.color)} />
      <div className="flex flex-col">
        <span className={cn("font-semibold text-sm", config.color)}>
          {config.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            Turno {turnInEra}/{config.duration}
          </span>
          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all", config.color.replace("text", "bg"))}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EraIndicator;
