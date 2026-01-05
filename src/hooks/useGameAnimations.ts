"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useGameStore, type Era, type ResourceType } from "@/stores/gameStore";

// Types for animation events
export interface ResourceChange {
  id: string;
  type: ResourceType;
  amount: number;
  position?: { x: number; y: number };
}

export interface CombatResult {
  victory: boolean;
  fromTerritory: number;
  toTerritory: number;
}

export interface BuildEvent {
  territoryId: string;
  structureType: string;
  position?: { x: number; y: number };
}

export interface CollectEvent {
  id: string;
  type: ResourceType;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export interface AchievementEvent {
  id: string;
  title: string;
  description: string;
}

interface AnimationState {
  resourceChanges: ResourceChange[];
  showTurnBanner: boolean;
  turnNumber: number;
  showEraTransition: boolean;
  newEra: Era | null;
  combatResult: CombatResult | null;
  buildEvents: BuildEvent[];
  collectEvents: CollectEvent[];
  achievements: AchievementEvent[];
}

export function useGameAnimations() {
  // Track previous values to detect changes
  const prevTurn = useRef<number>(1);
  const prevEra = useRef<Era>("PEACE");
  const prevResources = useRef<{ grain: number; wood: number; gold: number }>({
    grain: 100,
    wood: 50,
    gold: 30,
  });

  // Animation state
  const [animationState, setAnimationState] = useState<AnimationState>({
    resourceChanges: [],
    showTurnBanner: false,
    turnNumber: 1,
    showEraTransition: false,
    newEra: null,
    combatResult: null,
    buildEvents: [],
    collectEvents: [],
    achievements: [],
  });

  // Get game state
  const currentTurn = useGameStore((state) => state.currentTurn);
  const currentEra = useGameStore((state) => state.currentEra);
  const getPlayerClan = useGameStore((state) => state.getPlayerClan);

  // Generate unique ID
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Trigger resource popup animation
  const triggerResourcePopup = useCallback(
    (type: ResourceType, amount: number, position?: { x: number; y: number }) => {
      const change: ResourceChange = {
        id: generateId(),
        type,
        amount,
        position,
      };

      setAnimationState((prev) => ({
        ...prev,
        resourceChanges: [...prev.resourceChanges, change],
      }));

      // Auto-remove after animation completes
      setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          resourceChanges: prev.resourceChanges.filter((c) => c.id !== change.id),
        }));
      }, 1500);
    },
    []
  );

  // Trigger turn banner
  const triggerTurnBanner = useCallback((turn: number) => {
    setAnimationState((prev) => ({
      ...prev,
      showTurnBanner: true,
      turnNumber: turn,
    }));

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showTurnBanner: false,
      }));
    }, 2500);
  }, []);

  // Trigger era transition
  const triggerEraTransition = useCallback((era: Era) => {
    setAnimationState((prev) => ({
      ...prev,
      showEraTransition: true,
      newEra: era,
    }));

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showEraTransition: false,
        newEra: null,
      }));
    }, 3500);
  }, []);

  // Trigger combat feedback
  const triggerCombatFeedback = useCallback(
    (victory: boolean, fromTerritory: number, toTerritory: number) => {
      setAnimationState((prev) => ({
        ...prev,
        combatResult: { victory, fromTerritory, toTerritory },
      }));

      setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          combatResult: null,
        }));
      }, 600);
    },
    []
  );

  // Trigger build complete animation
  const triggerBuildComplete = useCallback(
    (territoryId: string, structureType: string, position?: { x: number; y: number }) => {
      const event: BuildEvent = {
        territoryId,
        structureType,
        position,
      };

      setAnimationState((prev) => ({
        ...prev,
        buildEvents: [...prev.buildEvents, event],
      }));

      setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          buildEvents: prev.buildEvents.filter((e) => e.territoryId !== territoryId),
        }));
      }, 800);
    },
    []
  );

  // Trigger collect animation (coin-collect style)
  const triggerCollectAnimation = useCallback(
    (type: ResourceType, from: { x: number; y: number }, to: { x: number; y: number }) => {
      const event: CollectEvent = {
        id: generateId(),
        type,
        from,
        to,
      };

      setAnimationState((prev) => ({
        ...prev,
        collectEvents: [...prev.collectEvents, event],
      }));

      setTimeout(() => {
        setAnimationState((prev) => ({
          ...prev,
          collectEvents: prev.collectEvents.filter((e) => e.id !== event.id),
        }));
      }, 1000);
    },
    []
  );

  // Trigger achievement toast
  const triggerAchievement = useCallback((title: string, description: string) => {
    const achievement: AchievementEvent = {
      id: generateId(),
      title,
      description,
    };

    setAnimationState((prev) => ({
      ...prev,
      achievements: [...prev.achievements, achievement],
    }));

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        achievements: prev.achievements.filter((a) => a.id !== achievement.id),
      }));
    }, 4000);
  }, []);

  // Remove specific achievement
  const dismissAchievement = useCallback((id: string) => {
    setAnimationState((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  }, []);

  // Watch for turn changes
  useEffect(() => {
    if (currentTurn !== prevTurn.current && currentTurn > 1) {
      // Turn changed - trigger banner
      triggerTurnBanner(currentTurn);

      // Check for resource production
      const player = getPlayerClan();
      const prevRes = prevResources.current;

      const grainDiff = player.grain - prevRes.grain;
      const woodDiff = player.wood - prevRes.wood;
      const goldDiff = player.gold - prevRes.gold;

      // Trigger resource popups for production
      if (grainDiff !== 0) {
        setTimeout(() => triggerResourcePopup("GRAIN", grainDiff), 500);
      }
      if (woodDiff !== 0) {
        setTimeout(() => triggerResourcePopup("WOOD", woodDiff), 700);
      }
      if (goldDiff !== 0) {
        setTimeout(() => triggerResourcePopup("GOLD", goldDiff), 900);
      }

      // Update previous values
      prevResources.current = {
        grain: player.grain,
        wood: player.wood,
        gold: player.gold,
      };
      prevTurn.current = currentTurn;
    }
  }, [currentTurn, getPlayerClan, triggerResourcePopup, triggerTurnBanner]);

  // Watch for era changes
  useEffect(() => {
    if (currentEra !== prevEra.current) {
      triggerEraTransition(currentEra);
      prevEra.current = currentEra;

      // Achievement for surviving to next era
      const eraNames: Record<Era, string> = {
        PEACE: "Era da Paz",
        WAR: "Era da Guerra",
        INVASION: "Era da Invasao",
      };

      if (currentEra === "WAR") {
        triggerAchievement("Nova Era", `Voce entrou na ${eraNames[currentEra]}!`);
      } else if (currentEra === "INVASION") {
        triggerAchievement("A Horda Chega", "Sobreviva a invasao final!");
      }
    }
  }, [currentEra, triggerEraTransition, triggerAchievement]);

  return {
    // State
    ...animationState,

    // Triggers
    triggerResourcePopup,
    triggerTurnBanner,
    triggerEraTransition,
    triggerCombatFeedback,
    triggerBuildComplete,
    triggerCollectAnimation,
    triggerAchievement,
    dismissAchievement,
  };
}

export default useGameAnimations;
