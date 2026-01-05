"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wheat, TreePine, Coins } from "lucide-react";
import { resourcePopup } from "@/lib/animations";

export type ResourceType = "GRAIN" | "WOOD" | "GOLD";

interface ResourcePopupProps {
  id: string;
  amount: number;
  type: ResourceType;
  position: { x: number; y: number };
  onComplete?: () => void;
}

const resourceConfig = {
  GRAIN: {
    icon: Wheat,
    color: "text-grain",
    bgColor: "bg-grain/20",
  },
  WOOD: {
    icon: TreePine,
    color: "text-wood-light",
    bgColor: "bg-wood/20",
  },
  GOLD: {
    icon: Coins,
    color: "text-gold",
    bgColor: "bg-gold/20",
  },
};

export function ResourcePopup({
  id,
  amount,
  type,
  position,
  onComplete,
}: ResourcePopupProps) {
  const config = resourceConfig[type];
  const Icon = config.icon;
  const isPositive = amount > 0;

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-50"
      style={{ left: position.x, top: position.y }}
      variants={resourcePopup}
      initial="initial"
      animate="animate"
      onAnimationComplete={onComplete}
    >
      <div
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full
          ${config.bgColor} backdrop-blur-sm
          border border-white/10 shadow-lg
        `}
      >
        <span
          className={`
            text-xl font-bold font-mono
            ${isPositive ? "text-green-400" : "text-red-400"}
          `}
        >
          {isPositive ? "+" : ""}
          {amount}
        </span>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
    </motion.div>
  );
}

// Container to manage multiple popups
interface ResourcePopupManagerProps {
  popups: Array<{
    id: string;
    amount: number;
    type: ResourceType;
    position: { x: number; y: number };
  }>;
  onPopupComplete: (id: string) => void;
}

export function ResourcePopupManager({
  popups,
  onPopupComplete,
}: ResourcePopupManagerProps) {
  return (
    <AnimatePresence>
      {popups.map((popup) => (
        <ResourcePopup
          key={popup.id}
          {...popup}
          onComplete={() => onPopupComplete(popup.id)}
        />
      ))}
    </AnimatePresence>
  );
}
