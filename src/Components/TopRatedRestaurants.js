import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RatedRestaurants() {
  const [ratedRestaurants, setRatedRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/restaurants/')
      .then(response => response.json())
      .then(data => {
        const promises = data.map(restaurant =>
          fetch(`http://localhost:3000/reviews?restaurantId=${restaurant.id}`)
            .then(response => response.json())
            .then(reviews => ({ ...restaurant, reviews: reviews.length }))
        );
        Promise.all(promises).then(restaurantsWithReviews => {
          restaurantsWithReviews = restaurantsWithReviews.filter(restaurant => restaurant.reviews > 0);
          restaurantsWithReviews.sort((a, b) => b.reviews - a.reviews);
          setRatedRestaurants(restaurantsWithReviews);
        });
      })
  }, []);

  return (
    <div>
      <h2 className='page-header'>Most Rated Restaurants</h2>
      <ul>
        {ratedRestaurants.map(restaurant => (
          <li key={restaurant.id}>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link> ({restaurant.reviews} reviews)
          </li>
        ))}
      </ul>
    </div>
  );
}
