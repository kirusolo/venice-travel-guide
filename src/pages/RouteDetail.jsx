import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Clock, TrendingUp, DollarSign, ArrowLeft, MapPin, Lightbulb } from 'lucide-react';
import routesData from '../data/routes.json';
import L from 'leaflet';

const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = routesData.find(r => r.id === parseInt(id));

  if (!route) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Not Found</h2>
          <button
            onClick={() => navigate('/routes')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Routes
          </button>
        </div>
      </div>
    );
  }

  // Create path for the route line on map
  const routePath = route.stops.map(stop => [stop.lat, stop.lng]);

  // Center map on first stop
  const mapCenter = route.stops.length > 0 
    ? [route.stops[0].lat, route.stops[0].lng]
    : [45.4408, 12.3155];

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
      case 'premium': return '€€€ Premium Experience';
      default: return price;
    }
  };

  // Custom numbered markers
  const createNumberedIcon = (number) => {
    return L.divIcon({
      className: 'custom-numbered-icon',
      html: `
        <div style="
          background-color: #2563EB;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        ">${number}</div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={route.image} 
          alt={route.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate('/routes')}
              className="flex items-center gap-2 text-white mb-4 hover:text-blue-300 transition"
            >
              <ArrowLeft size={20} />
              Back to Routes
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{route.title}</h1>
            <p className="text-xl text-gray-200">{route.description}</p>
          </div>
        </div>
      </div>

      {/* Route Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Clock size={20} />
              <span className="font-semibold">Duration</span>
            </div>
            <p className="text-gray-800 font-medium">{route.duration}</p>
            <p className="text-sm text-gray-600">{route.estimatedTime}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <TrendingUp size={20} />
              <span className="font-semibold">Difficulty</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full font-medium ${getDifficultyColor(route.difficulty)}`}>
              {route.difficulty}
            </span>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <DollarSign size={20} />
              <span className="font-semibold">Cost</span>
            </div>
            <p className="text-gray-800 font-medium">{getPriceDisplay(route.price)}</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <MapPin size={20} />
              <span className="font-semibold">Stops</span>
            </div>
            <p className="text-gray-800 font-medium">{route.stops.length} locations</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-600" />
            Route Highlights
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {route.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-yellow-600 mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Map</h2>
          <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '500px' }}>
            <MapContainer center={mapCenter} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Draw line connecting stops */}
              <Polyline positions={routePath} color="#2563EB" weight={3} opacity={0.7} />

              {/* Markers for each stop */}
              {route.stops.map((stop, index) => (
                <Marker
                  key={index}
                  position={[stop.lat, stop.lng]}
                  icon={createNumberedIcon(stop.order)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-1">Stop {stop.order}: {stop.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{stop.description}</p>
                      <p className="text-xs text-blue-600 font-semibold">Duration: {stop.duration}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Detailed Stops */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h2>
          <div className="space-y-6">
            {route.stops.map((stop, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {stop.order}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{stop.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {stop.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{stop.description}</p>
                    {stop.tips && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <p className="text-sm text-gray-700">
                          <strong className="text-blue-600">💡 Local Tip:</strong> {stop.tips}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/routes')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore More Routes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;