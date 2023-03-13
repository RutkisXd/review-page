import { useState } from 'react';

export default function RestaurantForm({ cities, onSubmit, initialData }) {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [cityId, setCityId] = useState(initialData?.cityId || '');
  const [photo, setPhoto] = useState(initialData?.photo || '');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, address, cityId, photo };
    onSubmit(data);
  };
  
  return (
    <form className='restaurant-submit' onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
      </label>
      <label>
        City:
        <select value={cityId} onChange={(event) => setCityId(event.target.value)}>
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
        <input type="text" value={photo} onChange={(event) => setPhoto(event.target.value)} />
      </label>
      <button type="submit">{initialData ? 'Update' : 'Add'}</button>
    </form>
  );
}
