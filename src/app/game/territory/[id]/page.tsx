"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Hammer,
  Shield,
  Sword,
  Wheat,
  TreePine,
  Coins,
  Check,
  Castle,
  Users,
} from "lucide-react";
import {
  useGameStore,
  STRUCTURE_COSTS,
  UNIT_COSTS,
  UNIT_STATS,
  StructureType,
  UnitType,
} from "@/stores/gameStore";

// Medieval components
import { MedievalButton } from "@/components/ui/medieval";
import {
  MedievalCard,
  MedievalCardContent,
  MedievalCardHeader,
  MedievalCardTitle,
} from "@/components/ui/medieval";
import {
  ParchmentPanel,
  PanelHeader,
  PanelContent,
  PanelSection,
  AnimatedList,
  AnimatedListItem,
} from "@/components/ui/medieval";
import { OrnamentDivider } from "@/components/ui/medieval";

// FX components
import { useGameAnimationContext, Sparkles } from "@/components/game/fx";

// Animations
import { staggerContainer, staggerItem, transitions } from "@/lib/animations";

const STRUCTURE_INFO: Record<
  StructureType,
  { name: string; description: string; icon: typeof Wheat }
> = {
  FARM: { name: "Fazenda", description: "Produz +10 graos/turno", icon: Wheat },
  SAWMILL: { name: "Serraria", description: "Produz +8 madeira/turno", icon: TreePine },
  MINE: { name: "Mina", description: "Produz +5 ouro/turno", icon: Coins },
  BARRACKS: { name: "Quartel", description: "Treina Soldados e Arqueiros", icon: Sword },
  STABLE: { name: "Estabulo", description: "Treina Cavaleiros", icon: Shield },
  WALL: { name: "Muralha", description: "+20% defesa por nivel", icon: Castle },
};

const UNIT_INFO: Record<UnitType, { name: string; requires: StructureType }> = {
  SOLDIER: { name: "Soldado", requires: "BARRACKS" },
  ARCHER: { name: "Arqueiro", requires: "BARRACKS" },
  KNIGHT: { name: "Cavaleiro", requires: "STABLE" },
};

