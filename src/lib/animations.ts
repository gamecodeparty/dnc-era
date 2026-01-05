/**
 * Framer Motion Animation Variants
 * Dice&Cards Era - Medieval Dark Fantasy
 */

import { Variants, Transition } from "framer-motion";

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
  // Fast micro-interactions
  micro: { duration: 0.15, ease: "easeOut" } as Transition,

  // Standard component transitions
  standard: { duration: 0.3, ease: "easeInOut" } as Transition,

  // Page transitions
  page: { duration: 0.4, ease: "easeInOut" } as Transition,

  // Dramatic game events
  dramatic: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } as Transition,

  // Spring for bouncy effects
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  } as Transition,

  // Spring for smooth effects
  springSmooth: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Spring for subtle effects
  springSubtle: {
    type: "spring",
    stiffness: 200,
    damping: 25,
  } as Transition,
};

// =============================================================================
// BASIC ANIMATIONS
// =============================================================================

/** Fade in from transparent */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Fade in with slide up */
export const fadeSlideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/** Fade in with slide down */
export const fadeSlideDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

/** Fade in with slide from left */
export const fadeSlideLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/** Fade in with slide from right */
export const fadeSlideRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/** Scale up from small */
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

/** Scale down from large */
export const scaleDown: Variants = {
  initial: { opacity: 0, scale: 1.2 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
};

// =============================================================================
// STAGGER ANIMATIONS
// =============================================================================

/** Container for staggered children */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/** Child item for staggered lists */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/** Stagger from left */
export const staggerItemLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// =============================================================================
// HOVER & TAP ANIMATIONS
// =============================================================================

/** Card hover effect - lift and glow */
export const cardHover = {
  whileHover: {
    y: -4,
    boxShadow: "0 8px 24px rgba(212, 165, 116, 0.3)",
    transition: transitions.springSmooth,
  },
  whileTap: {
    scale: 0.98,
    transition: transitions.micro,
  },
};

/** Button hover effect - scale and glow */
export const buttonHover = {
  whileHover: {
    scale: 1.02,
    boxShadow: "0 0 20px rgba(212, 165, 116, 0.4)",
    transition: transitions.springBouncy,
  },
  whileTap: {
    scale: 0.98,
    transition: transitions.micro,
  },
};

/** Subtle hover for interactive elements */
export const subtleHover = {
  whileHover: {
    scale: 1.02,
    transition: transitions.springSubtle,
  },
  whileTap: {
    scale: 0.98,
  },
};

/** Territory tile hover */
export const territoryHover = {
  whileHover: {
    scale: 1.05,
    boxShadow: "0 0 30px rgba(212, 165, 116, 0.4)",
    transition: transitions.springSmooth,
  },
  whileTap: {
    scale: 1.02,
  },
};

// =============================================================================
// PAGE TRANSITIONS
// =============================================================================

/** Standard page transition */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/** Medieval sepia page transition */
export const medievalPageTransition: Variants = {
  initial: {
    opacity: 0,
    filter: "sepia(100%) brightness(0.8)",
  },
  animate: {
    opacity: 1,
    filter: "sepia(0%) brightness(1)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    filter: "sepia(100%) brightness(0.8)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// =============================================================================
// GAME EVENT ANIMATIONS
// =============================================================================

/** Resource popup - floats up and fades */
export const resourcePopup: Variants = {
  initial: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  animate: {
    opacity: [1, 1, 0],
    y: -60,
    scale: [1, 1.3, 1],
    transition: {
      duration: 1.2,
      ease: "easeOut",
      times: [0, 0.3, 1],
    },
  },
};

/** Turn banner - dramatic entrance */
export const turnBanner: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    y: -50,
  },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: [0.5, 1.1, 1, 0.9],
    y: [-50, 0, 0, 20],
    transition: {
      duration: 2,
      times: [0, 0.2, 0.8, 1],
      ease: "easeInOut",
    },
  },
};

