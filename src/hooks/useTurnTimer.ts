import { useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";

/**
 * Hook de timer de turno.
 * Deve ser chamado APENAS em /game/page.tsx.
 * Chama resumeTimer() no mount e pauseTimer() no unmount,
 * garantindo que sub-páginas não avancem o timer.
 */
export function useTurnTimer() {
  const { timeRemaining, timerPaused, gameOver, tickTimer, pauseTimer, resumeTimer } =
    useGameStore();

  // Resume ao montar /game, pausa ao desmontar (navegar para sub-páginas)
  useEffect(() => {
    resumeTimer();
    return () => {
      pauseTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive do tick — interval rodando apenas enquanto hook está montado
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => tickTimer(), 1000);
    return () => clearInterval(interval);
  }, [gameOver, tickTimer]);

  return { timeRemaining, isPaused: timerPaused };
}
