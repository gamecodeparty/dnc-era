"use client";

import { useState, useMemo } from "react";
import { X, Compass, MapPin, Clock, Skull, Gift, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton } from "@/components/ui/medieval";
import {
  Territory,
  Unit,
  UnitType,
  ExplorationSite,
  UNIT_STATS,
  getDistance,
  getTravelTime,
  getAttackPower,
} from "@/stores/gameStore";

interface ExplorationModalProps {
  /** Exploration site */
  site: ExplorationSite;
  /** All player territories */
  playerTerritories: Territory[];
  /** Current turn */
  currentTurn: number;
  /** Current game era */
  currentEra: "PEACE" | "WAR" | "INVASION";
  /** Called when exploration is sent */
  onSend: (
    fromTerritoryId: string,
    siteId: string,
    units: { type: UnitType; quantity: number }[]
  ) => { success: boolean; message: string };
  /** Called when modal is closed */
  onClose: () => void;
}

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

const siteIcons: Record<string, string> = {
  ABANDONED_MINE: "🏔️",
  SPIRIT_FOREST: "🌲",
  ARCANE_RUINS: "🏛️",
  GHOST_FARM: "🌾",
  WYRM_CAVE: "🐉",
  BANDIT_CAMP: "⚔️",
  SUNKEN_SHIP: "⚓",
  HERMIT_TOWER: "🗼",
};

const difficultyLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Muito Facil", color: "text-green-400" },
  2: { label: "Facil", color: "text-lime-400" },
  3: { label: "Medio", color: "text-yellow-400" },
  4: { label: "Dificil", color: "text-orange-400" },
  5: { label: "Muito Dificil", color: "text-red-400" },
};

