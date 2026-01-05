"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClanPanelProps {
  name: string;
  origin: string;
  population: number;
  reputation: string;
  territoriesCount: number;
}

const ORIGIN_COLORS = {
  FERRONATOS: "text-red-400",
  VERDANEOS: "text-green-400",
  UMBRAL: "text-purple-400",
};

const ORIGIN_NAMES = {
  FERRONATOS: "Ferronatos",
  VERDANEOS: "Verdaneos",
  UMBRAL: "Umbral",
};

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

export function ClanPanel({
  name,
  origin,
  population,
  reputation,
  territoriesCount,
}: ClanPanelProps) {
  const originColor = ORIGIN_COLORS[origin as keyof typeof ORIGIN_COLORS] || "text-slate-400";
  const originName = ORIGIN_NAMES[origin as keyof typeof ORIGIN_NAMES] || origin;
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
