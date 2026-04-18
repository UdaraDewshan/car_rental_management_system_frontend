import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CalendarDaysIcon, UserIcon, ShieldCheckIcon, TruckIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import type { Car } from '../model/Car';

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [withDriver, setWithDriver] = useState(false);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/');
        }
    };

    useEffect(() => {
        if (!token) {
            alert("Please log in to book a vehicle.");
            navigate('/login');
            return;
        }

        //
        axios.get(`http://localhost:8080/car/search/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (res.data === "") {
                    setCar(null);
                } else {
                    setCar(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching car:", err);
                setLoading(false);
            });
    }, [id, token, navigate]);
    //

    const calculateTotal = () => {
        if (!startDate || !endDate || !car) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (days <= 0) return 0;

        const carTotal = days * Number(car.pricePerDay);
        const driverTotal = withDriver ? (days * 2500) : 0;

        return carTotal + driverTotal;
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        const total = calculateTotal();

        if (total <= 0) {
            alert("Please select valid dates. End date must be after start date.");
            return;
        }

        setIsSubmitting(true);

        const bookingData = {
            carId: id,
            startDate: startDate,
            endDate: endDate,
            withDriver: withDriver,
            totalPrice: total
        };

        try {
            await axios.post('http://localhost:8080/booking/add', bookingData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("Booking Confirmed! Thank you for choosing CarDirect.");
            navigate('/fleet');
        } catch (error) {
            console.error(error);
            alert("Booking failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    const totalAmount = calculateTotal();

    return (
        <div className="min-h-screen bg-slate-950 font-sans relative overflow-hidden">

            <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
                <div className="text-2xl font-black text-white tracking-tighter uppercase">
                    Udara<span className="text-indigo-500">Direct</span>.Car
                </div>

                <div className="hidden md:flex gap-8 items-center text-sm font-bold">
                    <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
                    <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link>
                    <Link to="/fleet" className="text-slate-400 hover:text-white transition-colors">Our Fleet</Link>
                    <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
                </div>

                <div className="flex gap-4 items-center">
                    {role === 'ADMIN' && (
                        <Link to="/admin/dashboard" className="hidden sm:block text-indigo-400 text-sm font-bold hover:text-indigo-300 transition px-2">
                            Admin Dashboard
                        </Link>
                    )}
                    <div className="flex items-center gap-2 text-white text-sm font-bold px-3 py-2">
                        <UserCircleIcon className="w-6 h-6 text-indigo-400" />
                        <span className="hidden sm:inline">My Account</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm px-5 py-2.5 rounded-full font-bold transition-all"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="pt-32 pb-12 px-6">
                <div className="max-w-5xl mx-auto">


                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (!car || !car.brand) ? (
                        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                            <TruckIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Vehicle Not Found</h2>
                            <p className="text-slate-400 text-lg mb-6">We couldn't find the vehicle you're trying to book.</p>
                            <Link to="/fleet" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all">
                                Go Back to Fleet
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <Link to="/fleet" className="text-indigo-400 hover:text-indigo-300 text-sm font-bold mb-4 inline-block flex items-center gap-1">
                                    &larr; Back to Fleet
                                </Link>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white">Complete Your Booking</h1>
                                <p className="text-slate-400 mt-2">You are just a few steps away from driving your {car.brand} {car.model}.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <form onSubmit={handleBooking} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-300 mb-2">Pick-up Date</label>
                                                <div className="relative">
                                                    <CalendarDaysIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                                                    <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                                                        className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-300 mb-2">Return Date</label>
                                                <div className="relative">
                                                    <CalendarDaysIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                                                    <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]}
                                                        className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/5 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <label className="flex items-center gap-3 cursor-pointer p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                                                <input type="checkbox" checked={withDriver} onChange={(e) => setWithDriver(e.target.checked)} className="w-5 h-5 text-indigo-500 rounded bg-black/50 border-white/20 focus:ring-indigo-500" />
                                                <div>
                                                    <p className="font-bold text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> I need a driver</p>
                                                    <p className="text-sm text-slate-400">Additional LKR 2,500 per day will be added to the total.</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="pt-6">
                                            <button type="submit" disabled={isSubmitting || totalAmount <= 0} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg border-none outline-none">
                                                {isSubmitting ? "Processing..." : "Confirm Booking"}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/10 text-white flex flex-col h-fit sticky top-32">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6 text-emerald-400" /> Booking Summary</h3>

                                    <div className="h-32 bg-white/5 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                                        {car.imageUrl && car.imageUrl !== 'null' ? (
                                            <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
                                        ) : (
                                            <TruckIcon className="w-10 h-10 text-slate-500" />
                                        )}
                                    </div>

                                    <h4 className="text-2xl font-black mb-1">{car.brand} {car.model}</h4>
                                    <p className="text-slate-400 text-sm mb-6">{car.fuelType} • {car.seatCapacity} Seats</p>

                                    <div className="space-y-4 text-sm font-medium border-t border-white/10 pt-6">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Daily Rate</span>
                                            <span>LKR {car.pricePerDay}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Duration</span>
                                            <span>
                                                {startDate && endDate ? `${Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))} Days` : '-'}
                                            </span>
                                        </div>
                                        {withDriver && (
                                            <div className="flex justify-between text-emerald-400">
                                                <span>Driver Fee</span>
                                                <span>+ LKR 2500 / day</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-end">
                                            <span className="text-slate-400 uppercase tracking-wider font-bold text-xs">Total Amount</span>
                                            <span className="text-3xl font-black text-indigo-400">LKR {totalAmount > 0 ? totalAmount : '0'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default BookingPage;