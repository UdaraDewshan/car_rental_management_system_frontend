import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, TruckIcon, PlusCircleIcon, BellIcon, UserCircleIcon, SunIcon, MoonIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // අලුතින් දැම්මා
  const isActive = (path: string) => location.pathname === path;

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ===== 🔴 Logout Function එක =====
  const handleLogout = () => {
    if(window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token'); // Token එක මකනවා
      localStorage.removeItem('role');  // Role එක මකනවා
      navigate('/login'); // ආයෙත් ලොග් වෙන පිටුවට විසි කරනවා
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <TruckIcon className="w-6 h-6" />
            </div>
            <Link to="/admin/dashboard" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
              Car<span className="text-indigo-600 dark:text-indigo-400">Direct</span>.
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* 🔴 මෙතන path එක '/admin/dashboard' කියලා හැදුවා */}
            <Link 
              to="/admin/dashboard" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive('/admin/dashboard') ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-800' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-300'}`}
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </Link>

            <Link 
              to="/admin/manage-cars" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive('/admin/manage-cars') ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-800' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-300'}`}
            >
              <TruckIcon className="w-5 h-5" />
              Manage Fleet
            </Link>
          </div>

          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-full transition-all"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>

            <button className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full transition-all group">
              <UserCircleIcon className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Admin</span>
            </button>

            {/* 🔴 මෙන්න Logout Button එක */}
            <button 
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-bold transition-all ml-1 border border-red-100 dark:border-red-500/20"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>

            <Link 
              to="/admin/add-car" 
              className="hidden md:flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md transform hover:-translate-y-0.5 ml-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              New Vehicle
            </Link>

          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;