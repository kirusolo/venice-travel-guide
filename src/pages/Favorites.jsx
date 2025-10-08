import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, MapPin, Route, Star } from 'lucide-react';
import FavoriteButton from '../components/FavoriteButton';

const Favorites = () => {
  const { favorites, clearAllFavorites, getFavoritesCount } = useFavorites();
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const totalCount = getFavoritesCount();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearAllFavorites();
    }
  };

  const handleItemClick = (type, item) => {
    if (type === 'routes') {
      navigate(`/routes/${item.id}`);
    } else if (type === 'recommendations') {
      navigate('/recommendations');
    } else if (type === 'locations') {
      navigate('/map');
    }
  };

  const renderItem = (item, type) => {
    const name = item.name || item.title;
    const image = item.image;

    return (
      <div
        key={`${type}-${item.id}`}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      >
        <div className="flex">
          {/* Image */}
          <div 
            className="w-32 h-32 flex-shrink-0 relative"
            onClick={() => handleItemClick(type, item)}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              {type === 'locations' && <MapPin size={16} className="text-blue-600 bg-white rounded-full p-1" />}
              {type === 'routes' && <Route size={16} className="text-green-600 bg-white rounded-full p-1" />}
              {type === 'recommendations' && <Star size={16} className="text-purple-600 bg-white rounded-full p-1" />}
            </div>
          </div>

          {/* Content */}
          <div 
            className="flex-grow p-4 flex flex-col justify-between"
            onClick={() => handleItemClick(type, item)}
          >
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                {type.slice(0, -1)}
              </span>
            </div>
          </div>

          {/* Favorite Button */}
          <div className="p-4 flex items-center">
            <FavoriteButton type={type} item={item} />
          </div>
        </div>
      </div>
    );
  };

  const getFilteredItems = () => {
    if (activeTab === 'all') {
      return [
        ...favorites.locations.map(item => ({ ...item, type: 'locations' })),
        ...favorites.routes.map(item => ({ ...item, type: 'routes' })),
        ...favorites.recommendations.map(item => ({ ...item, type: 'recommendations' }))
      ];
    }
    return favorites[activeTab].map(item => ({ ...item, type: activeTab }));
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Heart size={40} fill="white" />
                My Favorites
              </h1>
              <p className="text-xl text-red-100">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {totalCount > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition flex items-center gap-2"
              >
                <Trash2 size={20} />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {totalCount === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-8">
              Start adding your favorite locations, routes, and recommendations!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/routes')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Browse Routes
              </button>
              <button
                onClick={() => navigate('/recommendations')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                View Recommendations
              </button>
              <button
                onClick={() => navigate('/map')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Explore Map
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === 'locations'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Locations ({favorites.locations.length})
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === 'routes'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Routes ({favorites.routes.length})
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  activeTab === 'recommendations'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Recommendations ({favorites.recommendations.length})
              </button>
            </div>

            {/* Items Grid */}
            <div className="space-y-4">
              {filteredItems.map(item => renderItem(item, item.type))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab} favorites yet</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;