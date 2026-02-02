
import React from 'react';
import GlassCard from '../components/GlassCard';

interface LoginProps {
  onLogin: () => void;
  isDarkMode?: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode = true }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-6 bg-cover bg-center transition-all duration-700 bg-neutral-900`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1000')" }}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-neutral-950/80 backdrop-blur-sm' : 'bg-white/60 backdrop-blur-md'}`}></div>
      
      <GlassCard isDarkMode={isDarkMode} className={`w-full max-w-sm z-10 p-8 flex flex-col items-center border shadow-3xl ${isDarkMode ? 'border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)]' : 'border-zinc-200'}`}>
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="relative mb-6">
            <div className={`absolute -inset-4 rounded-full blur-xl animate-pulse ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-500/10'}`}></div>
            <div className={`w-24 h-24 rounded-full border-2 p-1 ring-4 overflow-hidden relative z-10 flex items-center justify-center ${isDarkMode ? 'border-amber-500/50 bg-neutral-900 ring-amber-500/10' : 'border-amber-500/30 bg-zinc-50 ring-amber-500/5'}`}>
              <svg className={`w-14 h-14 ${isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-1 rounded-lg shadow-lg z-20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-amber-500 italic">ORION</h1>
          <p className="text-zinc-500 text-[10px] mt-1 uppercase font-black tracking-[0.3em]">Identity Recognized</p>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Access Token</label>
            <input 
              type="password" 
              placeholder="•••• •••• ••••"
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-zinc-700' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-300'}`}
            />
          </div>
          
          <button 
            onClick={onLogin}
            className="w-full bg-amber-500 text-black font-bold py-3.5 rounded-xl mt-4 active:bg-amber-400 transition-all shadow-lg shadow-amber-500/30 text-[10px] uppercase tracking-[0.2em]"
          >
            Authenticate Session
          </button>
        </div>

        <p className={`mt-8 text-[10px] text-zinc-500 text-center uppercase tracking-widest leading-relaxed font-bold opacity-60`}>
          Biometric Match Confirmed<br/>
          Secure Portal Entry Protocol Active
        </p>
      </GlassCard>
    </div>
  );
};

export default Login;