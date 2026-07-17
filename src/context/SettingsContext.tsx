import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface SettingsContextValue {
  lowPower: boolean;
  toggleLowPower: () => void;
  prefersReducedMotion: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const STORAGE_KEY = "portfolio-low-power";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("low-power", lowPower);
    window.localStorage.setItem(STORAGE_KEY, lowPower ? "1" : "0");
  }, [lowPower]);

  const value = useMemo(
    () => ({
      lowPower: lowPower || prefersReducedMotion,
      toggleLowPower: () => setLowPower((v) => !v),
      prefersReducedMotion,
    }),
    [lowPower, prefersReducedMotion]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
