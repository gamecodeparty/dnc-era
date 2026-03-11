"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Skull } from "lucide-react";

interface InvasionInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function InvasionInfoModal({ isVisible, onClose }: InvasionInfoModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md rounded-lg border-2 border-red-700 bg-[#0a0a0f] shadow-[0_0_40px_rgba(220,38,38,0.4)] p-6"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <Skull className="w-8 h-8 text-red-500 flex-shrink-0" strokeWidth={1.5} />
              <h2 className="text-2xl font-cinzel-decorative font-bold text-red-400 tracking-wider">
                ERA DA INVASÃO
              </h2>
            </div>

            {/* Intro */}
            <p className="text-white/80 font-crimson text-base mb-5 leading-relaxed">
              A Horda das Terras Sombrias invade!
            </p>

            {/* Rules */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-white/90 font-crimson text-sm">
                <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                <span>Ataca a cada <strong className="text-white">3 turnos</strong></span>
              </li>
              <li className="flex items-start gap-2 text-white/90 font-crimson text-sm">
                <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                <span>Alvo: o clã com <strong className="text-white">MAIS territórios</strong></span>
              </li>
              <li className="flex items-start gap-2 text-white/90 font-crimson text-sm">
                <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                <span>Força crescente: <strong className="text-white">50 → 100 → 300</strong></span>
              </li>
            </ul>

            {/* Warning */}
            <p className="text-red-400/80 font-crimson text-sm italic mb-6 border-l-2 border-red-700 pl-3">
              Quanto mais territórios você tem, mais a Horda o perseguirá.
            </p>

            {/* Divider */}
            <div className="h-px bg-red-900/50 mb-5" />

            {/* Button */}
            <button
              onClick={onClose}
              className="w-full py-3 rounded font-cinzel font-semibold text-sm tracking-widest
                bg-red-900/40 hover:bg-red-800/60 active:bg-red-900/70
                border border-red-700/60 hover:border-red-600
                text-red-200 hover:text-white
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1 focus:ring-offset-black"
            >
              ENTENDI
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
