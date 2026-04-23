import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ShieldCheckIcon, UserGroupIcon, RocketLaunchIcon, SparklesIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function AboutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Ready to leave?',
      text: "You will be logged out of your account.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#4f46e5',
      confirmButtonText: 'Yes, log out',
      background: '#1e293b',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/85 z-0"></div>

      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-black text-white tracking-tighter uppercase">
          Udara<span className="text-indigo-500">Direct</span>.Car
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-bold">
          <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Home</Link>
          <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>About Us</Link>
          <Link to="/fleet" className={`transition-colors ${isActive('/fleet') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Our Fleet</Link>
          <Link to="/contact" className={`transition-colors ${isActive('/contact') ? 'text-white' : 'text-slate-400 hover:text-white'}`}>Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              {role === 'ADMIN' && (
                <Link to="/admin/dashboard" className="hidden sm:block text-indigo-400 text-sm font-bold hover:text-indigo-300 transition px-2">
                  Admin Dashboard
                </Link>
              )}
              <Link to="/my-account" className="flex items-center gap-2 text-white text-sm font-bold px-3 py-2 hover:text-indigo-400 transition-colors">
                <UserCircleIcon className="w-6 h-6 text-indigo-400" />
                <span className="hidden sm:inline">My Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm px-5 py-2.5 rounded-full font-bold transition-all"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-sm font-bold hover:text-indigo-400 transition px-4 py-2">
                Sign In
              </Link>
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-indigo-500/30 border-none outline-none">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-6xl mt-24 mb-12">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[40px] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                <SparklesIcon className="w-4 h-4" /> Our Story
              </div>
              <h1 className="text-5xl font-black text-white leading-tight mb-8">
                Revolutionizing How You <span className="text-indigo-500">Move.</span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Started by <span className="text-white font-bold">Team INNOSOLIX</span>, CarDirect was born from a simple idea: making luxury vehicle rentals accessible, transparent, and digital-first.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We don't just rent cars; we provide the keys to your next adventure. Our fleet is curated for those who value performance, comfort, and style.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-10 duration-1000">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                <ShieldCheckIcon className="w-10 h-10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-xl mb-2">Safe & Secure</h3>
                <p className="text-slate-400 text-sm">Every vehicle undergoes a 50-point safety check before every rental.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                <UserGroupIcon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-xl mb-2">Expert Team</h3>
                <p className="text-slate-400 text-sm">Our 24/7 support team is always ready to assist you on the road.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group sm:col-span-2">
                <div className="flex items-start gap-6">
                  <RocketLaunchIcon className="w-10 h-10 text-amber-400 mb-4 group-hover:rotate-12 transition-transform shrink-0" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Future-Ready Fleet</h3>
                    <p className="text-slate-400 text-sm">From electric sedans to high-end SUVs, we are leading the transition to sustainable mobility.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;