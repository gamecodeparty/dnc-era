"use client";

import { Wheat, Trees, Coins, Users, Shield, Target, Swords, Scroll, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { TabId } from "./MobileTabBar";

interface Resources {
  grain: number;
  wood: number;
  gold: number;
}

interface Clan {
  name: string;
  population: number;
  reputation: number;
}

interface GameEvent {
  id: string;
  type: string;
  message: string;
  turn: number;
}

interface TabContentProps {
  /** Current active tab */
  activeTab: TabId;
  /** Player resources */
  resources?: Resources;
  /** Player clan info */
  clan?: Clan;
  /** Available actions */
  actions?: Array<{ id: string; label: string; disabled?: boolean }>;
  /** Game events log */
  events?: GameEvent[];
  /** Callback when action is selected */
  onAction?: (actionId: string) => void;
}

const resourceConfig = [
  { key: "grain" as const, icon: Wheat, label: "Grao", color: "text-grain" },
  { key: "wood" as const, icon: Trees, label: "Madeira", color: "text-wood" },
  { key: "gold" as const, icon: Coins, label: "Ouro", color: "text-gold" },
];

export function TabContent({
  activeTab,
  resources = { grain: 0, wood: 0, gold: 0 },
  clan = { name: "Seu Cla", population: 0, reputation: 0 },
  actions = [],
  events = [],
  onAction,
}: TabContentProps) {
  switch (activeTab) {
    case "resources":
      return (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          <h3 className="font-cinzel text-medieval-text-primary font-semibold mb-3">
            Recursos
          </h3>
          {resourceConfig.map((resource) => (
            <motion.div
              key={resource.key}
              variants={staggerItem}
              className="flex items-center justify-between p-3 rounded-lg bg-medieval-bg-card"
            >
              <div className="flex items-center gap-3">
                <resource.icon className={`w-5 h-5 ${resource.color}`} />
                <span className="text-medieval-text-secondary">{resource.label}</span>
              </div>
              <span className={`font-semibold ${resource.color}`}>
                {resources[resource.key]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      );

    case "clan":
      return (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          <h3 className="font-cinzel text-medieval-text-primary font-semibold mb-3">
            {clan.name}
          </h3>

          <motion.div variants={staggerItem} className="flex items-center justify-between p-3 rounded-lg bg-medieval-bg-card">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-medieval-primary" />
              <span className="text-medieval-text-secondary">Populacao</span>
            </div>
            <span className="font-semibold text-medieval-text-primary">{clan.population}</span>
          </motion.div>

          <motion.div variants={staggerItem} className="flex items-center justify-between p-3 rounded-lg bg-medieval-bg-card">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-medieval-primary" />
              <span className="text-medieval-text-secondary">Reputacao</span>
            </div>
            <span className="font-semibold text-medieval-text-primary">{clan.reputation}</span>
          </motion.div>

          <motion.div variants={staggerItem} className="flex items-center justify-between p-3 rounded-lg bg-medieval-bg-card">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-medieval-primary" />
              <span className="text-medieval-text-secondary">Territorios</span>
            </div>
            <span className="font-semibold text-medieval-text-primary">3</span>
          </motion.div>
        </motion.div>
      );

    case "actions":
      return (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          <h3 className="font-cinzel text-medieval-text-primary font-semibold mb-3">
            Acoes Disponiveis
          </h3>

          {actions.length === 0 ? (
            <p className="text-medieval-text-muted text-sm p-3">
              Selecione um territorio para ver as acoes disponiveis.
            </p>
          ) : (
            actions.map((action) => (
              <motion.button
                key={action.id}
                variants={staggerItem}
                onClick={() => onAction?.(action.id)}
                disabled={action.disabled}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg
                  transition-colors text-left
                  ${action.disabled
                    ? "bg-medieval-bg-card/50 text-medieval-text-muted cursor-not-allowed"
                    : "bg-medieval-bg-card hover:bg-medieval-primary/20 text-medieval-text-primary"
                  }
                `}
              >
                <Swords className="w-5 h-5" />
                <span>{action.label}</span>
              </motion.button>
            ))
          )}
        </motion.div>
      );

    case "log":
      return (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          <h3 className="font-cinzel text-medieval-text-primary font-semibold mb-3">
            Eventos Recentes
          </h3>

          {events.length === 0 ? (
            <p className="text-medieval-text-muted text-sm p-3">
              Nenhum evento recente.
            </p>
          ) : (
            events.slice(0, 10).map((event) => (
              <motion.div
                key={event.id}
                variants={staggerItem}
                className="p-3 rounded-lg bg-medieval-bg-card"
              >
                <div className="flex items-start gap-2">
                  <Scroll className="w-4 h-4 text-medieval-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-medieval-text-primary">{event.message}</p>
                    <p className="text-xs text-medieval-text-muted flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      Turno {event.turn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      );

    default:
      return null;
  }
}
