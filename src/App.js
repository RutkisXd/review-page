import HomePage from './Pages/HomePage';
import RestaurantDetailPage from './Pages/RestaurantDetailPage';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import RestaurantList from './Pages/ResutantsPage';
import ReviewsPage from './Pages/Reviews';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
          <Route path="/restaurants?:cityId" element={<RestaurantList />} />
          <Route path='/reviews' element={<ReviewsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
