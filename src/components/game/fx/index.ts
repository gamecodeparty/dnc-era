/**
 * Game FX Components - Visual feedback animations
 * Dice&Cards Era
 */

// Animation Provider (wraps game with all FX)
export { GameAnimationProvider, useGameAnimationContext } from "./GameAnimationProvider";

// Resource feedback
export { ResourcePopup, ResourcePopupManager } from "./ResourcePopup";
export type { ResourceType } from "./ResourcePopup";

// Particle effects
export { Sparkles, DirectionalSparkles, StarSparkle } from "./Sparkles";

// Turn feedback
export { TurnBanner, TurnIndicator } from "./TurnBanner";

// Era transitions
export { EraTransition, EraBadge } from "./EraTransition";
export type { EraType } from "./EraTransition";

// Combat feedback
export { CombatFeedback, CombatResult, CombatInitiation } from "./CombatFeedback";

// Collect animations
export {
  CollectAnimation,
  ResourceCollect,
  MultiCollect,
  StarCollect,
  CollectManager,
} from "./CollectAnimation";

// Achievement system
export {
  AchievementToast,
  AchievementQueue,
  GameNotification,
} from "./AchievementToast";
export type { AchievementType } from "./AchievementToast";
