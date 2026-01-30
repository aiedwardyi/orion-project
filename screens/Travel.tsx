import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK_FLIGHTS, MOCK_HOTELS } from '../mockData';
import { Flight, Hotel } from '../types';
import { PoweredBy } from '../components/Branding';

interface TravelProps {
  isDarkMode: boolean;
  initialTab?: 'flights' | 'hotels';
  onTabChange?: (tab: 'flights' | 'hotels') => void;
}

const TravelConfirmationModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-emerald-500/40 shadow-[0_0_100px_rgba(16,185,129,0.2)] overflow-hidden relative z-10 p-0 text-center">
        <div className="h-24 bg-emerald-500 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black/20 transition-all active:scale-90 z-20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <h3 className={`text-2xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Travel Secured</h3>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.3em]">Flight Link Confirmed</p>
          </div>
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-zinc-50 border-zinc-200'} space-y-3`}>
             <div className="flex justify-between items-center text-left">
                <div>
                   <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Flight Ref</p>
                   <p className={`text-xs font-black italic ${isDarkMode ? 'text-white' : 'text-800'}`}>{flight.flightNo}</p>
                </div>
                <div className="text-right">
                   <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Status</p>
                   <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">FLIGHT READY</p>
                </div>
             </div>
             <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}></div>
             <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Arrangements for {flight.departure} to {flight.arrival} have been locked into the OIS core registry.</p>
          </div>
          <div className="space-y-2">
            <button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 text-[11px] uppercase tracking-[0.3em] transition-all active:scale-[0.98]">Back to Operations</button>
            <p className="text-[7px] text-zinc-600 font-black uppercase tracking-[0.4em]">ORION Secure Registry v4.2</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const LookupModal: React.FC<{ onClose: () => void; isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const recentSearches = ['AA123', 'Yanggakdo', 'BA234', 'Koryo'];
  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/30 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <div>
            <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Global Lookup</h3>
            <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em] mt-0.5">ORION DATABASE ACCESS</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="relative">
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter Flight No. or Hotel..." className={`w-full pl-10 pr-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-zinc-700 focus:border-amber-500/50' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-amber-500'}`}/>
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <div className="space-y-3">
             <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Recent Inquiries</p>
             <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button key={s} onClick={() => setQuery(s)} className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-white'}`}>{s}</button>
                ))}
             </div>
          </div>
          {query.length > 0 && (
            <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
               <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em]">Live Results</p>
               <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center group cursor-pointer hover:border-amber-500/40 transition-all`}>
                  <div>
                    <p className={`text-[11px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-900'}`}>{query} (Confirmed)</p>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Verified Registry Record</p>
                  </div>
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7" /></svg>
               </div>
            </div>
          )}
        </div>
        <div className={`p-4 border-t ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-zinc-100 bg-zinc-50'} text-center`}>
           <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.4em]">ORION CENTRALIZED SEARCH v4.2</p>
        </div>
      </GlassCard>
    </div>
  );
};

const DigitalTicketModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="w-full max-sm relative group animate-in zoom-in-95 duration-300">
        <div className={`overflow-hidden rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-[#0a0a0a] border border-white/10' : 'bg-white border border-zinc-200'}`}>
          <div className="bg-amber-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.996.996 0 0 1-1.14 0l-7.9-4.44A.996.996 0 0 1 3 16.5V7.5c0-.38.21-.71.53-.88l7.9-4.44a.996.996 0 0 1 1.14 0l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Electronic Boarding Pass</h3>
            </div>
            <button onClick={onClose} className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black/20 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center relative">
              <div className="text-left">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Departure</p>
                <h4 className={`text-3xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-900'}`}>{flight.departure.split(' ')[0]}</h4>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-400' : 'text-600'}`}>{flight.departure.split('(')[1]?.replace(')', '') || 'Gate TBA'}</p>
              </div>
              <div className="flex-1 px-4 flex flex-col items-center gap-1 opacity-40">
                <div className={`w-full h-[2px] ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'} border-dashed border-t`}></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">{flight.flightNo}</span>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Arrival</p>
                <h4 className={`text-3xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-900'}`}>{flight.arrival.split(' ')[0]}</h4>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-400' : 'text-600'}`}>{flight.arrival.split('(')[1]?.replace(')', '') || 'T1'}</p>
              </div>
            </div>
            <div className={`grid grid-cols-3 gap-6 py-6 border-y border-dashed ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
              <div className="space-y-1">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Gate</p>
                <p className={`text-sm font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-900'}`}>4B</p>
              </div>
              <div className="space-y-1 text-center border-x border-dashed border-zinc-800/20 px-2">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Seat</p>
                <p className={`text-sm font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-900'}`}>12A</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Boarding</p>
                <p className={`text-sm font-black tracking-widest text-amber-500`}>09:40</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 pt-2">
              <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-zinc-50 border border-zinc-200'} shadow-inner`}>
                <div className="bg-black p-2 rounded-xl">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TICKET-${flight.id}-${flight.flightNo}&bgcolor=000&color=f59e0b&margin=0`} alt="Boarding Pass QR" className="w-32 h-32 object-contain"/>
                </div>
              </div>
              <div className="text-center">
                 <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Security Validated</p>
                 <p className={`text-[8px] font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>ORION-AUTH-LINK-V2</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 relative -bottom-2">
            <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-[#050505]' : 'bg-zinc-50'} -ml-6`}></div>
            <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-[#050505]' : 'bg-zinc-50'} -mr-6`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeatingChartModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/40 shadow-3xl relative z-10 p-0 overflow-hidden text-center">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>Seating Assignment</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-4 gap-2 max-w-[200px] mx-auto opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`aspect-square border-2 rounded-lg flex items-center justify-center transition-all ${i === 5 ? 'bg-amber-500 border-amber-400 text-black font-black text-[8px]' : (isDarkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-100')}`}>
                {i === 5 ? '12A' : ''}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest italic">Confirmed Seat: 12A (Platinum)</p>
            <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Registry ID: ORION-FL-221</p>
          </div>
          <button onClick={onClose} className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.3em]">Lock Current Seat</button>
        </div>
      </GlassCard>
    </div>
  );
};

const MealOptionsModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/40 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>Catering Pref</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-3">
          {['Signature Platinum Platter', 'Vegan Registry Alternate', 'Halal Verified Menu', 'Keto-Performance Pack'].map((meal, idx) => (
            <button key={meal} className={`w-full p-4 rounded-2xl border flex justify-between items-center transition-all active:scale-[0.98] ${idx === 0 ? (isDarkMode ? 'bg-amber-500/10 border-amber-500/40' : 'bg-amber-50 border-amber-200') : (isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200')}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 0 ? 'text-amber-500' : (isDarkMode ? 'text-zinc-400' : 'text-zinc-600')}`}>{meal}</span>
              {idx === 0 && <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>}
            </button>
          ))}
          <p className="text-[7px] text-zinc-500 text-center uppercase tracking-widest mt-4">Pre-booked requirements verified via ORION Identity</p>
        </div>
      </GlassCard>
    </div>
  );
};

