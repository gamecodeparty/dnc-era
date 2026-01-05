"use client";

import { motion, AnimatePresence } from "framer-motion";
import { achievementToast, achievementGlow, trophyShake } from "@/lib/animations";
import { Trophy, Star, Swords, Shield, Castle, Crown, Flame, Skull } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type AchievementType =
  | "conquest"
  | "defense"
  | "builder"
  | "warrior"
  | "survivor"
  | "champion"
  | "general";

interface AchievementConfig {
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  borderColor: string;
}

const achievementConfigs: Record<AchievementType, AchievementConfig> = {
  conquest: {
    icon: Swords,
    color: "#ef4444",
    bgGradient: "from-red-900 to-red-950",
    borderColor: "border-red-500",
  },
  defense: {
    icon: Shield,
    color: "#3b82f6",
    bgGradient: "from-blue-900 to-blue-950",
    borderColor: "border-blue-500",
  },
  builder: {
    icon: Castle,
    color: "#8b5a2b",
    bgGradient: "from-amber-900 to-amber-950",
    borderColor: "border-amber-600",
  },
  warrior: {
    icon: Flame,
    color: "#f97316",
    bgGradient: "from-orange-900 to-orange-950",
    borderColor: "border-orange-500",
  },
  survivor: {
    icon: Skull,
    color: "#a855f7",
    bgGradient: "from-purple-900 to-purple-950",
    borderColor: "border-purple-500",
  },
  champion: {
    icon: Crown,
    color: "#ffd700",
    bgGradient: "from-yellow-900 to-yellow-950",
    borderColor: "border-yellow-500",
  },
  general: {
    icon: Trophy,
    color: "#d4a574",
    bgGradient: "from-medieval-bg-parchment to-medieval-bg-card",
    borderColor: "border-medieval-primary",
  },
};

interface AchievementToastProps {
  id: string;
  title: string;
  description: string;
  type?: AchievementType;
  isVisible: boolean;
  onComplete?: () => void;
}

export function AchievementToast({
  id,
  title,
  description,
  type = "general",
  isVisible,
  onComplete,
}: AchievementToastProps) {
  const config = achievementConfigs[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          className="fixed top-20 right-4 z-[70]"
          variants={achievementToast}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={() => {
            if (onComplete) {
              setTimeout(onComplete, 2500);
            }
          }}
        >
          <motion.div
            className={`
              relative overflow-hidden
              bg-gradient-to-r ${config.bgGradient}
              border-2 ${config.borderColor}
              rounded-lg p-4 shadow-2xl
              min-w-[280px] max-w-[360px]
            `}
            {...achievementGlow}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <motion.div
                className="flex-shrink-0 p-2 rounded-lg bg-black/30"
                {...trophyShake}
              >
                <Icon
                  className="w-8 h-8"
                  style={{ color: config.color }}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: config.color }}
                >
                  Conquista!
                </p>
                <h4 className="font-cinzel font-bold text-white text-lg leading-tight">
                  {title}
                </h4>
                <p className="text-sm text-white/70 mt-1 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* Stars decoration */}
            <div className="absolute top-2 right-2 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                >
                  <Star
                    className="w-3 h-3"
                    style={{ color: config.color, fill: config.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Queue manager for multiple achievements
interface Achievement {
  id: string;
  title: string;
  description: string;
  type?: AchievementType;
}

interface AchievementQueueProps {
  achievements: Achievement[];
  onAchievementComplete: (id: string) => void;
}

export function AchievementQueue({
  achievements,
  onAchievementComplete,
}: AchievementQueueProps) {
  // Only show the first achievement in the queue
  const currentAchievement = achievements[0];

  return (
    <AnimatePresence mode="wait">
      {currentAchievement && (
        <AchievementToast
          key={currentAchievement.id}
          {...currentAchievement}
          isVisible={true}
          onComplete={() => onAchievementComplete(currentAchievement.id)}
        />
      )}
    </AnimatePresence>
  );
}

// Simple notification toast for general game events
interface GameNotificationProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  isVisible: boolean;
  onComplete?: () => void;
}

export function GameNotification({
  message,
  type = "info",
  isVisible,
  onComplete,
}: GameNotificationProps) {
  const colors = {
    info: { bg: "bg-blue-900/90", border: "border-blue-500/50", text: "text-blue-200" },
    success: { bg: "bg-green-900/90", border: "border-green-500/50", text: "text-green-200" },
    warning: { bg: "bg-amber-900/90", border: "border-amber-500/50", text: "text-amber-200" },
    error: { bg: "bg-red-900/90", border: "border-red-500/50", text: "text-red-200" },
  }[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", damping: 20 }}
          onAnimationComplete={() => {
            if (onComplete) {
              setTimeout(onComplete, 2000);
            }
          }}
        >
          <div
            className={`
              px-6 py-3 rounded-lg border backdrop-blur-sm
              ${colors.bg} ${colors.border}
            `}
          >
            <p className={`font-medium ${colors.text}`}>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
