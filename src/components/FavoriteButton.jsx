import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ type, item, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(type, item.id);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleFavorite(type, item);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all hover:scale-110 ${
        favorite 
          ? 'bg-red-100 text-red-600' 
          : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
      } ${className}`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        size={20} 
        fill={favorite ? 'currentColor' : 'none'}
      />
    </button>
  );
};

export default FavoriteButton;