import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const FavoritesContext = createContext(null);

// Global state for saved movies. Components read it with useFavorites().
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("movie-explorer:favorites", []);

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((current) =>
        current.some((m) => m.id === movie.id)
          ? current.filter((m) => m.id !== movie.id)
          : [
              ...current,
              {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
              },
            ]
      );
    },
    [setFavorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.some((m) => m.id === id),
    }),
    [favorites, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
