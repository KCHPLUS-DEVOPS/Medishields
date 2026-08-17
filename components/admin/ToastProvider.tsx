"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { clsx } from "clsx";

type ToastType = "success" | "error";
type ToastItem = { id: number; message: string; type: ToastType };

const ToastContext = createContext<{ push: (message: string, type: ToastType) => void } | null>(
  null
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, type: ToastType) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col-reverse gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "animate-toast-in pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium shadow-[0_20px_50px_-20px_rgba(14,20,20,0.35)] backdrop-blur-xl",
              t.type === "success"
                ? "border-teal/20 bg-teal-dark/95 text-offwhite"
                : "border-red-200 bg-red-600/95 text-white"
            )}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={16} className="shrink-0" />
            ) : (
              <AlertTriangle size={16} className="shrink-0" />
            )}
            <span className="min-w-0">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="ml-auto shrink-0 opacity-60 transition-opacity hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return {
    success: (message: string) => ctx.push(message, "success"),
    error: (message: string) => ctx.push(message, "error"),
  };
}
