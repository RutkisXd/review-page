import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Components/Navigation.scss'

export default function Navigation() {
  const [keyword, setKeyword] = useState('');

  function keywordHandler(event) {
    setKeyword(event.target.value);
  }

  return (
    <nav className='navigation-wrapper'>
      <ul className='links-wrapper'>
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
      <div className='search-input'>
        <input type='text' name='keyword' onChange={keywordHandler} value={keyword} placeholder='search...'></input>
        <Link to={'/search/' + keyword}><button className='btn'>Search</button></Link>
      </div>
    </nav>
  );
}
