import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CitySelector() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/cities')
      .then(response => response.json())
      .then(data => setCities(data))
  }, []);

  const handleSelectChange = (event) => {
    setSelectedCity(event.target.value);
  }

  return (
    <div className='search-by-category'>
      <h3 className='page-header'>Find different places in your area! Experience different food! </h3>
      <p className='page-paragraph'>So many new options, just one click away!</p>
      <div className='select-category-wrapper'>
        <select value={selectedCity} onChange={handleSelectChange}>
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city.id} value={city.name}>{city.name}</option>
          ))}
        </select>
        {selectedCity && (
          <Link to={`/restaurants?cityId=${cities.find(city => city.name === selectedCity).id}`}>
            <button>Search</button>
          </Link>
        )}
      </div>
     
    </div>
  );
}
