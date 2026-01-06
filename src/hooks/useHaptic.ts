"use client";

import { useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

type HapticPattern = "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection";

interface UseHapticReturn {
  /** Trigger haptic feedback */
  vibrate: (pattern?: HapticPattern) => void;
  /** Whether haptic feedback is supported */
  isSupported: boolean;
}

// Vibration patterns in milliseconds
const patterns: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [50, 100, 50, 100, 50],
  selection: 5,
};

export function useHaptic(): UseHapticReturn {
  const reducedMotion = useReducedMotion();
  
  const isSupported = typeof navigator !== "undefined" && "vibrate" in navigator;

  const vibrate = useCallback((pattern: HapticPattern = "medium") => {
    // Skip haptics if reduced motion is preferred
    if (reducedMotion) return;
    
    if (!isSupported) return;

    try {
      const vibrationPattern = patterns[pattern];
      navigator.vibrate(vibrationPattern);
    } catch {
      // Silently fail - haptics are nice-to-have
    }
  }, [isSupported, reducedMotion]);

  return {
    vibrate,
    isSupported,
  };
}

/**
 * Convenience function for triggering haptic feedback
 * Can be used outside of React components
 */
export function triggerHaptic(pattern: HapticPattern = "medium"): void {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  
  // Check for reduced motion preference
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  try {
    const vibrationPattern = patterns[pattern];
    navigator.vibrate(vibrationPattern);
  } catch {
    // Silently fail
  }
}
