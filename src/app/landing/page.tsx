"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swords, Shield, Users, Scroll, Crown, Skull, ChevronDown } from "lucide-react";
import { MedievalButton, MedievalLinkButton } from "@/components/ui/medieval";
import { MedievalCard, MedievalCardContent } from "@/components/ui/medieval";
import { OrnamentDivider, SectionDivider } from "@/components/ui/medieval";
import {
  fadeSlideUp,
  staggerContainer,
  staggerItem,
  transitions,
} from "@/lib/animations";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-medieval-bg-deep">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg/hero-landing.png"
            alt="Medieval castle at dusk"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-medieval-bg-deep/60 via-medieval-bg-deep/40 to-medieval-bg-deep" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,11,9,0.8)_100%)]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center space-y-8 max-w-4xl px-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Logo/Title */}
          <motion.div className="space-y-4" variants={staggerItem}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-cinzel-decorative font-bold text-gradient-golden drop-shadow-2xl">
              Dice&Cards Era
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-medieval-text-secondary font-crimson italic">
              Lidere seu cla em um mundo medieval dark-fantasy
            </p>
          </motion.div>

          {/* Era Flow */}
          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base md:text-lg flex-wrap"
            variants={staggerItem}
          >
            <span className="text-era-peace font-cinzel font-semibold">Construa</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-medieval-text-muted rotate-[-90deg]" />
            <span className="text-era-war font-cinzel font-semibold">Expanda</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-medieval-text-muted rotate-[-90deg]" />
            <span className="text-era-invasion font-cinzel font-semibold">Sobreviva</span>
          </motion.div>

          <motion.div variants={staggerItem}>
            <OrnamentDivider variant="sword" size="lg" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={staggerItem}
          >
            <Link href="/auth/login">
              <MedievalButton variant="primary" size="lg" className="min-w-[200px]">
                Entrar no Jogo
              </MedievalButton>
            </Link>
            <Link href="/auth/register">
              <MedievalButton variant="outline" size="lg" className="min-w-[200px]">
                Criar Conta
              </MedievalButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...transitions.standard }}
        >
          <motion.div
            className="w-8 h-12 rounded-full border-2 border-medieval-primary/50 flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-3 bg-medieval-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Game Constraints */}
      <section className="py-12 sm:py-16 md:py-24 px-4 relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-parchment opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transitions.standard}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel-decorative font-bold text-center mb-4 text-gradient-golden">
              Forje Seu Destino
            </h2>
            <p className="text-center text-medieval-text-secondary mb-8 max-w-2xl mx-auto font-crimson text-lg">
              Domine as mecanicas de um reino em conflito e conduza seu cla a gloria ou a ruina
            </p>
            <div className="flex justify-center mb-16">
              <OrnamentDivider variant="diamond" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transitions.standard}
          >

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4"
              variants={staggerContainer}
            >
              <FeatureCard
                icon={Shield}
                title="3 Eras"
                description="Paz, Guerra e Invasao"
                color="text-era-peace"
              />
              <FeatureCard
                icon={Swords}
                title="Combate Tatico"
                description="Soldados, Arqueiros, Cavaleiros"
                color="text-era-war"
              />
              <FeatureCard
                icon={Users}
                title="4 Clas IA"
                description="Conquistador, Defensor, Oportunista"
                color="text-clan-verdaneos"
              />
              <FeatureCard
                icon={Crown}
                title="3 Origens"
                description="Ferronatos, Verdaneos, Umbral"
                color="text-medieval-primary"
              />
              <FeatureCard
                icon={Scroll}
                title="6 Cartas"
                description="Poderes especiais unicos"
                color="text-era-invasion"
              />
              <FeatureCard
                icon={Skull}
                title="A Horda"
                description="Sobreviva a invasao final"
                color="text-medieval-accent"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Game Overview Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 relative">
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-parchment opacity-30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transitions.standard}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel-decorative font-bold text-center mb-4 text-gradient-golden">
              As Tres Eras
            </h2>
            <p className="text-center text-medieval-text-secondary mb-8 max-w-2xl mx-auto font-crimson text-lg">
              50 turnos de estrategia, diplomacia e sobrevivencia em um mundo a beira do colapso
            </p>
            <div className="flex justify-center mb-16">
              <OrnamentDivider variant="diamond" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <EraCard
              era="1"
              title="Paz das Cinzas"
              turns="15 turnos"
              description="O Pacto mantem a paz. Construa sua base, acumule recursos e prepare-se para o inevitavel conflito que se aproxima."
              color="peace"
              icon={Shield}
              delay={0}
            />
            <EraCard
              era="2"
              title="Era da Guerra"
              turns="20 turnos"
              description="O Pacto foi rompido. Expanda seu territorio, esmague seus inimigos e domine o mapa antes que seja tarde demais."
              color="war"
              icon={Swords}
              delay={0.1}
            />
            <EraCard
              era="3"
              title="A Invasao"
              turns="15 turnos"
              description="A Horda chegou das trevas. Sobreviva as ondas de invasao ou pereca junto com todos os outros clas."
              color="invasion"
              icon={Skull}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-medieval-primary/20 bg-medieval-bg-panel/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <OrnamentDivider variant="dots" size="sm" className="mb-8" />
          <p className="text-medieval-text-muted font-crimson">
            Inspirado por <span className="text-medieval-primary">RyuDragon</span> e{" "}
            <span className="text-medieval-primary">Tribal Wars</span>
          </p>
          <p className="mt-2 text-medieval-text-muted/70 text-sm">
            Um produto Dice&Cards RPG
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div variants={staggerItem}>
      <MedievalCard
        variant="default"
        hoverable
        className="p-4 h-full bg-medieval-bg-card/80 backdrop-blur-sm"
      >
        <MedievalCardContent className="flex flex-col items-center gap-2 p-2 text-center">
          <Icon className={`w-8 h-8 ${color}`} />
          <span className="font-cinzel font-semibold text-medieval-text-primary">
            {title}
          </span>
          <span className="text-sm text-medieval-text-secondary">
            {description}
          </span>
        </MedievalCardContent>
      </MedievalCard>
    </motion.div>
  );
}

