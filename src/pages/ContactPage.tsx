import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/80 z-0"></div>

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

      <div className="relative z-10 w-full max-w-4xl mt-20">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Get in <span className="text-indigo-400">Touch</span></h1>
          <p className="text-slate-400 mt-3 text-lg">We'd love to hear from you. Our team is always here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:bg-white/20 transition-all">
            <PhoneIcon className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">Call Us</h3>
            <p className="text-slate-400 text-sm mt-2">+94 77 123 4567</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:bg-white/20 transition-all">
            <EnvelopeIcon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">Email Us</h3>
            <p className="text-slate-400 text-sm mt-2">hello@cardirect.com</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:bg-white/20 transition-all">
            <MapPinIcon className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg">Visit Us</h3>
            <p className="text-slate-400 text-sm mt-2">Colombo 07, Sri Lanka</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;