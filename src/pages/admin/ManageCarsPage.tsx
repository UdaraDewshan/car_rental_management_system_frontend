import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon, PencilSquareIcon, ArrowsRightLeftIcon, TruckIcon, UsersIcon, XMarkIcon, BeakerIcon, CurrencyDollarIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { Car } from '../../model/Car';

function ManageCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const fetchCars = (): void => {
        setLoading(true);
        axios.get<Car[]>('http://localhost:8080/car/getAll')
            .then((response) => {
                setCars(response.data);
                setLoading(false);
            })
            .catch((error: any) => {
                console.error("Error fetching cars:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = (id: string | undefined) => {
        if (!id) return;
        if (window.confirm("Are you sure you want to completely remove this vehicle from the fleet?")) {
            axios.delete(`http://localhost:8080/car/delete/${id}`)
                .then(() => {
                    fetchCars();
                })
                .catch((error) => {
                    console.error("Error deleting car:", error);
                    alert(`Oops! Failed to delete the car. Error: ${error.message}`);
                });
        }
    };

    const handleEditClick = (car: Car) => {
        setEditingCar(car);
        setIsEditModalOpen(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editingCar) {
            setEditingCar({ ...editingCar, [e.target.name]: e.target.value });
        }
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCar || !editingCar.carId) return;

        const dataToSend = {
            ...editingCar,
            pricePerDay: parseFloat(editingCar.pricePerDay as string)
        };

        axios.post(`http://localhost:8080/car/update/${editingCar.carId}`, dataToSend)
            .then(() => {
                setIsEditModalOpen(false);
                setEditingCar(null);
                fetchCars();
            })
            .catch((error) => {
                console.error("Error updating car:", error);
                alert("Failed to update the vehicle details.");
            });
    };

    return (
        <div className="min-h-screen bg-transparent py-10 px-6 font-sans relative">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Vehicle Inventory</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Monitor and manage all vehicles in your rental fleet.</p>
                    </div>
                    <button 
                        onClick={fetchCars}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold"
                    >
                        <ArrowsRightLeftIcon className="w-5 h-5" />
                        Refresh List
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cars.length > 0 ? (
                            cars.map((car: any, index) => (
                                <div key={index} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group">
                                    
                                    <div className="h-48 bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                                        {car.imageUrl && car.imageUrl !== 'null' && car.imageUrl !== '' ? (
                                            <img 
                                                src={car.imageUrl} 
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <TruckIcon className="w-16 h-16 text-slate-400 dark:text-slate-600 opacity-50" />
                                        )}
                                        <div className="absolute top-4 right-4 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                            {car.fuelType}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{car.brand} {car.model}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Daily rate: <span className="text-indigo-600 dark:text-indigo-400 font-bold">LKR {car.pricePerDay}</span></p>
                                        </div>
                                        <div className="flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800/50 mb-6">
                                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                                <UsersIcon className="w-4 h-4" />
                                                <span className="text-sm font-semibold">{car.seatCapacity} Seats</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handleEditClick(car)} // Edit Button එකට Function එක දුන්නා
                                                className="flex-1 flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold py-2.5 rounded-xl transition-all"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(car.carId)}
                                                className="w-12 flex items-center justify-center bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-all"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 text-lg">No cars found in the fleet. Start by adding one!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEditModalOpen && editingCar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                        
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Edit Vehicle</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ID: {editingCar.carId}</p>
                            </div>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 rounded-full border border-slate-200 dark:border-slate-700 transition-all"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Brand</label>
                                    <div className="relative">
                                        <BeakerIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                                        <input type="text" name="brand" value={editingCar.brand} onChange={handleEditChange} required
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Model</label>
                                    <input type="text" name="model" value={editingCar.model} onChange={handleEditChange} required
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Seats</label>
                                    <div className="relative">
                                        <UsersIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                                        <input type="number" name="seatCapacity" value={editingCar.seatCapacity} onChange={handleEditChange} required
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Fuel Type</label>
                                    <select name="fuelType" value={editingCar.fuelType} onChange={handleEditChange} required
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all">
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
                                <div className="relative">
                                    <PhotoIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                                    <input type="url" name="imageUrl" value={editingCar.imageUrl} onChange={handleEditChange} required
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Daily Rate (LKR)</label>
                                <div className="relative">
                                    <CurrencyDollarIcon className="absolute top-3.5 left-4 w-6 h-6 text-slate-400" />
                                    <input type="number" name="pricePerDay" value={editingCar.pricePerDay} onChange={handleEditChange} required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white font-bold text-lg rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-3 font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all">
                                    Cancel
                                </button>
                                <button type="submit"
                                    className="px-6 py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
                                    Save Changes
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ManageCarsPage;