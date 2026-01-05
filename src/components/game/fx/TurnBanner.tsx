"use client";

import { motion, AnimatePresence } from "framer-motion";
import { turnBanner } from "@/lib/animations";

interface TurnBannerProps {
  turn: number;
  isVisible: boolean;
  onComplete?: () => void;
}

export function TurnBanner({ turn, isVisible, onComplete }: TurnBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          variants={turnBanner}
          initial="initial"
          animate="animate"
          onAnimationComplete={onComplete}
        >
          <div
            className="
              relative px-16 py-8
              bg-gradient-to-b from-medieval-bg-card/95 to-medieval-bg-deep/95
              border-2 border-medieval-primary
              rounded-lg backdrop-blur-md
              shadow-golden-glow-lg
            "
          >
            {/* Ornament top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div
                className="w-16 h-6 bg-medieval-primary"
                style={{
                  clipPath: "polygon(20% 100%, 50% 0%, 80% 100%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="text-center">
              <p className="text-medieval-text-secondary text-sm uppercase tracking-[0.3em] mb-2">
                Novo Turno
              </p>
              <h2 className="text-5xl font-cinzel-decorative text-gradient-golden">
                {turn}
              </h2>
            </div>

            {/* Ornament bottom */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div
                className="w-16 h-6 bg-medieval-primary"
                style={{
                  clipPath: "polygon(20% 0%, 50% 100%, 80% 0%)",
                }}
              />
            </div>

            {/* Side ornaments */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-medieval-primary to-transparent" />
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-medieval-primary to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mini turn indicator for HUD
interface TurnIndicatorProps {
  turn: number;
  maxTurns: number;
}

export function TurnIndicator({ turn, maxTurns }: TurnIndicatorProps) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-medieval-bg-card/80 border border-medieval-primary/30"
      key={turn}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-medieval-text-secondary text-sm">Turno</span>
      <span className="text-2xl font-cinzel text-medieval-primary font-bold">
        {turn}
      </span>
      <span className="text-medieval-text-muted text-sm">/ {maxTurns}</span>
    </motion.div>
  );
}
