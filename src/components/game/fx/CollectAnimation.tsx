"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Wheat, TreePine, Coins, Star } from "lucide-react";

interface CollectAnimationProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  icon: ReactNode;
  onComplete?: () => void;
}

export function CollectAnimation({
  id,
  from,
  to,
  icon,
  onComplete,
}: CollectAnimationProps) {
  // Calculate control point for bezier curve (arc upward)
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 80;

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-[60]"
      initial={{
        x: from.x,
        y: from.y,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: [from.x, midX, to.x],
        y: [from.y, midY, to.y],
        scale: [1, 1.4, 0.3],
        opacity: [1, 1, 0],
        rotate: [0, 20, -10, 0],
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.4, 1],
      }}
      onAnimationComplete={onComplete}
    >
      {icon}
    </motion.div>
  );
}

// Resource-specific collect animations
type ResourceType = "GRAIN" | "WOOD" | "GOLD";

interface ResourceCollectProps {
  id: string;
  type: ResourceType;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete?: () => void;
}

const resourceIcons = {
  GRAIN: <Wheat className="w-8 h-8 text-grain drop-shadow-lg" />,
  WOOD: <TreePine className="w-8 h-8 text-wood-light drop-shadow-lg" />,
  GOLD: <Coins className="w-8 h-8 text-gold drop-shadow-lg" />,
};

export function ResourceCollect({
  id,
  type,
  from,
  to,
  onComplete,
}: ResourceCollectProps) {
  return (
    <CollectAnimation
      id={id}
      from={from}
      to={to}
      icon={resourceIcons[type]}
      onComplete={onComplete}
    />
  );
}

// Multiple items collection (burst effect)
interface MultiCollectProps {
  items: Array<{
    id: string;
    type: ResourceType;
    amount: number;
  }>;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete?: () => void;
}

export function MultiCollect({
  items,
  from,
  to,
  onComplete,
}: MultiCollectProps) {
  const allItems = items.flatMap((item) =>
    Array.from({ length: Math.min(item.amount, 5) }).map((_, i) => ({
      id: `${item.id}-${i}`,
      type: item.type,
      delay: i * 0.08,
      offsetX: (Math.random() - 0.5) * 40,
      offsetY: (Math.random() - 0.5) * 40,
    }))
  );

  return (
    <AnimatePresence>
      {allItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="fixed pointer-events-none z-[60]"
          initial={{
            x: from.x + item.offsetX,
            y: from.y + item.offsetY,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [
              from.x + item.offsetX,
              from.x + item.offsetX,
              to.x,
            ],
            y: [
              from.y + item.offsetY,
              from.y + item.offsetY - 50,
              to.y,
            ],
            scale: [0, 1.2, 0.4],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: item.delay,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.3, 1],
          }}
          onAnimationComplete={
            index === allItems.length - 1 ? onComplete : undefined
          }
        >
          {resourceIcons[item.type]}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Star/XP collect animation
export function StarCollect({
  id,
  from,
  to,
  onComplete,
}: {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete?: () => void;
}) {
  return (
    <CollectAnimation
      id={id}
      from={from}
      to={to}
      icon={
        <Star
          className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-lg"
          strokeWidth={1}
        />
      }
      onComplete={onComplete}
    />
  );
}

// Manager for collect animations
interface CollectItem {
  id: string;
  type: ResourceType;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

interface CollectManagerProps {
  items: CollectItem[];
  onItemComplete: (id: string) => void;
}

export function CollectManager({ items, onItemComplete }: CollectManagerProps) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <ResourceCollect
          key={item.id}
          {...item}
          onComplete={() => onItemComplete(item.id)}
        />
      ))}
    </AnimatePresence>
  );
}
