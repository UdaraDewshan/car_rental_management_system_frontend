import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserCircleIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, TruckIcon, CurrencyDollarIcon, CheckCircleIcon, XCircleIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import type { Booking } from '../model/Booking';

function MyAccountPage() {
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      navigate('/login');
      return;
    }

    axios.get('http://localhost:8080/booking/my-bookings', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setMyBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token, navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"><CheckCircleIcon className="w-4 h-4"/> Approved</span>;
      case 'REJECTED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30"><XCircleIcon className="w-4 h-4"/> Rejected</span>;
      case 'COMPLETED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30"><CheckCircleIcon className="w-4 h-4"/> Completed</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30"><ClockIcon className="w-4 h-4"/> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans relative overflow-hidden pb-20">
      
      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-black text-white tracking-tighter uppercase">
          Udara<span className="text-indigo-500">Rent</span>.Car
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
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold px-3 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <UserCircleIcon className="w-6 h-6" />
            <span className="hidden sm:inline">My Account</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm px-5 py-2.5 rounded-full font-bold transition-all">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <div className="pt-32 px-6 max-w-6xl mx-auto">
        
        <div className="mb-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Welcome Back!</h1>
            <p className="text-slate-400 mt-1 text-lg">Manage your vehicle rentals and check booking statuses.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">My Bookings</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          </div>
        ) : myBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((booking) => (
              <div key={booking.bookingId} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col transition-all hover:bg-white/10 hover:-translate-y-1">
                
                <div className="h-48 bg-black/40 relative">
                  {booking.carId?.imageUrl && booking.carId.imageUrl !== 'null' ? (
                    <img src={booking.carId.imageUrl} alt="Car" className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><TruckIcon className="w-12 h-12 text-slate-600" /></div>
                  )}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-xl font-bold text-white">{booking.carId?.brand} {booking.carId?.model}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <CalendarDaysIcon className="w-5 h-5 text-indigo-400" />
                      <span>{new Date(booking.startDate).toLocaleDateString()} &rarr; {new Date(booking.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <UserCircleIcon className="w-5 h-5 text-emerald-400" />
                      <span>Driver: <span className="font-bold text-white">{booking.withDriver ? 'Requested' : 'Not Required'}</span></span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Cost</span>
                    <span className="text-xl font-black text-indigo-400 flex items-center"><CurrencyDollarIcon className="w-5 h-5 mr-1"/> LKR {booking.totalPrice}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
            <TruckIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
            <p className="text-slate-400 mb-6">You haven't rented any vehicles yet. Start exploring our fleet!</p>
            <Link to="/fleet" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/30">
              Explore Vehicles
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyAccountPage;