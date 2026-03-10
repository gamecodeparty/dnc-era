"use client";

import { useState, useMemo } from "react";
import { X, Swords, MapPin, Clock, Package, ChevronDown, ChevronUp, AlertTriangle, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton } from "@/components/ui/medieval";
import {
  Territory,
  Unit,
  UnitType,
  ClanOrigin,
  UNIT_STATS,
  getDistance,
  getTravelTime,
  getCarryCapacity,
  getAttackPower,
  calculateCombatPreview,
} from "@/stores/gameStore";
import type { CombatPreviewOutcome } from "@/game/types";

interface ExpeditionModalProps {
  /** Origin territory */
  fromTerritory: Territory;
  /** Target territory */
  toTerritory: Territory;
  /** All player territories (for selecting different origin) */
  playerTerritories: Territory[];
  /** Current game era */
  currentEra: "PEACE" | "WAR" | "INVASION";
  /** Attacker clan origin for combat preview */
  attackerOrigin?: ClanOrigin;
  /** Defender clan origin for combat preview */
  defenderOrigin?: ClanOrigin;
  /** Called when expedition is sent */
  onSend: (
    fromTerritoryId: string,
    toTerritoryId: string,
    units: { type: UnitType; quantity: number }[]
  ) => { success: boolean; message: string };
  /** Called when modal is closed */
  onClose: () => void;
}

const outcomeConfig: Record<CombatPreviewOutcome, { label: string; colorClass: string; borderClass: string; bgClass: string }> = {
  decisive_victory: { label: "Vitória Decisiva", colorClass: "text-clan-verdaneos", borderClass: "border-clan-verdaneos/30", bgClass: "bg-clan-verdaneos/10" },
  victory: { label: "Vitória", colorClass: "text-era-peace", borderClass: "border-era-peace/30", bgClass: "bg-era-peace/10" },
  uncertain: { label: "Incerto", colorClass: "text-grain", borderClass: "border-grain/30", bgClass: "bg-grain/10" },
  defeat: { label: "Derrota", colorClass: "text-era-war", borderClass: "border-era-war/30", bgClass: "bg-era-war/10" },
};

const unitLabels: Record<UnitType, string> = {
  SOLDIER: "Soldados",
  ARCHER: "Arqueiros",
  KNIGHT: "Cavaleiros",
};

const unitIcons: Record<UnitType, string> = {
  SOLDIER: "🗡️",
  ARCHER: "🏹",
  KNIGHT: "🐴",
};

