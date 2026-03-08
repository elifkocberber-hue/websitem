'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favoriteIds: (string | number)[];
  toggleFavorite: (id: string | number) => void;
  isFavorited: (id: string | number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<(string | number)[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ceramic-favorites');
    if (stored) setFavoriteIds(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: string | number) => {
    setFavoriteIds(prev => {
      const next = prev.some(f => String(f) === String(id))
        ? prev.filter(f => String(f) !== String(id))
        : [...prev, id];
      localStorage.setItem('ceramic-favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorited = (id: string | number) =>
    favoriteIds.some(f => String(f) === String(id));

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorited, totalFavorites: favoriteIds.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
