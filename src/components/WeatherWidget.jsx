import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, AlertCircle } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const API_KEY = 'afa66d0f607159fb351f26920ddd94fc'; // Get free key at https://openweathermap.org/api
  const VENICE_COORDS = { lat: 45.4408, lon: 12.3155 };

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    // If no API key, use mock data for demo
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      // Mock data for demonstration
      setTimeout(() => {
        setWeather({
          temp: 22,
          feels_like: 21,
          humidity: 65,
          wind_speed: 3.5,
          visibility: 10,
          description: 'Clear sky',
          icon: '01d'
        });
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${VENICE_COORDS.lat}&lon=${VENICE_COORDS.lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data unavailable');
      }

      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        visibility: data.visibility / 1000, // Convert to km
        description: data.weather[0].description,
        icon: data.weather[0].icon
      });
      setLoading(false);
    } catch (err) {
      setError('Unable to load weather data');
      setLoading(false);
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="text-gray-400" size={48} />;
    
    const iconCode = weather.icon;
    if (iconCode.includes('01')) return <Sun className="text-yellow-500" size={48} />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="text-blue-500" size={48} />;
    return <Cloud className="text-gray-400" size={48} />;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 rounded-lg shadow-lg p-6 text-white transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Venice Weather</h3>
          <p className="text-sm text-blue-100 dark:text-blue-200 capitalize">{weather.description}</p>
        </div>
        {getWeatherIcon()}
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-5xl font-bold">{weather.temp}°</span>
        <span className="text-xl text-blue-100 dark:text-blue-200">C</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Wind size={16} className="text-blue-200" />
          <div>
            <p className="text-blue-100 dark:text-blue-200">Wind</p>
            <p className="font-semibold">{weather.wind_speed} m/s</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets size={16} className="text-blue-200" />
          <div>
            <p className="text-blue-100 dark:text-blue-200">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Eye size={16} className="text-blue-200" />
          <div>
            <p className="text-blue-100 dark:text-blue-200">Visibility</p>
            <p className="font-semibold">{weather.visibility} km</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sun size={16} className="text-blue-200" />
          <div>
            <p className="text-blue-100 dark:text-blue-200">Feels like</p>
            <p className="font-semibold">{weather.feels_like}°C</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-400 dark:border-blue-600 text-xs text-blue-100 dark:text-blue-200 text-center">
        Updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default WeatherWidget;