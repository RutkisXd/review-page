import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function WriteReview(props) {
  const { restaurantId } = useParams();
  const restaurantIdAsNumber = parseInt(restaurantId, 10);  
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');
  const [reviews, setReviews] = useState([]);


  const handleNewReviewSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      restaurantId,
      title: newReviewTitle,
      body: newReviewBody,
    };
    fetch(`http://localhost:3000/reviews?restaurantId=${restaurantIdAsNumber}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then(response => response.json())
      .then(({ id }) => {
        setReviews([...reviews, { id: id, ...newReview }]);
        setNewReviewTitle('');
        setNewReviewBody('');
      })
      .catch(error => {
        console.error('Error adding new review:', error);
      });
  };

  return (
    <div className="write-review-form">
      <h2>Write a review</h2>
      <form onSubmit={handleNewReviewSubmit}>
        <div>
          <label htmlFor="newReviewTitle">Title:</label>
          <input
            type="text"
            placeholder="Title"
            value={newReviewTitle}
            onChange={(e) => setNewReviewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newReviewBody">Body:</label>
          <textarea
            placeholder="Write your review..."
            value={newReviewBody}
            onChange={(e) => setNewReviewBody(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
