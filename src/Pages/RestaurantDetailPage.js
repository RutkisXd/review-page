import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewTitle, setEditReviewTitle] = useState('');
  const [editReviewBody, setEditReviewBody] = useState('');

  useEffect(() => {
    const fetchRestaurantDetails = () => {
      fetch(`http://localhost:3000/restaurants/${restaurantId}`)
        .then(response => response.json())
        .then(data => setRestaurant(data))

      fetch(`http://localhost:3000/reviews?restaurantId=${restaurantId}`)
        .then(response => response.json())
        .then(data => setReviews(data))
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  const handleDeleteReview = (reviewId) => {
    fetch(`http://localhost:3000/reviews/${reviewId}`, { method: 'DELETE' })
      .then(() => setReviews(reviews.filter(review => review.id !== reviewId)))
  };

  const handleNewReviewTitleChange = (event) => {
    setNewReviewTitle(event.target.value);
  };

  const handleNewReviewBodyChange = (event) => {
    setNewReviewBody(event.target.value);
  };

  const handleNewReviewSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      title: newReviewTitle,
      body: newReviewBody,
      restaurantId: restaurantId
    };
    fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    })
      .then(response => response.json())
      .then(data => setReviews([...reviews, data]))
    setNewReviewTitle('');
    setNewReviewBody('');
  };

  const handleEditReviewTitleChange = (event) => {
    setEditReviewTitle(event.target.value);
  };

  const handleEditReviewBodyChange = (event) => {
    setEditReviewBody(event.target.value);
  };

  const handleEditReviewCancel = () => {
    setEditReviewId(null);
    setEditReviewTitle('');
    setEditReviewBody('');
  };

  const handleEditReviewSave = (event) => {
    event.preventDefault();
    const editedReview = {
      title: editReviewTitle,
      body: editReviewBody
    };
    fetch(`http://localhost:3000/reviews/${editReviewId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedReview)
    })
      .then(response => response.json())
      .then(data => {
        setReviews(reviews.map(review => {
          if (review.id === editReviewId) {
            return { ...review, ...data };
          } else {
            return review;
          }
        }));
        handleEditReviewCancel();
      })
  };

  const handleEditReview = (reviewId, reviewTitle, reviewBody) => {
    setEditReviewId(reviewId);
    setEditReviewTitle(reviewTitle);
    setEditReviewBody(reviewBody);
  }

  return (
    <div>
    <h2>{restaurant.name}</h2>
    <p>{restaurant.address}</p>
    <img src={restaurant.photo} alt={restaurant.name} />
    <h3>Reviews</h3>
  <ul>
    {reviews.map(review => (
      <li key={review.id}>
        <strong>{review.title}</strong>
        <p>{review.body}</p>
        <button className='btn' onClick={() => handleDeleteReview(review.id)}>Delete</button>
        <button className='btn' onClick={() => handleEditReview(review.id, review.title, review.body)}>Edit</button>
      </li>
    ))}
  </ul>

  <div>
      {!editReviewId && <h3>Add a review</h3>}
      {editReviewId && <h3>Edit review</h3>}
      <form onSubmit={editReviewId ? handleEditReviewSave : handleNewReviewSubmit}>
        <label>
          Title:
          <input type="text" value={editReviewId ? editReviewTitle : newReviewTitle} onChange={editReviewId ? handleEditReviewTitleChange : handleNewReviewTitleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea value={editReviewId ? editReviewBody : newReviewBody} onChange={editReviewId ? handleEditReviewBodyChange : handleNewReviewBodyChange} />
        </label>
        <br />
        <button className='btn' type="submit">{editReviewId ? 'Save review' : 'Submit'}</button>
        {editReviewId && <button className='btn' type="button" onClick={handleEditReviewCancel}>Cancel</button>}
      </form>
    </div>
    </div>

  )
}

