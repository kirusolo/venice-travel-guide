import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import RoutesPage from './pages/Routes';
import RouteDetail from './pages/RouteDetail';
import Recommendations from './pages/Recommendations';
import Favorites from './pages/Favorites';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="App min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/routes" element={<RoutesPage />} />
                  <Route path="/routes/:id" element={<RouteDetail />} />
                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="/favorites" element={<Favorites />} />
                
                </Routes>
              </main>
              <Footer />
              <InstallPWA />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;