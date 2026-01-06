"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Handshake, Sword, Shield, Skull, Crown, Users, AlertCircle, Check } from "lucide-react";
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
} from "@/components/ui/medieval";
import {
  useGameStore,
  type DiplomacyRelation,
  type AIPersonality,
  type ClanOrigin,
} from "@/stores/gameStore";
import { staggerContainer, staggerItem } from "@/lib/animations";

const getRelationColor = (relation: DiplomacyRelation) => {
  switch (relation) {
    case "TRUSTED":
      return "text-era-peace bg-era-peace/10 border-era-peace/30";
    case "NEUTRAL":
      return "text-medieval-text-secondary bg-medieval-bg-card/50 border-medieval-primary/30";
    case "HOSTILE":
      return "text-medieval-accent bg-medieval-accent/10 border-medieval-accent/30";
    default:
      return "text-medieval-text-secondary bg-medieval-bg-card/50 border-medieval-primary/30";
  }
};

const getRelationLabel = (relation: DiplomacyRelation) => {
  switch (relation) {
    case "TRUSTED":
      return "Aliado";
    case "NEUTRAL":
      return "Neutro";
    case "HOSTILE":
      return "Em Guerra";
    default:
      return "Desconhecido";
  }
};

const getOriginLabel = (origin?: ClanOrigin) => {
  switch (origin) {
    case "FERRONATOS":
      return "Ferronatos (+20% militar)";
    case "VERDANEOS":
      return "Verdaneos (+20% graos)";
    case "UMBRAL":
      return "Umbral (+30% espionagem)";
    default:
      return "Origem desconhecida";
  }
};

const getPersonalityIcon = (personality?: AIPersonality) => {
  switch (personality) {
    case "CONQUEROR":
      return <Sword className="w-5 h-5 text-medieval-accent" />;
    case "DEFENDER":
      return <Shield className="w-5 h-5 text-era-peace" />;
    case "OPPORTUNIST":
      return <Skull className="w-5 h-5 text-gold" />;
    case "MERCHANT":
      return <Crown className="w-5 h-5 text-medieval-primary" />;
    default:
      return <Users className="w-5 h-5 text-medieval-text-muted" />;
  }
};

const getPersonalityLabel = (personality?: AIPersonality) => {
  switch (personality) {
    case "CONQUEROR":
      return "Conquistador";
    case "DEFENDER":
      return "Defensor";
    case "OPPORTUNIST":
      return "Oportunista";
    case "MERCHANT":
      return "Mercador";
    default:
      return "Desconhecido";
  }
};

