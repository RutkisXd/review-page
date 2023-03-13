import { useState, useEffect } from 'react';

export default function RatedRestaurants() {
  const [ratedRestaurants, setRatedRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/restaurants/')
      .then(response => response.json())
      .then(data => {
        // Fetch reviews for each restaurant
        const promises = data.map(restaurant =>
          fetch(`http://localhost:3000/reviews?restaurantId=${restaurant.id}`)
            .then(response => response.json())
            .then(reviews => ({ ...restaurant, reviews: reviews.length }))
        );
        Promise.all(promises).then(restaurantsWithReviews => {
          // Filter restaurants with more than 0 reviews and sort by number of reviews in descending order
          restaurantsWithReviews = restaurantsWithReviews.filter(restaurant => restaurant.reviews > 0);
          restaurantsWithReviews.sort((a, b) => b.reviews - a.reviews);
          setRatedRestaurants(restaurantsWithReviews);
        });
      })
      .catch(error => console.error('Error fetching rated restaurants:', error));
  }, []);

  return (
    <div>
      <h2>Most Rated Restaurants</h2>
      <ul>
        {ratedRestaurants.map(restaurant => (
          <li key={restaurant.id}>
            <a href={`/restaurants/${restaurant.id}`}>{restaurant.name}</a> ({restaurant.reviews} reviews)
          </li>
        ))}
      </ul>
    </div>
  );
}
