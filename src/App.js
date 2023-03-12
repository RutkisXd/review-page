import HomePage from './Pages/HomePage';
import RestaurantDetailPage from './Pages/RestaurantDetailPage';
import RestaurantsPage from './Pages/ResutantsPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
