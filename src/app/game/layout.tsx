"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { GameAnimationProvider } from "@/components/game/fx";

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <SessionProvider>
      <GameAnimationProvider>
        <div className="min-h-screen bg-medieval-bg-deep">
          {/* Parchment texture overlay */}
          <div className="fixed inset-0 bg-parchment opacity-20 pointer-events-none" />

          {/* Vignette */}
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,11,9,0.6)_100%)] pointer-events-none" />

          {/* Main content */}
          <div className="relative z-10">{children}</div>
        </div>
      </GameAnimationProvider>
    </SessionProvider>
  );
}
