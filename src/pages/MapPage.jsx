import React from 'react';
import MapComponent from '../components/MapComponent';
import locationsData from '../data/locations.json';

const MapPage = () => {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Interactive Venice Map</h1>
          <p className="text-xl text-blue-100">
            Discover attractions, restaurants, and hidden gems across Venice
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MapComponent locations={locationsData} height="70vh" />
        
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <strong>💡 Pro Tip:</strong> Click on any marker to see details, photos, and local tips. 
            Use the category filters above the map to find specific types of places.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;