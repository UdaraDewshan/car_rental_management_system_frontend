import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LockClosedIcon, EnvelopeIcon, TruckIcon, UserIcon, PhoneIcon, UserPlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/register', {
        userName: name,
        email: email,
        phoneNumber: phone,
        password: password
      });

      console.log("Registration Success:", response.data);
      setIsLoading(false);
      navigate('/login');
      
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Email might already be in use.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4 relative overflow-y-auto">
      
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' 
        }}
      ></div>

      <div className="fixed inset-0 bg-black/80 pointer-events-none z-10"></div>

      <div className="fixed top-0 left-0 w-full p-6 sm:p-8 z-30">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-colors duration-300 group"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1.5 transition-transform duration-300" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-xl relative z-20 my-16">
        <div className="bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
          
          <div className="text-center mb-8 pb-6 border-b border-white/10">
            <Link to="/" className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl text-white shadow-xl mb-4 transform hover:rotate-6 transition-transform">
              <TruckIcon className="w-8 h-8" />
            </Link>
            <h2 className="text-2xl font-bold text-white leading-tight">Create an Account</h2>
            <p className="text-sm text-slate-300 mt-1">Join CarDirect to rent premium vehicles.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm font-bold p-3 rounded-xl mb-6 text-center animate-in shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
              <div className="relative">
                <PhoneIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+94 77 123 4567" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <LockClosedIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Confirm Password</label>
                <div className="relative">
                  <LockClosedIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500" />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-70">
                {isLoading ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div> : <><UserPlusIcon className="w-6 h-6" /> Create My Account</>}
              </button>
            </div>

            <div className="text-center text-sm text-slate-400 mt-6 pt-4 border-t border-white/10">
              Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold underline">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;