const ManageReservationModal: React.FC<{ hotel: Hotel; onClose: () => void; isDarkMode: boolean }> = ({ hotel, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/40 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>Operational Registry</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Target Asset</p>
            <p className={`text-lg font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-900'}`}>{hotel.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <button className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-white/[0.02] active:scale-95 transition-all">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Modify Dates</span>
             </button>
             <button className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/5 bg-white/[0.02] active:scale-95 transition-all">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" /></svg>
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Abort Stay</span>
             </button>
          </div>
          <button onClick={onClose} className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-lg shadow-amber-500/20">Sync Registry</button>
        </div>
      </GlassCard>
    </div>
  );
};

const RoomUpgradeModal: React.FC<{ hotel: Hotel; onClose: () => void; isDarkMode: boolean }> = ({ hotel, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/40 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>Tier Elevation</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          {['Skyline Executive Suite (Floor 42)', 'Presidential Annex • Secured', 'Observation Deck Penthouse'].map((tier, idx) => (
            <button key={tier} className={`w-full p-5 rounded-2xl border text-left transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:border-amber-500/30' : 'bg-zinc-50 border-zinc-200 hover:border-amber-500/30'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest italic">Available Upgrade</span>
                <span className="text-[10px] font-black text-white/40">+{idx + 1}5% Space</span>
              </div>
              <p className={`text-sm font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>{tier}</p>
            </button>
          ))}
          <p className="text-[7px] text-zinc-500 text-center uppercase tracking-widest mt-4">Upgrade availability subject to Platinum Tier clearance</p>
        </div>
      </GlassCard>
    </div>
  );
};

const SpaBookingModal: React.FC<{ onClose: () => void; isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500/40 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-900'}`}>Wellness Window</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-6 text-center">
          <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Select Operational Time Slot</p>
          <div className="grid grid-cols-2 gap-3">
            {['08:00 AM', '11:30 AM', '15:00 PM', '20:00 PM'].map(time => (
              <button key={time} className={`py-4 rounded-xl border font-black text-[11px] tracking-widest transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-amber-500 hover:text-black' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`}>{time}</button>
            ))}
          </div>
          <p className="text-[7px] text-zinc-500 uppercase tracking-widest">Private session protocols active for VIP Delegates</p>
        </div>
      </GlassCard>
    </div>
  );
};

const Travel: React.FC<TravelProps> = ({ isDarkMode, initialTab = 'flights', onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels'>(initialTab);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Flight | null>(null);
  const [seatingFlight, setSeatingFlight] = useState<Flight | null>(null);
  const [mealFlight, setMealFlight] = useState<Flight | null>(null);
  const [confirmedFlight, setConfirmedFlight] = useState<Flight | null>(null);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [reservationHotel, setReservationHotel] = useState<Hotel | null>(null);
  const [upgradeHotel, setUpgradeHotel] = useState<Hotel | null>(null);
  const [isSpaBookingOpen, setIsSpaBookingOpen] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabClick = (tab: 'flights' | 'hotels') => {
    setActiveTab(tab);
    setExpandedItem(null);
    if (onTabChange) onTabChange(tab);
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const hotelImages = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/16/67/68/yanggakdo-hotel.jpg?w=1000&h=-1&s=1",
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwo1o8INHKECjrvBj4KweAJjiQcuTlOkwj7ZA9L8XBL0W1oiZSNf1Q4DBqqbZd5QGWnyYviE-pzD8ugrRGwQ-TmK815p_nCa2ZYBCVN0JH6Na6AdjhcCcA8Hc91K1tDtBr5ywC0Jw=s680-w680-h510-rw"
  ];

  return (
    <div className="pb-24 pt-10 px-6 space-y-6 animate-in fade-in duration-500 overflow-y-auto max-h-screen hide-scrollbar">
      <div className="flex justify-between items-end px-1">
        <div>
          <h2 className={`text-3xl font-black tracking-tight italic uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{activeTab}</h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Official Arrangements</p>
        </div>
        <button onClick={() => setIsLookupOpen(true)} className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200 shadow-sm'} px-3 py-1.5 rounded-xl flex items-center gap-2 border cursor-pointer active:scale-95 transition-all`}>
           <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Lookup</span>
        </button>
      </div>

      <div className={`flex p-1 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-100 border-zinc-200'} rounded-2xl border`}>
        <button onClick={() => handleTabClick('flights')} className={`flex-1 py-3 text-[10px] font-black tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'flights' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500'}`}>FLIGHTS</button>
        <button onClick={() => handleTabClick('hotels')} className={`flex-1 py-3 text-[10px] font-black tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'hotels' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500'}`}>HOTELS</button>
      </div>

      <div className="space-y-6 pb-8">
        {activeTab === 'flights' ? (
          MOCK_FLIGHTS.map((flight: Flight) => (
            <GlassCard isDarkMode={isDarkMode} key={flight.id} noPadding className={`border-white/10 transition-all duration-500 ${expandedItem === flight.id ? 'shadow-[0_0_30px_rgba(245,158,11,0.1)] ring-1 ring-amber-500/20' : ''}`}>
               <div onClick={() => toggleExpand(flight.id)} className={`p-4 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'} flex justify-between items-center cursor-pointer`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase">{flight.flightNo}</span>
                    <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{flight.status === 'Completed' ? 'Arrival Verified' : 'Official Express'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge isDarkMode={isDarkMode} status={flight.status} />
                    <svg className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${expandedItem === flight.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                  </div>
               </div>
               <div className="p-5 flex flex-col gap-6">
                 <div onClick={() => toggleExpand(flight.id)} className="flex justify-between items-center px-2 cursor-pointer">
                    <div className="text-center w-24">
                      <p className={`text-3xl font-black italic tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-800'}`}>{flight.departure.split(' ')[0]}</p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1">{flight.depTime}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1 truncate">{flight.departure.split('(')[1]?.replace(')', '') || 'Gate TBA'}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 opacity-40">
                      <div className={`w-full h-px ${isDarkMode ? 'bg-white/20' : 'bg-zinc-300'} relative`}><div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-800'}`}><svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.996.996 0 0 1-1.14 0l-7.9-4.44A.996.996 0 0 1 3 16.5V7.5c0-.38.21-.71.53-.88l7.9-4.44a.996.996 0 0 1 1.14 0l7.9 4.44c.32.17.53.5.53.88v9z"/></svg></div></div>
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500">Non-Stop Flight</span>
                    </div>
                    <div className="text-center w-24">
                      <p className={`text-3xl font-black italic tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-800'}`}>{flight.arrival.split(' ')[0]}</p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1">{flight.arrTime}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1 truncate">{flight.arrival.split('(')[1]?.replace(')', '') || 'Pyongyang T1'}</p>
                    </div>
                 </div>
                 {expandedItem === flight.id && (
                    <div className="animate-in slide-in-from-top-2 duration-300 space-y-5 pt-2 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/[0.03]' : 'bg-zinc-50'} border border-white/5`}>
                           <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Baggage Allowance</p>
                           <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{flight.baggage}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/[0.03]' : 'bg-zinc-50'} border border-white/5`}>
                           <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Terminal Access</p>
                           <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{flight.terminalInfo}</p>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-amber-500/5' : 'bg-amber-50'} border border-amber-500/10`}>
                        <p className="text-[8px] text-amber-500 font-black uppercase tracking-widest mb-1">Check-in Protocol</p>
                        <p className={`text-[10px] font-bold leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{flight.checkInProcedure}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button onClick={() => setSeatingFlight(flight)} className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>Select Seat</button>
                        <button onClick={() => setMealFlight(flight)} className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>Meal Options</button>
                      </div>
                    </div>
                 )}
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setSelectedTicket(flight)} className={`border py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>Digital Ticket</button>
                    <button onClick={() => setConfirmedFlight(flight)} className="bg-amber-500 hover:bg-amber-400 text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-300">Confirm Travel</button>
                 </div>
               </div>
            </GlassCard>
          ))
        ) : (
          MOCK_HOTELS.map((hotel: Hotel, idx: number) => (
            <GlassCard isDarkMode={isDarkMode} key={hotel.id} noPadding className={`border-white/10 group overflow-hidden transition-all duration-500 ${expandedItem === hotel.id ? 'ring-1 ring-amber-500/20' : ''}`}>
              <div onClick={() => toggleExpand(hotel.id)} className="h-64 relative cursor-pointer">
                <img src={hotelImages[idx % hotelImages.length]} alt={hotel.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#050505] via-[#050505]/40' : 'from-zinc-900/80 via-transparent'} to-transparent`}></div>
                <div className="absolute top-4 right-4"><StatusBadge isDarkMode={isDarkMode} status={hotel.status} /></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <div className="space-y-1">
                      <div className="flex gap-1 mb-1">{[1,2,3,4,5].map(star => <svg key={star} className={`w-2.5 h-2.5 ${star <= 5 ? 'text-amber-500' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}</div>
                      <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-0.5">{idx === 0 ? 'YANGGAKDO ISLAND' : 'KORYO TWIN TOWERS'}</p>
                      <h3 className="text-2xl font-black leading-tight text-white uppercase italic tracking-tighter">{hotel.name}</h3>
                   </div>
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-300 ${expandedItem === hotel.id ? 'rotate-180 bg-amber-500 text-black' : 'bg-white/10 text-white/60'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                   </div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div onClick={() => toggleExpand(hotel.id)} className="flex flex-wrap gap-1.5 cursor-pointer">{hotel.amenities?.map(tag => <span key={tag} className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'} border rounded-md`}>{tag}</span>)}</div>
                <div className={`grid grid-cols-2 gap-4 py-3 border-y ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
                  <div><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Check In</p><p className={`text-xs font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-800'}`}>July 12 • 14:00</p></div>
                  <div className="text-right"><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Check Out</p><p className={`text-xs font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-900'}`}>July 20 • 11:00</p></div>
                </div>
                {expandedItem === hotel.id && (
                  <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.03]' : 'bg-zinc-50'} border border-white/5 space-y-3`}>
                      <div><p className="text-[8px] text-amber-500 font-black uppercase tracking-widest mb-1">Arrival Protocol</p><p className={`text-[10px] font-bold leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{hotel.checkInProcedure}</p></div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <div><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Assigned Butler</p><p className={`text-[10px] font-black text-amber-500 tracking-wider`}>{hotel.assignedButler}</p></div>
                        <button className="text-[8px] font-black text-white bg-amber-500 px-3 py-1 rounded-lg uppercase tracking-widest active:scale-95 transition-all">Secure Contact</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button onClick={() => setUpgradeHotel(hotel)} className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>Room Upgrade</button>
                      <button onClick={() => setIsSpaBookingOpen(true)} className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>Spa Booking</button>
                    </div>
                  </div>
                )}
                <div className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'} p-3 rounded-xl border`}>
                   <div className="flex justify-between items-center">
                      <div><p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Assigned Accomodation</p><p className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-800'}`}>{hotel.roomType}</p></div>
                      <div className={`w-8 h-8 rounded-lg ${isDarkMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-amber-50 border-amber-200 text-amber-600'} flex items-center justify-center border`}><svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M8 11V7a4 4 0 118 0v4M5 11h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" /></svg></div>
                   </div>
                </div>
                <button onClick={() => setReservationHotel(hotel)} className="w-full bg-amber-500 text-black font-black text-[10px] py-3.5 rounded-2xl active:scale-95 transition-all shadow-lg shadow-amber-500/20 uppercase tracking-[0.15em]">Manage Reservation</button>
              </div>
            </GlassCard>
          ))
        )}
        <PoweredBy isDarkMode={isDarkMode} />
      </div>

      {isLookupOpen && <LookupModal isDarkMode={isDarkMode} onClose={() => setIsLookupOpen(false)} />}
      {selectedTicket && <DigitalTicketModal flight={selectedTicket} isDarkMode={isDarkMode} onClose={() => setSelectedTicket(null)} />}
      {seatingFlight && <SeatingChartModal flight={seatingFlight} isDarkMode={isDarkMode} onClose={() => setSeatingFlight(null)} />}
      {mealFlight && <MealOptionsModal flight={mealFlight} isDarkMode={isDarkMode} onClose={() => setMealFlight(null)} />}
      {confirmedFlight && <TravelConfirmationModal flight={confirmedFlight} isDarkMode={isDarkMode} onClose={() => setConfirmedFlight(null)} />}
      {reservationHotel && <ManageReservationModal hotel={reservationHotel} isDarkMode={isDarkMode} onClose={() => setReservationHotel(null)} />}
      {upgradeHotel && <RoomUpgradeModal hotel={upgradeHotel} isDarkMode={isDarkMode} onClose={() => setUpgradeHotel(null)} />}
      {isSpaBookingOpen && <SpaBookingModal isDarkMode={isDarkMode} onClose={() => setIsSpaBookingOpen(false)} />}
    </div>
  );
};

export default Travel;