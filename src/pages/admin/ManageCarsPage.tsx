import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon, PencilSquareIcon, ArrowsRightLeftIcon, TruckIcon, UsersIcon } from '@heroicons/react/24/outline';
import type { Car } from '../../model/Car';

function ManageCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

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
        console.log("Delete button clicked! The ID is:", id);

        if (!id) {
            alert("not get car Id");
            return;
        }

        if (window.confirm("Are you sure you want to completely remove this vehicle from the fleet?")) {
            axios.delete(`http://localhost:8080/car/delete/${id}`)
                .then((response) => {
                    alert("Success!");
                    fetchCars();
                })
                .catch((error) => {
                    console.error("Error deleting car:", error);
                    alert(`Oops! Failed to delete the car. Error: ${error.message}`);
                });
        }
    };

    return (
        <div className="min-h-screen bg-transparent py-10 px-6 font-sans">
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
                                                className="flex-1 flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl transition-all"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(car.carId)}
                                                className="w-12 flex items-center justify-center bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl transition-all title='Delete Vehicle'"
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
        </div>
    );
}

export default ManageCarsPage;