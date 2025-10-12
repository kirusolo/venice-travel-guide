import React from 'react';
import { X, MapPin, Star, Clock, Euro } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Reviews from './Reviews';

const RecommendationModal = ({ recommendation, onClose }) => {
  if (!recommendation) return null;

  const getPriceDisplay = (price) => {
    switch(price) {
      case 'free': return 'Free Entry';
      case 'budget': return '€ Budget-Friendly';
      case 'premium': return '€€€ Premium Experience';
      default: return price;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        
         <div className="p-6 pt-0">
          <Reviews 
            itemId={recommendation.id} 
            itemType="recommendation" 
            itemName={recommendation.name} 
          />
        </div>
        
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-10"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={recommendation.image} 
            alt={recommendation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">{recommendation.name}</h2>
            <p className="text-blue-200 mt-1">{recommendation.subcategory}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {recommendation.rating && (
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-yellow-600 mb-1">
                  <Star size={18} fill="currentColor" />
                  <span className="font-semibold">Rating</span>
                </div>
                <p className="text-gray-800 font-bold">{recommendation.rating} / 5.0</p>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Euro size={18} />
                <span className="font-semibold">Price</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">{getPriceDisplay(recommendation.price)}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <MapPin size={18} />
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-gray-800 text-sm">{recommendation.address}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{recommendation.description}</p>
          </div>

          {/* Highlights */}
          {recommendation.highlights && recommendation.highlights.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recommendation.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-blue-600">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local Tips */}
          {recommendation.tips && (
            <div className="mb-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  💡 Local Tips
                </h3>
                <p className="text-gray-700">{recommendation.tips}</p>
              </div>
            </div>
          )}

          {/* Map */}
          {recommendation.lat && recommendation.lng && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Location</h3>
              <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '300px' }}>
                <MapContainer 
                  center={[recommendation.lat, recommendation.lng]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[recommendation.lat, recommendation.lng]}>
                    <Popup>
                      <strong>{recommendation.name}</strong>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;