import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, TruckIcon, PlusCircleIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <TruckIcon className="w-6 h-6" />
            </div>
            <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              Car<span className="text-indigo-600">Direct</span>.
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive('/') ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </Link>

            <Link 
              to="/admin/manage-cars" 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive('/admin/manage-cars') ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <TruckIcon className="w-5 h-5" />
              Manage Fleet
            </Link>

          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <button className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 rounded-full transition-all group">
              <UserCircleIcon className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">Admin</span>
            </button>

            <Link 
              to="/admin/add-car" 
              className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-indigo-200 transform hover:-translate-y-0.5 ml-2"
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