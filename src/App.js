import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import RoutesPage from './pages/Routes';
import RouteDetail from './pages/RouteDetail';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/:id" element={<RouteDetail />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;