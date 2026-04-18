import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LockClosedIcon, EnvelopeIcon, ArrowRightOnRectangleIcon, TruckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); 

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password
      });

      const jwtToken = response.data.token;
      const userRole = response.data.role;
      
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('role', userRole);
      
      console.log("Login Success! Role:", userRole);
      setIsLoading(false);

      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard'); 
      } else {
        navigate('/fleet');
      }
      
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid Email or Password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-950 font-sans p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-0"></div>


      <div className="absolute top-0 left-0 w-full p-6 sm:p-8 z-30">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-colors duration-300 group"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform duration-300" />
          Back to Home
        </Link>
      </div>


      <div className="w-full max-w-md relative z-20">
        <div className="bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
          
          <div className="text-center mb-8 pb-6 border-b border-white/10">
            <Link to="/" className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl text-white shadow-xl mb-4 transform hover:rotate-6 transition-transform">
              <TruckIcon className="w-10 h-10" />
            </Link>
            <h2 className="text-2xl font-bold text-white leading-tight">Welcome Back</h2>
            <p className="text-sm text-slate-300 mt-1">Sign in to your CarDirect account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <LockClosedIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••••" className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-70 text-lg">
                {isLoading ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div> : <><ArrowRightOnRectangleIcon className="w-6 h-6" /> Sign In</>}
              </button>
            </div>

            <div className="text-center text-sm text-slate-400 mt-6 pt-4 border-t border-white/10">
              Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold underline">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;