import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TruckIcon, SunIcon, MoonIcon, ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  const linkStyle = (path: string) => `
    relative px-3 py-2 text-sm font-bold transition-colors duration-300
    ${isActive(path) 
      ? 'text-indigo-600 dark:text-indigo-400' 
      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* 1. Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="bg-gradient-to-tr from-indigo-600 to-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <TruckIcon className="w-6 h-6" />
            </div>
            <Link to="/admin/dashboard" className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              Udara<span className="text-indigo-500">Direct</span>
            </Link>
          </div>


          <div className="hidden md:flex items-center gap-6">
            <Link to="/admin/dashboard" className={linkStyle('/admin/dashboard')}>
              Dashboard
            </Link>
            <Link to="/admin/manage-cars" className={linkStyle('/admin/manage-cars')}>
              Fleet
            </Link>
            <Link to="/admin/manage-bookings" className={linkStyle('/admin/manage-bookings')}>
              Bookings
            </Link>
            <Link to="/admin/add-driver" className={linkStyle('/admin/add-driver')}>
              Drivers
            </Link>
          </div>

          <div className="flex items-center gap-3">
            
            <Link
              to="/admin/add-car"
              className="hidden md:flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-all"
              title="Add New Vehicle"
            >
              <PlusIcon className="w-5 h-5" />
            </Link>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block"></div> 
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 rounded-full transition-all"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold transition-all border border-transparent hover:border-red-200 dark:hover:border-red-500/30"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;