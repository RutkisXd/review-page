import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Container from '../Components/Container/Container';
import RestaurantForm from '../Components/RestaurantForm';
import '../Pages/RestaurantsPage.scss'

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);
  const { cityId } = useParams();
  const location = useLocation();

  useEffect(() => {
    let url = 'http://localhost:3000/restaurants';
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      const cityIdParam = queryParams.get('cityId');
      if (cityIdParam) {
        url += `?cityId=${cityIdParam}`;
      }
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setRestaurants(data));
    fetch('http://localhost:3000/cities')
      .then(response => response.json())
      .then(data => setCities(data));
  }, [location.search]);

  function getCityName(cityId) {
    const city = cities.find(city => city.id === parseInt(cityId));
    return city ? city.name : '';
  }

  function handleDelete(restaurantId) {
    fetch(`http://localhost:3000/restaurants/${restaurantId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId)));
  }

  function handleEdit(restaurant) {
    setEditingRestaurantId(restaurant.id);
  }

  function handleCancel() {
    setEditingRestaurantId(null);
  }

  function handleSave(data) {
    if (editingRestaurantId) {
      fetch(`http://localhost:3000/restaurants/${editingRestaurantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => setRestaurants(restaurants.map(restaurant => {
          if (restaurant.id === editingRestaurantId) {
            return data;
          } else {
            return restaurant;
          }
        })));
      setEditingRestaurantId(null);
    } else {
      fetch('http://localhost:3000/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => setRestaurants([...restaurants, data]));
    }
  }

  console.log(cityId)

  return (
    <Container>
        <div className='restaurants-content-wrapper'>
          <h3>{cityId ? `Restaurants in ${getCityName(cityId)}` : 'All Restaurants'}</h3>
          <RestaurantForm
            cities={cities}
            onSubmit={handleSave}
            initialData={editingRestaurantId ? restaurants.find(restaurant => restaurant.id === editingRestaurantId) : null}
          />
          <ul className='restaurants-list'>
            {restaurants.map((restaurant) => (
              <li className='restaurant-item' key={restaurant.id}>
                <Link to={`/restaurants/${restaurant.id}`}>
                  <img src={restaurant.photo} alt={`${restaurant.name}`} />
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.address}</p>
                </Link>
                <div className='buttons-together'>
                  <button className='btn' onClick={() => handleDelete(restaurant.id)}>Delete</button>
                  <button className='btn' onClick={() => handleEdit(restaurant)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </Container>

  );
  
}  