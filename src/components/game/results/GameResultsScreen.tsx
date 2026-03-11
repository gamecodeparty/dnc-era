"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trophy, Skull, Star, Swords, RefreshCw, ScrollText, ChevronDown } from "lucide-react";
import { Sparkles } from "@/components/game/fx";
import { MedievalButton } from "@/components/ui/medieval";
import {
  Clan,
  Territory,
  GameEvent,
  getGameStats,
  useGameStore,
} from "@/stores/gameStore";

// ─── Score ────────────────────────────────────────────────────────────────────

interface ScoreBreakdown {
  territories: { count: number; multiplier: number; subtotal: number };
  population: { count: number; multiplier: number; subtotal: number };
  gold: { count: number; multiplier: number; subtotal: number };
  units: { count: number; multiplier: number; subtotal: number };
  total: number;
}

function computeScore(
  clan: Clan,
  territories: Territory[]
): { score: number; territoryCount: number; unitCount: number; breakdown: ScoreBreakdown } {
  const ownedTerritories = territories.filter((t) => t.ownerId === clan.id);
  const territoryCount = ownedTerritories.length;
  const unitCount = ownedTerritories.reduce(
    (sum, t) => sum + t.units.reduce((s, u) => s + u.quantity, 0),
    0
  );
  const population = clan.grain; // grain as proxy for population
  const score =
    territoryCount * 100 + population * 10 + clan.gold * 1 + unitCount * 5;
  const breakdown: ScoreBreakdown = {
    territories: { count: territoryCount, multiplier: 100, subtotal: territoryCount * 100 },
    population: { count: population, multiplier: 10, subtotal: population * 10 },
    gold: { count: clan.gold, multiplier: 1, subtotal: clan.gold * 1 },
    units: { count: unitCount, multiplier: 5, subtotal: unitCount * 5 },
    total: score,
  };
  return { score, territoryCount, unitCount, breakdown };
}

// ─── Inline Score Breakdown ───────────────────────────────────────────────────

