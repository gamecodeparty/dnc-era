"use client";

import { useEffect, useState } from "react";
import { Check, X, AlertTriangle, Info, Sword, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info" | "build" | "combat";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Store global de toasts
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

function emitChange() {
  listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  show: (message: string, type: ToastType = "info") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    toasts = [{ id, message, type }, ...toasts.slice(0, 4)];
    emitChange();

    // Auto remove after 3 seconds
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      emitChange();
    }, 3000);
  },
  success: (message: string) => toast.show(message, "success"),
  error: (message: string) => toast.show(message, "error"),
  warning: (message: string) => toast.show(message, "warning"),
  info: (message: string) => toast.show(message, "info"),
  build: (message: string) => toast.show(message, "build"),
  combat: (message: string) => toast.show(message, "combat"),
};

const iconMap = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  build: Hammer,
  combat: Sword,
};

const styleMap = {
  success: "bg-green-500/90 border-green-400 text-white",
  error: "bg-red-500/90 border-red-400 text-white",
  warning: "bg-amber-500/90 border-amber-400 text-slate-900",
  info: "bg-blue-500/90 border-blue-400 text-white",
  build: "bg-amber-600/90 border-amber-500 text-white",
  combat: "bg-red-600/90 border-red-500 text-white",
};

export function GameToastContainer() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setCurrentToasts);
    };
  }, []);

  if (currentToasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {currentToasts.map((t, index) => {
        const Icon = iconMap[t.type];
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg",
              "animate-in slide-in-from-right-full duration-300",
              "min-w-[250px] max-w-[350px]",
              styleMap[t.type]
            )}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
