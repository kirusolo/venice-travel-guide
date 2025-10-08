import React from 'react';
import { Heart, Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Venice Guide</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Your ultimate companion for exploring Venice like a local. Discover hidden gems, curated routes, and authentic experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 dark:text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/routes" className="text-gray-300 dark:text-gray-400 hover:text-white transition">
                  Routes
                </a>
              </li>
              <li>
                <a href="/map" className="text-gray-300 dark:text-gray-400 hover:text-white transition">
                  Map
                </a>
              </li>
              <li>
                <a href="/recommendations" className="text-gray-300 dark:text-gray-400 hover:text-white transition">
                  Recommendations
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>Food & Dining</li>
              <li>Culture & Museums</li>
              <li>Shopping & Markets</li>
              <li>Events & Festivals</li>
              <li>Hidden Gems</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="mailto:info@veniceguide.com" 
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Made with <Heart size={16} className="text-red-500" fill="currentColor" /> for Venice travelers
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} Venice Travel Guide. Portfolio Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;