"use client";

import { useState } from "react";
import { X, MapPin, Building2, Users, Wheat, Trees, Coins, Sword, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton } from "@/components/ui/medieval";
import { useHaptic } from "@/hooks/useHaptic";
import { UI } from "@/game/constants/balance";
import { STRUCTURES } from "@/game/constants/structures";
import { getProportionalCostWarnings, UNIT_COSTS, type CostWarning } from "@/stores/gameStore";

type ResourceCost = { grain?: number; wood?: number; gold?: number };

const UNIT_PREREQS: Record<string, { structure: string; label: string }> = {
  SOLDIER: { structure: "BARRACKS", label: "Quartel" },
  ARCHER:  { structure: "BARRACKS", label: "Quartel" },
  KNIGHT:  { structure: "STABLE",   label: "Estábulo" },
  SPY:     { structure: "SHADOW_GUILD", label: "Guilda das Sombras" },
};

const UNIT_NAMES: Record<string, string> = {
  SOLDIER: "Soldado",
  ARCHER:  "Arqueiro",
  KNIGHT:  "Cavaleiro",
  SPY:     "Espião",
};

const UNIT_ICONS: Record<string, string> = {
  SOLDIER: "🗡️",
  ARCHER:  "🏹",
  KNIGHT:  "🐴",
  SPY:     "🕵️",
};
type Resources = { grain: number; wood: number; gold: number };

function canAfford(cost: ResourceCost | undefined, resources: Resources | undefined): boolean {
  if (!cost || !resources) return true;
  if ((cost.grain ?? 0) > resources.grain) return false;
  if ((cost.wood ?? 0) > resources.wood) return false;
  if ((cost.gold ?? 0) > resources.gold) return false;
  return true;
}

function getMissingLabel(cost: ResourceCost, resources: Resources): string {
  const missing: string[] = [];
  const diff = (a: number | undefined, b: number) => (a ?? 0) - b;
  if (diff(cost.grain, resources.grain) > 0) missing.push(`${diff(cost.grain, resources.grain)} grão`);
  if (diff(cost.wood, resources.wood) > 0) missing.push(`${diff(cost.wood, resources.wood)} madeira`);
  if (diff(cost.gold, resources.gold) > 0) missing.push(`${diff(cost.gold, resources.gold)} ouro`);
  return missing.length > 0 ? `Faltam: ${missing.join(", ")}` : "";
}

const RESOURCE_COLOR: Record<string, string> = {
  GRAIN: "text-amber-400",
  WOOD:  "text-emerald-400",
  GOLD:  "text-yellow-400",
};

const RESOURCE_LABEL: Record<string, string> = {
  GRAIN: "grão",
  WOOD:  "madeira",
  GOLD:  "ouro",
};

function getStructureLabelData(
  structureType: string,
  level: number
): { label: string; colorClass: string } {
  const def = STRUCTURES[structureType];
  if (!def) return { label: "", colorClass: "text-medieval-text-muted" };

  if (def.type === "production" && def.produces && def.productionPerLevel) {
    const res = def.produces as string;
    const color = RESOURCE_COLOR[res] ?? "text-medieval-text-muted";
    const resName = RESOURCE_LABEL[res] ?? res.toLowerCase();
    const currentProd = def.productionPerLevel[level - 1] ?? def.productionPerLevel[0];
    const nextProd =
      level < def.productionPerLevel.length ? def.productionPerLevel[level] : undefined;
    const label =
      nextProd !== undefined
        ? `+${nextProd} ${resName}/turno (atual: +${currentProd})`
        : `+${currentProd} ${resName}/turno`;
    return { label, colorClass: color };
  }

  if (def.type === "military" && def.unlocks) {
    const names = def.unlocks.map((u) => UNIT_NAMES[u] ?? u).join(", ");
    return { label: `Desbloqueia: ${names}`, colorClass: "text-medieval-text-muted" };
  }

  if (def.type === "defense" && def.defenseBonusPerLevel !== undefined) {
    return {
      label: `Defesa: +${def.defenseBonusPerLevel * 100}% por nível`,
      colorClass: "text-blue-400",
    };
  }

  if (def.type === "special") {
    if (def.cardIntervalTurns) {
      return {
        label: `Gera cartas a cada ${def.cardIntervalTurns} turnos`,
        colorClass: "text-purple-400",
      };
    }
    if (def.unlocks) {
      const names = def.unlocks.map((u) => UNIT_NAMES[u] ?? u).join(", ");
      return { label: `Desbloqueia: ${names}`, colorClass: "text-medieval-text-muted" };
    }
  }

  return { label: def.description, colorClass: "text-medieval-text-muted" };
}

