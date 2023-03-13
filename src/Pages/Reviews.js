
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [editReviewId, setEditReviewId] = useState(null);
    const [editedReview, setEditedReview] = useState({
        title: '',
        body: '',
    });

    useEffect(() => {
        Promise.all([
          fetch('http://localhost:3000/reviews').then(response => response.json()),
          fetch('http://localhost:3000/restaurants').then(response => response.json())
        ]).then(([reviewsData, restaurantsData]) => {
          const reviewsWithRestaurantName = reviewsData.map(review => {
            const restaurant = restaurantsData.find(restaurant => restaurant.id === review.restaurantId);
            return { ...review, restaurantName: restaurant ? restaurant.name : '' };
          });
          setReviews(reviewsWithRestaurantName);
        }).catch(error => console.error(error))
      }, []);
      

    function handleDeleteReview(id) {
        fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            // Remove the deleted review from the state
            setReviews(reviews.filter(review => review.id !== id));
        })
        .catch(error => console.error(error))
    }

    function handleEditReview(id, review) {
        setEditReviewId(id);
        setEditedReview(review);
    }

    function handleSaveReview(id) {
        fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReview),
        })
        .then(response => response.json())
        .then(data => {
            // Update the edited review in the state
            setReviews(reviews.map(review => {
            if (review.id === id) {
                return { ...review, ...editedReview };
            } else {
                return review;
            }
            }));
            // Clear the edited review state and edit review id state
            setEditedReview({ title: '', body: '' });
            setEditReviewId(null);
        })
        .catch(error => console.error(error))
    }

    function handleChange(event) {
        setEditedReview({
        ...editedReview,
        [event.target.name]: event.target.value,
        });
    }

    return (
        <div>
        <h2>All Reviews</h2>
        <ul>
            {reviews.map(review => (
            <li key={review.id}>
                {editReviewId === review.id ? (
                <>
                    <p>Title: <input type="text" name="title" value={editedReview.title} onChange={handleChange} /></p>
                    <p>Body: <input type="text" name="body" value={editedReview.body} onChange={handleChange} /></p>
                    <button onClick={() => handleSaveReview(review.id)}>Save Review</button>
                </>
                ) : (
                <>
                    <p>Title: {review.title}</p>
                    <p>Body: {review.body}</p>
                    <p>Restaurant: <Link to={`/restaurants/${review.restaurantId}`}>{review.restaurantName}</Link></p>
                    <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    <button onClick={() => handleEditReview(review.id, { title: review.title, body: review.body })}>Edit Review</button>
                </>
                )}
            </li>
            ))}
        </ul>
        </div>
    );
}
