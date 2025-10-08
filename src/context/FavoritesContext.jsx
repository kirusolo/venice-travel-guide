import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({
    locations: [],
    routes: [],
    recommendations: []
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('veniceFavorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('veniceFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add to favorites
  const addFavorite = (type, item) => {
    setFavorites(prev => {
      const typeArray = prev[type];
      // Check if already exists
      if (typeArray.some(fav => fav.id === item.id)) {
        return prev;
      }
      return {
        ...prev,
        [type]: [...typeArray, item]
      };
    });
  };

  // Remove from favorites
  const removeFavorite = (type, itemId) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== itemId)
    }));
  };

  // Check if item is favorite
  const isFavorite = (type, itemId) => {
    return favorites[type].some(item => item.id === itemId);
  };

  // Toggle favorite
  const toggleFavorite = (type, item) => {
    if (isFavorite(type, item.id)) {
      removeFavorite(type, item.id);
    } else {
      addFavorite(type, item);
    }
  };

  // Get all favorites count
  const getFavoritesCount = () => {
    return favorites.locations.length + 
           favorites.routes.length + 
           favorites.recommendations.length;
  };

  // Clear all favorites
  const clearAllFavorites = () => {
    setFavorites({
      locations: [],
      routes: [],
      recommendations: []
    });
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesCount,
    clearAllFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};