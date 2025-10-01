import React, { useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import RecommendationModal from '../components/RecommendationModal';
import recommendationsData from '../data/recommendations.json';

const Recommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  // Get unique categories
  const categories = ['all', ...new Set(recommendationsData.map(r => r.category))];
  const priceRanges = ['all', 'free', 'budget', 'premium'];

  // Filter recommendations
  const filteredRecommendations = recommendationsData.filter(rec => {
    const categoryMatch = selectedCategory === 'all' || rec.category === selectedCategory;
    const priceMatch = selectedPrice === 'all' || rec.price === selectedPrice;
    return categoryMatch && priceMatch;
  });

  const handleViewDetails = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const closeModal = () => {
    setSelectedRecommendation(null);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Venice Recommendations</h1>
          <p className="text-xl text-purple-100">
            Curated spots for food, culture, shopping, and events
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          {/* Category Filter */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Category:</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Filter by Price:</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedPrice('all')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedPrice === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Prices
              </button>
              <button
                onClick={() => setSelectedPrice('free')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedPrice === 'free'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ✓ Free
              </button>
              <button
                onClick={() => setSelectedPrice('budget')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedPrice === 'budget'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                € Budget
              </button>
              <button
                onClick={() => setSelectedPrice('premium')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedPrice === 'premium'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                €€€ Premium
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-800">{filteredRecommendations.length}</span> recommendations
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecommendations.map(recommendation => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recommendations found with these filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
              }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRecommendation && (
        <RecommendationModal
          recommendation={selectedRecommendation}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Recommendations;