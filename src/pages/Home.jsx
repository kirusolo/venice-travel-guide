import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import WeatherWidget from '../components/WeatherWidget';

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />

      {/* Search Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              What are you looking for?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Search for locations, routes, restaurants, and more
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>

          {/* Weather Widget */}
          <div className="max-w-md mx-auto mt-8">
            <WeatherWidget />
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Our Guide?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide authentic, local insights to help you experience Venice beyond the typical tourist traps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Local Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get recommendations from locals who know Venice inside out. Avoid overpriced tourist spots and discover authentic experiences.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Save Time</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pre-planned routes help you make the most of your visit. No more wandering aimlessly through confusing alleys.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Budget Options</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Filter recommendations by price range. Enjoy Venice whether you're on a budget or looking for premium experiences.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Mobile Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access everything on-the-go from your phone. Perfect for navigating while you explore the city.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;