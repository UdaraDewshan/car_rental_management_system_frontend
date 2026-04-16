import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon, ArrowRightOnRectangleIcon, TruckIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';

function LoginPage() {
  const location = useLocation();
  
  const [isLoginView, setIsLoginView] = useState(
    location.state?.isSignUp ? false : true
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/fleet');
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-slate-950 transition-colors duration-300 font-sans p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-0"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-lg relative z-20">
        <div className="bg-white/10 dark:bg-slate-950/20 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
          
          <div className="text-center mb-10 pb-6 border-b border-white/10">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl text-white shadow-xl mb-4 transform hover:rotate-6 transition-transform">
              <TruckIcon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              Car<span className="text-indigo-400">Direct</span>.
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white leading-tight">
              {isLoginView ? 'Secure Authentication' : 'Create an Account'}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {isLoginView 
                ? 'Please enter your registered credentials to enter.' 
                : 'Join us today and experience premium mobility.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLoginView && (
              <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:bg-white/15 transition-all sm:text-sm placeholder:text-slate-500" 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:bg-white/15 transition-all sm:text-sm placeholder:text-slate-500" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Password</label>
                {isLoginView && (
                  <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition hover:underline">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <LockClosedIcon className="absolute top-3.5 left-4 w-5 h-5 text-indigo-400" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  placeholder="••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border-0 text-white rounded-xl ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:bg-white/15 transition-all sm:text-sm placeholder:text-slate-500" 
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-5 items-center">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 text-lg"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLoginView ? <ArrowRightOnRectangleIcon className="w-6 h-6" /> : <UserPlusIcon className="w-6 h-6" />}
                    {isLoginView ? 'Sign In to Dashboard' : 'Create My Account'}
                  </>
                )}
              </button>
              
              <div className="text-sm font-medium text-slate-300 mt-2">
                {isLoginView ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline transition-colors"
                >
                  {isLoginView ? 'Sign Up' : 'Sign In'}
                </button>
              </div>

            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;