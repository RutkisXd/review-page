import React from "react";
import { Link } from "react-router-dom";

function ReviewsList({ reviews, restaurants }) {
    return (
      <>
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
      </>
    );
  }

  export default ReviewsList