"use client";

import { useState } from "react";
import { Swords, Clock, MapPin, X, ChevronDown, ChevronUp, Package, ArrowRight, ArrowLeft, Trophy, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton } from "@/components/ui/medieval";
import { Expedition, ExpeditionType } from "@/stores/gameStore";

interface ExpeditionsPanelProps {
  /** List of expeditions */
  expeditions: Expedition[];
  /** Player ID for filtering */
  playerId?: string;
  /** Called when expedition is cancelled */
  onCancel?: (expeditionId: string) => void;
  /** Show only player expeditions */
  playerOnly?: boolean;
  /** Additional class names */
  className?: string;
}

const expeditionTypeLabels: Record<ExpeditionType, string> = {
  ATTACK: "Ataque",
  RETURN_VICTORY: "Retornando (Vitoria)",
  RETURN_DEFEAT: "Retornando (Derrota)",
  REINFORCE: "Reforco",
};

const expeditionTypeIcons: Record<ExpeditionType, React.ReactNode> = {
  ATTACK: <Swords className="w-4 h-4 text-era-war" />,
  RETURN_VICTORY: <Trophy className="w-4 h-4 text-era-peace" />,
  RETURN_DEFEAT: <Skull className="w-4 h-4 text-medieval-accent" />,
  REINFORCE: <ArrowRight className="w-4 h-4 text-medieval-primary" />,
};

export function ExpeditionsPanel({
  expeditions,
  playerId = "player",
  onCancel,
  playerOnly = true,
  className = "",
}: ExpeditionsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter expeditions
  const filteredExpeditions = playerOnly
    ? expeditions.filter((e) => e.ownerId === playerId)
    : expeditions;

  // Separate by type
  const attacks = filteredExpeditions.filter((e) => e.type === "ATTACK");
  const returns = filteredExpeditions.filter((e) => e.type === "RETURN_VICTORY" || e.type === "RETURN_DEFEAT");
  const incoming = expeditions.filter(
    (e) => e.ownerId !== playerId && e.type === "ATTACK"
  );

  const totalActive = filteredExpeditions.length;

  if (totalActive === 0 && incoming.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-medieval-bg-panel rounded-lg border border-medieval-primary/30 overflow-hidden ${className}`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-medieval-bg-card/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-era-war" />
          <span className="font-cinzel font-semibold text-medieval-text-primary">
            Expedicoes
          </span>
          {totalActive > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-era-war/20 text-era-war text-xs font-bold">
              {totalActive}
            </span>
          )}
          {incoming.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-medieval-accent/20 text-medieval-accent text-xs font-bold">
              {incoming.length} ameaca{incoming.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-medieval-text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-medieval-text-muted" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-3">
              {/* Outgoing attacks */}
              {attacks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-medieval-text-muted uppercase tracking-wider">
                    Ataques em Andamento
                  </h4>
                  {attacks.map((exp) => (
                    <ExpeditionCard
                      key={exp.id}
                      expedition={exp}
                      onCancel={onCancel}
                      canCancel
                    />
                  ))}
                </div>
              )}

              {/* Returning expeditions */}
              {returns.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-medieval-text-muted uppercase tracking-wider">
                    Tropas Retornando
                  </h4>
                  {returns.map((exp) => (
                    <ExpeditionCard key={exp.id} expedition={exp} />
                  ))}
                </div>
              )}

              {/* Incoming attacks */}
              {incoming.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-medieval-accent uppercase tracking-wider flex items-center gap-1">
                    <Swords className="w-3 h-3" />
                    Ataques Inimigos
                  </h4>
                  {incoming.map((exp) => (
                    <ExpeditionCard key={exp.id} expedition={exp} isEnemy />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ExpeditionCardProps {
  expedition: Expedition;
  onCancel?: (expeditionId: string) => void;
  canCancel?: boolean;
  isEnemy?: boolean;
}

function ExpeditionCard({ expedition, onCancel, canCancel = false, isEnemy = false }: ExpeditionCardProps) {
  const totalUnits = expedition.units.reduce((sum, u) => sum + u.quantity, 0);
  const hasLoot =
    expedition.carriedResources.grain +
      expedition.carriedResources.wood +
      expedition.carriedResources.gold >
    0;

  const isReturning = expedition.type === "RETURN_VICTORY" || expedition.type === "RETURN_DEFEAT";

  return (
    <div
      className={`p-3 rounded-lg border ${
        isEnemy
          ? "bg-medieval-accent/5 border-medieval-accent/30"
          : expedition.type === "RETURN_VICTORY"
          ? "bg-era-peace/5 border-era-peace/30"
          : expedition.type === "RETURN_DEFEAT"
          ? "bg-medieval-accent/5 border-medieval-accent/20"
          : "bg-medieval-bg-card/50 border-medieval-primary/20"
      }`}
    >
      {/* Route */}
      <div className="flex items-center gap-2 mb-2">
        {expeditionTypeIcons[expedition.type]}
        <span className="text-xs text-medieval-text-muted">
          {expeditionTypeLabels[expedition.type]}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-medieval-primary" />
          <span className="text-medieval-text-secondary">
            {isReturning ? expedition.toPosition + 1 : expedition.fromPosition + 1}
          </span>
        </div>
        {isReturning ? (
          <ArrowLeft className="w-4 h-4 text-medieval-text-muted" />
        ) : (
          <ArrowRight className="w-4 h-4 text-era-war" />
        )}
        <div className="flex items-center gap-1">
          <MapPin className={`w-3 h-3 ${isEnemy ? "text-medieval-accent" : "text-era-war"}`} />
          <span className="text-medieval-text-secondary">
            {isReturning ? expedition.fromPosition + 1 : expedition.toPosition + 1}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1 text-medieval-text-muted">
          <Clock className="w-3 h-3" />
          <span>
            {expedition.turnsRemaining} turno{expedition.turnsRemaining !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-1 text-medieval-text-muted">
          <Swords className="w-3 h-3" />
          <span>{totalUnits} tropas</span>
        </div>
        {hasLoot && (
          <div className="flex items-center gap-1 text-gold">
            <Package className="w-3 h-3" />
            <span>Saque</span>
          </div>
        )}
      </div>

      {/* Cancel button */}
      {canCancel && onCancel && (
        <div className="mt-2 pt-2 border-t border-medieval-primary/10">
          <button
            onClick={() => onCancel(expedition.id)}
            className="text-xs text-medieval-text-muted hover:text-medieval-accent transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Cancelar expedicao
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Compact version for mobile tab bar or header
 */
interface ExpeditionBadgeProps {
  count: number;
  incoming: number;
  onClick?: () => void;
}

export function ExpeditionBadge({ count, incoming, onClick }: ExpeditionBadgeProps) {
  if (count === 0 && incoming === 0) return null;

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-lg bg-medieval-bg-card/50 border border-medieval-primary/20 hover:bg-medieval-bg-card transition-colors"
    >
      <Swords className="w-5 h-5 text-era-war" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-era-war text-[10px] font-bold text-white flex items-center justify-center">
          {count}
        </span>
      )}
      {incoming > 0 && (
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-medieval-accent text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
          !
        </span>
      )}
    </button>
  );
}
