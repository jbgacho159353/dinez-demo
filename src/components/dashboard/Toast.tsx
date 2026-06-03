"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; message: string; type: ToastType };

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.35)",  icon: "✅" },
  error:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.35)",  icon: "❌" },
  info:    { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.35)", icon: "ℹ️" },
};

const ToastContext = createContext<{
  toast: (message: string, type?: ToastType) => void;
}>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const c = COLORS[t.type];
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white shadow-xl"
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                backdropFilter: "blur(12px)",
                animation: "toastIn 0.3s ease-out",
                minWidth: 240,
                maxWidth: 360,
                pointerEvents: "auto",
              }}
            >
              <span>{c.icon}</span>
              <span className="flex-1">{t.message}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
