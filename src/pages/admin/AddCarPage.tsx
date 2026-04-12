import React, { useState } from 'react';
import axios from 'axios';

import { PlusCircleIcon, DocumentPlusIcon, UsersIcon, BeakerIcon, CurrencyDollarIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { Car } from '../../types/Car';

function AddCarPage() {
  const [carData, setCarData] = useState<Car>({
    brand: '',
    model: '',
    seatCapacity: '',
    fuelType: '',
    pricePerDay: ''
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setStatus({ type: null, message: '' });

    const dataToSend = {
        ...carData,
        pricePerDay: parseFloat(carData.pricePerDay as string)
    };
    
    axios.post('http://localhost:8080/car/add', dataToSend)
      .then((response) => {
        setStatus({ type: 'success', message: `Superb! ${carData.brand} ${carData.model} was added successfully.` });
        setCarData({ brand: '', model: '', seatCapacity: '', fuelType: '', pricePerDay: '' });
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setStatus({ type: 'error', message: 'Oops! Something went wrong while saving the car. Please try again.' });
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
            <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <DocumentPlusIcon className="w-9 h-9" />
            </div>
            <div>
                <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
                    Fleet Management
                </h1>
                <p className="text-lg text-slate-600 mt-1">
                    Register a new vehicle to your rental fleet.
                </p>
            </div>
        </div>

        {status.type && (
            <div className={`mb-8 p-5 rounded-2xl flex items-start gap-4 border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                {status.type === 'success' ? <CheckCircleIcon className="w-7 h-7 mt-0.5 text-emerald-600"/> : <XCircleIcon className="w-7 h-7 mt-0.5 text-red-600"/>}
                <div>
                    <p className="font-bold text-lg">{status.type === 'success' ? 'Success' : 'Error'}</p>
                    <p className="text-base">{status.message}</p>
                </div>
            </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-100 p-10 border border-slate-100">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Vehicle Brand</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <BeakerIcon className="w-5 h-5"/>
                    </span>
                    <input 
                        type="text" name="brand" placeholder="e.g., Toyota" 
                        value={carData.brand} onChange={handleChange} required 
                        className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition duration-200 shadow-sm"
                    />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Model Name</label>
                <input 
                  type="text" name="model" placeholder="e.g., Axio" 
                  value={carData.model} onChange={handleChange} required 
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition duration-200 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Seating Capacity</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <UsersIcon className="w-5 h-5"/>
                    </span>
                    <input 
                        type="number" name="seatCapacity" placeholder="e.g., 5" 
                        value={carData.seatCapacity} onChange={handleChange} required 
                        className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition duration-200 shadow-sm"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fuel Type</label>
                <select 
                  name="fuelType" value={carData.fuelType} onChange={handleChange} required
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition duration-200 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-[right_1rem_center] bg-no-repeat"
                >
                  <option value="" disabled>Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price Per Day (LKR)</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <CurrencyDollarIcon className="w-6 h-6"/>
                    </span>
                    <input 
                        type="number" name="pricePerDay" placeholder="e.g., 8500" 
                        value={carData.pricePerDay} onChange={handleChange} required 
                        className="w-full pl-14 pr-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg font-medium focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition duration-200 shadow-sm"
                    />
                </div>
                <p className="text-xs text-slate-500 mt-1.5 pl-1">Set the standard daily rental rate for this vehicle.</p>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100 mt-10">
                <button 
                    type="submit" 
                    className="flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
                >
                    <PlusCircleIcon className="w-6 h-6" />
                    Complete Registration
                </button>
            </div>

          </form>
        </div>
        
        <div className="text-center mt-12 text-sm text-slate-500">
            Car Rental Management System v1.0 | Admin Panel
        </div>
      </div>
    </div>
  );
}

export default AddCarPage;