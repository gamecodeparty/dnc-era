"use client";

import { motion } from "framer-motion";
import { createSparkle } from "@/lib/animations";

interface SparklesProps {
  color?: string;
  count?: number;
  size?: number;
  className?: string;
}

export function Sparkles({
  color = "#d4a574",
  count = 8,
  size = 8,
  className = "",
}: SparklesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          variants={createSparkle(i, count)}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
}

// Burst sparkles in a specific direction
interface DirectionalSparklesProps extends SparklesProps {
  direction?: "up" | "down" | "left" | "right" | "radial";
}

export function DirectionalSparkles({
  color = "#d4a574",
  count = 6,
  size = 6,
  direction = "radial",
  className = "",
}: DirectionalSparklesProps) {
  const getOffset = (index: number) => {
    const spread = 60;
    const distance = 40 + Math.random() * 30;

    switch (direction) {
      case "up":
        return {
          x: (index - count / 2) * (spread / count),
          y: -distance,
        };
      case "down":
        return {
          x: (index - count / 2) * (spread / count),
          y: distance,
        };
      case "left":
        return {
          x: -distance,
          y: (index - count / 2) * (spread / count),
        };
      case "right":
        return {
          x: distance,
          y: (index - count / 2) * (spread / count),
        };
      case "radial":
      default:
        const angle = (index / count) * Math.PI * 2;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        };
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const offset = getOffset(i);
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              marginLeft: -size / 2,
              marginTop: -size / 2,
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: offset.x,
              y: offset.y,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.2,
              delay: i * 0.03,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

// Star-shaped sparkle
export function StarSparkle({
  color = "#ffd700",
  size = 16,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 1, 0],
        rotate: [0, 180],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </motion.svg>
  );
}
