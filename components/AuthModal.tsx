
import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLogin }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: formData.name || formData.email.split('@')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-300 hover:text-stone-900"><X /></button>
        
        <div className="p-10 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-spiritual font-black text-amber-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Teerthlok'}
            </h2>
            <p className="text-stone-400 text-sm">Experience the divine digital revolution.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-stone-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-amber-500/20"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-stone-300" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-amber-500/20"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-stone-300" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-amber-500/20"
                required
              />
            </div>
            
            <button className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-amber-600/20 hover:bg-amber-700 transition active:scale-95 mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-8">
            <button onClick={() => setIsLogin(!isLogin)} className="text-xs font-bold text-amber-600 uppercase tracking-widest hover:underline">
              {isLogin ? "Need an account? Join Us" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
        
        <div className="bg-amber-50 p-6 text-center">
           <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest flex items-center justify-center gap-2">
             <Sparkles size={12} /> Secure Divine Access
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
