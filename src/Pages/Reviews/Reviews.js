
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container/Container';
import '../Pages/Reviews.scss'

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
        })}, []);
      

    function handleDeleteReview(id) {
        fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setReviews(reviews.filter(review => review.id !== id));
        })
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
            setReviews(reviews.map(review => {
            if (review.id === id) {
                return { ...review, ...editedReview };
            } else {
                return review;
            }
            }));
            setEditedReview({ title: '', body: '' });
            setEditReviewId(null);
        })
    }

    function handleChange(event) {
        setEditedReview({
        ...editedReview,
        [event.target.name]: event.target.value,
        });
    }

    return (
        <Container>
            <div className='reviews-wrapper'>
            <h2>All Reviews</h2>
            <ul className='reviews-list'>
                {reviews.map(review => (
                <li className='review-item' key={review.id}>
                    {editReviewId === review.id ? (
                    <>
                    <div className='save-review'>
                        <p>Title: <input type="text" name="title" value={editedReview.title} onChange={handleChange} /></p>
                        <p>Body: <input type="text" name="body" value={editedReview.body} onChange={handleChange} /></p>
                        <button className='btn' onClick={() => handleSaveReview(review.id)}>Save Review</button>
                    </div>

                    </>
                    ) : (
                    <div className='review-card'>
                        <div className='review-card-wrapper'>
                        <p>Title: {review.title}</p>
                        <p>Body: {review.body}</p>
                        <p>Restaurant: <Link to={`/restaurants/${review.restaurantId}`}>{review.restaurantName}</Link></p>
                        <div className='buttons-together'>
                            <button className='btn' onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                            <button className='btn' onClick={() => handleEditReview(review.id, { title: review.title, body: review.body })}>Edit Review</button>
                        </div>

                        </div>
                    </div>
                    )}
                </li>
                ))}
            </ul>
            </div>
        </Container>

    );
}
