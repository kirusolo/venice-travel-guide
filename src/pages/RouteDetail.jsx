import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Clock, TrendingUp, DollarSign, ArrowLeft, MapPin, Lightbulb, Printer, Download } from 'lucide-react';
import routesData from '../data/routes.json';
import Reviews from '../components/Reviews';
import L from 'leaflet';

const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = routesData.find(r => r.id === parseInt(id));

  if (!route) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
           {/* Add Reviews Section - BEFORE the Back Button */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Reviews 
          itemId={route.id} 
          itemType="route" 
          itemName={route.title} 
        />
      </div>


        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Route Not Found</h2>
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
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="relative h-96 overflow-hidden print:h-64">
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
              className="flex items-center gap-2 text-white mb-4 hover:text-blue-300 transition print:hidden"
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
        {/* Print/Download Buttons */}
        <div className="flex gap-3 mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Printer size={20} />
            Print Route
          </button>
          <button
            onClick={() => {
              const routeText = `
${route.title}
${route.description}

Duration: ${route.duration}
Difficulty: ${route.difficulty}

Stops:
${route.stops.map((stop, i) => `${i + 1}. ${stop.name} - ${stop.description}`).join('\n')}
              `;
              const blob = new Blob([routeText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${route.title.replace(/\s+/g, '-').toLowerCase()}-route.txt`;
              a.click();
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            <Download size={20} />
            Download Info
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue -400 mb-2">
              <Clock size={20} />
              <span className="font-semibold">Duration</span>
            </div>
            <p className="text-gray-800 dark:text-white font-medium">{route.duration}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{route.estimatedTime}</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
              <TrendingUp size={20} />
              <span className="font-semibold">Difficulty</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full font-medium ${getDifficultyColor(route.difficulty)}`}>
              {route.difficulty}
            </span>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
              <DollarSign size={20} />
              <span className="font-semibold">Cost</span>
            </div>
            <p className="text-gray-800 dark:text-white font-medium">{getPriceDisplay(route.price)}</p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
              <MapPin size={20} />
              <span className="font-semibold">Stops</span>
            </div>
            <p className="text-gray-800 dark:text-white font-medium">{route.stops.length} locations</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 mb-8 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-600 dark:text-yellow-400" />
            Route Highlights
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {route.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                <span className="text-yellow-600 dark:text-yellow-400 mt-1">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="mb-8 print:hidden">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Route Map</h2>
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
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Detailed Itinerary</h2>
          <div className="space-y-6">
            {route.stops.map((stop, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-600 dark:border-blue-400 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {stop.order}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{stop.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {stop.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{stop.description}</p>
                    {stop.tips && (
                      <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-500 p-3 rounded transition-colors duration-300">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          <strong className="text-blue-600 dark:text-blue-400">💡 Local Tip:</strong> {stop.tips}
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
        <div className="mt-12 text-center print:hidden">
          <button
            onClick={() => navigate('/routes')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore More Routes
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:h-64 {
            height: 16rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RouteDetail;