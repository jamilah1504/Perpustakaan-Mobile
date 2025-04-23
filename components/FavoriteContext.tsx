import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteContext = createContext<{
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites on startup
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem("@favorites");
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem("@favorites", JSON.stringify(favorites));
      } catch (e) {
        console.error("Failed to save favorites", e);
      }
    };
    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);
