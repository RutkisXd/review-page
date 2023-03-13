import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SearchResults() {
  const { searchTerm } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`http://localhost:3000/restaurants?q=${searchTerm}`);
      const data = await response.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, [searchTerm]);

  return (
    <div>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <a href={`/restaurants/${restaurant.id}`}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