interface Territory {
  id: string;
  name: string;
  position: number;
  bonusResource: "grain" | "wood" | "gold" | null;
  ownerId?: string;
}

interface Structure {
  id: string;
  type: string;
  level: number;
}

type Era = "PEACE" | "WAR" | "INVASION";

interface TerritoryBottomSheetProps {
  /** Selected territory */
  territory: Territory | null;
  /** Structures in the territory */
  structures?: Structure[];
  /** Whether player owns this territory */
  isOwned?: boolean;
  /** Current game era */
  currentEra?: Era;
  /** Whether player has ≥1 territory with military units */
  playerHasTroops?: boolean;
  /** Player's current resources (used for proportional cost warnings) */
  playerResources?: { grain: number; wood: number; gold: number };
  /** Representative cost for build action (used for proportional cost warnings) */
  buildCost?: { grain?: number; wood?: number; gold?: number };
  /** Representative cost for train action (used for proportional cost warnings) */
  trainCost?: { grain?: number; wood?: number; gold?: number };
  /** Called when sheet should close */
  onClose: () => void;
  /** Called when build action is selected */
  onBuild?: () => void;
  /** Called when train action is selected (generic fallback) */
  onTrain?: () => void;
  /** Called when train unit action is selected for a specific unit type */
  onTrainUnit?: (unitType: string) => void;
  /** Called when attack action is selected (enemy territory only) */
  onAttack?: (territory: Territory) => void;
  /** Additional class names */
  className?: string;
}

const bonusIcons = {
  grain: Wheat,
  wood: Trees,
  gold: Coins,
};

const bonusLabels = {
  grain: "Grao",
  wood: "Madeira",
  gold: "Ouro",
};

