"use client";

import { cn } from "@/lib/utils";
import { Wheat, Trees, Coins, Swords, Home, Eye, Compass } from "lucide-react";
import { UI } from "@/game/constants/balance";

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
  isRevealed?: boolean;
  revealedUnitsCount?: number;
  revealedStructuresCount?: number;
  isAttackable?: boolean;
  isExpeditionAvailable?: boolean;
  /** Computed defense power for player-owned territory */
  defensePower?: number;
  /** Average defense power across all player territories (for color threshold) */
  avgDefensePower?: number;
  /** Computed defense power for enemy territory revealed by SPY */
  revealedDefensePower?: number;
  /** Current game era — used for undefended territory alert and badge visibility */
  currentEra?: string;
  /** This territory's owner is the Horda target (clan with most territories) */
  isHordaTarget?: boolean;
  /** Intel source for enemy territory (F-056/F-057) */
  intelSource?: 'SPY' | 'COMBAT' | 'NONE';
  /** Observed/estimated defense power from intel */
  intelDefensePower?: number | null;
  /** Turns remaining before intel expires */
  intelTurnsRemaining?: number;
  /** Whether to show troop badges (F-048 toggle) */
  showBadges?: boolean;
  /** Whether there is an incoming enemy attack on this player territory (F-058) */
  hasIncomingAttack?: boolean;
  /** F-061: Whether this territory's owner is a TRUSTED ally */
  isAllied?: boolean;
  /** F-061: Real defense power of allied territory (visible by pact) */
  alliedDefensePower?: number | null;
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
  isRevealed = false,
  revealedUnitsCount,
  revealedStructuresCount,
  isAttackable = false,
  isExpeditionAvailable = false,
  defensePower,
  avgDefensePower = 0,
  revealedDefensePower,
  currentEra,
  isHordaTarget = false,
  intelSource,
  intelDefensePower,
  intelTurnsRemaining,
  showBadges = true,
  hasIncomingAttack = false,
  isAllied = false,
  alliedDefensePower,
  onClick,
}: TerritoryProps) {
  const ResourceIcon = RESOURCE_ICONS[bonusResource as keyof typeof RESOURCE_ICONS] || Wheat;
  const resourceColor = RESOURCE_COLORS[bonusResource as keyof typeof RESOURCE_COLORS] || "text-slate-400";

  const isNeutral = !ownerId;
  const borderColor = isNeutral
    ? "border-slate-600"
    : isPlayerOwned
    ? "border-green-500/60"
    : "border-red-500/60";
  const bgColor = isNeutral
    ? "bg-slate-800/30"
    : ORIGIN_BG_COLORS[ownerOrigin as keyof typeof ORIGIN_BG_COLORS] || "bg-slate-800/30";

  const isUndefendedAlert =
    isPlayerOwned &&
    defensePower === 0 &&
    (currentEra === "WAR" || currentEra === "INVASION");

  // Horda target: player owns this territory and is the Horda target → prominent indicator
  const isPlayerHordaTarget = isHordaTarget && isPlayerOwned;

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
        isAttackable && !isSelected && "ring-2 ring-red-500/30 animate-pulse",
        isUndefendedAlert && !isSelected && "ring-2 ring-red-500/40 animate-pulse",
        isPlayerHordaTarget && !isSelected && "ring-2 ring-red-600 ring-offset-1 ring-offset-slate-900 animate-pulse border-red-600",
        isPlayerOwned && "shadow-md"
      )}
    >
      {/* Position indicator */}
      <span className="absolute top-1 left-1 text-xs text-slate-500">
        {position + 1}
      </span>

      {/* Horda target indicator — shown during INVASION era */}
      {isHordaTarget && (
        <div className="absolute bottom-1 left-1 group/horda z-10">
          <div className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center text-xs leading-none",
            isPlayerHordaTarget
              ? "bg-red-600/90 text-white"
              : "bg-slate-800/90 text-red-400 border border-red-500/60"
          )}>
            ☠
          </div>
          <div className="absolute left-0 bottom-6 invisible group-hover/horda:visible z-20
            bg-slate-900 border border-red-500/50 rounded p-2 text-xs text-slate-200
            whitespace-nowrap shadow-lg min-w-[220px]">
            <p className={cn("font-bold mb-0.5", isPlayerHordaTarget ? "text-red-300" : "text-red-400")}>
              Alvo da Horda
            </p>
            <p className="text-slate-300">Alvo da Horda — este clã tem mais territórios</p>
          </div>
        </div>
      )}

      {/* Incoming attack alert (F-058) — shown during WAR/INVASION for player territories */}
      {isPlayerOwned && hasIncomingAttack && (currentEra === "WAR" || currentEra === "INVASION") && (
        <div className="absolute top-1 right-1 group/attack z-10">
          <div className="rounded px-1 py-0.5 bg-red-900/60 flex items-center gap-0.5 animate-pulse">
            <span className="text-red-400 text-[9px] leading-none">⚠</span>
            <span className="text-red-400 text-[9px] leading-none font-semibold">Ataque iminente!</span>
          </div>
          <div className="absolute right-0 top-6 invisible group-hover/attack:visible z-20
            bg-slate-900 border border-red-500/50 rounded p-2 text-xs text-slate-200
            whitespace-nowrap shadow-lg min-w-[240px]">
            <p className="font-bold text-red-300 mb-0.5">Ataque iminente!</p>
            <p className="text-slate-300">Expedição inimiga detectada — chegará no próximo turno. Reforce a defesa!</p>
          </div>
        </div>
      )}

      {/* Revealed indicator */}
      {isRevealed && (
        <div className="absolute top-1 right-1 group/spy z-10">
          <div className="w-5 h-5 rounded-full bg-purple-500/80 flex items-center justify-center">
            <Eye className="w-3 h-3 text-white" />
          </div>
          <div className="absolute right-0 top-6 invisible group-hover/spy:visible z-20
            bg-slate-900 border border-purple-500/50 rounded p-2 text-xs text-slate-200
            whitespace-nowrap shadow-lg min-w-[140px]">
            <p className="font-bold text-purple-300 mb-1">Informações reveladas</p>
            <p>Tropas: {revealedUnitsCount ?? 0}</p>
            <p>Estruturas: {revealedStructuresCount ?? 0}</p>
          </div>
        </div>
      )}

      {/* Expedition available indicator */}
      {isExpeditionAvailable && !isRevealed && (
        <div className="absolute bottom-1 right-1 group/exp z-10">
          <div className="w-4 h-4 rounded-full bg-amber-500/80 flex items-center justify-center">
            <Compass className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="absolute right-0 bottom-5 invisible group-hover/exp:visible z-20
            bg-slate-900 border border-amber-500/50 rounded p-2 text-xs text-slate-200
            whitespace-nowrap shadow-lg min-w-[180px]">
            Envie tropas para explorar este local
          </div>
        </div>
      )}

      {/* Resource bonus icon */}
      <ResourceIcon className={cn("w-6 h-6", resourceColor)} />

      {/* Owner name or Neutral */}
      <span className="text-xs text-slate-300 truncate max-w-full">
        {isNeutral ? "Neutro" : ownerName}
      </span>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-xs">
        <div className={cn(
          "flex items-center gap-0.5 relative group/slots",
          structuresCount <= 2 ? "text-green-400" :
          structuresCount === 3 ? "text-yellow-400" :
          "text-red-400"
        )}>
          <Home className="w-3 h-3" />
          <span>{structuresCount}/{UI.MAX_STRUCTURE_SLOTS}</span>
          {structuresCount >= UI.MAX_STRUCTURE_SLOTS && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/slots:visible z-20
              bg-slate-900 border border-red-500/50 rounded p-1.5 text-xs text-red-300
              whitespace-nowrap shadow-lg">
              {UI.MAX_STRUCTURE_SLOTS}/{UI.MAX_STRUCTURE_SLOTS} cheio — demolir para construir
            </div>
          )}
        </div>
        {isPlayerOwned && defensePower !== undefined && showBadges && (
          isUndefendedAlert ? (
            <div className="flex items-center gap-0.5 text-red-400 relative group/undefended">
              <span>⚠ 0</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/undefended:visible z-20
                bg-slate-900 border border-red-500/50 rounded p-1.5 text-xs text-red-300
                whitespace-nowrap shadow-lg">
                Território sem defesa! Vulnerável a ataques.
              </div>
            </div>
          ) : (
            <div className={cn(
              "flex items-center gap-0.5",
              defensePower === 0 ? "text-red-400" :
              defensePower >= avgDefensePower ? "text-green-400" :
              "text-yellow-400"
            )}>
              <Swords className="w-3 h-3" />
              <span>⚔ {defensePower}</span>
            </div>
          )
        )}
        {!isPlayerOwned && ownerId !== null && showBadges && (currentEra === "WAR" || currentEra === "INVASION") && (
          isAllied && alliedDefensePower != null ? (
            <div className="flex items-center gap-0.5 text-blue-400 relative group/intel">
              <span className="text-[10px]">🤝 {alliedDefensePower}</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/intel:visible z-20
                bg-slate-900 border border-blue-500/50 rounded p-1.5 text-xs text-slate-200
                whitespace-nowrap shadow-lg">
                Aliado — força visível pelo pacto
              </div>
            </div>
          ) : intelSource === "SPY" && intelDefensePower != null ? (
            <div className="flex items-center gap-0.5 text-purple-400 relative group/intel">
              <span className="text-[10px]">👁 {intelDefensePower}</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/intel:visible z-20
                bg-slate-900 border border-purple-500/50 rounded p-1.5 text-xs text-slate-200
                whitespace-nowrap shadow-lg">
                Intel de espião — expira em {intelTurnsRemaining ?? 0} turno(s)
              </div>
            </div>
          ) : intelSource === "COMBAT" && intelDefensePower != null ? (
            <div className="flex items-center gap-0.5 text-orange-400 relative group/intel">
              <span className="text-[10px]">⚔ {intelDefensePower}</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/intel:visible z-20
                bg-slate-900 border border-orange-500/50 rounded p-1.5 text-xs text-slate-200
                whitespace-nowrap shadow-lg">
                Estimativa baseada em combate recente
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-0.5 text-slate-400 relative group/intel">
              <Swords className="w-3 h-3" />
              <span>?</span>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 invisible group-hover/intel:visible z-20
                bg-slate-900 border border-slate-500/50 rounded p-1.5 text-xs text-slate-200
                whitespace-nowrap shadow-lg">
                Força desconhecida — envie um Espião para revelar
              </div>
            </div>
          )
        )}
      </div>
    </button>
  );
}

export default Territory;
