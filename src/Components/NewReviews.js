import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NewestReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/reviews?restaurants')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Newest Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.comment}</p>
            <Link to={`/restaurants/${review.restaurant.id}`}>{review.restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