export function TerritoryBottomSheet({
  territory,
  structures = [],
  isOwned = false,
  currentEra = "PEACE",
  playerHasTroops = false,
  playerResources,
  buildCost,
  trainCost,
  onClose,
  onBuild,
  onTrain,
  onTrainUnit,
  onAttack,
  className = "",
}: TerritoryBottomSheetProps) {
  const { vibrate } = useHaptic();
  const [pendingAction, setPendingAction] = useState<"build" | "train" | null>(null);
  const [warnings, setWarnings] = useState<CostWarning[]>([]);

  const handleClose = () => {
    vibrate("light");
    onClose();
  };

  const handleBuild = () => {
    if (buildDisabled) return;
    vibrate("medium");
    if (playerResources && buildCost) {
      const w = getProportionalCostWarnings(buildCost, playerResources);
      if (w.length > 0) {
        setWarnings(w);
        setPendingAction("build");
        return;
      }
    }
    onBuild?.();
  };

  const handleTrain = () => {
    vibrate("medium");
    if (playerResources && trainCost) {
      const w = getProportionalCostWarnings(trainCost, playerResources);
      if (w.length > 0) {
        setWarnings(w);
        setPendingAction("train");
        return;
      }
    }
    onTrain?.();
  };

  const handleConfirmAction = () => {
    vibrate("medium");
    const action = pendingAction;
    setPendingAction(null);
    setWarnings([]);
    if (action === "build") onBuild?.();
    else if (action === "train") onTrain?.();
  };

  const handleCancelAction = () => {
    vibrate("light");
    setPendingAction(null);
    setWarnings([]);
  };

  const handleAttack = () => {
    if (!territory) return;
    vibrate("heavy");
    onAttack?.(territory);
  };

  const BonusIcon = territory?.bonusResource ? bonusIcons[territory.bonusResource] : null;

  // F-033: canAfford checks and missing resource labels
  const isTerritoryFull = structures.length >= UI.MAX_STRUCTURE_SLOTS;
  const buildCanAfford = canAfford(buildCost, playerResources);
  const buildDisabled = isTerritoryFull || !buildCanAfford;
  const buildMissingMsg =
    !isTerritoryFull && !buildCanAfford && buildCost && playerResources
      ? getMissingLabel(buildCost, playerResources)
      : "";

  // Compute inline warnings for build/train buttons (F-032)
  // Only show proportional warning when the player CAN afford the action
  const buildWarnings = !buildDisabled && playerResources && buildCost
    ? getProportionalCostWarnings(buildCost, playerResources)
    : [];
  const trainWarnings = playerResources && trainCost
    ? getProportionalCostWarnings(trainCost, playerResources)
    : [];

  const makeCostTooltip = (ws: typeof buildWarnings) =>
    ws.map((w) => `Custo elevado — usa ${Math.round(w.percent)}% do seu estoque de ${w.resourceLabel}`).join(" | ");

  return (
    <AnimatePresence>
      {territory && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                handleClose();
              }
            }}
            className={`
              fixed bottom-[60px] left-0 right-0 z-35
              bg-medieval-bg-panel rounded-t-2xl
              border-t border-x border-medieval-primary/30
              lg:hidden
              ${className}
            `}
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-medieval-text-muted/30 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-3 p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="px-4 pb-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-medieval-bg-card">
                  <MapPin className="w-5 h-5 text-medieval-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel text-medieval-text-primary font-semibold">
                    {territory.name}
                  </h3>
                  <p className="text-sm text-medieval-text-muted">
                    Posicao {territory.position}
                  </p>
                </div>
              </div>

              {/* Bonus Resource */}
              {BonusIcon && territory.bonusResource && (
                <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-medieval-bg-card/50">
                  <BonusIcon className="w-4 h-4 text-medieval-primary" />
                  <span className="text-sm text-medieval-text-secondary">
                    Bonus: +2 {bonusLabels[territory.bonusResource]}
                  </span>
                </div>
              )}

              {/* Structures */}
              {structures.length > 0 && (
                <div className="mb-4">
                  {(() => {
                    const MAX_SLOTS = UI.MAX_STRUCTURE_SLOTS;
                    const count = structures.length;
                    const slotColor =
                      count <= 2 ? "text-green-400" :
                      count === 3 ? "text-yellow-400" :
                      "text-red-400";
                    return (
                      <h4 className="text-sm font-semibold text-medieval-text-secondary mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Estruturas{" "}
                        <span className={slotColor}>({count}/{MAX_SLOTS} slots)</span>
                      </h4>
                    );
                  })()}
                  <div className="grid grid-cols-2 gap-2">
                    {structures.map((structure) => {
                      const def = STRUCTURES[structure.type];
                      const { label, colorClass } = getStructureLabelData(structure.type, structure.level);
                      return (
                        <div
                          key={structure.id}
                          className="p-2 rounded-lg bg-medieval-bg-card text-sm"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-medieval-text-primary">
                              {def?.name ?? structure.type}
                            </span>
                            <span className="text-medieval-text-muted text-xs">Nv.{structure.level}</span>
                          </div>
                          {label && (
                            <p className={`text-xs mt-0.5 leading-tight ${colorClass}`}>
                              {label}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* F-036: Current territory production summary */}
              {isOwned && (() => {
                const production = { grain: 0, wood: 0, gold: 0 };
                const resourceMap: Record<string, keyof typeof production> = {
                  GRAIN: "grain", WOOD: "wood", GOLD: "gold",
                };
                for (const s of structures) {
                  const def = STRUCTURES[s.type];
                  if (def?.type === "production" && def.produces && def.productionPerLevel) {
                    const res = resourceMap[def.produces as string];
                    if (res) {
                      production[res] += def.productionPerLevel[s.level - 1] ?? def.productionPerLevel[0] ?? 0;
                    }
                  }
                }
                return (
                  <div className="mb-3 px-1 py-1.5 rounded-lg bg-medieval-bg-card/40 border border-medieval-primary/10">
                    <p className="text-xs text-medieval-text-muted font-medium">
                      Produção atual:{" "}
                      <span className="text-amber-400">🌾{production.grain}/t</span>
                      {"  "}
                      <span className="text-emerald-400">🪵{production.wood}/t</span>
                      {"  "}
                      <span className="text-yellow-400">💰{production.gold}/t</span>
                    </p>
                  </div>
                );
              })()}

              {/* Actions */}
              {isOwned && (
                <div className="flex flex-col gap-1.5">
                  {/* Territory full message (F-033) */}
                  {isTerritoryFull && (
                    <p className="text-xs text-red-400 text-center font-medium">
                      Território lotado (4/4 estruturas)
                    </p>
                  )}
                  <div className="flex gap-2">
                    {/* Build button */}
                    <div className="flex-1 flex flex-col gap-1">
                      <MedievalButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={handleBuild}
                        disabled={buildDisabled}
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        Construir
                        {buildWarnings.length > 0 && (
                          <span
                            title={makeCostTooltip(buildWarnings)}
                            className="ml-1.5 inline-flex items-center"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                      </MedievalButton>
                      {/* Missing resources label (F-033) */}
                      {buildMissingMsg && (
                        <p className="text-xs text-red-400 text-center leading-tight">
                          {buildMissingMsg}
                        </p>
                      )}
                    </div>
                    {/* Per-unit training section (F-034) */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="text-xs text-medieval-text-muted font-semibold flex items-center gap-1 px-0.5">
                        <Users className="w-3 h-3" />
                        Treinar
                      </div>
                      {(["SOLDIER", "ARCHER", "KNIGHT", "SPY"] as const).map((unitType) => {
                        const prereq = UNIT_PREREQS[unitType];
                        const cost = UNIT_COSTS[unitType];
                        const hasPrereq = structures.some((s) => s.type === prereq.structure);
                        const unitCanAfford = canAfford(cost, playerResources);
                        const unitDisabled = !hasPrereq || !unitCanAfford;
                        const missingMsg = !hasPrereq
                          ? `Requer: ${prereq.label}`
                          : !unitCanAfford && playerResources
                          ? getMissingLabel(cost, playerResources)
                          : "";
                        return (
                          <div key={unitType} className="flex items-center gap-1.5">
                            <span className="text-sm leading-none">{UNIT_ICONS[unitType]}</span>
                            <span className="flex-1 text-xs text-medieval-text-secondary truncate">
                              {UNIT_NAMES[unitType]}
                            </span>
                            {missingMsg && (
                              <span className="text-[10px] text-red-400 leading-tight truncate max-w-[80px]" title={missingMsg}>
                                {missingMsg}
                              </span>
                            )}
                            <button
                              disabled={unitDisabled}
                              onClick={() => onTrainUnit ? onTrainUnit(unitType) : onTrain?.()}
                              title={missingMsg || undefined}
                              className={`
                                px-2 py-0.5 rounded text-xs font-medium border transition-colors
                                ${unitDisabled
                                  ? "opacity-50 cursor-not-allowed bg-gray-700/50 border-gray-600/50 text-gray-400"
                                  : "bg-medieval-primary/20 border-medieval-primary/40 text-medieval-primary hover:bg-medieval-primary/30"
                                }
                              `}
                            >
                              +1
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {!isOwned && territory.ownerId && (() => {
                const isWarEra = currentEra === "WAR" || currentEra === "INVASION";
                const attackDisabled = !isWarEra || !playerHasTroops;
                const tooltip = !isWarEra
                  ? "Ataques disponíveis na Era da Guerra"
                  : !playerHasTroops
                  ? "Recrute unidades para atacar"
                  : undefined;

                return (
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-era-war/10 border border-era-war/30">
                      <p className="text-xs text-era-war">Território inimigo</p>
                    </div>
                    <div className="relative">
                      <MedievalButton
                        variant="primary"
                        size="sm"
                        className={`w-full ${attackDisabled ? "opacity-50 cursor-not-allowed bg-gray-600 border-gray-500 hover:bg-gray-600" : "bg-red-700 border-red-600 hover:bg-red-600"}`}
                        onClick={attackDisabled ? undefined : handleAttack}
                        title={tooltip}
                      >
                        <Sword className="w-4 h-4 mr-2" />
                        Atacar
                      </MedievalButton>
                      {tooltip && (
                        <p className="text-xs text-medieval-text-muted mt-1 text-center">
                          {tooltip}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {!isOwned && !territory.ownerId && (
                <MedievalButton
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={handleBuild}
                >
                  Conquistar
                </MedievalButton>
              )}
            </div>
          </motion.div>
        </>
      )}

      {/* Proportional Cost Warning Modal */}
      {pendingAction && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            onClick={handleCancelAction}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-24 z-50 rounded-xl bg-amber-900/95 border border-amber-500/60 p-4 shadow-xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-cinzel font-semibold text-amber-200 text-sm">
                  Recursos Insuficientes
                </h4>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  Esta ação consumirá uma parte significativa dos seus recursos:
                </p>
              </div>
            </div>

            {/* Resource percentages */}
            <div className="space-y-2 mb-4">
              {warnings.map((w) => (
                <div key={w.resource} className="flex items-center justify-between bg-amber-800/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    {w.resource === "grain" && <Wheat className="w-4 h-4 text-amber-300" />}
                    {w.resource === "wood" && <Trees className="w-4 h-4 text-amber-300" />}
                    {w.resource === "gold" && <Coins className="w-4 h-4 text-amber-300" />}
                    <span className="text-sm text-amber-200">{w.resourceLabel}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-400">
                    {Math.round(w.percent)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <MedievalButton
                variant="primary"
                size="sm"
                className="flex-1 bg-amber-700 border-amber-600 hover:bg-amber-600 font-semibold"
                onClick={handleCancelAction}
              >
                Cancelar
              </MedievalButton>
              <MedievalButton
                variant="ghost"
                size="sm"
                className="flex-1 text-amber-300 border-amber-700/50 hover:bg-amber-800/50"
                onClick={handleConfirmAction}
              >
                Confirmar
              </MedievalButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
