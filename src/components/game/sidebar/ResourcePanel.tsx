"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Trees, Coins } from "lucide-react";

interface ResourcePanelProps {
  grain: number;
  wood: number;
  gold: number;
  grainProduction?: number;
  woodProduction?: number;
  goldProduction?: number;
}

function ResourceDisplay({
  icon: Icon,
  label,
  value,
  production,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  production?: number;
  colorClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${colorClass}`} />
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${colorClass}`}>{value.toLocaleString()}</span>
        {production !== undefined && production > 0 && (
          <span className="text-xs text-green-400">+{production}</span>
        )}
      </div>
    </div>
  );
}

export function ResourcePanel({
  grain,
  wood,
  gold,
  grainProduction,
  woodProduction,
  goldProduction,
}: ResourcePanelProps) {
  return (
    <Card className="bg-slate-800/80 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-400 text-lg">Recursos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ResourceDisplay
          icon={Wheat}
          label="Graos"
          value={grain}
          production={grainProduction}
          colorClass="text-amber-400"
        />
        <ResourceDisplay
          icon={Trees}
          label="Madeira"
          value={wood}
          production={woodProduction}
          colorClass="text-lime-400"
        />
        <ResourceDisplay
          icon={Coins}
          label="Ouro"
          value={gold}
          production={goldProduction}
          colorClass="text-yellow-400"
        />
      </CardContent>
    </Card>
  );
}

export default ResourcePanel;
