import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WriteReview from '../Components/WriteReview';
import { EditButton, DeleteButton } from '../Components/Buttons';

export default function RestaurantDetailPage() {
  const { restaurantId } = useParams();
  const parsedRestaurantId = parseInt(restaurantId);
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/restaurants/${parsedRestaurantId}`),
      fetch(`http://localhost:3000/reviews?restaurantId=${parsedRestaurantId}`)
    ])
      .then(([restaurantResponse, reviewsResponse]) => Promise.all([restaurantResponse.json(), reviewsResponse.json()]))
      .then(([restaurantData, reviewsData]) => {
        setRestaurant(restaurantData);
        setReviews(reviewsData);
      })
  }, [parsedRestaurantId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (editReview) {
      const updatedReview = { ...editReview, title: newReviewTitle, body: newReviewBody };
      fetch(`http://localhost:3000/reviews/${updatedReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReview)
      })
        .then(response => {
          if (response.ok) {
            setReviews(reviews.map(r => r.id === updatedReview.id ? updatedReview : r));
            setNewReviewTitle('');
            setNewReviewBody('');
            setEditReview(null);
          }
        })
    } else {
      // Otherwise, we're creating a new review
      const newReview = {
        restaurantId: parsedRestaurantId,
        title: newReviewTitle,
        body: newReviewBody
      };
      fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          setReviews([...reviews, data]);
          setNewReviewTitle('');
          setNewReviewBody('');
        })
    }
  };

  const handleEditClick = (review) => {
    setNewReviewTitle(review.title);
    setNewReviewBody(review.body);
    setEditReview(review);
  };
  

  const handleDeleteReview = (review) => {
    fetch(`http://localhost:3000/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setReviews(reviews.filter(r => r.id !== review.id));
        }
      })
  };


  return (
    <>
      <div>
        {restaurant && (
          <>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
          </>
        )}
        <WriteReview
          title={newReviewTitle}
          body={newReviewBody}
          onSubmit={handleSubmitReview}
        />
        {reviews && reviews.length > 0 ? (
          <div>
            <h3>Restaurant reviews:</h3>
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.body}</p>
                  <EditButton onClick={() => handleEditClick(review)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteReview(review)}>Delete</DeleteButton>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>There are no reviews for this restaurant yet.</p>
        )}
      </div>
    </>
  );
}  