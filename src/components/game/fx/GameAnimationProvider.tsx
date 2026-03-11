"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import useGameAnimations from "@/hooks/useGameAnimations";
import { ResourcePopup } from "./ResourcePopup";
import { TurnBanner } from "./TurnBanner";
import { EraTransition } from "./EraTransition";
import { CombatFeedback } from "./CombatFeedback";
import { AchievementToast } from "./AchievementToast";
import { Sparkles } from "./Sparkles";
import { InvasionInfoModal } from "./InvasionInfoModal";
import { useGameStore } from "@/stores/gameStore";
import type { Era, ResourceType } from "@/stores/gameStore";

// Context type
interface GameAnimationContextType {
  triggerResourcePopup: (
    type: ResourceType,
    amount: number,
    position?: { x: number; y: number }
  ) => void;
  triggerTurnBanner: (turn: number) => void;
  triggerEraTransition: (era: Era) => void;
  triggerCombatFeedback: (
    victory: boolean,
    fromTerritory: number,
    toTerritory: number
  ) => void;
  triggerBuildComplete: (
    territoryId: string,
    structureType: string,
    position?: { x: number; y: number }
  ) => void;
  triggerCollectAnimation: (
    type: ResourceType,
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => void;
  triggerAchievement: (title: string, description: string) => void;
}

const GameAnimationContext = createContext<GameAnimationContextType | null>(null);

// Hook to use animation context
export function useGameAnimationContext() {
  const context = useContext(GameAnimationContext);
  if (!context) {
    throw new Error(
      "useGameAnimationContext must be used within GameAnimationProvider"
    );
  }
  return context;
}

// Resource popup position defaults
const RESOURCE_POPUP_POSITIONS: Record<ResourceType, { x: number; y: number }> = {
  GRAIN: { x: 100, y: 80 },
  WOOD: { x: 200, y: 80 },
  GOLD: { x: 300, y: 80 },
};

interface GameAnimationProviderProps {
  children: ReactNode;
}

export function GameAnimationProvider({ children }: GameAnimationProviderProps) {
  const [showInvasionModal, setShowInvasionModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invasionModalShown = useGameStore((state: any) => state.invasionModalShown as boolean);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markInvasionModalShown = useGameStore((state: any) => state.markInvasionModalShown as () => void);

  // Track when an INVASION era transition was in progress so we show
  // the modal after the overlay disappears (not during the animation)
  const pendingInvasionModal = useRef(false);

  const handleCloseInvasionModal = useCallback(() => {
    setShowInvasionModal(false);
  }, []);

  const {
    // State
    resourceChanges,
    showTurnBanner,
    turnNumber,
    showEraTransition,
    newEra,
    combatResult,
    buildEvents,
    achievements,
    // Triggers
    triggerResourcePopup,
    triggerTurnBanner,
    triggerEraTransition,
    triggerCombatFeedback,
    triggerBuildComplete,
    triggerCollectAnimation,
    triggerAchievement,
    dismissAchievement,
  } = useGameAnimations();

  // When INVASION era transition starts, mark it as pending
  useEffect(() => {
    if (showEraTransition && newEra === "INVASION" && !invasionModalShown) {
      pendingInvasionModal.current = true;
    }
  }, [showEraTransition, newEra, invasionModalShown]);

  // When the era transition overlay is gone and we have a pending INVASION modal, show it
  useEffect(() => {
    if (!showEraTransition && pendingInvasionModal.current) {
      pendingInvasionModal.current = false;
      setShowInvasionModal(true);
      markInvasionModalShown();
    }
  }, [showEraTransition, markInvasionModalShown]);

  // Context value
  const contextValue: GameAnimationContextType = {
    triggerResourcePopup,
    triggerTurnBanner,
    triggerEraTransition,
    triggerCombatFeedback,
    triggerBuildComplete,
    triggerCollectAnimation,
    triggerAchievement,
  };

  return (
    <GameAnimationContext.Provider value={contextValue}>
      {children}

      {/* Resource Popups */}
      <AnimatePresence>
        {resourceChanges.map((change) => (
          <ResourcePopup
            key={change.id}
            id={change.id}
            amount={change.amount}
            type={change.type}
            position={change.position || RESOURCE_POPUP_POSITIONS[change.type]}
          />
        ))}
      </AnimatePresence>

      {/* Turn Banner */}
      <TurnBanner turn={turnNumber} isVisible={showTurnBanner} />

      {/* Era Transition */}
      {newEra && (
        <EraTransition era={newEra} isVisible={showEraTransition} />
      )}

      {/* Invasion Info Modal (F-049) */}
      <InvasionInfoModal isVisible={showInvasionModal} onClose={handleCloseInvasionModal} />

      {/* Combat Feedback */}
      <CombatFeedback
        isActive={!!combatResult}
        result={combatResult ? (combatResult.victory ? "victory" : "defeat") : null}
      />

      {/* Build Complete Sparkles */}
      <AnimatePresence>
        {buildEvents.map((event) => (
          <div
            key={event.territoryId}
            className="fixed pointer-events-none z-40"
            style={{
              left: event.position?.x || "50%",
              top: event.position?.y || "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Sparkles color="#d4a574" count={12} />
          </div>
        ))}
      </AnimatePresence>

      {/* Achievement Toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {achievements.map((achievement) => (
            <AchievementToast
              key={achievement.id}
              id={achievement.id}
              title={achievement.title}
              description={achievement.description}
              isVisible={true}
              onComplete={() => dismissAchievement(achievement.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </GameAnimationContext.Provider>
  );
}

export default GameAnimationProvider;
