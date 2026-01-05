"use client";

import { motion, AnimatePresence } from "framer-motion";
import { eraOverlay, eraTitle, eraColors, eraNames, eraDescriptions } from "@/lib/animations";
import { Shield, Swords, Skull } from "lucide-react";

export type EraType = "PEACE" | "WAR" | "INVASION";

interface EraTransitionProps {
  era: EraType;
  isVisible: boolean;
  onComplete?: () => void;
}

const eraIcons = {
  PEACE: Shield,
  WAR: Swords,
  INVASION: Skull,
};

export function EraTransition({ era, isVisible, onComplete }: EraTransitionProps) {
  const Icon = eraIcons[era];
  const color = eraColors[era];
  const name = eraNames[era];
  const description = eraDescriptions[era];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            variants={eraOverlay}
            initial="initial"
            animate="animate"
          />

          {/* Era content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            variants={eraTitle}
            initial="initial"
            animate="animate"
            onAnimationComplete={onComplete}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: [0, 1.5, 1],
                rotate: [-180, 0, 0],
              }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Icon
                className="w-24 h-24 mb-8"
                style={{ color }}
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Era name */}
            <h1
              className="text-7xl font-cinzel-decorative font-bold mb-4 tracking-wider"
              style={{ color }}
            >
              {name}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/70 max-w-md text-center font-crimson">
              {description}
            </p>

            {/* Decorative lines */}
            <div className="flex items-center gap-4 mt-8">
              <motion.div
                className="h-0.5 w-32"
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <div
                className="w-3 h-3 rotate-45"
                style={{ backgroundColor: color }}
              />
              <motion.div
                className="h-0.5 w-32"
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Particles */}
          <EraParticles color={color} />
        </div>
      )}
    </AnimatePresence>
  );
}

function EraParticles({ color }: { color: string }) {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: "100%",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight - 100,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// Era badge component for HUD
interface EraBadgeProps {
  era: EraType;
  className?: string;
}

export function EraBadge({ era, className = "" }: EraBadgeProps) {
  const Icon = eraIcons[era];
  const color = eraColors[era];
  const name = eraNames[era];

  const glowClass = {
    PEACE: "glow-era-peace",
    WAR: "glow-era-war",
    INVASION: "glow-era-invasion",
  }[era];

  const bgClass = {
    PEACE: "bg-era-peace",
    WAR: "bg-era-war",
    INVASION: "bg-era-invasion",
  }[era];

  return (
    <motion.div
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        ${bgClass} border border-white/10
        ${glowClass} ${className}
      `}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
      <span className="font-cinzel font-semibold" style={{ color }}>
        {name}
      </span>
    </motion.div>
  );
}