export default function TerritoryPage() {
  const params = useParams();
  const router = useRouter();
  const territoryId = params.id as string;

  const { triggerBuildComplete, triggerAchievement, triggerResourcePopup } =
    useGameAnimationContext();

  const { territories, getPlayerClan, build, train, canAfford } = useGameStore();
  const territory = territories.find((t) => t.id === territoryId);
  const player = getPlayerClan();

  if (!territory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MedievalCard variant="elevated" className="max-w-md">
          <MedievalCardContent className="text-center py-8">
            <p className="text-medieval-text-secondary font-crimson">
              Territorio nao encontrado
            </p>
            <MedievalButton
              variant="primary"
              className="mt-4"
              onClick={() => router.push("/game")}
            >
              Voltar ao Jogo
            </MedievalButton>
          </MedievalCardContent>
        </MedievalCard>
      </div>
    );
  }

  if (territory.ownerId !== "player") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MedievalCard variant="elevated" className="max-w-md">
          <MedievalCardContent className="text-center py-8">
            <Shield className="w-12 h-12 text-medieval-accent mx-auto mb-4" />
            <p className="text-medieval-text-secondary font-crimson mb-4">
              Voce nao controla este territorio!
            </p>
            <MedievalButton variant="primary" onClick={() => router.push("/game")}>
              Voltar ao Jogo
            </MedievalButton>
          </MedievalCardContent>
        </MedievalCard>
      </div>
    );
  }

  const handleBuild = (structureType: StructureType) => {
    const cost = STRUCTURE_COSTS[structureType];
    const success = build(territoryId, structureType);

    if (success) {
      // Trigger build animation
      triggerBuildComplete(territoryId, structureType);

      // Trigger resource deduction animations
      if (cost.grain) triggerResourcePopup("GRAIN", -cost.grain);
      if (cost.wood) triggerResourcePopup("WOOD", -cost.wood);
      if (cost.gold) triggerResourcePopup("GOLD", -cost.gold);

      // Achievement for first building
      if (territory.structures.length === 0) {
        triggerAchievement("Primeira Construcao!", `${STRUCTURE_INFO[structureType].name} erguida!`);
      }
    }
  };

  const handleTrain = (unitType: UnitType) => {
    const cost = UNIT_COSTS[unitType];
    const success = train(territoryId, unitType, 1);

    if (success) {
      // Trigger resource deduction animations
      if (cost.grain) triggerResourcePopup("GRAIN", -cost.grain);
      if (cost.wood) triggerResourcePopup("WOOD", -cost.wood);
      if (cost.gold) triggerResourcePopup("GOLD", -cost.gold);

      // First unit achievement
      const existingUnits = territory.units.reduce((sum, u) => sum + u.quantity, 0);
      if (existingUnits === 0) {
        triggerAchievement("Exercito Nascente!", `Primeiro ${UNIT_INFO[unitType].name} treinado!`);
      }
    }
  };

  const hasStructure = (type: StructureType) =>
    territory.structures.some((s) => s.type === type);
  const isFull = territory.structures.length >= 4;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg/territory-village.png"
          alt="Territory village"
          fill
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-medieval-bg-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-medieval-bg-deep via-transparent to-medieval-bg-deep/50" />
      </div>

      {/* Header */}
      <header className="border-b border-medieval-primary/20 bg-medieval-bg-panel/90 backdrop-blur-md relative z-20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MedievalButton
                variant="ghost"
                size="sm"
                onClick={() => router.push("/game")}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar
              </MedievalButton>
              <div>
                <h1 className="text-xl font-cinzel font-bold text-medieval-text-primary">
                  Territorio {territory.position + 1}
                </h1>
                <p className="text-sm text-medieval-text-secondary">
                  Bonus: +25%{" "}
                  <span className="text-medieval-primary">{territory.bonusResource}</span>
                </p>
              </div>
            </div>

            {/* Recursos do jogador */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-medieval-bg-card/80 rounded-lg border border-grain/30">
                <Wheat className="w-4 h-4 text-grain" />
                <span className="text-grain font-bold font-mono">
                  {Math.floor(player.grain)}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-medieval-bg-card/80 rounded-lg border border-wood-light/30">
                <TreePine className="w-4 h-4 text-wood-light" />
                <span className="text-wood-light font-bold font-mono">
                  {Math.floor(player.wood)}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-medieval-bg-card/80 rounded-lg border border-gold/30">
                <Coins className="w-4 h-4 text-gold" />
                <span className="text-gold font-bold font-mono">
                  {Math.floor(player.gold)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <motion.div
        className="container mx-auto px-4 py-6 relative z-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Coluna 1: Info do territorio */}
          <motion.div className="col-span-4 space-y-4" variants={staggerItem}>
            {/* Estruturas existentes */}
            <ParchmentPanel animated>
              <PanelHeader
                title="Estruturas"
                icon={<Castle className="w-4 h-4" />}
                action={
                  <span className="text-sm text-medieval-text-muted">
                    {territory.structures.length}/4
                  </span>
                }
              />
              <PanelContent>
                {territory.structures.length > 0 ? (
                  <AnimatedList className="space-y-2">
                    {territory.structures.map((s, i) => {
                      const info = STRUCTURE_INFO[s.type];
                      const Icon = info.icon;
                      return (
                        <AnimatedListItem
                          key={i}
                          className="flex items-center justify-between p-3 bg-medieval-bg-deep/50 rounded-lg border border-medieval-primary/20"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-medieval-primary" />
                            <div>
                              <p className="font-cinzel font-medium text-medieval-text-primary">
                                {info.name}
                              </p>
                              <p className="text-xs text-medieval-text-muted">
                                Nivel {s.level}
                              </p>
                            </div>
                          </div>
                          <Check className="w-5 h-5 text-era-peace" />
                        </AnimatedListItem>
                      );
                    })}
                  </AnimatedList>
                ) : (
                  <p className="text-medieval-text-muted text-center py-6 font-crimson italic">
                    Nenhuma estrutura construida
                  </p>
                )}
              </PanelContent>
            </ParchmentPanel>

            {/* Unidades */}
            <ParchmentPanel animated>
              <PanelHeader title="Unidades" icon={<Users className="w-4 h-4" />} />
              <PanelContent>
                {territory.units.length > 0 ? (
                  <AnimatedList className="space-y-2">
                    {territory.units.map((u, i) => (
                      <AnimatedListItem
                        key={i}
                        className="flex items-center justify-between p-3 bg-medieval-bg-deep/50 rounded-lg border border-medieval-accent/20"
                      >
                        <div className="flex items-center gap-3">
                          <Sword className="w-5 h-5 text-medieval-accent" />
                          <div>
                            <p className="font-cinzel font-medium text-medieval-text-primary">
                              {u.quantity}x {UNIT_INFO[u.type].name}
                            </p>
                            <p className="text-xs text-medieval-text-muted">
                              ATK: {UNIT_STATS[u.type].atk} | DEF:{" "}
                              {UNIT_STATS[u.type].def}
                            </p>
                          </div>
                        </div>
                      </AnimatedListItem>
                    ))}
                  </AnimatedList>
                ) : (
                  <p className="text-medieval-text-muted text-center py-6 font-crimson italic">
                    Nenhuma unidade
                  </p>
                )}
              </PanelContent>
            </ParchmentPanel>
          </motion.div>

          {/* Coluna 2: Construir */}
          <motion.div className="col-span-4" variants={staggerItem}>
            <ParchmentPanel animated>
              <PanelHeader
                title="Construir"
                icon={<Hammer className="w-4 h-4 text-medieval-primary" />}
              />
              <PanelContent className="space-y-3">
                {(Object.keys(STRUCTURE_INFO) as StructureType[]).map((type) => {
                  const info = STRUCTURE_INFO[type];
                  const cost = STRUCTURE_COSTS[type];
                  const Icon = info.icon;
                  const alreadyBuilt = hasStructure(type);
                  const affordable = canAfford(cost);
                  const canBuild = !alreadyBuilt && !isFull && affordable;

                  return (
                    <motion.div
                      key={type}
                      className={`p-3 rounded-lg border transition-all ${
                        canBuild
                          ? "bg-medieval-bg-card/80 border-medieval-primary/30 hover:border-medieval-primary/60"
                          : "bg-medieval-bg-deep/30 border-medieval-text-muted/20 opacity-60"
                      }`}
                      whileHover={canBuild ? { scale: 1.02 } : {}}
                      whileTap={canBuild ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-medieval-primary" />
                          <span className="font-cinzel font-medium text-medieval-text-primary">
                            {info.name}
                          </span>
                        </div>
                        {alreadyBuilt ? (
                          <span className="text-xs text-era-peace flex items-center gap-1">
                            <Check className="w-3 h-3" /> Construido
                          </span>
                        ) : (
                          <MedievalButton
                            size="sm"
                            variant={canBuild ? "primary" : "ghost"}
                            onClick={() => handleBuild(type)}
                            disabled={!canBuild}
                          >
                            Construir
                          </MedievalButton>
                        )}
                      </div>
                      <p className="text-xs text-medieval-text-muted mb-2 font-crimson">
                        {info.description}
                      </p>
                      <div className="flex gap-3 text-xs">
                        {cost.grain && (
                          <span
                            className={
                              player.grain >= cost.grain ? "text-grain" : "text-medieval-accent"
                            }
                          >
                            {cost.grain} graos
                          </span>
                        )}
                        {cost.wood && (
                          <span
                            className={
                              player.wood >= cost.wood
                                ? "text-wood-light"
                                : "text-medieval-accent"
                            }
                          >
                            {cost.wood} madeira
                          </span>
                        )}
                        {cost.gold && (
                          <span
                            className={
                              player.gold >= cost.gold ? "text-gold" : "text-medieval-accent"
                            }
                          >
                            {cost.gold} ouro
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {isFull && (
                  <div className="text-center py-2">
                    <p className="text-medieval-primary text-sm font-cinzel">
                      Territorio cheio! (4/4)
                    </p>
                  </div>
                )}
              </PanelContent>
            </ParchmentPanel>
          </motion.div>

          {/* Coluna 3: Treinar */}
          <motion.div className="col-span-4" variants={staggerItem}>
            <ParchmentPanel animated>
              <PanelHeader
                title="Treinar Unidades"
                icon={<Sword className="w-4 h-4 text-medieval-accent" />}
              />
              <PanelContent className="space-y-3">
                {(Object.keys(UNIT_INFO) as UnitType[]).map((type) => {
                  const info = UNIT_INFO[type];
                  const cost = UNIT_COSTS[type];
                  const stats = UNIT_STATS[type];
                  const hasRequired = hasStructure(info.requires);
                  const affordable = canAfford(cost);
                  const canTrain = hasRequired && affordable;

                  return (
                    <motion.div
                      key={type}
                      className={`p-3 rounded-lg border transition-all ${
                        canTrain
                          ? "bg-medieval-bg-card/80 border-medieval-accent/30 hover:border-medieval-accent/60"
                          : "bg-medieval-bg-deep/30 border-medieval-text-muted/20 opacity-60"
                      }`}
                      whileHover={canTrain ? { scale: 1.02 } : {}}
                      whileTap={canTrain ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-cinzel font-medium text-medieval-text-primary">
                          {info.name}
                        </span>
                        <MedievalButton
                          size="sm"
                          variant={canTrain ? "danger" : "ghost"}
                          onClick={() => handleTrain(type)}
                          disabled={!canTrain}
                        >
                          Treinar
                        </MedievalButton>
                      </div>
                      <div className="flex gap-4 text-xs text-medieval-text-secondary mb-2">
                        <span>ATK: {stats.atk}</span>
                        <span>DEF: {stats.def}</span>
                      </div>
                      {!hasRequired && (
                        <p className="text-xs text-medieval-accent mb-2">
                          Requer: {STRUCTURE_INFO[info.requires].name}
                        </p>
                      )}
                      <div className="flex gap-3 text-xs">
                        {cost.grain && (
                          <span
                            className={
                              player.grain >= cost.grain ? "text-grain" : "text-medieval-accent"
                            }
                          >
                            {cost.grain} graos
                          </span>
                        )}
                        {cost.wood && (
                          <span
                            className={
                              player.wood >= cost.wood
                                ? "text-wood-light"
                                : "text-medieval-accent"
                            }
                          >
                            {cost.wood} madeira
                          </span>
                        )}
                        {cost.gold && (
                          <span
                            className={
                              player.gold >= cost.gold ? "text-gold" : "text-medieval-accent"
                            }
                          >
                            {cost.gold} ouro
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                <OrnamentDivider variant="dots" size="sm" className="my-4" />

                <p className="text-xs text-medieval-text-muted font-crimson text-center">
                  Construa um Quartel para Soldados e Arqueiros.
                  <br />
                  Construa um Estabulo para Cavaleiros.
                </p>
              </PanelContent>
            </ParchmentPanel>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
