"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Wheat, Trees, Coins } from "lucide-react";
import type { ProductionBreakdownItem } from "@/stores/gameStore";

const STRUCTURE_NAMES: Record<string, string> = {
  FARM: "Fazenda",
  SAWMILL: "Serraria",
  MINE: "Mina",
};

interface ResourcePanelProps {
  grain: number;
  wood: number;
  gold: number;
  grainProduction?: number;
  woodProduction?: number;
  goldProduction?: number;
  breakdown?: ProductionBreakdownItem[];
}

function ProductionTooltip({
  items,
  resource,
  total,
}: {
  items: ProductionBreakdownItem[];
  resource: "grain" | "wood" | "gold";
  total: number;
}) {
  const cap = resource.charAt(0).toUpperCase() + resource.slice(1);
  const baseKey = `base${cap}` as "baseGrain" | "baseWood" | "baseGold";
  const bonusKey = `bonus${cap}` as "bonusGrain" | "bonusWood" | "bonusGold";

  const relevant = items.filter((item) => item[baseKey] > 0);

  if (relevant.length === 0) {
    return <p className="text-slate-400">Nenhuma estrutura produtiva</p>;
  }

  return (
    <div className="space-y-1">
      {relevant.map((item, i) => {
        const base = item[baseKey];
        const bonus = item[bonusKey];
        const structName = STRUCTURE_NAMES[item.structureType] ?? item.structureType;
        return (
          <div key={i} className="whitespace-nowrap">
            <span className="text-slate-300">T{item.territoryPosition}:</span>{" "}
            <span className="text-slate-200">
              {structName} Nv{item.structureLevel} (+{base})
            </span>
            {bonus > 0 && (
              <span className="text-amber-300"> + Bônus território (+{bonus})</span>
            )}
          </div>
        );
      })}
      <div className="border-t border-slate-700 pt-1 mt-1 text-slate-300 font-semibold">
        Total: +{total}/turno
      </div>
    </div>
  );
}

function ResourceDisplay({
  icon: Icon,
  label,
  value,
  production,
  colorClass,
  breakdown,
  resource,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  production?: number;
  colorClass: string;
  breakdown?: ProductionBreakdownItem[];
  resource: "grain" | "wood" | "gold";
}) {
  const productionEl =
    production !== undefined ? (
      production > 0 ? (
        <span className="text-xs text-green-400">+{production}</span>
      ) : (
        <span className="text-xs text-slate-500">±0</span>
      )
    ) : null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${colorClass}`} />
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${colorClass}`}>{value.toLocaleString()}</span>
        {productionEl && breakdown ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="cursor-help focus:outline-none">{productionEl}</button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <ProductionTooltip
                items={breakdown}
                resource={resource}
                total={production ?? 0}
              />
            </TooltipContent>
          </Tooltip>
        ) : (
          productionEl
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
  breakdown,
}: ResourcePanelProps) {
  return (
    <TooltipProvider>
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
            breakdown={breakdown}
            resource="grain"
          />
          <ResourceDisplay
            icon={Trees}
            label="Madeira"
            value={wood}
            production={woodProduction}
            colorClass="text-lime-400"
            breakdown={breakdown}
            resource="wood"
          />
          <ResourceDisplay
            icon={Coins}
            label="Ouro"
            value={gold}
            production={goldProduction}
            colorClass="text-yellow-400"
            breakdown={breakdown}
            resource="gold"
          />
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default ResourcePanel;
