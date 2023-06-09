import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NewestRestaurants() {
  const [newRestaurants, setNewRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/restaurants/?_sort=id&_limit=5')
      .then(response => response.json())
      .then(data => setNewRestaurants(data))
  }, []);

  return (
    <div className='newest-restaurants'>
      <h2 className='page-header'>Newest Restaurants</h2>
      <ul>
        {newRestaurants.map(restaurant => (
          <li key={restaurant.id}>
             <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
