import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Compass, Heart } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Venice Like a Local
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover hidden gems, curated routes, and authentic experiences in the floating city
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/routes')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg w-full sm:w-auto"
            >
              Discover Routes
            </button>
            <button
              onClick={() => navigate('/map')}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition shadow-lg w-full sm:w-auto"
            >
              Explore Map
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center">
            <Map className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
            <p className="text-blue-100">Navigate Venice with ease using our detailed maps</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center">
            <Compass className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Curated Routes</h3>
            <p className="text-blue-100">Pre-planned itineraries for every type of traveler</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hidden Gems</h3>
            <p className="text-blue-100">Find authentic spots away from tourist crowds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;