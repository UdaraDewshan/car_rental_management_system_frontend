import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CalendarDaysIcon, UserIcon, CurrencyDollarIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import type { Car } from '../model/Car';

function BookingPage() {
  const { id } = useParams(); // URL එකෙන් Car ID එක ගන්නවා
  const navigate = useNavigate();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [withDriver, setWithDriver] = useState(false);

  const token = localStorage.getItem('token');

  // වාහනේ විස්තර අරගන්නවා
  useEffect(() => {
    if (!token) {
      alert("Please log in to book a vehicle.");
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:8080/car/search/${id}`)
      .then(res => {
        setCar(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token, navigate]);

  // දවස් ගාණ සහ ගාස්තුව ගණනය කිරීමේ ලොජික් එක
  const calculateTotal = () => {
    if (!startDate || !endDate || !car) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (days <= 0) return 0; // වැරදි දවස් දුන්නොත් 0 යි

    const carTotal = days * Number(car.pricePerDay);
    const driverTotal = withDriver ? (days * 2500) : 0; // ඩ්‍රයිවර් කෙනෙක්ට දවසට 2500 යි කියලා හිතමු
    
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
      navigate('/fleet'); // බුක් කරාට පස්සේ ආයේ Fleet එකට යවනවා
    } catch (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  if (!car || !car.brand) return <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">Car not found!</div>;

  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Complete Your Booking</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">You are just a few steps away from driving your {car.brand} {car.model}.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Booking Form එක (Left Side) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <form onSubmit={handleBooking} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pick-up Date</label>
                  <div className="relative">
                    <CalendarDaysIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                    <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Return Date</label>
                  <div className="relative">
                    <CalendarDaysIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                    <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-0 text-slate-900 dark:text-white rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-600 transition-all" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <input type="checkbox" checked={withDriver} onChange={(e) => setWithDriver(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-500" /> I need a driver</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Additional LKR 2,500 per day will be added to the total.</p>
                  </div>
                </label>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={isSubmitting || totalAmount <= 0} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg">
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>

          {/* Receipt / Summary එක (Right Side) */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 text-white flex flex-col h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6 text-emerald-400" /> Booking Summary</h3>
            
            <div className="h-32 bg-slate-800 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
              {car.imageUrl && car.imageUrl !== 'null' ? (
                <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
              ) : (
                <TruckIcon className="w-10 h-10 text-slate-500" />
              )}
            </div>

            <h4 className="text-2xl font-black mb-1">{car.brand} {car.model}</h4>
            <p className="text-slate-400 text-sm mb-6">{car.fuelType} • {car.seatCapacity} Seats</p>

            <div className="space-y-4 text-sm font-medium border-t border-slate-700 pt-6">
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

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 uppercase tracking-wider font-bold text-xs">Total Amount</span>
                <span className="text-3xl font-black text-indigo-400">LKR {totalAmount > 0 ? totalAmount : '0'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookingPage;