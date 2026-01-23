
import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK_SCHEDULE } from '../mockData';

interface HomeProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateToTravel: (tab: 'flights' | 'hotels') => void;
}

const NotificationPopup: React.FC<{ isOpen: boolean; onClose: () => void; isDarkMode: boolean }> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const notifications = [
    { id: 1, title: 'Tactical Grid Update', desc: 'Vehicle ORION-X01 is now available for dispatch.', time: '2m ago', type: 'info' },
    { id: 2, title: 'Security Protocol', desc: 'New biometric sweep required for Sector 04 entry.', time: '15m ago', type: 'warning' },
    { id: 3, title: 'Schedule Alert', desc: 'Championship Dinner moved to 20:45 (Skyline Pavilion).', time: '1h ago', type: 'update' }
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center p-6 pt-20 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-w-sm border-amber-500/30 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] p-0 overflow-hidden relative z-10">
        <div className={`p-5 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Notifications</h3>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 space-y-3">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 rounded-2xl border transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:border-white/10' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'}`}>
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>{n.title}</h4>
                <span className="text-[8px] font-bold text-zinc-500 uppercase">{n.time}</span>
              </div>
              <p className={`text-[11px] leading-relaxed font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>{n.desc}</p>
            </div>
          ))}
          <button className={`w-full py-4 text-[9px] font-black uppercase tracking-[0.2em] border-t mt-2 ${isDarkMode ? 'border-white/5 text-zinc-500 hover:text-white' : 'border-zinc-100 text-zinc-400 hover:text-zinc-900'}`}>
            Clear Notifications
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ isDarkMode, onToggleTheme, onNavigateToTravel }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={`pb-40 pt-10 px-6 space-y-8 animate-in fade-in duration-1000 transition-colors`}>
      {/* Brand & Profile Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl border p-1 ring-4 shadow-2xl overflow-hidden flex items-center justify-center ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30 ring-black' : 'bg-amber-100 border-amber-200 ring-white'}`}>
             <span className={`text-sm font-black italic tracking-tighter leading-none pr-[0.5px] ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>EY</span>
          </div>
          <div className="space-y-0.5">
            <h2 className={`text-xl font-black leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>EDWARD YI</h2>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">VIP DELEGATE</span>
              <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">USA 2026</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowNotifications(true)}
          className={`w-11 h-11 rounded-2xl ${isDarkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-zinc-200 shadow-sm'} border flex items-center justify-center relative active:scale-95 transition-all`}
        >
          <svg className={`w-5 h-5 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.075-1.64-5.645-4.5-6.32V3c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v.68C8.64 4.355 7 6.925 7 10v4.586l-1.707 1.707A.996.996 0 0 0 5 17h14a.999.999 0 0 0 .707-1.707L18 14.586z"/></svg>
          <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
        </button>
      </div>

      {/* Primary Operation Tracker */}
      <div>
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Live Feed</h3>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Active Events</span>
          </div>
        </div>
        <GlassCard 
          isDarkMode={isDarkMode}
          noPadding
          bgImage="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop"
          className="h-[200px] group border-amber-500/20 shadow-2xl relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#050505] via-[#050505]/40' : 'from-zinc-900/80 via-transparent'} to-transparent`}></div>
          <div className="absolute top-4 left-4">
             <div className="px-2.5 py-1 bg-amber-500 text-black rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl">Live</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex justify-between items-end gap-10">
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] font-black text-white/80 tracking-[0.2em] uppercase">18:00 – 21:30 Session</span>
                <h4 className="text-2xl font-black leading-tight tracking-tighter uppercase italic text-white truncate">Pyongyang Cup</h4>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.15em] leading-relaxed pr-2">Grand Arena VIP • Gate 2A Access</p>
              </div>
              <div className="bg-amber-500 w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-amber-500/30 active:scale-90 transition-all cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard 
          isDarkMode={isDarkMode} 
          onClick={() => onNavigateToTravel('flights')}
          className="flex flex-col gap-4 p-4 border-white/5 shadow-xl cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className={`w-9 h-9 rounded-xl ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-500'} flex items-center justify-center`}>
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 16V14L13 9V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" />
               </svg>
            </div>
            <StatusBadge isDarkMode={isDarkMode} status="Confirmed" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Arrival Transit</p>
            <p className={`text-xs font-bold uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>LH190 • Gate 4B</p>
          </div>
        </GlassCard>

        <GlassCard 
          isDarkMode={isDarkMode} 
          onClick={() => onNavigateToTravel('hotels')}
          className="flex flex-col gap-4 p-4 border-white/5 shadow-xl cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className={`w-9 h-9 rounded-xl ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'} flex items-center justify-center`}>
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <StatusBadge isDarkMode={isDarkMode} status="Confirmed" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Accommodation</p>
            <p className={`text-xs font-bold uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Pyongyang • R1043</p>
          </div>
        </GlassCard>
      </div>

      {/* Full Timeline Overview */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Immediate Agenda</h3>
          <span className={`text-[9px] font-black uppercase tracking-widest italic underline decoration-amber-500/30 underline-offset-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>My Full Day</span>
        </div>
        <div className="space-y-3">
          {MOCK_SCHEDULE.slice(1, 4).map(item => (
            <GlassCard isDarkMode={isDarkMode} key={item.id} className="flex items-center gap-4 py-4 px-5 border-white/[0.04] active:bg-white/[0.02] shadow-sm">
              <div className={`w-12 h-12 rounded-2xl ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-100 border-zinc-200'} border flex flex-col items-center justify-center gap-0.5`}>
                 <span className="text-xs font-black text-amber-500 italic leading-none">{item.time.split(':')[0]}</span>
                 <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">HR</span>
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className={`text-sm font-black truncate uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{item.title}</h4>
                 <div className="flex items-center gap-2 mt-1">
                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest truncate">{item.location}</p>
                   {item.status === 'Pending' && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>}
                 </div>
              </div>
              <div className={`${isDarkMode ? 'text-zinc-700' : 'text-zinc-300'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Interface Config / Theme Settings at the Bottom */}
      <div className="space-y-4 pt-6">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] px-1">INTERFACE CONFIG</h3>
        <GlassCard isDarkMode={isDarkMode} className={`p-5 flex items-center justify-between group ${isDarkMode ? 'border-white/5' : 'border-zinc-200 shadow-sm'}`}>
          <div className="flex items-center gap-5">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-3 transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  {isDarkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  )}
                </svg>
             </div>
             <div>
               <p className={`text-xs font-black uppercase tracking-widest mb-0.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{isDarkMode ? 'Dark Protocol Active' : 'Luminance Mode Active'}</p>
               <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Toggle visual profile override</p>
             </div>
          </div>
          <button 
            onClick={onToggleTheme}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 flex items-center ${isDarkMode ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-zinc-200'}`}
          >
            <div className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-500 ${isDarkMode ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
        </GlassCard>
      </div>

      {/* Popups */}
      <NotificationPopup 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
};

export default Home;
