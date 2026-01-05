"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background pattern */}
        <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10">{children}</div>
      </div>
    </SessionProvider>
  );
}
