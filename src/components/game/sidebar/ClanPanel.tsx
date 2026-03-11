"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORIGINS } from "@/game/constants/origins";

interface ClanPanelProps {
  name: string;
  origin: string;
  population: number;
  reputation: string;
  territoriesCount: number;
}

const REPUTATION_COLORS = {
  TRUSTED: "text-green-400",
  NEUTRAL: "text-slate-400",
  HOSTILE: "text-red-400",
};

const REPUTATION_NAMES = {
  TRUSTED: "Confiavel",
  NEUTRAL: "Neutro",
  HOSTILE: "Hostil",
};

// Derive color class from hex color stored in constants
function hexToColorClass(hex: string): string {
  if (hex === "#ef4444") return "text-red-400";
  if (hex === "#22c55e") return "text-green-400";
  if (hex === "#8b5cf6") return "text-purple-400";
  return "text-slate-400";
}

// Derive badge background class from hex color stored in constants
function hexToBadgeBgClass(hex: string): string {
  if (hex === "#ef4444") return "bg-red-950/40";
  if (hex === "#22c55e") return "bg-green-950/40";
  if (hex === "#8b5cf6") return "bg-purple-950/40";
  return "bg-slate-700/50";
}

export function ClanPanel({
  name,
  origin,
  population,
  reputation,
  territoriesCount,
}: ClanPanelProps) {
  const originDef = ORIGINS[origin as keyof typeof ORIGINS];
  const originColor = originDef ? hexToColorClass(originDef.color) : "text-slate-400";
  const originBgClass = originDef ? hexToBadgeBgClass(originDef.color) : "bg-slate-700/50";
  const originName = originDef?.name ?? origin;
  const bonusIcon = originDef?.bonusIcon ?? "";
  const bonusLabel = originDef?.bonusLabel ?? "";
  const bonusTooltip = originDef?.bonusTooltip ?? "";
  const repColor = REPUTATION_COLORS[reputation as keyof typeof REPUTATION_COLORS] || "text-slate-400";
  const repName = REPUTATION_NAMES[reputation as keyof typeof REPUTATION_NAMES] || reputation;

  return (
    <Card className="bg-slate-800/80 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{name}</span>
          <span className={cn("text-sm font-normal", originColor)}>
            {originName}
          </span>
        </CardTitle>
        {bonusLabel && (
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs rounded px-2 py-1 mt-1",
              originColor,
              originBgClass
            )}
            title={bonusTooltip}
          >
            <span>{bonusIcon}</span>
            <span className="flex-1">{bonusLabel}</span>
            <span className="font-semibold">ATIVO ✓</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Populacao</span>
          </div>
          <span className="font-medium">{population.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Territorios</span>
          </div>
          <span className="font-medium">{territoriesCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Reputacao</span>
          </div>
          <span className={cn("font-medium", repColor)}>{repName}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ClanPanel;
