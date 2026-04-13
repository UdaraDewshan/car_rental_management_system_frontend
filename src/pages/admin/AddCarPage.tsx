import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircleIcon, DocumentPlusIcon, UsersIcon, BeakerIcon, CurrencyDollarIcon, CheckCircleIcon, XCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { Car } from '../../model/Car';

function AddCarPage() {
  const [carData, setCarData] = useState<Car>({
    brand: '',
    model: '',
    seatCapacity: '',
    fuelType: '',
    pricePerDay: '',
    imageUrl: ''
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
        setStatus({ type: 'success', message: `Superb! ${carData.brand} ${carData.model} was successfully registered.` });
        setCarData({ brand: '', model: '', seatCapacity: '', fuelType: '', pricePerDay: '', imageUrl: '' });
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setStatus({ type: 'error', message: 'Oops! Something went wrong while saving the car. Please try again.' });
      });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 overflow-y-auto">
        <div className="max-w-xl w-full mx-auto">
          
          <div className="mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-6">
              <DocumentPlusIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Register Vehicle</h1>
            <p className="text-slate-500 text-lg">Add a new vehicle to your fleet inventory. The live preview will update automatically.</p>
          </div>

          {status.type && (
            <div className={`mb-8 p-5 rounded-2xl flex items-start gap-4 border ${status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'} transition-all duration-500`}>
              {status.type === 'success' ? <CheckCircleIcon className="w-6 h-6 mt-0.5 text-emerald-600" /> : <XCircleIcon className="w-6 h-6 mt-0.5 text-red-600" />}
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">{status.type === 'success' ? 'Success' : 'Error'}</p>
                <p className="text-base mt-1">{status.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brand</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BeakerIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="text" name="brand" placeholder="Toyota" value={carData.brand} onChange={handleChange} required
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-0 text-slate-900 rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
                <input type="text" name="model" placeholder="Axio" value={carData.model} onChange={handleChange} required
                  className="block w-full px-4 py-3.5 bg-slate-50 border-0 text-slate-900 rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Seats</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UsersIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" name="seatCapacity" placeholder="5" value={carData.seatCapacity} onChange={handleChange} required
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-0 text-slate-900 rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fuel Type</label>
                <select name="fuelType" value={carData.fuelType} onChange={handleChange} required
                  className="block w-full px-4 py-3.5 bg-slate-50 border-0 text-slate-900 rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all sm:text-sm sm:leading-6">
                  <option value="" disabled>Select Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PhotoIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input type="url" name="imageUrl" placeholder="https://example.com/car.jpg" value={carData.imageUrl} onChange={handleChange} required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-0 text-slate-900 rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Daily Rate (LKR)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-6 w-6 text-slate-400" />
                </div>
                <input type="number" name="pricePerDay" placeholder="8500" value={carData.pricePerDay} onChange={handleChange} required
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-0 text-slate-900 font-bold text-lg rounded-xl ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1 transition-all duration-300">
                <PlusCircleIcon className="w-6 h-6" />
                Add Vehicle to Fleet
              </button>
            </div>
          </form>
          
        </div>
      </div>

      <div className="hidden lg:flex w-2/5 relative bg-slate-900 flex-col justify-center items-center p-12 overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute bottom-[10%] -left-[20%] w-[60%] h-[60%] rounded-full bg-violet-600/20 blur-3xl"></div>
          <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8 text-indigo-300">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <h3 className="text-sm font-bold uppercase tracking-widest">Live Card Preview</h3>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] border border-white/10">
            <div className="h-56 bg-slate-100 relative group flex items-center justify-center">
              {carData.imageUrl ? (
                <img src={carData.imageUrl} alt="Car preview" className="w-full h-full object-cover" 
                     onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Link'; }} />
              ) : (
                <div className="text-slate-400 flex flex-col items-center">
                  <PhotoIcon className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-xs font-medium uppercase tracking-wider">Paste Image URL</span>
                </div>
              )}
              
              {carData.fuelType && (
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/10 shadow-lg">
                  {carData.fuelType}
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-2">
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {carData.brand || 'Brand'} <span className="text-slate-500 font-medium">{carData.model || 'Model'}</span>
                </h3>
              </div>

              <div className="flex items-end justify-between mt-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Daily Rate</p>
                  <p className="text-indigo-600 font-black text-xl">
                    LKR {carData.pricePerDay || '0'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg text-slate-600 border border-slate-100">
                  <UsersIcon className="w-4 h-4" />
                  <span className="text-sm font-bold">{carData.seatCapacity || '-'}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}

export default AddCarPage;