import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search as SearchIcon, Heart, User, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { getFavoritesCount } = useFavorites();
  const { currentUser, logout } = useAuth();
  const favCount = getFavoritesCount();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Venice Guide</span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('nav.home')}
              </Link>
              <Link to="/routes" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('nav.routes')}
              </Link>
              <Link to="/map" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('nav.map')}
              </Link>
              <Link to="/recommendations" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                {t('nav.recommendations')}
              </Link>
              <Link 
                to="/favorites" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition relative"
              >
                <Heart size={24} />
                {favCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentUser.displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <User size={18} />
                  Sign In
                </button>
              )}

              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector />
              <ThemeToggle />
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                className="text-gray-700 dark:text-gray-300"
              >
                <SearchIcon size={24} />
              </button>
              <Link to="/favorites" className="text-gray-700 dark:text-gray-300 relative">
                <Heart size={24} />
                {favCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {favCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <SearchBar />
            </div>
          )}

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4">
              <Link
                to="/"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/routes"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.routes')}
              </Link>
              <Link
                to="/map"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.map')}
              </Link>
              <Link
                to="/recommendations"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.recommendations')}
              </Link>
              <Link
                to="/favorites"
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.favorites')} {favCount > 0 && `(${favCount})`}
              </Link>

              {/* Mobile User Menu */}
              {currentUser ? (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Signed in as {currentUser.displayName}
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="mt-4 w-full flex items-center gap-2 justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <User size={18} />
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Navbar;