export function ExpeditionModal({
  fromTerritory: initialFromTerritory,
  toTerritory,
  playerTerritories,
  currentEra,
  attackerOrigin,
  defenderOrigin,
  onSend,
  onClose,
}: ExpeditionModalProps) {
  // Selected origin territory
  const [selectedFromId, setSelectedFromId] = useState(initialFromTerritory.id);
  const fromTerritory = playerTerritories.find((t) => t.id === selectedFromId) || initialFromTerritory;

  // Unit selection
  const [selectedUnits, setSelectedUnits] = useState<Record<UnitType, number>>({
    SOLDIER: 0,
    ARCHER: 0,
    KNIGHT: 0,
  });

  // UI state
  const [showOriginSelect, setShowOriginSelect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available units from selected territory
  const availableUnits = useMemo(() => {
    const available: Record<UnitType, number> = {
      SOLDIER: 0,
      ARCHER: 0,
      KNIGHT: 0,
    };
    for (const unit of fromTerritory.units) {
      if (unit.type in available) {
        available[unit.type as UnitType] = unit.quantity;
      }
    }
    return available;
  }, [fromTerritory.units]);

  // Calculate expedition stats
  const expeditionStats = useMemo(() => {
    const units: Unit[] = [];
    for (const [type, qty] of Object.entries(selectedUnits)) {
      if (qty > 0) {
        units.push({ type: type as UnitType, quantity: qty });
      }
    }

    const distance = getDistance(fromTerritory.position, toTerritory.position);
    const travelTime = units.length > 0 ? getTravelTime(distance, units) : distance;
    const carryCapacity = getCarryCapacity(units);
    const attackPower = getAttackPower(units);
    const totalUnits = units.reduce((sum, u) => sum + u.quantity, 0);

    return {
      units,
      distance,
      travelTime,
      carryCapacity,
      attackPower,
      totalUnits,
    };
  }, [selectedUnits, fromTerritory.position, toTerritory.position]);

  // Combat preview (recalculates in real time as units are added/removed)
  const combatPreview = useMemo(() => {
    if (expeditionStats.totalUnits === 0) return null;
    return calculateCombatPreview(expeditionStats.units, toTerritory, attackerOrigin, defenderOrigin);
  }, [expeditionStats.units, expeditionStats.totalUnits, toTerritory, attackerOrigin, defenderOrigin]);

  // Handle unit quantity change
  const handleUnitChange = (type: UnitType, delta: number) => {
    setSelectedUnits((prev) => {
      const newQty = Math.max(0, Math.min(availableUnits[type], prev[type] + delta));
      return { ...prev, [type]: newQty };
    });
    setError(null);
  };

  // Set all units
  const handleSelectAll = () => {
    setSelectedUnits({
      SOLDIER: availableUnits.SOLDIER,
      ARCHER: availableUnits.ARCHER,
      KNIGHT: availableUnits.KNIGHT,
    });
  };

  // Clear all units
  const handleClearAll = () => {
    setSelectedUnits({
      SOLDIER: 0,
      ARCHER: 0,
      KNIGHT: 0,
    });
  };

  // Handle origin change
  const handleOriginChange = (territoryId: string) => {
    setSelectedFromId(territoryId);
    setShowOriginSelect(false);
    // Reset unit selection when changing origin
    setSelectedUnits({
      SOLDIER: 0,
      ARCHER: 0,
      KNIGHT: 0,
    });
  };

  // Send expedition
  const handleSend = () => {
    if (currentEra === "PEACE") {
      setError("Expedicoes bloqueadas na Era da Paz!");
      return;
    }

    if (expeditionStats.totalUnits === 0) {
      setError("Selecione pelo menos uma unidade!");
      return;
    }

    const result = onSend(
      fromTerritory.id,
      toTerritory.id,
      expeditionStats.units.map((u) => ({ type: u.type, quantity: u.quantity }))
    );

    if (!result.success) {
      setError(result.message);
    }
  };

  // Filter territories with units
  const territoriesWithUnits = playerTerritories.filter(
    (t) => t.units.length > 0 && t.units.some((u) => u.quantity > 0)
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-medieval-bg-panel rounded-xl border border-medieval-primary/40 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-medieval-primary/20">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-era-war" />
              <h2 className="font-cinzel font-bold text-lg text-medieval-text-primary">
                Enviar Expedicao
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Route info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-medieval-bg-card/50 border border-medieval-primary/20">
              {/* Origin */}
              <div className="flex-1">
                <div className="text-xs text-medieval-text-muted mb-1">Origem</div>
                <button
                  onClick={() => territoriesWithUnits.length > 1 && setShowOriginSelect(!showOriginSelect)}
                  className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                    territoriesWithUnits.length > 1
                      ? "bg-medieval-bg-deep hover:bg-medieval-primary/10 cursor-pointer"
                      : "bg-medieval-bg-deep cursor-default"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-medieval-primary" />
                  <span className="font-cinzel text-medieval-text-primary">
                    Territorio {fromTerritory.position + 1}
                  </span>
                  {territoriesWithUnits.length > 1 && (
                    showOriginSelect ? (
                      <ChevronUp className="w-4 h-4 text-medieval-text-muted ml-auto" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-medieval-text-muted ml-auto" />
                    )
                  )}
                </button>

                {/* Origin dropdown */}
                <AnimatePresence>
                  {showOriginSelect && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="p-1 space-y-1 max-h-32 overflow-y-auto">
                        {territoriesWithUnits.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => handleOriginChange(t.id)}
                            className={`w-full p-2 rounded text-left text-sm transition-colors ${
                              t.id === fromTerritory.id
                                ? "bg-medieval-primary/20 text-medieval-primary"
                                : "hover:bg-medieval-bg-deep text-medieval-text-secondary"
                            }`}
                          >
                            Territorio {t.position + 1} ({t.units.reduce((s, u) => s + u.quantity, 0)} tropas)
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-medieval-text-muted">
                  {expeditionStats.distance} tiles
                </div>
                <Swords className="w-5 h-5 text-era-war rotate-90" />
              </div>

              {/* Destination */}
              <div className="flex-1">
                <div className="text-xs text-medieval-text-muted mb-1">Destino</div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-medieval-bg-deep">
                  <MapPin className="w-4 h-4 text-era-war" />
                  <span className="font-cinzel text-medieval-text-primary">
                    Territorio {toTerritory.position + 1}
                  </span>
                </div>
                <div className="text-xs text-medieval-text-muted mt-1">
                  {toTerritory.ownerName}
                </div>
              </div>
            </div>

            {/* Unit selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-sm text-medieval-text-secondary">
                  Selecionar Tropas
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-xs text-medieval-primary hover:underline"
                  >
                    Todas
                  </button>
                  <span className="text-medieval-text-muted">|</span>
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-medieval-text-muted hover:underline"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {(["SOLDIER", "ARCHER", "KNIGHT"] as UnitType[]).map((type) => {
                const available = availableUnits[type];
                const selected = selectedUnits[type];

                if (available === 0) return null;

                return (
                  <div
                    key={type}
                    className="flex items-center gap-3 p-3 rounded-lg bg-medieval-bg-card/50 border border-medieval-primary/10"
                  >
                    <span className="text-xl">{unitIcons[type]}</span>
                    <div className="flex-1">
                      <div className="font-cinzel text-sm text-medieval-text-primary">
                        {unitLabels[type]}
                      </div>
                      <div className="text-xs text-medieval-text-muted">
                        ATK: {UNIT_STATS[type].atk} | Velocidade: {UNIT_STATS[type].speed} | Carga: {UNIT_STATS[type].carryCapacity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUnitChange(type, -1)}
                        disabled={selected === 0}
                        className="w-8 h-8 rounded bg-medieval-bg-deep flex items-center justify-center text-medieval-text-primary disabled:opacity-30"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono text-medieval-text-primary">
                        {selected}
                      </span>
                      <button
                        onClick={() => handleUnitChange(type, 1)}
                        disabled={selected >= available}
                        className="w-8 h-8 rounded bg-medieval-bg-deep flex items-center justify-center text-medieval-text-primary disabled:opacity-30"
                      >
                        +
                      </button>
                      <span className="text-xs text-medieval-text-muted w-8">
                        /{available}
                      </span>
                    </div>
                  </div>
                );
              })}

              {Object.values(availableUnits).every((v) => v === 0) && (
                <div className="text-center py-4 text-medieval-text-muted">
                  Nenhuma tropa disponivel neste territorio
                </div>
              )}
            </div>

            {/* Combat preview panel */}
            {combatPreview && (
              <div className={`p-3 rounded-lg border space-y-2 ${outcomeConfig[combatPreview.outcome].borderClass} ${outcomeConfig[combatPreview.outcome].bgClass}`}>
                {/* Outcome header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Swords className={`w-4 h-4 ${outcomeConfig[combatPreview.outcome].colorClass}`} />
                    <span className={`font-cinzel text-sm font-bold ${outcomeConfig[combatPreview.outcome].colorClass}`}>
                      {outcomeConfig[combatPreview.outcome].label}
                    </span>
                  </div>
                  <span className="text-xs text-medieval-text-muted">
                    ratio {combatPreview.ratio}x
                  </span>
                </div>

                {/* Power bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-medieval-text-muted">
                    <span className="flex items-center gap-1">
                      <Swords className="w-3 h-3 text-era-war" /> {combatPreview.attackPower}
                    </span>
                    <span className="flex items-center gap-1">
                      {combatPreview.defensePower} <Shield className="w-3 h-3 text-era-peace" />
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden bg-era-peace/30 flex">
                    {(() => {
                      const total = combatPreview.attackPower + combatPreview.defensePower;
                      const atkPct = total > 0 ? Math.round((combatPreview.attackPower / total) * 100) : 50;
                      return (
                        <div
                          className="h-full bg-era-war transition-all duration-300 rounded-l-full"
                          style={{ width: `${atkPct}%` }}
                        />
                      );
                    })()}
                  </div>
                </div>

                {/* Active modifiers */}
                {(combatPreview.attackerModifiers.length > 0 || combatPreview.defenderModifiers.length > 0) && (
                  <div className="text-xs space-y-0.5 pt-0.5 border-t border-white/5">
                    {combatPreview.attackerModifiers.map((m, i) => (
                      <div key={i} className="text-era-war/80">⚔ {m}</div>
                    ))}
                    {combatPreview.defenderModifiers.map((m, i) => (
                      <div key={i} className="text-era-peace/80">🛡 {m}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Expedition stats */}
            {expeditionStats.totalUnits > 0 && (
              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-medieval-bg-deep/50 border border-medieval-primary/20">
                <div className="text-center">
                  <Clock className="w-4 h-4 text-medieval-primary mx-auto mb-1" />
                  <div className="text-lg font-mono text-medieval-text-primary">
                    {expeditionStats.travelTime}
                  </div>
                  <div className="text-xs text-medieval-text-muted">turnos</div>
                </div>
                <div className="text-center">
                  <Swords className="w-4 h-4 text-era-war mx-auto mb-1" />
                  <div className="text-lg font-mono text-medieval-text-primary">
                    {expeditionStats.attackPower}
                  </div>
                  <div className="text-xs text-medieval-text-muted">poder</div>
                </div>
                <div className="text-center">
                  <Package className="w-4 h-4 text-gold mx-auto mb-1" />
                  <div className="text-lg font-mono text-medieval-text-primary">
                    {expeditionStats.carryCapacity}
                  </div>
                  <div className="text-xs text-medieval-text-muted">carga</div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-era-war/10 border border-era-war/30">
                <AlertTriangle className="w-4 h-4 text-era-war flex-shrink-0" />
                <p className="text-sm text-era-war">{error}</p>
              </div>
            )}

            {/* Peace era warning */}
            {currentEra === "PEACE" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-era-peace/10 border border-era-peace/30">
                <AlertTriangle className="w-4 h-4 text-era-peace flex-shrink-0" />
                <p className="text-sm text-era-peace">
                  Expedicoes bloqueadas durante a Era da Paz
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-2 p-4 border-t border-medieval-primary/20">
            <MedievalButton
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </MedievalButton>
            <MedievalButton
              variant="danger"
              className="flex-1"
              onClick={handleSend}
              disabled={currentEra === "PEACE" || expeditionStats.totalUnits === 0}
            >
              <Swords className="w-4 h-4 mr-2" />
              Enviar ({expeditionStats.totalUnits} tropas)
            </MedievalButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
