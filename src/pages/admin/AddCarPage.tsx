import React, { useState } from 'react';
import axios from 'axios';
import type { Car } from '../../types/Car';


function AddCar() {
  const [carData, setCarData] = useState<Car>({
    brand: '',
    model: '',
    seatCapacity: '',
    fuelType: '',
    pricePerDay: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    axios.post('http://localhost:8080/car/add', carData)
      .then((response) => {
        alert(response.data); 

        setCarData({ brand: '', model: '', seatCapacity: '', fuelType: '', pricePerDay: '' });
      })
      .catch((error) => {
        console.error('There was an error!', error);
        alert('Failed to save the car!');
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add a New Car</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="brand" placeholder="Brand (e.g. Toyota)" value={carData.brand} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model (e.g. Axio)" value={carData.model} onChange={handleChange} required />
        <input type="number" name="seatCapacity" placeholder="Seat Capacity (e.g. 5)" value={carData.seatCapacity} onChange={handleChange} required />
        
        <select name="fuelType" value={carData.fuelType} onChange={handleChange} required>
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
        
        <input type="number" name="pricePerDay" placeholder="Price Per Day (Rs.)" value={carData.pricePerDay} onChange={handleChange} required />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>
          Save Car
        </button>
      </form>
    </div>
  );
}

export default AddCar;