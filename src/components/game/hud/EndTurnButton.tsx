"use client";

import { Button } from "@/components/ui/button";
import { SkipForward, Loader2 } from "lucide-react";

interface EndTurnButtonProps {
  onEndTurn: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function EndTurnButton({
  onEndTurn,
  isLoading = false,
  disabled = false,
}: EndTurnButtonProps) {
  return (
    <Button
      onClick={onEndTurn}
      disabled={isLoading || disabled}
      size="lg"
      className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold shadow-lg hover:shadow-amber-500/25 transition-all"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <SkipForward className="w-5 h-5" />
          Finalizar Turno
        </>
      )}
    </Button>
  );
}

export default EndTurnButton;
