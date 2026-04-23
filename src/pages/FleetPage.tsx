import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlassIcon, FunnelIcon, UsersIcon, TruckIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // Icons අප්ඩේට් කළා
import type { Car } from '../model/Car';

function FleetPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('All');

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  useEffect(() => {
    axios.get<Car[]>('http://localhost:8080/car/getAll')
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = (car.brand + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
    return matchesSearch && matchesFuel;
  });

  const handleRentNow = (carId: string) => {
    if (isLoggedIn) {
      navigate(`/book/${carId}`);
    } else {
      alert("Please login first to rent a vehicle.");
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans relative overflow-hidden">

      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-black text-white tracking-tighter uppercase">
          Udara<span className="text-indigo-500">Rent</span>.Car
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-bold">
          <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Home</Link>
          <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>About Us</Link>
          <Link to="/fleet" className={`transition-colors ${isActive('/fleet') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Our Fleet</Link>
          <Link to="/contact" className={`transition-colors ${isActive('/contact') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              {role === 'ADMIN' && (
                <Link to="/admin/dashboard" className="hidden sm:block text-indigo-400 text-sm font-bold hover:text-indigo-300 transition px-2">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/my-account" className="flex items-center gap-2 text-white text-sm font-bold px-3 py-2 hover:text-indigo-400 transition-colors">
                <UserCircleIcon className="w-6 h-6 text-indigo-400" />
                <span className="hidden sm:inline">My Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm px-5 py-2.5 rounded-full font-bold transition-all"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-sm font-bold hover:text-indigo-400 transition px-4 py-2">
                Sign In
              </Link>
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/30 border-none outline-none">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
          Our Premium <span className="text-indigo-400">Fleet</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Choose from our exclusive collection of high-performance vehicles. Find the perfect ride for your next journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex flex-col md:flex-row gap-4 shadow-2xl">

          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 text-white rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 outline-none"
            />
          </div>

          <div className="w-full md:w-64 relative">
            <FunnelIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 text-white rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Fuel Types</option>
              <option value="Petrol" className="bg-slate-900">Petrol</option>
              <option value="Diesel" className="bg-slate-900">Diesel</option>
              <option value="Hybrid" className="bg-slate-900">Hybrid</option>
              <option value="Electric" className="bg-slate-900">Electric</option>
            </select>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCars.map((car: any, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 group flex flex-col">

                <div className="h-52 bg-black/40 relative overflow-hidden flex items-center justify-center">
                  {car.imageUrl && car.imageUrl !== 'null' && car.imageUrl !== '' ? (
                    <img
                      src={car.imageUrl}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600';
                      }}
                    />
                  ) : (
                    <TruckIcon className="w-16 h-16 text-slate-600 opacity-50" />
                  )}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {car.fuelType}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight">{car.brand} {car.model}</h3>
                    <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                      <UsersIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{car.seatCapacity} Seats</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-0.5">Daily Rate</p>
                      <p className="text-lg font-black text-indigo-400">LKR {car.pricePerDay}</p>
                    </div>
                    <button
                      onClick={() => handleRentNow(car.carId)}
                      className="bg-white text-slate-900 hover:bg-indigo-500 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-slate-400 text-lg">No vehicles found matching your criteria.</p>
            <button onClick={() => { setSearchTerm(''); setSelectedFuel('All'); }} className="mt-4 text-indigo-400 hover:text-indigo-300 font-bold underline">
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default FleetPage;