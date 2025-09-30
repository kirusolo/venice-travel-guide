import React, { useState } from 'react';
import RouteCard from '../components/RouteCard';
import routesData from '../data/routes.json';

const Routes = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(routesData.map(route => route.category))];

  const filteredRoutes = selectedCategory === 'all'
    ? routesData
    : routesData.filter(route => route.category === selectedCategory);

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Curated Routes</h1>
          <p className="text-xl text-blue-100">
            Pre-planned itineraries to help you explore Venice efficiently
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter by Category:</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

        {/* No results */}
        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No routes found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes;