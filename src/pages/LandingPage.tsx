import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920"
      >
        <source src="/car-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-10"></div>

      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center">
         <div className="text-2xl font-black text-white tracking-tighter uppercase">
          Udara<span className="text-indigo-500">Direct</span>.Car
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-bold text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/fleet" className="hover:text-white transition-colors">Our Fleet</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link 
            to="/login" 
            state={{ isSignUp: false }}
            className="text-white text-sm font-bold hover:text-indigo-400 transition px-4 py-2"
          >
            Sign In
          </Link>
          <Link 
            to="/login" 
            state={{ isSignUp: true }}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm px-5 py-2.5 rounded-full font-bold transition-all shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-sm font-bold uppercase tracking-widest mb-8 animate-in slide-in-from-bottom-5 fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Premium Fleet, Infinite Journeys
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
          Experience the Drive of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Dreams.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
          Whether you need a luxury ride for a business meeting or an SUV for a weekend getaway, we have the perfect vehicle waiting for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500">
          <Link 
            to="/fleet" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/30 w-full sm:w-auto justify-center"
          >
            Explore Vehicles <ArrowRightIcon className="w-5 h-5" />
          </Link>
          
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto justify-center">
            <PlayCircleIcon className="w-6 h-6" /> How it works
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
    </div>
  );
}

export default LandingPage;