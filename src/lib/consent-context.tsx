"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type ConsentStatus = "accepted" | "rejected" | null;

interface ConsentContextValue {
  status: ConsentStatus;
  hydrated: boolean;
  showBanner: boolean;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "kulanda:cookie-consent";

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "accepted" || raw === "rejected") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do localStorage após montar (evita mismatch de hidratação); mesmo padrão usado em cart-context.tsx e favorites-context.tsx
        setStatus(raw);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowBanner(true);
      }
    } catch {
      // sem acesso ao localStorage (ex.: modo privado) — mostra o banner
      // na mesma, mas a escolha não fica guardada entre visitas.
      setShowBanner(true);
    } finally {
      setHydrated(true);
    }
  }, []);

  function persist(value: "accepted" | "rejected") {
    setStatus(value);
    setShowBanner(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignora — a escolha ainda fica válida para esta sessão
    }
  }

  return (
    <ConsentContext.Provider
      value={{
        status,
        hydrated,
        showBanner,
        accept: () => persist("accepted"),
        reject: () => persist("rejected"),
        openPreferences: () => setShowBanner(true),
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent deve ser usado dentro de ConsentProvider");
  return ctx;
}
