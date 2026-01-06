/**
 * Custom Hooks
 * Dice&Cards Era
 */

export { useGameAnimations } from "./useGameAnimations";
export type {
  ResourceChange,
  CombatResult,
  BuildEvent,
  CollectEvent,
  AchievementEvent,
} from "./useGameAnimations";

export { useReducedMotion } from "./useReducedMotion";

// PWA hooks
export { usePWAInstall } from "./usePWAInstall";
export { useHaptic, triggerHaptic } from "./useHaptic";
