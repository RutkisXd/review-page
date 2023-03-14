import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Components/Navigation.scss";

export default function Navigation() {
  const [keyword, setKeyword] = useState("");

  function keywordHandler(event) {
    setKeyword(event.target.value);
  }

  return (
    <nav className="navigation-wrapper">
      <ul className="links-wrapper">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/restaurants">
            Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink to="/reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <div className="search-input">
        <input
          type="text"
          name="keyword"
          onChange={keywordHandler}
          value={keyword}
          placeholder="search..."
        ></input>
        <NavLink to={"/search/" + keyword}>
          <button className="btn search">Search</button>
        </NavLink>
      </div>
    </nav>
  );
}
