"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, TURN_INTERVAL_MS, TOTAL_TURNS } from "@/stores/gameStore";
import {
  LogOut,
  Scroll,
  Users,
  Swords,
  HelpCircle,
  Clock,
  Target,
  Shield,
  Wheat,
  TreePine,
  Coins,
  AlertTriangle,
  RefreshCw,
  Trophy,
  Skull,
  ChevronRight,
  Compass,
} from "lucide-react";

// Medieval components
import { MedievalButton } from "@/components/ui/medieval";
import {
  MedievalCard,
  MedievalCardContent,
} from "@/components/ui/medieval";
import {
  ParchmentPanel,
  PanelHeader,
  PanelContent,
  PanelSection,
  AnimatedList,
  AnimatedListItem,
  InfoRow,
} from "@/components/ui/medieval";

// FX components
import { EraBadge, Sparkles, useGameAnimationContext } from "@/components/game/fx";
import type { EraType } from "@/components/game/fx";

// Mobile components
import {
  MobileGameHeader,
  MobileTabBar,
  TabContentSheet,
  TerritoryBottomSheet,
  MobileDrawer,
  TabContent,
} from "@/components/game/mobile";
import type { TabId } from "@/components/game/mobile";

// PWA components
import { PWAInstallPrompt, PWAInstallBanner } from "@/components/pwa";

// Expedition components
import { ExpeditionModal, ExplorationModal, ExpeditionsPanel } from "@/components/game/expedition";

// Animations
import {
  staggerContainer,
  staggerItem,
  transitions,
} from "@/lib/animations";
import { Progress } from "@/components/ui/progress";

// Era backgrounds
const eraBackgrounds: Record<EraType, string> = {
  PEACE: "/bg/era-peace.png",
  WAR: "/bg/era-war.png",
  INVASION: "/bg/era-invasion.png",
};

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function getEraInfo(era: EraType) {
  switch (era) {
    case "PEACE":
      return {
        name: "Paz das Cinzas",
        description: "O Pacto impede ataques. Foque em construir e expandir.",
        color: "text-era-peace",
        bgColor: "bg-era-peace/20",
        borderColor: "border-era-peace/40",
        glowClass: "glow-era-peace",
      };
    case "WAR":
      return {
        name: "Era da Guerra",
        description: "O Pacto foi rompido! Ataque e defenda seus territorios.",
        color: "text-era-war",
        bgColor: "bg-era-war/20",
        borderColor: "border-era-war/40",
        glowClass: "glow-era-war",
      };
    case "INVASION":
      return {
        name: "A Invasao",
        description: "A Horda ataca a cada 3 turnos! Sobreviva!",
        color: "text-era-invasion",
        bgColor: "bg-era-invasion/20",
        borderColor: "border-era-invasion/40",
        glowClass: "glow-era-invasion",
      };
  }
}