export function ExplorationModal({
  site,
  playerTerritories,
  currentTurn,
  currentEra,
  onSend,
  onClose,
}: ExplorationModalProps) {
  // Selected origin territory
  const territoriesWithUnits = playerTerritories.filter(
    (t) => t.units.length > 0 && t.units.some((u) => u.quantity > 0)
  );
  const [selectedFromId, setSelectedFromId] = useState(territoriesWithUnits[0]?.id || "");
  const fromTerritory = playerTerritories.find((t) => t.id === selectedFromId);

  // Unit selection
  const [selectedUnits, setSelectedUnits] = useState<Record<UnitType, number>>({
    SOLDIER: 0,
    ARCHER: 0,
    KNIGHT: 0,
  });

  // UI state
  const [showOriginSelect, setShowOriginSelect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cooldown check
  const cooldownTurnsLeft = useMemo(() => {
    if (site.lastExploredTurn === null) return 0;
    const turnsSinceExplored = currentTurn - site.lastExploredTurn;
    return Math.max(0, site.cooldownTurns - turnsSinceExplored);
  }, [site.lastExploredTurn, site.cooldownTurns, currentTurn]);

  // Available units from selected territory
  const availableUnits = useMemo(() => {
    const available: Record<UnitType, number> = {
      SOLDIER: 0,
      ARCHER: 0,
      KNIGHT: 0,
    };
    if (!fromTerritory) return available;
    for (const unit of fromTerritory.units) {
      if (unit.type in available) {
        available[unit.type as UnitType] = unit.quantity;
      }
    }
    return available;
  }, [fromTerritory]);

  // Calculate expedition stats
  const expeditionStats = useMemo(() => {
    const units: Unit[] = [];
    for (const [type, qty] of Object.entries(selectedUnits)) {
      if (qty > 0) {
        units.push({ type: type as UnitType, quantity: qty });
      }
    }

    const distance = fromTerritory ? getDistance(fromTerritory.position, site.position) : 0;
    const travelTime = units.length > 0 ? getTravelTime(distance, units) : distance;
    const attackPower = getAttackPower(units);
    const totalUnits = units.reduce((sum, u) => sum + u.quantity, 0);

    // Estimate success chance
    const threshold = site.difficulty * 30;
    const successChance = Math.min(100, Math.max(5, Math.floor((attackPower + 50) / threshold * 50)));

    return {
      units,
      distance,
      travelTime,
      attackPower,
      totalUnits,
      successChance,
    };
  }, [selectedUnits, fromTerritory, site.position, site.difficulty]);

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
    setSelectedUnits({
      SOLDIER: 0,
      ARCHER: 0,
      KNIGHT: 0,
    });
  };

  // Send exploration
  const handleSend = () => {
    if (currentEra !== "PEACE") {
      setError("Exploracoes so podem ser enviadas na Era da Paz!");
      return;
    }

    if (cooldownTurnsLeft > 0) {
      setError(`Local em cooldown! Aguarde ${cooldownTurnsLeft} turno(s).`);
      return;
    }

    if (expeditionStats.totalUnits < site.minUnits) {
      setError(`Minimo de ${site.minUnits} unidades necessarias!`);
      return;
    }

    if (!fromTerritory) {
      setError("Selecione um territorio de origem!");
      return;
    }

    const result = onSend(
      fromTerritory.id,
      site.id,
      expeditionStats.units.map((u) => ({ type: u.type, quantity: u.quantity }))
    );

    if (!result.success) {
      setError(result.message);
    } else {
      onClose();
    }
  };

  const siteIcon = siteIcons[site.type] || "🗺️";
  const difficulty = difficultyLabels[site.difficulty] || difficultyLabels[3];

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
          className="w-full max-w-md max-h-[calc(100vh-2rem)] flex flex-col bg-medieval-bg-panel rounded-xl border border-medieval-primary/40 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with site icon */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-medieval-primary/20 to-transparent" />
            <div className="relative p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{siteIcon}</span>
                  <div>
                    <h2 className="font-cinzel font-bold text-lg text-medieval-text-primary">
                      {site.name}
                    </h2>
                    <div className={`text-sm ${difficulty.color}`}>
                      Dificuldade: {difficulty.label}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Storytelling description */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className="p-3 rounded-lg bg-medieval-bg-card/50 border border-medieval-primary/20 italic text-medieval-text-secondary text-sm">
              "{site.description}"
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Rewards preview */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-medieval-bg-deep/50">
              <Gift className="w-5 h-5 text-gold" />
              <div className="flex-1">
                <div className="text-xs text-medieval-text-muted mb-1">Recompensas Possiveis</div>
                <div className="flex gap-3 text-sm">
                  {(site.rewards.grainMax > 0) && (
                    <span className="text-grain">🌾 {site.rewards.grainMin}-{site.rewards.grainMax}</span>
                  )}
                  {(site.rewards.woodMax > 0) && (
                    <span className="text-wood">🪵 {site.rewards.woodMin}-{site.rewards.woodMax}</span>
                  )}
                  {(site.rewards.goldMax > 0) && (
                    <span className="text-gold">💰 {site.rewards.goldMin}-{site.rewards.goldMax}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Risk warning */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-era-war/10 border border-era-war/20">
              <Skull className="w-5 h-5 text-era-war" />
              <div className="text-sm text-era-war">
                <strong>Risco Real:</strong> Fracasso pode causar 50-80% de baixas!
              </div>
            </div>

            {/* Origin selection */}
            <div>
              <div className="text-xs text-medieval-text-muted mb-2">Enviar de</div>
              <button
                onClick={() => territoriesWithUnits.length > 1 && setShowOriginSelect(!showOriginSelect)}
                className={`flex items-center gap-2 w-full p-3 rounded-lg transition-colors ${
                  territoriesWithUnits.length > 1
                    ? "bg-medieval-bg-card hover:bg-medieval-primary/10 cursor-pointer"
                    : "bg-medieval-bg-card cursor-default"
                } border border-medieval-primary/20`}
              >
                <MapPin className="w-4 h-4 text-medieval-primary" />
                <span className="font-cinzel text-medieval-text-primary">
                  {fromTerritory ? `Territorio ${fromTerritory.position + 1}` : "Selecione..."}
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
                    <div className="p-1 space-y-1 max-h-32 overflow-y-auto bg-medieval-bg-card rounded-lg border border-medieval-primary/20">
                      {territoriesWithUnits.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleOriginChange(t.id)}
                          className={`w-full p-2 rounded text-left text-sm transition-colors ${
                            t.id === selectedFromId
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

            {/* Unit selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-sm text-medieval-text-secondary">
                  Selecionar Tropas (min: {site.minUnits})
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
                        ATK: {UNIT_STATS[type].atk} | Velocidade: {UNIT_STATS[type].speed}
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
                  Nenhuma tropa disponivel
                </div>
              )}
            </div>

            {/* Expedition stats */}
            {expeditionStats.totalUnits > 0 && (
              <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-medieval-bg-deep/50 border border-medieval-primary/20">
                <div className="text-center">
                  <Clock className="w-4 h-4 text-medieval-primary mx-auto mb-1" />
                  <div className="text-lg font-mono text-medieval-text-primary">
                    {expeditionStats.travelTime}
                  </div>
                  <div className="text-xs text-medieval-text-muted">turnos (ida)</div>
                </div>
                <div className="text-center">
                  <Compass className="w-4 h-4 text-era-peace mx-auto mb-1" />
                  <div className="text-lg font-mono text-medieval-text-primary">
                    {expeditionStats.attackPower}
                  </div>
                  <div className="text-xs text-medieval-text-muted">poder</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-mono ${
                    expeditionStats.successChance >= 70 ? "text-green-400" :
                    expeditionStats.successChance >= 40 ? "text-yellow-400" :
                    "text-red-400"
                  }`}>
                    ~{expeditionStats.successChance}%
                  </div>
                  <div className="text-xs text-medieval-text-muted">chance</div>
                </div>
              </div>
            )}

            {/* Cooldown warning */}
            {cooldownTurnsLeft > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-500">
                  Local em cooldown. Disponivel em {cooldownTurnsLeft} turno(s).
                </p>
              </div>
            )}

            {/* Not Peace era warning */}
            {currentEra !== "PEACE" && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-era-war/10 border border-era-war/30">
                <AlertTriangle className="w-4 h-4 text-era-war flex-shrink-0" />
                <p className="text-sm text-era-war">
                  Exploracoes so disponiveis na Era da Paz
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-era-war/10 border border-era-war/30">
                <AlertTriangle className="w-4 h-4 text-era-war flex-shrink-0" />
                <p className="text-sm text-era-war">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-2 p-4 border-t border-medieval-primary/20 flex-shrink-0">
            <MedievalButton
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </MedievalButton>
            <MedievalButton
              variant="primary"
              className="flex-1"
              onClick={handleSend}
              disabled={
                currentEra !== "PEACE" ||
                cooldownTurnsLeft > 0 ||
                expeditionStats.totalUnits < site.minUnits
              }
            >
              <Compass className="w-4 h-4 mr-2" />
              Explorar ({expeditionStats.totalUnits}/{site.minUnits})
            </MedievalButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
