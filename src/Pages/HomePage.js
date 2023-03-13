import React from 'react';
import CitySelector from '../Components/SearchByCategory';
import CitiesList from '../Components/PopularCities';
import RatedRestaurants from '../Components/TopRatedRestaurants';
import NewestRestaurants from '../Components/NewestRestaurants';
import { Link } from 'react-router-dom';
import '../Pages/HomePage.scss'


export default function HomePage() {
  return (
    <div className='content-wrapper'>
      
        <CitySelector></CitySelector>
        <div className='cta-wrapper'>
          <CitiesList />
          <RatedRestaurants />
          <NewestRestaurants />
        </div>


        <div className='view-all-restaurants-wrapper'>
          <h3 className='page-header'>Would like to see more?</h3>
          <p className='page-paragraph'>Feel free to look at our all restaurnts list!</p>
          <Link to='/restaurants'><button>View all</button></Link>
        </div>

    </div>
  );
}