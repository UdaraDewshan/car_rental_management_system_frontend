import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon, XCircleIcon, ClockIcon, UserIcon, CalendarIcon, CurrencyDollarIcon, ArrowPathIcon, TruckIcon } from '@heroicons/react/24/outline';
import type { Booking } from '../../model/Booking';
import Swal from 'sweetalert2';

function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchBookings = () => {
    setLoading(true);
    axios.get<Booking[]>('http://localhost:8080/booking/getAll', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleStatusChange = (bookingId: string, newStatus: string) => {

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this booking as ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: `Yes, ${newStatus} it!`,
      background: '#1e293b',
      color: '#ffffff'
    }).then((result) => {

      if (result.isConfirmed) {

        axios.put(`http://localhost:8080/booking/updateStatus/${bookingId}?status=${newStatus}`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then((response) => {
            console.log(response.data);

            Swal.fire({
              title: 'Success!',
              text: `Booking has been ${newStatus} successfully.`,
              icon: 'success',
              confirmButtonColor: '#10b981',
              background: '#1e293b',
              color: '#ffffff'
            });

            fetchBookings();
          })
          .catch((error) => {
            console.error("Error updating status:", error);

            Swal.fire({
              title: 'Oops!',
              text: 'Failed to update the booking status. Please try again.',
              icon: 'error',
              confirmButtonColor: '#4f46e5',
              background: '#1e293b',
              color: '#ffffff'
            });
          });

      }
    });
  };

  const getDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  const getStatusBadge = (status: string = 'PENDING') => {
    switch (status) {
      case 'APPROVED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"><CheckCircleIcon className="w-4 h-4" /> Approved</span>;
      case 'REJECTED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"><XCircleIcon className="w-4 h-4" /> Rejected</span>;
      case 'COMPLETED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"><CheckCircleIcon className="w-4 h-4" /> Completed</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"><ClockIcon className="w-4 h-4" /> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-6 font-sans relative">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Booking Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Review and process customer vehicle rental requests.</p>
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Refresh List
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    <th className="p-5">Booking ID</th>
                    <th className="p-5">Customer Details</th>
                    <th className="p-5">Vehicle</th>
                    <th className="p-5">Duration & Price</th>
                    <th className="p-5">Driver Required</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.bookingId} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">

                        <td className="p-5">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{booking.bookingId}</span>
                        </td>

                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">{booking.userId?.userName || 'N/A'}</span>
                            <span className="text-xs text-slate-500">{booking.userId?.email || 'N/A'}</span>
                            <span className="text-xs text-slate-500 mt-0.5">{booking.userId?.phoneNumber || 'N/A'}</span>
                          </div>
                        </td>

                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                              {booking.carId?.imageUrl && booking.carId.imageUrl !== 'null' ? (
                                <img src={booking.carId.imageUrl} alt="car" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-300 dark:bg-slate-600"><TruckIcon className="w-4 h-4 text-slate-400" /></div>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 dark:text-white text-sm">{booking.carId?.brand} {booking.carId?.model}</span>
                              <span className="text-xs font-mono text-slate-500">{booking.carId?.carId}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                              <CalendarIcon className="w-4 h-4 text-slate-400" />
                              {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
                              <span className="text-xs text-slate-500 ml-1">({getDuration(booking.startDate, booking.endDate)} Days)</span>
                            </span>
                            <span className="font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                              <CurrencyDollarIcon className="w-4 h-4" /> LKR {booking.totalPrice}
                            </span>
                          </div>
                        </td>

                        <td className="p-5">
                          {booking.withDriver ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                              <UserIcon className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-slate-400">No</span>
                          )}
                        </td>

                        <td className="p-5">
                          {getStatusBadge(booking.status || 'PENDING')}
                        </td>

                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStatusChange(booking.bookingId, 'APPROVED')}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
                              title="Approve Booking"
                            >
                              <CheckCircleIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.bookingId, 'REJECTED')}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800"
                              title="Reject Booking"
                            >
                              <XCircleIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-10 text-center text-slate-500 dark:text-slate-400">
                        No bookings found in the system yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ManageBookingsPage;