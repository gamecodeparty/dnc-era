"use client";

import { motion, AnimatePresence } from "framer-motion";
import { screenShake, combatFlash } from "@/lib/animations";
import { Swords, Shield, Skull, Trophy } from "lucide-react";

interface CombatFeedbackProps {
  isActive: boolean;
  result: "victory" | "defeat" | "draw" | null;
  onComplete?: () => void;
}

export function CombatFeedback({
  isActive,
  result,
  onComplete,
}: CombatFeedbackProps) {
  const flashColor =
    result === "victory"
      ? "#22c55e"
      : result === "defeat"
      ? "#ef4444"
      : "#f59e0b";

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Screen shake wrapper */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            variants={screenShake}
            initial="initial"
            animate="animate"
          />

          {/* Color flash overlay */}
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            style={{ backgroundColor: flashColor }}
            variants={combatFlash}
            initial="initial"
            animate="animate"
            onAnimationComplete={onComplete}
          />
        </>
      )}
    </AnimatePresence>
  );
}

// Combat result toast
interface CombatResultProps {
  isVisible: boolean;
  result: "victory" | "defeat" | "draw";
  message: string;
  details?: string;
  onComplete?: () => void;
}

export function CombatResult({
  isVisible,
  result,
  message,
  details,
  onComplete,
}: CombatResultProps) {
  const config = {
    victory: {
      icon: Trophy,
      color: "#22c55e",
      bgColor: "from-green-900/90 to-green-950/90",
      borderColor: "border-green-500/50",
      title: "Vitoria!",
    },
    defeat: {
      icon: Skull,
      color: "#ef4444",
      bgColor: "from-red-900/90 to-red-950/90",
      borderColor: "border-red-500/50",
      title: "Derrota",
    },
    draw: {
      icon: Shield,
      color: "#f59e0b",
      bgColor: "from-amber-900/90 to-amber-950/90",
      borderColor: "border-amber-500/50",
      title: "Empate",
    },
  }[result];

  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`
              relative px-12 py-8 rounded-xl
              bg-gradient-to-b ${config.bgColor}
              border-2 ${config.borderColor}
              backdrop-blur-md shadow-2xl
            `}
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -30, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onAnimationComplete={() => {
              if (onComplete) {
                setTimeout(onComplete, 1500);
              }
            }}
          >
            {/* Icon with animation */}
            <motion.div
              className="flex justify-center mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: result === "victory" ? [0, 10, -10, 0] : 0,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Icon
                className="w-16 h-16"
                style={{ color: config.color }}
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Title */}
            <h2
              className="text-4xl font-cinzel-decorative font-bold text-center mb-2"
              style={{ color: config.color }}
            >
              {config.title}
            </h2>

            {/* Message */}
            <p className="text-center text-white/80 font-crimson text-lg">
              {message}
            </p>

            {/* Details */}
            {details && (
              <p className="text-center text-white/50 text-sm mt-2">
                {details}
              </p>
            )}

            {/* Decorative corners */}
            <div
              className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2"
              style={{ borderColor: config.color }}
            />
            <div
              className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2"
              style={{ borderColor: config.color }}
            />
            <div
              className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2"
              style={{ borderColor: config.color }}
            />
            <div
              className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2"
              style={{ borderColor: config.color }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Crossed swords animation for combat initiation
export function CombatInitiation({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-32 h-32">
            {/* Left sword */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2"
              initial={{ x: -100, rotate: -45, opacity: 0 }}
              animate={{ x: 0, rotate: 45, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Swords className="w-16 h-16 text-medieval-accent" />
            </motion.div>

            {/* Right sword */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ x: 100, rotate: 45, opacity: 0 }}
              animate={{ x: 0, rotate: -45, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Swords className="w-16 h-16 text-medieval-accent transform scale-x-[-1]" />
            </motion.div>

            {/* Impact spark */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="w-8 h-8 bg-white rounded-full blur-sm" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
