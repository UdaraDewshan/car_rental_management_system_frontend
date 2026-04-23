import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserPlusIcon, IdentificationIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';

function AddDriverPage() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const driverData = {
      name,
      contactNumber,
      licenseNo
    };

    try {
      await axios.post('http://localhost:8080/driver/add', driverData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      Swal.fire({
        title: 'Driver Added!',
        text: `${name} has been successfully registered to the system.`,
        icon: 'success',
        confirmButtonColor: '#4f46e5',
        background: '#1e293b',
        color: '#ffffff'
      });

      setName('');
      setContactNumber('');
      setLicenseNo('');
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add the driver. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        background: '#1e293b',
        color: '#ffffff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
            <UserPlusIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Register New Driver</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Add a new driver to the CarDirect fleet.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Driver's Full Name</label>
              <div className="relative">
                <UserIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                <input 
                  type="text" required placeholder="e.g. Nimal Perera"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Contact Number</label>
                <div className="relative">
                  <PhoneIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" required placeholder="07XXXXXXXX"
                    value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">License Number</label>
                <div className="relative">
                  <IdentificationIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" required placeholder="e.g. B1234567"
                    value={licenseNo} onChange={(e) => setLicenseNo(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UserPlusIcon className="w-5 h-5" />
                    Save Driver Details
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default AddDriverPage;