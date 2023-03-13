import React from "react";
import { Link } from "react-router-dom";

function RestaurantsList({ restaurants }) {
    return (
      <>
        <h3>Restaurants</h3>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name} </Link> 
              - {restaurant.address}
            </li>
          ))}
        </ul>
      </>
    );
  }

  export default RestaurantsList