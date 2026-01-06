"use client";

import { WifiOff, RefreshCw, Home, Swords } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MedievalButton } from "@/components/ui/medieval";
import { MedievalCard, MedievalCardContent } from "@/components/ui/medieval";
import { fadeSlideUp, transitions } from "@/lib/animations";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medieval-bg-deep p-4">
      {/* Background texture */}
      <div className="fixed inset-0 bg-parchment opacity-10 pointer-events-none" />

      {/* Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,11,9,0.9)_100%)] pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-md w-full"
        variants={fadeSlideUp}
        initial="initial"
        animate="animate"
      >
        <MedievalCard variant="elevated" className="text-center">
          <MedievalCardContent className="py-8 space-y-6">
            {/* Icon */}
            <motion.div
              className="mx-auto w-20 h-20 rounded-full bg-medieval-bg-card flex items-center justify-center border-2 border-medieval-accent/30"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <WifiOff className="w-10 h-10 text-medieval-accent" />
            </motion.div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-cinzel-decorative font-bold text-medieval-text-primary">
                Conexao Perdida
              </h1>
              <p className="text-medieval-text-secondary font-crimson">
                Os corvos mensageiros nao conseguem alcanca-lo no momento.
              </p>
            </div>

            {/* Info */}
            <div className="py-4 px-6 bg-medieval-bg-deep/50 rounded-lg border border-medieval-primary/20">
              <p className="text-sm text-medieval-text-muted">
                Verifique sua conexao com a internet e tente novamente.
                Seu progresso local esta salvo.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <MedievalButton
                variant="primary"
                className="flex-1"
                onClick={handleRefresh}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                Tentar Novamente
              </MedievalButton>

              <Link href="/" className="flex-1">
                <MedievalButton
                  variant="secondary"
                  className="w-full"
                  icon={<Home className="w-4 h-4" />}
                >
                  Inicio
                </MedievalButton>
              </Link>
            </div>
          </MedievalCardContent>
        </MedievalCard>

        {/* Tips */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, ...transitions.standard }}
        >
          <p className="text-sm text-medieval-text-muted">
            <Swords className="w-4 h-4 inline-block mr-1 text-medieval-primary" />
            Dica: Instale o app para jogar offline!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