function EraCard({
  era,
  title,
  turns,
  description,
  color,
  icon: Icon,
  delay = 0,
}: {
  era: string;
  title: string;
  turns: string;
  description: string;
  color: "peace" | "war" | "invasion";
  icon: React.ElementType;
  delay?: number;
}) {
  const colors = {
    peace: {
      bg: "bg-era-peace",
      border: "border-era-peace/40",
      glow: "glow-era-peace",
      text: "text-era-peace",
      gradient: "from-era-peace/20 to-medieval-bg-card",
    },
    war: {
      bg: "bg-era-war",
      border: "border-era-war/40",
      glow: "glow-era-war",
      text: "text-era-war",
      gradient: "from-era-war/20 to-medieval-bg-card",
    },
    invasion: {
      bg: "bg-era-invasion",
      border: "border-era-invasion/40",
      glow: "glow-era-invasion",
      text: "text-era-invasion",
      gradient: "from-era-invasion/20 to-medieval-bg-card",
    },
  };

  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, ...transitions.standard }}
      whileHover={{ y: -8, transition: transitions.springSmooth }}
    >
      <div
        className={`
          relative overflow-hidden rounded-xl p-6
          bg-gradient-to-b ${c.gradient}
          border-2 ${c.border}
          hover:${c.glow} transition-shadow duration-300
        `}
      >
        {/* Era number badge */}
        <div
          className={`
            absolute top-4 right-4 w-10 h-10 rounded-full
            ${c.bg}/20 border border-current ${c.text}
            flex items-center justify-center
            font-cinzel font-bold text-lg
          `}
        >
          {era}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-lg ${c.bg}/20 flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${c.text}`} />
          </div>
          <div>
            <span className={`text-xs uppercase tracking-wider ${c.text}`}>
              Era {era}
            </span>
            <h3 className="font-cinzel font-bold text-xl text-medieval-text-primary">
              {title}
            </h3>
          </div>
        </div>

        <p className="text-medieval-text-secondary font-crimson mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${c.bg}`} />
          <span className={`text-sm font-medium ${c.text}`}>{turns}</span>
        </div>
      </div>
    </motion.div>
  );
}
