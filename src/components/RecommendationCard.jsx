import React from 'react';
import { MapPin, Star, Euro, Info } from 'lucide-react';

const RecommendationCard = ({ recommendation, onViewDetails }) => {
  const getPriceIcon = (price) => {
    switch(price) {
      case 'free': return '✓ Free';
      case 'budget': return '€ Budget';
      case 'premium': return '€€€ Premium';
      default: return price;
    }
  };

  const getPriceColor = (price) => {
    switch(price) {
      case 'free': return 'bg-green-100 text-green-700';
      case 'budget': return 'bg-blue-100 text-blue-700';
      case 'premium': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recommendation.image} 
          alt={recommendation.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {recommendation.subcategory}
        </div>
        {recommendation.rating && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Star size={14} fill="white" />
            {recommendation.rating}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recommendation.name}</h3>
        
        {/* Price Tag */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPriceColor(recommendation.price)}`}>
            {getPriceIcon(recommendation.price)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{recommendation.description}</p>

        {/* Address */}
        {recommendation.address && (
          <div className="flex items-start gap-2 text-sm text-gray-500 mb-3">
            <MapPin size={16} className="flex-shrink-0 mt-1" />
            <span>{recommendation.address}</span>
          </div>
        )}

        {/* Highlights */}
        {recommendation.highlights && recommendation.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {recommendation.highlights.slice(0, 3).map((highlight, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips Preview */}
        {recommendation.tips && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
            <p className="text-xs text-gray-700 line-clamp-2">
              <strong className="text-yellow-700">💡 Tip:</strong> {recommendation.tips}
            </p>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(recommendation)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Info size={18} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;