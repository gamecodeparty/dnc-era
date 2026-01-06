"use client";

import { Download, Smartphone, X, Share } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MedievalButton, MedievalIconButton } from "@/components/ui/medieval";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useHaptic } from "@/hooks/useHaptic";
import { fadeSlideUp, buttonHover } from "@/lib/animations";

interface PWAInstallPromptProps {
  /** Show as button in header */
  variant?: "button" | "icon";
  /** Additional class names */
  className?: string;
}

/**
 * PWA Install button for header
 * Shows a download button when app can be installed
 */
export function PWAInstallPrompt({ variant = "button", className }: PWAInstallPromptProps) {
  const { canInstall, isInstalled, isInstalling, install, platform } = usePWAInstall();
  const { vibrate } = useHaptic();

  // Don't show if already installed or can't install
  if (isInstalled) return null;
  
  // For iOS, show a hint to use Share > Add to Home Screen
  if (platform === "ios" && !canInstall) {
    return null; // iOS instructions shown in banner instead
  }

  // If no install prompt available (not Android/desktop PWA capable)
  if (!canInstall) return null;

  const handleInstall = async () => {
    vibrate("medium");
    const success = await install();
    if (success) {
      vibrate("success");
    }
  };

  if (variant === "icon") {
    return (
      <motion.div {...buttonHover}>
        <MedievalIconButton
          onClick={handleInstall}
          disabled={isInstalling}
          label="Instalar aplicativo"
          className={className}
          icon={
            isInstalling ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Download className="w-5 h-5" />
              </motion.div>
            ) : (
              <Smartphone className="w-5 h-5" />
            )
          }
        />
      </motion.div>
    );
  }

  return (
    <motion.div {...buttonHover}>
      <MedievalButton
        variant="ghost"
        size="sm"
        onClick={handleInstall}
        disabled={isInstalling}
        className={className}
      >
        {isInstalling ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            <Download className="w-4 h-4" />
          </motion.div>
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        Instalar App
      </MedievalButton>
    </motion.div>
  );
}

interface PWAInstallBannerProps {
  /** Called when user dismisses the banner */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * PWA Install banner for mobile
 * Shows at bottom of screen on first visit
 */
export function PWAInstallBanner({ onDismiss, className = "" }: PWAInstallBannerProps) {
  const { canInstall, isInstalled, isInstalling, install, dismiss, isDismissed, platform } = usePWAInstall();
  const { vibrate } = useHaptic();

  // Don't show if already installed or dismissed
  if (isInstalled || isDismissed) return null;

  const handleInstall = async () => {
    vibrate("medium");
    const success = await install();
    if (success) {
      vibrate("success");
    }
  };

  const handleDismiss = () => {
    vibrate("light");
    dismiss();
    onDismiss?.();
  };

  // iOS specific instructions
  if (platform === "ios") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe bg-medieval-bg-panel border-t border-medieval-primary/30 ${className}`}
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-medieval-bg-card">
                <Share className="w-6 h-6 text-medieval-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-cinzel text-medieval-text-primary font-semibold">
                  Instalar Dice&Cards Era
                </h3>
                <p className="text-sm text-medieval-text-secondary mt-1">
                  Toque em <Share className="w-4 h-4 inline mx-1" /> e depois em{" "}
                  <span className="text-medieval-primary">&quot;Adicionar à Tela de Início&quot;</span>
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 text-medieval-text-muted hover:text-medieval-text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Android/Desktop banner
  if (!canInstall) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe bg-medieval-bg-panel border-t border-medieval-primary/30 ${className}`}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-medieval-bg-card">
              <Smartphone className="w-6 h-6 text-medieval-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-cinzel text-medieval-text-primary font-semibold">
                Instalar Dice&Cards Era
              </h3>
              <p className="text-sm text-medieval-text-secondary">
                Jogue offline e tenha acesso rápido
              </p>
            </div>
            <div className="flex gap-2">
              <MedievalButton
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
              >
                Depois
              </MedievalButton>
              <MedievalButton
                variant="primary"
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
              >
                {isInstalling ? "Instalando..." : "Instalar"}
              </MedievalButton>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
