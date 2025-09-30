import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, DollarSign, Info } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom marker icons based on category
const createCustomIcon = (category) => {
  const colors = {
    attraction: '#3B82F6',
    food: '#EF4444',
    culture: '#8B5CF6',
    'hidden gem': '#10B981',
  };

  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        background-color: ${colors[category] || '#3B82F6'};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const MapComponent = ({ locations, height = '600px' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter locations by category
  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(loc => loc.category === selectedCategory);

  // Venice center coordinates
  const veniceCenter = [45.4408, 12.3155];

  const getPriceDisplay = (price) => {
    switch(price) {
      case 'free': return 'Free';
      case 'budget': return '€ Budget';
      case 'premium': return '€€€ Premium';
      default: return price;
    }
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('attraction')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'attraction'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Attractions
        </button>
        <button
          onClick={() => setSelectedCategory('food')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'food'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Food
        </button>
        <button
          onClick={() => setSelectedCategory('culture')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'culture'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Culture
        </button>
        <button
          onClick={() => setSelectedCategory('hidden gem')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'hidden gem'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hidden Gems
        </button>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden shadow-lg" style={{ height }}>
        <MapContainer
          center={veniceCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.category)}
            >
              <Popup maxWidth={300}>
                <div className="p-2">
                  {location.image && (
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {location.category}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      {getPriceDisplay(location.price)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{location.description}</p>
                  {location.tips && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mt-2">
                      <p className="text-xs text-gray-700">
                        <strong>💡 Tip:</strong> {location.tips}
                      </p>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Legend:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            <span>Attractions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span>Food</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
            <span>Culture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span>Hidden Gems</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;