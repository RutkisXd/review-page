import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // handle search
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
      </ul>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}
