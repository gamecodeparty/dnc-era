"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { MedievalIconButton } from "@/components/ui/medieval";
import { MobileDrawer } from "./MobileDrawer";
import { useHaptic } from "@/hooks/useHaptic";

interface MobileGameHeaderProps {
  /** Current era */
  era: "PEACE" | "WAR" | "INVASION";
  /** Current turn number */
  currentTurn: number;
  /** Total turns in game */
  totalTurns: number;
  /** Time remaining in seconds (for turn timer) */
  timeRemaining?: number;
  /** Total time per turn in seconds */
  totalTime?: number;
  /** Time to next turn in milliseconds (alternative to timeRemaining) */
  timeToNextTurn?: number;
  /** Turn interval in milliseconds (alternative to totalTime) */
  turnIntervalMs?: number;
  /** User name */
  userName?: string;
  /** Callback when logout is clicked */
  onLogout?: () => void;
  /** Callback when menu button is clicked */
  onMenuClick?: () => void;
  /** Additional class names */
  className?: string;
}

const eraColors = {
  PEACE: { bg: "bg-era-peace/20", text: "text-era-peace", border: "border-era-peace", fill: "bg-era-peace" },
  WAR: { bg: "bg-era-war/20", text: "text-era-war", border: "border-era-war", fill: "bg-era-war" },
  INVASION: { bg: "bg-era-invasion/20", text: "text-era-invasion", border: "border-era-invasion", fill: "bg-era-invasion" },
};

const eraNames = {
  PEACE: "Paz",
  WAR: "Guerra",
  INVASION: "Invasao",
};

export function MobileGameHeader({
  era,
  currentTurn,
  totalTurns,
  timeRemaining,
  totalTime,
  timeToNextTurn,
  turnIntervalMs,
  userName,
  onLogout,
  onMenuClick,
  className = "",
}: MobileGameHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { vibrate } = useHaptic();

  const colors = eraColors[era];
  const eraName = eraNames[era];

  // Support both seconds and milliseconds props
  const actualTimeRemaining = timeRemaining ?? (timeToNextTurn ? Math.floor(timeToNextTurn / 1000) : 30);
  const actualTotalTime = totalTime ?? (turnIntervalMs ? Math.floor(turnIntervalMs / 1000) : 30);
  const progress = actualTotalTime > 0 ? (actualTimeRemaining / actualTotalTime) * 100 : 100;

  const handleMenuClick = () => {
    vibrate("light");
    if (onMenuClick) {
      onMenuClick();
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 bg-medieval-bg-deep/95 backdrop-blur-sm border-b border-medieval-primary/20 ${className}`}>
        <div className="flex items-center justify-between px-3 py-2">
          {/* Logo & Era */}
          <div className="flex items-center gap-2">
            <span className="font-cinzel-decorative text-medieval-primary font-bold text-sm">
              D&C
            </span>
            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border`}>
              {eraName}
            </div>
          </div>

          {/* Turn Counter */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-medieval-text-muted">Turno</div>
              <div className="font-cinzel text-medieval-text-primary font-semibold">
                {currentTurn}/{totalTurns}
              </div>
            </div>

            {/* Timer Progress */}
            <div className="w-16">
              <div className="text-xs text-medieval-text-muted text-center mb-1">
                {actualTimeRemaining}s
              </div>
              <div className="h-1.5 bg-medieval-bg-card rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${colors.fill} rounded-full`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <MedievalIconButton
            onClick={handleMenuClick}
            label="Menu"
            icon={<Menu className="w-5 h-5" />}
          />
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        userName={userName}
        onLogout={onLogout}
      />
    </>
  );
}
