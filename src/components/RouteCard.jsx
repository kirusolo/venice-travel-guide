import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, MapPin, Star } from 'lucide-react';

const RouteCard = ({ route }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriceDisplay = (price) => {
    switch(price) {
      case 'free': return 'Free';
      case 'budget': return '€ Budget-Friendly';
      case 'premium': return '€€€ Premium';
      default: return price;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={route.image} 
          alt={route.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {route.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{route.title}</h3>
        
        {/* Info Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock size={16} />
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp size={16} />
            <span className={`px-2 py-1 rounded ${getDifficultyColor(route.difficulty)}`}>
              {route.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{route.stops?.length || 0} stops</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{route.description}</p>

        {/* Price */}
        <div className="mb-4 text-sm font-semibold text-blue-600">
          {getPriceDisplay(route.price)}
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            Highlights:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {route.highlights?.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
            {route.highlights?.length > 3 && (
              <li className="text-blue-600 text-xs">+ {route.highlights.length - 3} more...</li>
            )}
          </ul>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/routes/${route.id}`)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Full Route
        </button>
      </div>
    </div>
  );
};

export default RouteCard;