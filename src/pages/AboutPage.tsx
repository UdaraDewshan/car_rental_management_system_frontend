import { Link } from 'react-router-dom';
import { ShieldCheckIcon, UserGroupIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';

function AboutPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920')", // Premium Car Interior/Exterior
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/85 z-0"></div>

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
          <Link to="/login" className="text-white text-sm font-bold hover:text-indigo-400 transition px-4 py-2">
            Sign In
          </Link>
          <Link to="/signup" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm px-5 py-2.5 rounded-full font-bold transition-all shadow-lg">
            Sign Up
          </Link>
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