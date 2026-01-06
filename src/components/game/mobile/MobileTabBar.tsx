"use client";

import { useCallback } from "react";
import { Coins, Users, Swords, Scroll, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHaptic } from "@/hooks/useHaptic";

export type TabId = "resources" | "clan" | "actions" | "log";

interface Tab {
  id: TabId;
  icon: typeof Coins;
  label: string;
}

const tabs: Tab[] = [
  { id: "resources", icon: Coins, label: "Recursos" },
  { id: "clan", icon: Users, label: "Cla" },
  { id: "actions", icon: Swords, label: "Acoes" },
  { id: "log", icon: Scroll, label: "Log" },
];

interface MobileTabBarProps {
  /** Currently selected tab */
  activeTab: TabId | null;
  /** Called when a tab is selected */
  onTabChange: (tab: TabId | null) => void;
  /** Additional class names */
  className?: string;
}

export function MobileTabBar({ activeTab, onTabChange, className = "" }: MobileTabBarProps) {
  const { vibrate } = useHaptic();

  const handleTabClick = useCallback((tabId: TabId) => {
    vibrate("selection");
    if (activeTab === tabId) {
      onTabChange(null); // Toggle off
    } else {
      onTabChange(tabId);
    }
  }, [activeTab, onTabChange, vibrate]);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-medieval-bg-panel/95 backdrop-blur-sm border-t border-medieval-primary/20 pb-safe ${className}`}>
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex flex-col items-center justify-center relative
                min-w-[64px] py-2 px-3 rounded-lg
                transition-all duration-200
                ${isActive
                  ? "bg-medieval-primary/20 text-medieval-primary"
                  : "text-medieval-text-muted hover:text-medieval-text-secondary"
                }
              `}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-medieval-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

interface TabContentSheetProps {
  /** Currently active tab */
  activeTab: TabId | null;
  /** Called when sheet should close */
  onClose: () => void;
  /** Content to render for each tab */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

export function TabContentSheet({ activeTab, onClose, children, className = "" }: TabContentSheetProps) {
  const { vibrate } = useHaptic();

  const handleClose = () => {
    vibrate("light");
    onClose();
  };

  return (
    <AnimatePresence>
      {activeTab && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40"
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                handleClose();
              }
            }}
            className={`
              fixed bottom-[60px] left-0 right-0 z-35
              bg-medieval-bg-panel rounded-t-2xl
              border-t border-x border-medieval-primary/30
              max-h-[50vh] overflow-hidden
              ${className}
            `}
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-2">
              <div className="w-10 h-1 bg-medieval-text-muted/30 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-3 p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="px-4 pb-4 overflow-y-auto max-h-[calc(50vh-40px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
