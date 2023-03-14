import React from "react";
import { useEffect } from "react";   
import { useState } from "react"; 
import { useParams } from "react-router-dom";
import RestaurantsList from "../Components/RestaurantsList";
import ReviewsList from "../Components/ReviewsList";


function SearchComponent() {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { keyword } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/restaurants?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data));

    fetch(`http://localhost:3000/reviews?q=${keyword}`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [keyword]);

  return (
    <div>
      {restaurants.length === 0 && reviews.length === 0 && (
        <h2 className='page-header'>
          Sorry, with this keyword, there were no results.
        </h2>
      )}

      {restaurants.length > 0 && (
        <>
          <h2 className='page-header'>Search Results for "{keyword}"</h2>
          <RestaurantsList restaurants={restaurants} />
          <ReviewsList reviews={reviews} restaurants={restaurants} />
        </>
      )}
    </div>
  );
}

export default SearchComponent;