export default function GamePage() {
  const { data: session } = useSession();
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);
  const [timeToNextTurn, setTimeToNextTurn] = useState(TURN_INTERVAL_MS);

  // Mobile state
  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Expedition modal state
  const [expeditionTarget, setExpeditionTarget] = useState<string | null>(null);
  const [expeditionOrigin, setExpeditionOrigin] = useState<string | null>(null);

  // Exploration modal state
  const [selectedExplorationSiteId, setSelectedExplorationSiteId] = useState<string | null>(null);

  // Animation context - all animations are handled by the provider
  const { triggerCombatFeedback, triggerBuildComplete, triggerAchievement } = useGameAnimationContext();

  const {
    currentTurn,
    currentEra,
    territories,
    events,
    gameOver,
    winner,
    getPlayerClan,
    getPlayerTerritories,
    processTurn,
    resetGame,
    sendExpedition,
    cancelExpedition,
    expeditions,
    explorationSites,
    sendExploration,
  } = useGameStore();

  const player = getPlayerClan();
  const playerTerritories = getPlayerTerritories();
  const eraInfo = getEraInfo(currentEra as EraType);

  // Timer para proximo turno
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setTimeToNextTurn((prev) => {
        if (prev <= 1000) {
          processTurn();
          return TURN_INTERVAL_MS;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, processTurn]);

  const selectedTerritory = territories.find((t) => t.id === selectedTerritoryId);
  const timerProgress = ((TURN_INTERVAL_MS - timeToNextTurn) / TURN_INTERVAL_MS) * 100;

  // Calcula producao
  let grainProd = 0, woodProd = 0, goldProd = 0;
  playerTerritories.forEach((t) => {
    t.structures.forEach((s) => {
      if (s.type === "FARM") grainProd += 10 * s.level * (t.bonusResource === "GRAIN" ? 1.25 : 1);
      if (s.type === "SAWMILL") woodProd += 8 * s.level * (t.bonusResource === "WOOD" ? 1.25 : 1);
      if (s.type === "MINE") goldProd += 5 * s.level * (t.bonusResource === "GOLD" ? 1.25 : 1);
    });
  });

  // Open expedition modal
  const handleAttack = (toTerritoryId: string) => {
    // Find a player territory with units to use as origin
    const originTerritory = playerTerritories.find((t) => t.units.length > 0);
    if (!originTerritory) return;

    setExpeditionTarget(toTerritoryId);
    setExpeditionOrigin(originTerritory.id);
  };

  // Close expedition modal
  const handleCloseExpedition = () => {
    setExpeditionTarget(null);
    setExpeditionOrigin(null);
  };

  // Send expedition
  const handleSendExpedition = (
    fromTerritoryId: string,
    toTerritoryId: string,
    units: { type: "SOLDIER" | "ARCHER" | "KNIGHT"; quantity: number }[]
  ) => {
    const fromTerritory = territories.find((t) => t.id === fromTerritoryId);
    const toTerritory = territories.find((t) => t.id === toTerritoryId);

    const result = sendExpedition(fromTerritoryId, toTerritoryId, units);

    if (result.success && fromTerritory && toTerritory) {
      // Animation feedback
      triggerCombatFeedback(true, fromTerritory.position, toTerritory.position);
    }

    handleCloseExpedition();
    return result;
  };

  // Send exploration
  const handleSendExploration = (
    fromTerritoryId: string,
    siteId: string,
    units: { type: "SOLDIER" | "ARCHER" | "KNIGHT"; quantity: number }[]
  ) => {
    const result = sendExploration(fromTerritoryId, siteId, units);
    if (result.success) {
      setSelectedExplorationSiteId(null);
    }
    return result;
  };

  // Get exploration site at position
  const getExplorationSiteAtPosition = (position: number) => {
    return explorationSites.find((s) => s.position === position);
  };

  // Get exploration site names map for ExpeditionsPanel
  const explorationSiteNames = explorationSites.reduce((acc, site) => {
    acc[site.id] = site.name;
    return acc;
  }, {} as Record<string, string>);

  // Selected exploration site
  const selectedExplorationSite = selectedExplorationSiteId
    ? explorationSites.find((s) => s.id === selectedExplorationSiteId)
    : null;

  // Handle territory selection (mobile closes tab sheet)
  const handleTerritorySelect = (territoryId: string) => {
    setSelectedTerritoryId(territoryId);
    setActiveTab(null); // Close tab sheet when selecting territory
  };

  // Mobile handlers
  const handleMobileLogout = () => {
    setIsDrawerOpen(false);
    signOut({ callbackUrl: "/landing" });
  };

  const handleMobileHelp = () => {
    setIsDrawerOpen(false);
    // Navigate to help - for now just close
  };

  // Resources for mobile TabContent
  const mobileResources = {
    grain: Math.floor(player.grain),
    wood: Math.floor(player.wood),
    gold: Math.floor(player.gold),
  };

  const mobileClan = {
    name: player.name || "Seu Cla",
    population: 0, // TODO: Add population tracking
    reputation: 0, // TODO: Add reputation tracking
  };

  const mobileActions = currentEra !== "PEACE" && playerTerritories.some((t) => t.units.length > 0)
    ? [
        { id: "attack", label: "Atacar Territorio" },
        { id: "cards", label: "Ver Cartas" },
        { id: "army", label: "Ver Exercito" },
      ]
    : [
        { id: "cards", label: "Ver Cartas" },
        { id: "army", label: "Ver Exercito" },
      ];

  const mobileEvents = events.slice(0, 10).map((e, i) => ({
    id: `event-${i}`,
    type: e.type,
    message: e.message,
    turn: e.turn,
  }));

  // Game Over / Victory Screen
  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={eraBackgrounds[currentEra as EraType]}
            alt="Game background"
            fill
            className="object-cover object-center"
            quality={85}
          />
          <div className="absolute inset-0 bg-medieval-bg-deep/90" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitions.springSmooth}
          className="relative z-10 mx-4"
        >
          <MedievalCard
            variant="elevated"
            className={`max-w-lg w-full ${
              winner ? "border-era-peace/50" : "border-medieval-accent/50"
            }`}
          >
            <MedievalCardContent className="pt-8 text-center space-y-6">
              {winner ? (
                <>
                  <div className="relative inline-block">
                    <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-gold mx-auto" />
                    <Sparkles color="#ffd700" count={12} />
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-cinzel-decorative font-bold text-gold">
                    VITORIA!
                  </h1>
                  <p className="text-medieval-text-secondary font-crimson text-base sm:text-lg">
                    Voce sobreviveu ate o turno {currentTurn}!
                  </p>
                  <p className="text-medieval-text-muted text-sm sm:text-base">
                    Territorios: {playerTerritories.length} | Recursos finais:{" "}
                    {player.grain} graos, {player.wood} madeira, {player.gold} ouro
                  </p>
                </>
              ) : (
                <>
                  <Skull className="w-16 h-16 sm:w-24 sm:h-24 text-medieval-accent mx-auto" />
                  <h1 className="text-3xl sm:text-5xl font-cinzel-decorative font-bold text-medieval-accent">
                    GAME OVER
                  </h1>
                  <p className="text-medieval-text-secondary font-crimson text-base sm:text-lg">
                    Voce foi derrotado no turno {currentTurn}.
                  </p>
                  <p className="text-medieval-text-muted text-sm">
                    Todos os seus territorios foram perdidos!
                  </p>
                </>
              )}
              <MedievalButton
                variant="primary"
                size="lg"
                onClick={resetGame}
                icon={<RefreshCw className="w-5 h-5" />}
              >
                Jogar Novamente
              </MedievalButton>
            </MedievalCardContent>
          </MedievalCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEra}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={eraBackgrounds[currentEra as EraType]}
              alt={`${currentEra} era background`}
              fill
              className="object-cover object-center"
              quality={85}
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay */}
        <div className="absolute inset-0 bg-medieval-bg-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-medieval-bg-deep via-transparent to-medieval-bg-deep/50" />
      </div>

      {/* FX Layers are now handled by GameAnimationProvider in layout */}

      {/* Mobile Header - only visible on mobile */}
      <MobileGameHeader
        era={currentEra as EraType}
        currentTurn={currentTurn}
        totalTurns={TOTAL_TURNS}
        timeToNextTurn={timeToNextTurn}
        turnIntervalMs={TURN_INTERVAL_MS}
        onMenuClick={() => setIsDrawerOpen(true)}
        className="lg:hidden"
      />

      {/* Desktop Header - hidden on mobile */}
      <header className="hidden lg:block border-b border-medieval-primary/20 bg-medieval-bg-panel/90 backdrop-blur-md relative z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-cinzel-decorative font-bold text-gradient-golden">
                Dice&Cards Era
              </h1>
              <Link href="/game/como-jogar">
                <MedievalButton variant="ghost" size="sm">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  Como Jogar
                </MedievalButton>
              </Link>
              <PWAInstallPrompt />
            </div>

            {/* Turn Timer & Era */}
            <div className="flex items-center gap-4">
              <EraBadge era={currentEra as EraType} />

              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-medieval-bg-card/80 border border-medieval-primary/30">
                <span className="text-medieval-text-secondary text-sm">Turno</span>
                <span className="text-xl font-cinzel font-bold text-medieval-primary">
                  {currentTurn}
                </span>
                <span className="text-medieval-text-muted text-sm">/{TOTAL_TURNS}</span>
              </div>

              <div className="flex items-center gap-2 bg-medieval-bg-card/80 px-4 py-2 rounded-lg border border-medieval-primary/30">
                <Clock className="w-4 h-4 text-medieval-primary" />
                <div className="w-20">
                  <div className="text-xs text-medieval-text-muted">Proximo</div>
                  <div className="text-lg font-mono text-medieval-primary">
                    {formatTime(timeToNextTurn)}
                  </div>
                </div>
                <Progress value={timerProgress} className="w-16 h-2" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {session?.user && (
                <span className="text-sm text-medieval-text-secondary">
                  {session.user.name || session.user.email}
                </span>
              )}
              <MedievalButton
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/landing" })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </MedievalButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <motion.div
        className="flex-1 container mx-auto px-2 sm:px-4 py-2 sm:py-4 relative z-10 pb-20 lg:pb-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Desktop: 3-column grid / Mobile: single column with map */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-4">
          {/* Left sidebar - Desktop only */}
          <motion.div className="hidden lg:block lg:col-span-3 space-y-4" variants={staggerItem}>
            {/* Objetivo */}
            <ParchmentPanel animated>
              <PanelHeader
                title="Objetivo"
                icon={<Target className="w-4 h-4" />}
              />
              <PanelContent>
                <p className={`text-sm font-crimson ${eraInfo.color}`}>
                  {eraInfo.description}
                </p>
              </PanelContent>
            </ParchmentPanel>

            {/* Recursos */}
            <ParchmentPanel animated>
              <PanelHeader title="Recursos" />
              <PanelContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wheat className="w-5 h-5 text-grain" />
                    <span className="text-medieval-text-secondary">Graos</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-grain text-lg">
                      {Math.floor(player.grain)}
                    </span>
                    <span className="text-xs text-era-peace ml-2">
                      +{Math.floor(grainProd)}/turno
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-wood-light" />
                    <span className="text-medieval-text-secondary">Madeira</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-wood-light text-lg">
                      {Math.floor(player.wood)}
                    </span>
                    <span className="text-xs text-era-peace ml-2">
                      +{Math.floor(woodProd)}/turno
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-gold" />
                    <span className="text-medieval-text-secondary">Ouro</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-mono text-gold text-lg">
                      {Math.floor(player.gold)}
                    </span>
                    <span className="text-xs text-era-peace ml-2">
                      +{Math.floor(goldProd)}/turno
                    </span>
                  </div>
                </div>
              </PanelContent>
            </ParchmentPanel>

            {/* Info do Cla */}
            <ParchmentPanel animated>
              <PanelHeader title="Seu Cla" />
              <PanelContent>
                <InfoRow
                  label="Territorios"
                  value={
                    <span className="text-medieval-primary font-bold text-xl">
                      {playerTerritories.length}
                    </span>
                  }
                />
              </PanelContent>
            </ParchmentPanel>

            {/* Acoes */}
            <ParchmentPanel animated>
              <PanelHeader title="Acoes" />
              <PanelContent className="space-y-2">
                <Link href="/game/cards" className="block">
                  <MedievalButton
                    variant="secondary"
                    className="w-full justify-start"
                    icon={<Scroll className="w-4 h-4 text-era-invasion" />}
                  >
                    Cartas
                  </MedievalButton>
                </Link>
                <Link href="/game/diplomacy" className="block">
                  <MedievalButton
                    variant="secondary"
                    className="w-full justify-start"
                    icon={<Users className="w-4 h-4 text-era-peace" />}
                  >
                    Diplomacia
                  </MedievalButton>
                </Link>
                <Link href="/game/army" className="block">
                  <MedievalButton
                    variant="secondary"
                    className="w-full justify-start"
                    icon={<Swords className="w-4 h-4 text-era-war" />}
                  >
                    Exercito
                  </MedievalButton>
                </Link>
              </PanelContent>
            </ParchmentPanel>
          </motion.div>

          {/* Main map area - Full width on mobile, center column on desktop */}
          <motion.div className="lg:col-span-6" variants={staggerItem}>
            <div className="mb-2 sm:mb-4 text-center">
              <p className="text-xs sm:text-sm text-medieval-text-muted font-crimson">
                Toque em um territorio para ver detalhes
              </p>
            </div>

            {/* Mapa 4x3 - Touch friendly on mobile */}
            <div className="grid grid-cols-4 gap-1 sm:gap-3">
              {territories.map((territory) => {
                const isPlayer = territory.ownerId === "player";
                const isSelected = selectedTerritoryId === territory.id;
                const isNeutral = territory.ownerId === null;
                const explorationSite = getExplorationSiteAtPosition(territory.position);
                const hasExplorationSite = !!explorationSite && currentEra === "PEACE";

                const bgClass = isPlayer
                  ? "bg-medieval-primary/20 border-medieval-primary"
                  : hasExplorationSite
                  ? "bg-era-peace/20 border-era-peace"
                  : isNeutral
                  ? "bg-medieval-bg-card/50 border-medieval-text-muted/30"
                  : "bg-medieval-accent/20 border-medieval-accent";

                return (
                  <motion.div
                    key={territory.id}
                    onClick={() => {
                      if (hasExplorationSite) {
                        setSelectedExplorationSiteId(explorationSite.id);
                      } else {
                        handleTerritorySelect(territory.id);
                      }
                    }}
                    className={`
                      aspect-square rounded-lg border-2 cursor-pointer
                      transition-all duration-200 p-1.5 sm:p-3 relative
                      min-h-[72px] sm:min-h-0
                      territory-tile ${bgClass}
                      ${isSelected ? "ring-2 ring-medieval-primary-bright scale-105 shadow-golden-glow" : ""}
                      ${hasExplorationSite ? "ring-1 ring-era-peace/50" : ""}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    {...(isSelected && {
                      animate: {
                        boxShadow: [
                          "0 0 0 0 rgba(212,165,116,0)",
                          "0 0 0 8px rgba(212,165,116,0.3)",
                          "0 0 0 0 rgba(212,165,116,0)",
                        ],
                      },
                      transition: { duration: 2, repeat: Infinity },
                    })}
                  >
                    {/* Exploration site badge */}
                    {hasExplorationSite && (
                      <div className="absolute -top-1 -right-1 z-10">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-era-peace flex items-center justify-center animate-pulse">
                          <Compass className="w-3 h-3 sm:w-4 sm:h-4 text-medieval-bg-deep" />
                        </div>
                      </div>
                    )}

                    <div className="text-center h-full flex flex-col justify-between">
                      {hasExplorationSite ? (
                        <>
                          <div className="font-cinzel font-bold text-era-peace text-[10px] sm:text-xs truncate">
                            {explorationSite.name.split(" ").slice(0, 2).join(" ")}
                          </div>
                          <div className="text-[8px] sm:text-[10px] text-medieval-text-muted">
                            Dif: {"⚔️".repeat(explorationSite.difficulty)}
                          </div>
                          <div className="text-[8px] text-era-peace">
                            Explorar!
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-cinzel font-bold text-medieval-text-primary text-sm sm:text-base">
                            {territory.position + 1}
                          </div>
                          <div className="text-[8px] sm:text-[10px] text-medieval-text-secondary truncate">
                            {territory.ownerName}
                          </div>
                          <div className="flex justify-center">
                            {territory.bonusResource === "GRAIN" && (
                              <Wheat className="w-3 h-3 sm:w-4 sm:h-4 text-grain" />
                            )}
                            {territory.bonusResource === "WOOD" && (
                              <TreePine className="w-3 h-3 sm:w-4 sm:h-4 text-wood-light" />
                            )}
                            {territory.bonusResource === "GOLD" && (
                              <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                            )}
                          </div>
                          {territory.units.length > 0 && (
                            <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                              <Swords className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-medieval-accent" />
                              <span className="text-[8px] sm:text-[10px] text-medieval-text-primary">
                                {territory.units.reduce((sum, u) => sum + u.quantity, 0)}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Legenda - Desktop only */}
            <div className="hidden sm:flex mt-6 justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-medieval-primary/30 border-2 border-medieval-primary" />
                <span className="text-medieval-text-secondary">Seu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-medieval-accent/30 border-2 border-medieval-accent" />
                <span className="text-medieval-text-secondary">Inimigo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-medieval-bg-card/50 border-2 border-medieval-text-muted/30" />
                <span className="text-medieval-text-secondary">Neutro</span>
              </div>
              {currentEra === "PEACE" && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-era-peace/30 border-2 border-era-peace flex items-center justify-center">
                    <Compass className="w-3 h-3 text-era-peace" />
                  </div>
                  <span className="text-era-peace">Exploracao</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right sidebar - Desktop only */}
          <motion.div className="hidden lg:block lg:col-span-3 space-y-4" variants={staggerItem}>
            {selectedTerritory ? (
              <ParchmentPanel animated>
                <PanelHeader
                  title={`Territorio ${selectedTerritory.position + 1}`}
                  action={
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        selectedTerritory.ownerId === "player"
                          ? "bg-medieval-primary/20 text-medieval-primary"
                          : selectedTerritory.ownerId
                          ? "bg-medieval-accent/20 text-medieval-accent"
                          : "bg-medieval-bg-card text-medieval-text-muted"
                      }`}
                    >
                      {selectedTerritory.ownerName}
                    </span>
                  }
                />
                <PanelContent className="space-y-4">
                  <div className="flex items-center gap-2 p-2 bg-medieval-bg-deep/50 rounded border border-medieval-primary/20">
                    {selectedTerritory.bonusResource === "GRAIN" && (
                      <Wheat className="w-5 h-5 text-grain" />
                    )}
                    {selectedTerritory.bonusResource === "WOOD" && (
                      <TreePine className="w-5 h-5 text-wood-light" />
                    )}
                    {selectedTerritory.bonusResource === "GOLD" && (
                      <Coins className="w-5 h-5 text-gold" />
                    )}
                    <span className="text-medieval-primary text-sm font-medium">
                      +25% {selectedTerritory.bonusResource}
                    </span>
                  </div>

                  <PanelSection title={`Estruturas (${selectedTerritory.structures.length}/4)`}>
                    {selectedTerritory.structures.length > 0 ? (
                      <AnimatedList>
                        {selectedTerritory.structures.map((s, i) => (
                          <AnimatedListItem
                            key={i}
                            className="text-sm flex items-center gap-2 text-medieval-text-secondary"
                          >
                            <Shield className="w-3 h-3 text-medieval-primary" />
                            {s.type} Nv{s.level}
                          </AnimatedListItem>
                        ))}
                      </AnimatedList>
                    ) : (
                      <p className="text-sm text-medieval-text-muted italic">Nenhuma</p>
                    )}
                  </PanelSection>

                  <PanelSection title="Unidades">
                    {selectedTerritory.units.length > 0 ? (
                      <AnimatedList>
                        {selectedTerritory.units.map((u, i) => (
                          <AnimatedListItem
                            key={i}
                            className="text-sm flex items-center gap-2 text-medieval-text-secondary"
                          >
                            <Swords className="w-3 h-3 text-medieval-accent" />
                            {u.quantity}x {u.type}
                          </AnimatedListItem>
                        ))}
                      </AnimatedList>
                    ) : (
                      <p className="text-sm text-medieval-text-muted italic">Nenhuma</p>
                    )}
                  </PanelSection>

                  {selectedTerritory.ownerId === "player" ? (
                    <Link href={`/game/territory/${selectedTerritory.id}`} className="block">
                      <MedievalButton variant="primary" className="w-full">
                        Gerenciar Territorio
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </MedievalButton>
                    </Link>
                  ) : (
                    <MedievalButton
                      variant="danger"
                      className="w-full"
                      disabled={
                        currentEra === "PEACE" ||
                        !playerTerritories.some((t) => t.units.length > 0)
                      }
                      onClick={() => handleAttack(selectedTerritory.id)}
                    >
                      {currentEra === "PEACE" ? "Bloqueado na Paz" : "Atacar"}
                    </MedievalButton>
                  )}
                </PanelContent>
              </ParchmentPanel>
            ) : (
              <ParchmentPanel animated>
                <PanelContent className="py-12 text-center">
                  <Target className="w-10 h-10 text-medieval-text-muted mx-auto mb-3" />
                  <p className="text-medieval-text-muted font-crimson">
                    Selecione um territorio
                  </p>
                </PanelContent>
              </ParchmentPanel>
            )}

            {/* Expedicoes */}
            <ExpeditionsPanel
              expeditions={expeditions}
              playerId="player"
              onCancel={(id) => cancelExpedition(id)}
              explorationSiteNames={explorationSiteNames}
            />

            {/* Eventos */}
            <ParchmentPanel animated>
              <PanelHeader
                title="Eventos"
                icon={<AlertTriangle className="w-4 h-4 text-medieval-primary" />}
              />
              <PanelContent>
                <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                  <AnimatedList>
                    {events.slice(0, 10).map((event, i) => (
                      <AnimatedListItem
                        key={i}
                        className={`py-1.5 border-b border-medieval-primary/10 last:border-0 ${
                          event.type === "success"
                            ? "text-era-peace"
                            : event.type === "danger"
                            ? "text-medieval-accent"
                            : event.type === "warning"
                            ? "text-gold"
                            : "text-medieval-text-secondary"
                        }`}
                      >
                        <span className="text-medieval-text-muted">[{event.turn}]</span>{" "}
                        {event.message}
                      </AnimatedListItem>
                    ))}
                  </AnimatedList>
                </div>
              </PanelContent>
            </ParchmentPanel>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile: Territory Bottom Sheet */}
      <TerritoryBottomSheet
        territory={selectedTerritory ? {
          id: selectedTerritory.id,
          name: `Territorio ${selectedTerritory.position + 1}`,
          position: selectedTerritory.position,
          bonusResource: selectedTerritory.bonusResource?.toLowerCase() as "grain" | "wood" | "gold" | null,
          ownerId: selectedTerritory.ownerId || undefined,
        } : null}
        structures={selectedTerritory?.structures.map((s, i) => ({
          id: `struct-${i}`,
          type: s.type,
          level: s.level,
        })) || []}
        isOwned={selectedTerritory?.ownerId === "player"}
        onClose={() => setSelectedTerritoryId(null)}
        onBuild={() => {
          if (selectedTerritory?.ownerId === "player") {
            window.location.href = `/game/territory/${selectedTerritory.id}`;
          }
        }}
        onTrain={() => {
          if (selectedTerritory?.ownerId === "player") {
            window.location.href = `/game/territory/${selectedTerritory.id}`;
          }
        }}
        className="lg:hidden"
      />

      {/* Mobile: Tab Content Sheet */}
      <TabContentSheet
        activeTab={activeTab}
        onClose={() => setActiveTab(null)}
        className="lg:hidden"
      >
        <TabContent
          activeTab={activeTab || "resources"}
          resources={mobileResources}
          clan={mobileClan}
          actions={mobileActions}
          events={mobileEvents}
          onAction={(actionId) => {
            if (actionId === "cards") window.location.href = "/game/cards";
            else if (actionId === "army") window.location.href = "/game/army";
          }}
        />
      </TabContentSheet>

      {/* Mobile: Tab Bar */}
      <MobileTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="lg:hidden"
      />

      {/* Mobile: Drawer Menu */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        userName={session?.user?.name || session?.user?.email || undefined}
        onLogout={handleMobileLogout}
        onHelp={handleMobileHelp}
      />

      {/* Mobile: PWA Install Banner */}
      <PWAInstallBanner className="lg:hidden" />

      {/* Expedition Modal */}
      {expeditionTarget && expeditionOrigin && (
        <ExpeditionModal
          fromTerritory={territories.find((t) => t.id === expeditionOrigin)!}
          toTerritory={territories.find((t) => t.id === expeditionTarget)!}
          playerTerritories={playerTerritories}
          currentEra={currentEra}
          onSend={handleSendExpedition}
          onClose={handleCloseExpedition}
        />
      )}

      {/* Exploration Modal */}
      {selectedExplorationSite && (
        <ExplorationModal
          site={selectedExplorationSite}
          playerTerritories={playerTerritories}
          currentTurn={currentTurn}
          currentEra={currentEra}
          onSend={handleSendExploration}
          onClose={() => setSelectedExplorationSiteId(null)}
        />
      )}
    </div>
  );
}