function InlineBreakdown({ breakdown }: { breakdown: ScoreBreakdown }) {
  const rows = [
    { label: "Territórios", count: breakdown.territories.count, multiplier: breakdown.territories.multiplier, subtotal: breakdown.territories.subtotal },
    { label: "População", count: breakdown.population.count, multiplier: breakdown.population.multiplier, subtotal: breakdown.population.subtotal },
    { label: "Ouro", count: breakdown.gold.count, multiplier: breakdown.gold.multiplier, subtotal: breakdown.gold.subtotal },
    { label: "Unidades", count: breakdown.units.count, multiplier: breakdown.units.multiplier, subtotal: breakdown.units.subtotal },
  ];

  return (
    <div className="mt-3 pt-3 border-t border-medieval-border/20 space-y-1.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between text-xs">
          <span className="text-medieval-text-secondary">
            {row.label}{" "}
            <span className="text-medieval-text-muted">
              ({row.count.toLocaleString("pt-BR")} × {row.multiplier})
            </span>
          </span>
          <span className="font-bold tabular-nums text-medieval-text-primary">
            = {row.subtotal.toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
      <div className="border-t border-medieval-border/20 pt-1.5 mt-1 flex items-center justify-between">
        <span className="font-cinzel font-bold text-medieval-text-muted text-xs uppercase tracking-wide">
          Total
        </span>
        <span className="text-base font-bold text-amber-400 tabular-nums">
          = {breakdown.total.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

// ─── Stat Item ────────────────────────────────────────────────────────────────

function StatItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: "success" | "danger";
}) {
  const valueClass =
    highlight === "success"
      ? "font-bold text-era-peace"
      : highlight === "danger"
      ? "font-bold text-red-400"
      : "font-bold text-medieval-text-primary";

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-medieval-text-muted leading-tight">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface RankedClan {
  clan: Clan;
  rank: number;
  score: number;
  territoryCount: number;
  unitCount: number;
  breakdown: ScoreBreakdown;
  isEliminated: boolean;
  isPlayer: boolean;
}

interface Props {
  clans: Clan[];
  territories: Territory[];
  events: GameEvent[];
  isVictory: boolean;
  turn: number;
  onRestart: () => void;
  onViewDetails?: () => void;
}

// ─── Rank Row ─────────────────────────────────────────────────────────────────

function RankRow({
  ranked,
  index,
  isExpanded,
  onToggle,
}: {
  ranked: RankedClan;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isFirst = ranked.rank === 1;

  return (
    <motion.div
      custom={index}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: index * 0.3,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative rounded-lg border transition-colors
        ${isFirst ? "border-yellow-500/60 bg-yellow-900/20" : "border-medieval-border/30 bg-medieval-bg-deep/40"}
        ${ranked.isPlayer && !isFirst ? "border-era-peace/50 bg-era-peace/10" : ""}
        ${ranked.isEliminated ? "opacity-50 grayscale" : ""}
      `}
    >
      {/* Gold glow for 1st place */}
      {isFirst && (
        <div className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
          <Sparkles color="#ffd700" count={10} size={6} />
        </div>
      )}

      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Rank badge */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
            ${isFirst ? "bg-yellow-500 text-black" : "bg-medieval-bg-mid/60 text-medieval-text-secondary"}
          `}
        >
          {ranked.isEliminated ? (
            <Skull className="w-4 h-4 text-red-500" />
          ) : (
            ranked.rank
          )}
        </div>

        {/* Name + player indicator */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {ranked.isPlayer && (
              <Star className="w-3.5 h-3.5 text-era-peace shrink-0" />
            )}
            {isFirst && !ranked.isEliminated && (
              <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
            )}
            <span
              className={`font-cinzel font-semibold text-sm truncate
                ${isFirst ? "text-yellow-300" : ""}
                ${ranked.isPlayer && !isFirst ? "text-era-peace" : ""}
                ${!isFirst && !ranked.isPlayer ? "text-medieval-text-primary" : ""}
              `}
            >
              {ranked.clan.name}
            </span>
            {ranked.isEliminated && (
              <span className="text-xs text-red-400 font-bold shrink-0">
                ELIMINADO
              </span>
            )}
          </div>
          <div className="text-xs text-medieval-text-muted">
            {ranked.territoryCount} terr. · {ranked.unitCount} unidades ·{" "}
            {ranked.clan.gold} ouro
          </div>
        </div>

        {/* Score */}
        <div
          className={`text-right shrink-0 font-bold tabular-nums
            ${isFirst ? "text-yellow-300 text-lg" : "text-medieval-text-secondary text-sm"}
          `}
        >
          {ranked.score.toLocaleString()}
          <div className="text-xs font-normal text-medieval-text-muted">pts</div>
        </div>

        {/* Toggle button */}
        <button
          onClick={onToggle}
          aria-label={isExpanded ? "Colapsar detalhes" : "Ver detalhes"}
          className="shrink-0 flex items-center gap-1 text-xs text-medieval-text-muted hover:text-medieval-text-secondary transition-colors px-1 py-1"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Inline breakdown */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="breakdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3">
              <InlineBreakdown breakdown={ranked.breakdown} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function GameResultsScreen({
  clans,
  territories,
  events,
  isVictory,
  turn,
  onRestart,
  onViewDetails,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerCards = useGameStore((s: any) => s.playerCards);
  const stats = getGameStats(events, playerCards);

  // Build ranked list
  const ranked: RankedClan[] = clans
    .map((clan) => {
      const { score, territoryCount, unitCount, breakdown } = computeScore(clan, territories);
      return {
        clan,
        score,
        territoryCount,
        unitCount,
        breakdown,
        isEliminated: territoryCount === 0,
        isPlayer: clan.isPlayer,
        rank: 0,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const playerRanked = ranked.find((r) => r.isPlayer);

  // Expanded state: player expanded by default
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(playerRanked ? [playerRanked.clan.id] : [])
  );

  function toggleExpanded(clanId: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(clanId)) {
        next.delete(clanId);
      } else {
        next.add(clanId);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block mb-3">
          {isVictory ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                <Sparkles color="#ffd700" count={12} size={7} />
              </div>
            </>
          ) : (
            <Skull className="w-16 h-16 text-medieval-accent mx-auto" />
          )}
        </div>

        <h1
          className={`text-3xl sm:text-5xl font-cinzel-decorative font-bold mb-2
            ${isVictory ? "text-yellow-400" : "text-medieval-accent"}
          `}
        >
          {isVictory ? "VITÓRIA!" : "GAME OVER"}
        </h1>

        <p className="text-medieval-text-secondary font-crimson text-base">
          {isVictory
            ? `Você sobreviveu todos os ${turn} turnos!`
            : `Você foi derrotado no turno ${turn}.`}
          {playerRanked && (
            <span className="ml-2 text-medieval-text-muted">
              Posição final:{" "}
              <span
                className={playerRanked.rank === 1 ? "text-yellow-400 font-bold" : "text-era-peace font-semibold"}
              >
                #{playerRanked.rank}
              </span>
            </span>
          )}
        </p>
      </motion.div>

      <div className="w-full max-w-lg space-y-6">
        {/* ── Section 1: Ranking ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-sm font-cinzel font-bold text-medieval-text-muted uppercase tracking-widest mb-3">
            Ranking Final
          </h2>
          <div className="space-y-2">
            {ranked.map((r, i) => (
              <RankRow
                key={r.clan.id}
                ranked={r}
                index={i}
                isExpanded={expandedIds.has(r.clan.id)}
                onToggle={() => toggleExpanded(r.clan.id)}
              />
            ))}
          </div>
        </motion.section>

        {/* ── Section 3: Stats ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ranked.length * 0.3 + 1.5, duration: 0.4 }}
          className="rounded-lg border border-medieval-border/30 bg-medieval-bg-deep/40 p-4"
        >
          <h2 className="text-sm font-cinzel font-bold text-medieval-text-muted uppercase tracking-widest mb-3">
            Estatísticas da Partida
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <StatItem
              label="Batalhas vencidas"
              value={`${stats.battlesWon}/${stats.battlesTotal}`}
            />
            <StatItem
              label="Territórios conquistados"
              value={stats.territoriesCaptured}
            />
            <StatItem
              label="Territórios perdidos"
              value={stats.territoriesLost}
              highlight={stats.territoriesLost > 0 ? "danger" : undefined}
            />
            <StatItem
              label="Estruturas construídas"
              value={stats.structuresBuilt}
            />
            <StatItem
              label="Unidades treinadas"
              value={stats.unitsTrained}
            />
            <StatItem
              label="Cartas usadas"
              value={stats.totalCards > 0 ? `${stats.cardsUsed}/${stats.totalCards}` : stats.cardsUsed}
            />
            <StatItem
              label="Horda repelida"
              value={`${stats.hordeRepelled}x`}
              highlight={stats.hordeRepelled > 0 ? "success" : undefined}
            />
          </div>
        </motion.section>

        {/* ── Section 4: Epic Moment ── */}
        {stats.epicMoment && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ranked.length * 0.3 + 1.8, duration: 0.4 }}
            className="rounded-lg border border-medieval-accent/30 bg-medieval-accent/5 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Swords className="w-4 h-4 text-medieval-accent" />
              <h2 className="text-sm font-cinzel font-bold text-medieval-accent uppercase tracking-widest">
                Momento Épico
              </h2>
            </div>
            <p className="text-xs text-medieval-text-muted mb-1">
              Turno {stats.epicMoment.turn} ·{" "}
              {stats.epicMoment.territoryName}
            </p>
            <p className="text-sm text-medieval-text-secondary font-crimson">
              {stats.epicMoment.attackerName} vs{" "}
              {stats.epicMoment.defenderName}
            </p>
            <p className="text-xs text-medieval-text-muted mt-1">
              Baixas: {stats.epicMoment.attackerLosses} atk ·{" "}
              {stats.epicMoment.defenderLosses} def ·{" "}
              <span
                className={
                  stats.epicMoment.result === "victory"
                    ? "text-era-peace font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {stats.epicMoment.result === "victory" ? "Vitória" : "Derrota"}
              </span>
            </p>
          </motion.section>
        )}

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ranked.length * 0.3 + 2.1, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 pt-2 pb-8"
        >
          <MedievalButton
            variant="primary"
            size="lg"
            onClick={onRestart}
            icon={<RefreshCw className="w-5 h-5" />}
            className="flex-1"
          >
            Jogar Novamente
          </MedievalButton>
          {onViewDetails && (
            <MedievalButton
              variant="ghost"
              size="lg"
              onClick={onViewDetails}
              icon={<ScrollText className="w-5 h-5" />}
              className="flex-1"
            >
              Ver Detalhes
            </MedievalButton>
          )}
        </motion.div>
      </div>
    </div>
  );
}
