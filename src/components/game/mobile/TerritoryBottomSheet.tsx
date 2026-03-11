"use client";

import { X, MapPin, Building2, Users, Wheat, Trees, Coins, Sword } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton } from "@/components/ui/medieval";
import { useHaptic } from "@/hooks/useHaptic";
import { UI } from "@/game/constants/balance";
import { STRUCTURES, getStructureLabel } from "@/game/constants/structures";

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
  /** Called when sheet should close */
  onClose: () => void;
  /** Called when build action is selected */
  onBuild?: () => void;
  /** Called when train action is selected */
  onTrain?: () => void;
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
  onClose,
  onBuild,
  onTrain,
  onAttack,
  className = "",
}: TerritoryBottomSheetProps) {
  const { vibrate } = useHaptic();

  const handleClose = () => {
    vibrate("light");
    onClose();
  };

  const handleBuild = () => {
    vibrate("medium");
    onBuild?.();
  };

  const handleTrain = () => {
    vibrate("medium");
    onTrain?.();
  };

  const handleAttack = () => {
    if (!territory) return;
    vibrate("heavy");
    onAttack?.(territory);
  };

  const BonusIcon = territory?.bonusResource ? bonusIcons[territory.bonusResource] : null;

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
                      const label = getStructureLabel(structure.type, structure.level);
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
                            <p className="text-xs text-medieval-text-muted mt-0.5 leading-tight">
                              {label}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              {isOwned && (
                <div className="flex gap-2">
                  <MedievalButton
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={handleBuild}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Construir
                  </MedievalButton>
                  <MedievalButton
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={handleTrain}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Treinar
                  </MedievalButton>
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
    </AnimatePresence>
  );
}
