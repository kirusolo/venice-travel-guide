import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Route, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import locationsData from '../data/locations.json';
import routesData from '../data/routes.json';
import recommendationsData from '../data/recommendations.json';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults = [];

    // Search locations
    const locationResults = locationsData
      .filter(loc => 
        loc.name.toLowerCase().includes(searchQuery) ||
        loc.description.toLowerCase().includes(searchQuery) ||
        loc.category.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map(loc => ({
        ...loc,
        type: 'location',
        icon: <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
      }));

    // Search routes
    const routeResults = routesData
      .filter(route => 
        route.title.toLowerCase().includes(searchQuery) ||
        route.description.toLowerCase().includes(searchQuery) ||
        route.category.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map(route => ({
        ...route,
        type: 'route',
        icon: <Route size={18} className="text-green-600 dark:text-green-400" />
      }));

    // Search recommendations
    const recommendationResults = recommendationsData
      .filter(rec => 
        rec.name.toLowerCase().includes(searchQuery) ||
        rec.description.toLowerCase().includes(searchQuery) ||
        rec.category.toLowerCase().includes(searchQuery)
      )
      .slice(0, 3)
      .map(rec => ({
        ...rec,
        type: 'recommendation',
        icon: <Star size={18} className="text-purple-600 dark:text-purple-400" />
      }));

    allResults.push(...locationResults, ...routeResults, ...recommendationResults);
    setResults(allResults);
    setIsOpen(allResults.length > 0);
  }, [query]);

  const handleResultClick = (result) => {
    if (result.type === 'location') {
      navigate('/map');
    } else if (result.type === 'route') {
      navigate(`/routes/${result.id}`);
    } else if (result.type === 'recommendation') {
      navigate('/recommendations');
    }
    setQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search locations, routes, recommendations..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50 transition-colors duration-300">
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}-${index}`}
                onClick={() => handleResultClick(result)}
                className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-start gap-3"
              >
                <div className="flex-shrink-0 mt-1">
                  {result.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                      {result.name || result.title}
                    </h4>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded capitalize flex-shrink-0">
                      {result.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {result.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* View All Results */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Showing {results.length} results for "{query}"
            </p>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 z-50 transition-colors duration-300">
          <p className="text-center text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;