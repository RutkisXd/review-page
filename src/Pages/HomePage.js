import React from 'react';
import CitySelector from '../Components/SearchByCategory';
import CitiesList from '../Components/PopularCities';
import RatedRestaurants from '../Components/TopRatedRestaurants';
import NewestRestaurants from '../Components/NewestRestaurants';
import { Link } from 'react-router-dom';
import '../Pages/HomePage.scss'
import Container from '../Components/Container/Container';


export default function HomePage() {
  return (
    <Container>
        <div className='content-wrapper'>
      
          <div className='city-selector'>
            <CitySelector></CitySelector>
          </div>
          <div className='cta-wrapper'>
            <CitiesList />
            <RatedRestaurants />
            <NewestRestaurants />
          </div>


          <div className='view-all-restaurants'>
            <div className='view-all-restaurants-wrapper'>
              <h3 className='page-header'>Would like to see more?</h3>
              <p className='page-paragraph'>Feel free to look at our all restaurnts list!</p>
              <Link to='/restaurants'><button className='btn'>View all</button></Link>
            </div>
          </div>
      </div>
    </Container>

  );
}