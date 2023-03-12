import React from 'react';
import CitySelector from '../Components/SearchByCategory';
import CitiesList from '../Components/PopularCities';
import RatedRestaurants from '../Components/TopRatedRestaurants';
import NewestRestaurants from '../Components/NewestRestaurants';
import NewestReviews from '../Components/NewReviews';
import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
    <div>
      
        <CitySelector></CitySelector>
        <CitiesList />
        <RatedRestaurants />
        <NewestRestaurants />

        <div className='view-all-restaurants'>
          <h3 className='view-all-header'>Would like to see more?</h3>
          <p className='view-all-p'>Feel free to look at our all restaurnts list!</p>
          <Link to='/restaurants'><button>View all</button></Link>
        </div>

    </div>
  );
}