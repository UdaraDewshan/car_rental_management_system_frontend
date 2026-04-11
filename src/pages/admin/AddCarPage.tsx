import React, { useState } from 'react';
import axios from 'axios';
import { type Car } from '../../types/Car';

function AddCarPage() {
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Add New Car
          </h2>
          <p className="text-sm text-gray-500">
            Enter the vehicle details to add it to the system fleet.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          
          {/* Brand & Model Row */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
              <input 
                type="text" name="brand" placeholder="e.g. Toyota" 
                value={carData.brand} onChange={handleChange} required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Model</label>
              <input 
                type="text" name="model" placeholder="e.g. Axio" 
                value={carData.model} onChange={handleChange} required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Seat Capacity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Seat Capacity</label>
            <input 
              type="number" name="seatCapacity" placeholder="e.g. 5" 
              value={carData.seatCapacity} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fuel Type</label>
            <select 
              name="fuelType" value={carData.fuelType} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
            >
              <option value="" disabled>Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Price Per Day */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price Per Day (Rs.)</label>
            <input 
              type="number" name="pricePerDay" placeholder="e.g. 8000" 
              value={carData.pricePerDay} onChange={handleChange} required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCarPage;