"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTips } from "@/hooks/useTips";

const AUTO_DISMISS_MS = 10_000;

export function TipBanner() {
  const { currentTip, dismissTip } = useTips();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentTip) return;

    timerRef.current = setTimeout(() => {
      dismissTip(currentTip.id);
    }, AUTO_DISMISS_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentTip?.id]);

  return (
    <AnimatePresence>
      {currentTip && (
        <motion.div
          key={currentTip.id}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-2 max-w-lg w-full px-4"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-amber-900/80 border-amber-500/50 backdrop-blur-sm shadow-lg">
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {currentTip.icon}
            </span>
            <p
              className="flex-1 text-sm text-amber-100 leading-snug"
              dangerouslySetInnerHTML={{
                __html: currentTip.message.replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong class="text-amber-300 font-semibold">$1</strong>'
                ),
              }}
            />
            <button
              onClick={() => dismissTip(currentTip.id)}
              className="flex-shrink-0 text-amber-400 hover:text-amber-200 transition-colors p-1 rounded hover:bg-amber-800/50"
              aria-label="Fechar dica"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TipBanner;
