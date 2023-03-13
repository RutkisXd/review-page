import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [keyword, setKeyword] = useState('');

  function keywordHandler(event) {
    setKeyword(event.target.value);
  }

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
      <input type='text' name='keyword' onChange={keywordHandler} value={keyword} placeholder='search...'></input>
      <Link to={'/search/' + keyword}><button>Search by keyword</button></Link>
    </nav>
  );
}