export default function DiplomacyPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null);

  const {
    getAIClans,
    getDiplomacy,
    declareWar,
    proposePeace,
    territories,
    currentEra,
  } = useGameStore();

  const aiClans = getAIClans();

  // Calculate military power for each clan
  const getClanPower = (clanId: string) => {
    const clanTerritories = territories.filter((t) => t.ownerId === clanId);
    let power = 0;
    clanTerritories.forEach((t) => {
      t.units.forEach((u) => {
        const stats: Record<string, number> = { SOLDIER: 10, ARCHER: 12, KNIGHT: 20 };
        power += u.quantity * (stats[u.type] || 0);
      });
    });
    return power;
  };

  const getClanTerritoryCount = (clanId: string) => {
    return territories.filter((t) => t.ownerId === clanId).length;
  };

  const handleDeclareWar = (clanId: string) => {
    const result = declareWar(clanId);
    setFeedback({
      type: result.success ? "success" : "error",
      message: result.message,
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProposePeace = (clanId: string) => {
    const result = proposePeace(clanId);
    setFeedback({
      type: result.success ? "success" : "warning",
      message: result.message,
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg/era-war.png"
          alt="Diplomacy background"
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
                Diplomacia
              </h1>
              <p className="text-sm text-medieval-text-secondary">
                Gerencie suas relacoes com outros clas
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              className={`px-6 py-3 rounded-lg border flex items-center gap-2 ${
                feedback.type === "success"
                  ? "bg-era-peace/20 border-era-peace/50 text-era-peace"
                  : feedback.type === "warning"
                  ? "bg-gold/20 border-gold/50 text-gold"
                  : "bg-medieval-accent/20 border-medieval-accent/50 text-medieval-accent"
              }`}
            >
              {feedback.type === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-crimson">{feedback.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="container mx-auto px-4 py-6 relative z-10"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Era warning */}
        {currentEra === "PEACE" && (
          <motion.div variants={staggerItem} className="mb-6">
            <div className="bg-era-peace/10 border border-era-peace/30 rounded-lg p-4 text-center">
              <p className="text-era-peace font-crimson">
                <strong>Era da Paz:</strong> O Pacto impede ataques entre clas.
                Relacoes diplomaticas ainda podem ser alteradas.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiClans.map((clan) => {
            const relation = getDiplomacy(clan.id);
            const territoryCount = getClanTerritoryCount(clan.id);
            const militaryPower = getClanPower(clan.id);

            return (
              <motion.div key={clan.id} variants={staggerItem}>
                <MedievalCard variant="elevated">
                  <MedievalCardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-medieval-bg-deep/50 flex items-center justify-center border border-medieval-primary/20">
                          {getPersonalityIcon(clan.personality)}
                        </div>
                        <div>
                          <MedievalCardTitle className="text-lg">
                            {clan.name}
                          </MedievalCardTitle>
                          <p className="text-xs text-medieval-text-muted">
                            {getOriginLabel(clan.origin)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs border font-cinzel ${getRelationColor(
                          relation
                        )}`}
                      >
                        {getRelationLabel(relation)}
                      </span>
                    </div>
                  </MedievalCardHeader>
                  <MedievalCardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-medieval-bg-deep/30 rounded">
                        <span className="text-medieval-text-muted block text-xs">
                          Territorios
                        </span>
                        <p className="text-lg font-bold text-medieval-primary">
                          {territoryCount}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-medieval-bg-deep/30 rounded">
                        <span className="text-medieval-text-muted block text-xs">
                          Poder Militar
                        </span>
                        <p className="text-lg font-bold text-medieval-accent">
                          {militaryPower}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-medieval-bg-deep/30 rounded">
                        <span className="text-medieval-text-muted block text-xs">
                          Personalidade
                        </span>
                        <p className="text-xs font-medium text-medieval-text-secondary mt-1">
                          {getPersonalityLabel(clan.personality)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {relation !== "TRUSTED" && (
                        <MedievalButton
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleProposePeace(clan.id)}
                          icon={<Handshake className="w-4 h-4" />}
                        >
                          Propor Paz
                        </MedievalButton>
                      )}
                      {relation !== "HOSTILE" && (
                        <MedievalButton
                          variant="danger"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDeclareWar(clan.id)}
                          icon={<Sword className="w-4 h-4" />}
                        >
                          Declarar Guerra
                        </MedievalButton>
                      )}
                      {relation === "TRUSTED" && (
                        <MedievalButton
                          variant="ghost"
                          size="sm"
                          className="flex-1 text-era-peace"
                          disabled
                          icon={<Check className="w-4 h-4" />}
                        >
                          Aliados
                        </MedievalButton>
                      )}
                      {relation === "HOSTILE" && (
                        <MedievalButton
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleProposePeace(clan.id)}
                          icon={<Handshake className="w-4 h-4" />}
                        >
                          Propor Paz
                        </MedievalButton>
                      )}
                    </div>
                  </MedievalCardContent>
                </MedievalCard>
              </motion.div>
            );
          })}
        </div>

        {/* Diplomacy Rules */}
        <motion.div variants={staggerItem} className="mt-6">
          <ParchmentPanel animated>
            <PanelHeader title="Regras de Diplomacia" />
            <PanelContent className="text-sm space-y-2">
              <p>
                <strong className="text-era-peace">Aliados:</strong> Nao podem se
                atacar. Bonus de comercio.
              </p>
              <p>
                <strong className="text-medieval-text-secondary">Neutros:</strong>{" "}
                Podem ser atacados na Era da Guerra.
              </p>
              <p>
                <strong className="text-medieval-accent">Em Guerra:</strong>{" "}
                Prioridade de ataque para a IA. Pode atacar assim que a era de paz terminar.
              </p>
              <p className="pt-2 text-gold">
                <strong>Dica:</strong> Mercadores e Defensores sao mais propensos a aceitar paz.
                Conquistadores raramente aceitam.
              </p>
            </PanelContent>
          </ParchmentPanel>
        </motion.div>
      </motion.div>
    </div>
  );
}
