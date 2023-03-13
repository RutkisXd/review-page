import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SearchComponent() {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    // Fetch restaurants
    fetch(`http://localhost:3000/restaurants?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data));

    // Fetch reviews
    fetch(`http://localhost:3000/reviews?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [keyword]);

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>

      <h3>Restaurants</h3>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name} </Link> 
            - {restaurant.address}
          </li>
        ))}
      </ul>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
              <h3>{review.title} </h3>
              <p>{review.body} </p>
              Restaurant: <Link to={`/restaurant/${review.restaurantId}`}> {restaurants.find((r) => r.id === review.restaurantId)?.name} </Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