/** Era transition overlay */
export const eraOverlay: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.95, 0.95, 0],
    transition: {
      duration: 3,
      times: [0, 0.3, 0.7, 1],
      ease: "easeInOut",
    },
  },
};

/** Era title animation */
export const eraTitle: Variants = {
  initial: {
    opacity: 0,
    scale: 2,
    filter: "blur(20px)",
  },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: [2, 1, 1, 0.8],
    filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(10px)"],
    transition: {
      duration: 3,
      times: [0, 0.3, 0.7, 1],
      ease: "easeInOut",
    },
  },
};

/** Screen shake for combat */
export const screenShake: Variants = {
  initial: { x: 0, y: 0 },
  animate: {
    x: [0, -10, 10, -5, 5, 0],
    y: [0, 5, -5, 3, -3, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

/** Combat flash overlay */
export const combatFlash: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.3, 0],
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/** Build complete glow effect */
export const buildComplete: Variants = {
  initial: { scale: 0.8 },
  animate: {
    scale: [0.8, 1.1, 1],
    boxShadow: [
      "0 0 0 0 rgba(212, 165, 116, 0)",
      "0 0 40px 10px rgba(212, 165, 116, 0.6)",
      "0 0 20px 5px rgba(212, 165, 116, 0.3)",
    ],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/** Achievement toast entrance */
export const achievementToast: Variants = {
  initial: { x: 400, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    x: 400,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

/** Achievement glow pulse */
export const achievementGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(245, 158, 11, 0)",
      "0 0 30px 10px rgba(245, 158, 11, 0.4)",
      "0 0 20px 5px rgba(245, 158, 11, 0.2)",
    ],
    transition: {
      duration: 1,
      repeat: 2,
      ease: "easeInOut",
    },
  },
};

/** Trophy shake for achievement icon */
export const trophyShake = {
  animate: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.5,
      repeat: 2,
      ease: "easeInOut",
    },
  },
};

/** Coin collect arc animation - use with custom coordinates */
export function createCollectAnimation(
  from: { x: number; y: number },
  to: { x: number; y: number }
): Variants {
  return {
    initial: {
      x: from.x,
      y: from.y,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: [from.x, from.x, to.x],
      y: [from.y, from.y - 30, to.y],
      scale: [1, 1.5, 0.5],
      opacity: [1, 1, 0],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 1],
        ease: "easeInOut",
      },
    },
  };
}

/** Sparkle particle animation */
export function createSparkle(index: number, count: number): Variants {
  const angle = (index / count) * Math.PI * 2;
  const distance = 50;

  return {
    initial: {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 1,
    },
    animate: {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: [0, 1, 0],
      opacity: [1, 1, 0],
      transition: {
        duration: 0.6,
        delay: index * 0.05,
        ease: "easeOut",
      },
    },
  };
}

/** Pulse ring animation for selected territory */
export const pulseRing: Variants = {
  initial: {
    scale: 1,
    opacity: 0.5,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
    boxShadow: [
      "0 0 0 0 rgba(212, 165, 116, 0)",
      "0 0 0 8px rgba(212, 165, 116, 0.3)",
      "0 0 0 0 rgba(212, 165, 116, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// =============================================================================
// LOADING ANIMATIONS
// =============================================================================

/** Skeleton shimmer effect */
export const shimmer: Variants = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/** Spinner rotation */
export const spinner: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/** Pulsing dot loader */
export const pulseDot: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// =============================================================================
// ERA COLORS FOR ANIMATIONS
// =============================================================================

export const eraColors = {
  PEACE: "#4a7c59",
  WAR: "#a41e1e",
  INVASION: "#6b2d6b",
} as const;

export const eraNames = {
  PEACE: "Paz das Cinzas",
  WAR: "Era da Guerra",
  INVASION: "A Invasao",
} as const;

export const eraDescriptions = {
  PEACE: "O Pacto impede ataques. Construa seu imperio.",
  WAR: "O Pacto foi rompido! Conquiste seus inimigos.",
  INVASION: "A Horda se aproxima. Sobreviva!",
} as const;
