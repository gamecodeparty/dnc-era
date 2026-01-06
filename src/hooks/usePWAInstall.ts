"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface UsePWAInstallReturn {
  /** Whether the app can be installed (prompt is available) */
  canInstall: boolean;
  /** Whether the app is already installed (running in standalone mode) */
  isInstalled: boolean;
  /** Whether installation is in progress */
  isInstalling: boolean;
  /** Trigger the installation prompt */
  install: () => Promise<boolean>;
  /** Dismiss the install prompt (user chose not to install) */
  dismiss: () => void;
  /** Whether the user has dismissed the prompt in this session */
  isDismissed: boolean;
  /** Platform being targeted */
  platform: "ios" | "android" | "desktop" | "unknown";
}

const DISMISSED_KEY = "pwa-install-dismissed";
const DISMISSED_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

export function usePWAInstall(): UsePWAInstallReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "unknown">("unknown");

  // Detect platform
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    } else if (/android/.test(userAgent)) {
      setPlatform("android");
    } else if (/windows|macintosh|linux/.test(userAgent)) {
      setPlatform("desktop");
    }
  }, []);

  // Check if already installed
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check display mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const isInWebAppiOS = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Listen for display mode changes
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check if dismissed recently
  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < DISMISSED_EXPIRY) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem(DISMISSED_KEY);
      }
    }
  }, []);

  // Listen for beforeinstallprompt
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if already has prompt (in case it fired before component mounted)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Listen for app installed
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);
    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      console.warn("No install prompt available");
      return false;
    }

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error during PWA installation:", error);
      return false;
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  }, []);

  return {
    canInstall: !!deferredPrompt && !isInstalled && !isDismissed,
    isInstalled,
    isInstalling,
    install,
    dismiss,
    isDismissed,
    platform,
  };
}
