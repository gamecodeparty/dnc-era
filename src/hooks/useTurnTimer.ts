import { useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";

/**
 * Hook de timer de turno.
 * Deve ser chamado APENAS em /game/page.tsx.
 * Roda o interval de tick continuamente — não pausa ao navegar entre páginas.
 * O timer pode ser pausado pelo store (ex: ao fim do jogo) via timerPaused.
 */
export function useTurnTimer() {
  const { timeRemaining, timerPaused, gameOver, tickTimer } = useGameStore();

  // Drive do tick — interval rodando continuamente
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => tickTimer(), 1000);
    return () => clearInterval(interval);
  }, [gameOver, tickTimer]);

  return { timeRemaining, isPaused: timerPaused };
}
