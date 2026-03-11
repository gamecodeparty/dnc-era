"use client";

import { motion } from "framer-motion";
import { Trophy, Skull, Star, Swords, RefreshCw, ScrollText } from "lucide-react";
import { Sparkles } from "@/components/game/fx";
import { MedievalButton } from "@/components/ui/medieval";
import {
  Clan,
  Territory,
  GameEvent,
  getGameStats,
} from "@/stores/gameStore";

// ─── Score ────────────────────────────────────────────────────────────────────

function computeScore(
  clan: Clan,
  territories: Territory[]
): { score: number; territoryCount: number; unitCount: number } {
  const ownedTerritories = territories.filter((t) => t.ownerId === clan.id);
  const territoryCount = ownedTerritories.length;
  const unitCount = ownedTerritories.reduce(
    (sum, t) => sum + t.units.reduce((s, u) => s + u.quantity, 0),
    0
  );
  const population = clan.grain; // grain as proxy for population
  const score =
    territoryCount * 100 + population * 10 + clan.gold * 1 + unitCount * 5;
  return { score, territoryCount, unitCount };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface RankedClan {
  clan: Clan;
  rank: number;
  score: number;
  territoryCount: number;
  unitCount: number;
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
}: {
  ranked: RankedClan;
  index: number;
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
      className={`relative flex items-center gap-3 rounded-lg px-4 py-3 border transition-colors
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
  const stats = getGameStats(events);

  // Build ranked list
  const ranked: RankedClan[] = clans
    .map((clan) => {
      const { score, territoryCount, unitCount } = computeScore(clan, territories);
      return {
        clan,
        score,
        territoryCount,
        unitCount,
        isEliminated: territoryCount === 0,
        isPlayer: clan.isPlayer,
        rank: 0,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const playerRanked = ranked.find((r) => r.isPlayer);

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
              <RankRow key={r.clan.id} ranked={r} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ── Section 2: Stats ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ranked.length * 0.3 + 0.3, duration: 0.4 }}
          className="rounded-lg border border-medieval-border/30 bg-medieval-bg-deep/40 p-4"
        >
          <h2 className="text-sm font-cinzel font-bold text-medieval-text-muted uppercase tracking-widest mb-3">
            Estatísticas da Partida
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: "Turnos jogados", value: stats.turnsPlayed || turn },
              {
                label: "Territórios conquistados",
                value: stats.territoriesCaptured,
              },
              {
                label: "Batalhas vencidas",
                value: `${stats.battlesWon}/${stats.battlesTotal}`,
              },
              { label: "Estruturas construídas", value: stats.structuresBuilt },
              { label: "Unidades treinadas", value: stats.unitsTrained },
              { label: "Cartas usadas", value: stats.cardsUsed },
              { label: "Horda repelida", value: stats.hordeRepelled },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs text-medieval-text-muted">{label}</span>
                <span className="font-bold text-medieval-text-primary">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 3: Epic Moment ── */}
        {stats.epicMoment && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ranked.length * 0.3 + 0.6, duration: 0.4 }}
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
          transition={{ delay: ranked.length * 0.3 + 0.9, duration: 0.4 }}
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
