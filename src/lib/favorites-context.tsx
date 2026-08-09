"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface FavoriteItem {
  slug: string;
  name: string;
  price: number;
  image?: string;
  color: string;
  emoji: string;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  removeFavorite: (slug: string) => void;
  totalFavorites: number;
  isOpen: boolean;
  openFavorites: () => void;
  closeFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "loja-ecommerce:favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do localStorage após montar (evita mismatch de hidratação); mesmo padrão usado em cart-context.tsx
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // ignora erros de leitura do storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  function isFavorite(slug: string) {
    return favorites.some((f) => f.slug === slug);
  }

  function toggleFavorite(item: FavoriteItem) {
    setFavorites((prev) =>
      prev.some((f) => f.slug === item.slug)
        ? prev.filter((f) => f.slug !== item.slug)
        : [...prev, item]
    );
  }

  function removeFavorite(slug: string) {
    setFavorites((prev) => prev.filter((f) => f.slug !== slug));
  }

  const totalFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        totalFavorites,
        isOpen,
        openFavorites: () => setIsOpen(true),
        closeFavorites: () => setIsOpen(false),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return ctx;
}
