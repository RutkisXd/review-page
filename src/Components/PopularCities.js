import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CityList() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cities')
      .then(response => response.json())
      .then(data => {
        setCities(data.slice(0, 4));
      })
      .catch(error => {
        console.error('Error fetching city data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Top 4 Cities</h2>
      <ul>
        {cities.map(city => (
          <li key={city.id}>
            <Link to={`/restaurants?cityId=${city.id}`}>
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
