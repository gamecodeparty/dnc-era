"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, ChevronRight } from "lucide-react";
import { useTutorialStore } from "@/stores/tutorialStore";
import type { Territory } from "@/stores/gameStore";

interface TutorialStep {
  id: string;
  stepNumber: number;
  message: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    message:
      "Construa uma estrutura de produção (Farm, Sawmill ou Mine) para gerar recursos.",
  },
  {
    id: "step-2",
    stepNumber: 2,
    message: "Construa um Barracks para recrutar soldados.",
  },
  {
    id: "step-3",
    stepNumber: 3,
    message: "Recrute pelo menos 3 soldados.",
  },
  {
    id: "step-4",
    stepNumber: 4,
    message:
      "Wall reduz dano recebido. Construa uma em territórios de fronteira.",
  },
  {
    id: "step-5",
    stepNumber: 5,
    message: "A paz acabou! Clique num território inimigo para atacar.",
  },
];

function isTriggerMet(
  stepNumber: number,
  playerTerritories: Territory[],
  currentEra: string
): boolean {
  switch (stepNumber) {
    case 1:
      return true;
    case 2:
      return playerTerritories.some((t) => t.structures.length > 0);
    case 3:
      return playerTerritories.some((t) =>
        t.structures.some((s) => s.type === "BARRACKS")
      );
    case 4: {
      const totalUnits = playerTerritories.reduce(
        (sum, t) => sum + t.units.reduce((s, u) => s + u.quantity, 0),
        0
      );
      return totalUnits >= 3;
    }
    case 5:
      return currentEra === "WAR" || currentEra === "INVASION";
    default:
      return false;
  }
}

interface TutorialOverlayProps {
  currentTurn: number;
  territories: Territory[];
  currentEra: string;
}

export function TutorialOverlay({
  territories,
  currentEra,
}: TutorialOverlayProps) {
  const { completed, currentStep, advanceStep, skipAll } = useTutorialStore();

  if (completed) return null;

  const step = TUTORIAL_STEPS.find((s) => s.stepNumber === currentStep);
  if (!step) return null;

  const playerTerritories = territories.filter((t) => t.ownerId === "player");
  const triggerMet = isTriggerMet(currentStep, playerTerritories, currentEra);

  if (!triggerMet) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full px-2 sm:px-4 py-2"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 bg-medieval-bg-panel/95 border border-medieval-primary/50 rounded-lg px-3 py-2.5 shadow-lg backdrop-blur-sm">
          {/* Mission icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-medieval-primary/20 border border-medieval-primary/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-medieval-primary" />
            </div>
          </div>

          {/* Step badge + message */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-cinzel font-bold text-medieval-primary uppercase tracking-wide">
                Missão {currentStep}/5
              </span>
            </div>
            <p className="text-sm font-crimson text-medieval-text-primary leading-snug">
              {step.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={advanceStep}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-medieval-primary/20 border border-medieval-primary/40 text-medieval-primary text-xs font-cinzel hover:bg-medieval-primary/30 transition-colors"
            >
              Entendi
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={skipAll}
              className="flex items-center justify-center w-7 h-7 rounded border border-medieval-text-muted/30 text-medieval-text-muted hover:text-medieval-text-secondary hover:border-medieval-text-muted/50 transition-colors"
              title="Pular tutorial"
              aria-label="Pular tutorial"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
