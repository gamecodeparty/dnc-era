"use client";

import { X, HelpCircle, Download, Volume2, VolumeX, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MedievalButton } from "@/components/ui/medieval";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useHaptic } from "@/hooks/useHaptic";

interface MobileDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Called when drawer should close */
  onClose: () => void;
  /** User name to display */
  userName?: string;
  /** Called when logout is clicked */
  onLogout?: () => void;
  /** Called when help is clicked */
  onHelp?: () => void;
  /** Additional class names */
  className?: string;
}

export function MobileDrawer({
  isOpen,
  onClose,
  userName,
  onLogout,
  onHelp,
  className = "",
}: MobileDrawerProps) {
  const { canInstall, install, isInstalling, isInstalled, platform } = usePWAInstall();
  const { vibrate } = useHaptic();
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleClose = () => {
    vibrate("light");
    onClose();
  };

  const handleInstall = async () => {
    vibrate("medium");
    await install();
  };

  const handleSoundToggle = () => {
    vibrate("selection");
    setIsSoundOn(!isSoundOn);
    // TODO: Implement actual sound toggle
  };

  const handleLogout = () => {
    vibrate("medium");
    onLogout?.();
  };

  const handleHelp = () => {
    vibrate("light");
    onHelp?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
              fixed top-0 right-0 bottom-0 z-50
              w-72 max-w-[85vw]
              bg-medieval-bg-panel
              border-l border-medieval-primary/30
              flex flex-col
              ${className}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-medieval-primary/20">
              <h2 className="font-cinzel text-medieval-text-primary font-semibold">
                Menu
              </h2>
              <button
                onClick={handleClose}
                className="p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            {userName && (
              <div className="p-4 border-b border-medieval-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-medieval-bg-card flex items-center justify-center">
                    <User className="w-5 h-5 text-medieval-primary" />
                  </div>
                  <div>
                    <p className="text-medieval-text-primary font-medium">{userName}</p>
                    <p className="text-xs text-medieval-text-muted">Jogador</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="flex-1 p-4 space-y-2">
              {/* Help */}
              <button
                onClick={handleHelp}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-medieval-bg-card transition-colors text-left"
              >
                <HelpCircle className="w-5 h-5 text-medieval-primary" />
                <span className="text-medieval-text-primary">Como Jogar</span>
              </button>

              {/* Install PWA */}
              {canInstall && !isInstalled && (
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-medieval-bg-card transition-colors text-left"
                >
                  <Download className="w-5 h-5 text-medieval-primary" />
                  <span className="text-medieval-text-primary">
                    {isInstalling ? "Instalando..." : "Instalar App"}
                  </span>
                </button>
              )}

              {isInstalled && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-era-peace/10">
                  <Download className="w-5 h-5 text-era-peace" />
                  <span className="text-era-peace">App Instalado</span>
                </div>
              )}

              {/* iOS Install Instructions */}
              {platform === "ios" && !isInstalled && (
                <div className="p-3 rounded-lg bg-medieval-bg-card">
                  <p className="text-sm text-medieval-text-secondary">
                    Para instalar no iOS, toque em{" "}
                    <span className="text-medieval-primary">Compartilhar</span> e depois em{" "}
                    <span className="text-medieval-primary">Adicionar a Tela de Inicio</span>
                  </p>
                </div>
              )}

              {/* Sound Toggle */}
              <button
                onClick={handleSoundToggle}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-medieval-bg-card transition-colors text-left"
              >
                {isSoundOn ? (
                  <Volume2 className="w-5 h-5 text-medieval-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-medieval-text-muted" />
                )}
                <span className="text-medieval-text-primary">
                  Som {isSoundOn ? "Ligado" : "Desligado"}
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-medieval-primary/20">
              <MedievalButton
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </MedievalButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
