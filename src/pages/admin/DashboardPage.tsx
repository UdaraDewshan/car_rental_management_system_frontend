import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TruckIcon, CurrencyDollarIcon, PresentationChartLineIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Car } from '../../model/Car';

function DashboardPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    axios.get<Car[]>('http://localhost:8080/car/getAll')
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  };

  const totalCars = cars.length;
  
  const avgPrice = totalCars > 0 
    ? cars.reduce((sum, car) => sum + Number(car.pricePerDay), 0) / totalCars 
    : 0;

  const fuelData = [
    { name: 'Petrol', count: cars.filter(c => c.fuelType === 'Petrol').length, color: '#6366f1' },
    { name: 'Diesel', count: cars.filter(c => c.fuelType === 'Diesel').length, color: '#14b8a6' },
    { name: 'Hybrid', count: cars.filter(c => c.fuelType === 'Hybrid').length, color: '#f59e0b' },
    { name: 'Electric', count: cars.filter(c => c.fuelType === 'Electric').length, color: '#10b981' }
  ];

  const recentCars = [...cars].reverse().slice(0, 4);

  return (
    <div className="min-h-screen bg-transparent py-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Welcome back, Admin! Here is what's happening with your fleet today.</p>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl text-indigo-600 dark:text-indigo-400">
                  <TruckIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Total Fleet</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">{totalCars} <span className="text-lg text-slate-400 font-medium">Vehicles</span></h3>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <CurrencyDollarIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Avg. Daily Rate</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white"><span className="text-lg text-slate-400 font-medium mr-1">Rs.</span>{avgPrice.toFixed(0)}</h3>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
                <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-2xl text-amber-600 dark:text-amber-400">
                  <PresentationChartLineIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">System Status</p>
                  <h3 className="text-2xl font-black text-emerald-500 dark:text-emerald-400">Online & Active</h3>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Fleet Distribution by Fuel Type</h2>
                </div>
                <div className="h-72 w-full">
                  {totalCars > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fuelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                        />
                        <Bar dataKey="count" radius={[8, 8, 8, 8]} maxBarSize={60}>
                          {fuelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 font-medium">No data available for chart.</div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <DocumentTextIcon className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recently Added</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {recentCars.length > 0 ? (
                    recentCars.map((car, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors">
                        <div className="w-16 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                          {car.imageUrl && car.imageUrl !== 'null' ? (
                            <img src={car.imageUrl} alt="car" className="w-full h-full object-cover" />
                          ) : (
                            <TruckIcon className="w-full h-full p-2 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{car.brand} {car.model}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">LKR {car.pricePerDay} / day</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-10">No recent vehicles found.</p>
                  )}
                </div>
                
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;