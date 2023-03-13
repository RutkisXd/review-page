import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newRestaurantAddress, setNewRestaurantAddress] = useState('');
  const [newRestaurantCityId, setNewRestaurantCityId] = useState('');
  const [newRestaurantPhoto, setNewRestaurantPhoto] = useState('');
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

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: newRestaurantName,
      address: newRestaurantAddress,
      cityId: parseInt(newRestaurantCityId),
      photo: newRestaurantPhoto,
    };
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
    setNewRestaurantName('');
    setNewRestaurantAddress('');
    setNewRestaurantCityId('');
    setNewRestaurantPhoto('');
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
    setNewRestaurantName(restaurant.name);
    setNewRestaurantAddress(restaurant.address);
    setNewRestaurantCityId(restaurant.cityId.toString());
    setNewRestaurantPhoto(restaurant.photo);
  }

  console.log(cityId)

  return (
    <div>
      <h3>{cityId ? `Restaurants in ${getCityName(cityId)}` : 'All Restaurants'}</h3>
  
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newRestaurantName}
            onChange={(event) => setNewRestaurantName(event.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={newRestaurantAddress}
            onChange={(event) => setNewRestaurantAddress(event.target.value)}
          />
        </label>
        <label>
          City:
          <select
            value={newRestaurantCityId}
            onChange={(event) => setNewRestaurantCityId(event.target.value)}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Photo URL:
          <input
            type="text"
            value={newRestaurantPhoto}
            onChange={(event) => setNewRestaurantPhoto(event.target.value)}
          />
        </label>
        <button type="submit">
          {editingRestaurantId ? 'Save Restaurant' : 'Add Restaurant'}
        </button>
      </form>
  
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurants/${restaurant.id}`}>
              <img src={restaurant.photo} alt={`Photo of ${restaurant.name}`} />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
            </Link>
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
            <button onClick={() => handleEdit(restaurant)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );

        }