import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../Components/Container/Container';

function SearchResults() {
  const { keyword } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/restaurants?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data));

    fetch(`http://localhost:3000/reviews?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [keyword]);

  const restaurantsResults =
    restaurants.length === 0 ? (
      <p>Sorry, no results.</p>
    ) : (
      restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          <p>
            <Link to={`/restaurants/${restaurant.id}`}>Go to restaurant</Link>
          </p>
        </div>
      ))
    );

  const reviewsResults =
    reviews.length === 0 ? (
      <p>Sorry, no results.</p>
    ) : (
      reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
          <p>
            <Link to={`/restaurants/${review.restaurantId}`}>
              {review.restaurantName}
            </Link>
          </p>
        </div>
      ))
    );

  return (
    <Container>
      <h2>Search results:</h2>
      <div>
        <h3>Restaurants results:</h3>
        {restaurantsResults}

        <h3>Reviews results:</h3>
        {reviewsResults}
      </div>
    </Container>
  );
}

export default SearchResults;




