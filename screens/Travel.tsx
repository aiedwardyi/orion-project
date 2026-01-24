import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK_FLIGHTS, MOCK_HOTELS } from '../mockData';
import { Flight, Hotel } from '../types';

interface TravelProps {
  isDarkMode: boolean;
  initialTab?: 'flights' | 'hotels';
}

const TravelConfirmationModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <GlassCard isDarkMode={isDarkMode} className="w-full max-w-sm border-emerald-500/40 shadow-[0_0_100px_rgba(16,185,129,0.2)] overflow-hidden relative z-10 p-0 text-center">
        {/* Decorative Success Header */}
        <div className="h-24 bg-emerald-500 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black/20 transition-all active:scale-90 z-20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
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
                   <p className={`text-xs font-black italic ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{flight.flightNo}</p>
                </div>
                <div className="text-right">
                   <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Status</p>
                   <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">FLIGHT READY</p>
                </div>
             </div>
             <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'}`}></div>
             <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
               Arrangements for {flight.departure} to {flight.arrival} have been locked into the OIS core registry.
             </p>
          </div>

          <div className="space-y-2">
            <button 
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 text-[11px] uppercase tracking-[0.3em] transition-all active:scale-[0.98]"
            >
              Back to Operations
            </button>
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
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Flight No. or Hotel..."
              className={`w-full pl-10 pr-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-zinc-700 focus:border-amber-500/50' : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-amber-500'}`}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          <div className="space-y-3">
             <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Recent Inquiries</p>
             <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setQuery(s)}
                    className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-white'}`}
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>

          {query.length > 0 && (
            <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
               <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em]">Live Results</p>
               <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center group cursor-pointer hover:border-amber-500/40 transition-all`}>
                  <div>
                    <p className={`text-[11px] font-black uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{query} (Confirmed)</p>
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
                <h4 className={`text-3xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{flight.departure.split(' ')[0]}</h4>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{flight.departure.split('(')[1]?.replace(')', '') || 'Gate TBA'}</p>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center gap-1 opacity-40">
                <div className={`w-full h-[2px] ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'} border-dashed border-t`}></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">{flight.flightNo}</span>
              </div>

              <div className="text-right">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Arrival</p>
                <h4 className={`text-3xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{flight.arrival.split(' ')[0]}</h4>
                <p className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{flight.arrival.split('(')[1]?.replace(')', '') || 'T1'}</p>
              </div>
            </div>

            <div className={`grid grid-cols-3 gap-6 py-6 border-y border-dashed ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
              <div className="space-y-1">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Gate</p>
                <p className={`text-sm font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>4B</p>
              </div>
              <div className="space-y-1 text-center border-x border-dashed border-zinc-800/20 px-2">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Seat</p>
                <p className={`text-sm font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>12A</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Boarding</p>
                <p className={`text-sm font-black tracking-widest text-amber-500`}>09:40</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 pt-2">
              <div className={`p-4 rounded-3xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-zinc-50 border border-zinc-200'} shadow-inner`}>
                <div className="bg-black p-2 rounded-xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TICKET-${flight.id}-${flight.flightNo}&bgcolor=000&color=f59e0b&margin=0`} 
                    alt="Boarding Pass QR" 
                    className="w-32 h-32 object-contain"
                  />
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
  const [selectedSeat, setSelectedSeat] = useState('12A');
  const rows = [10, 11, 12, 13, 14, 15, 16];
  const cols = ['A', 'B', 'C', 'D']; 

  const occupiedSeats = ['10B', '11C', '12C', '13A', '14D', '15B', '15C'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      
      <div className="w-full max-sm relative animate-in slide-in-from-bottom-8 duration-500">
        <GlassCard isDarkMode={isDarkMode} className={`border-amber-500/20 shadow-3xl flex flex-col p-0 overflow-hidden`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'} flex justify-between items-center`}>
            <div>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Seating Map</h3>
              <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mt-0.5">{flight.flightNo} • FIRST CLASS</p>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'} transition-all`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className={`flex justify-center gap-6 py-4 border-b ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-md ${isDarkMode ? 'bg-white/10' : 'bg-zinc-200'}`}></div>
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-amber-500"></div>
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Selected</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <div className={`w-3 h-3 rounded-md ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-400'}`}></div>
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Occupied</span>
            </div>
          </div>

          <div className="p-8 flex flex-col items-center max-h-[50vh] overflow-y-auto hide-scrollbar">
             <div className="w-full space-y-4">
                {rows.map(row => (
                  <div key={row} className="flex items-center justify-between gap-4">
                    <div className="flex gap-2.5">
                      {cols.slice(0, 2).map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = occupiedSeats.includes(seatId);
                        const isSelected = selectedSeat === seatId;
                        return (
                          <button 
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seatId)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-300 active:scale-90
                              ${isSelected ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : 
                                (isOccupied ? (isDarkMode ? 'bg-zinc-800/40 text-zinc-700' : 'bg-zinc-200 text-zinc-400') : 
                                (isDarkMode ? 'bg-white/5 text-zinc-400 border border-white/5 hover:border-white/20' : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:border-zinc-300'))}`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                       <span className="text-[9px] font-black text-zinc-600 mb-1">{row}</span>
                       <div className={`w-px h-6 ${isDarkMode ? 'bg-white/5' : 'bg-zinc-200'} border-dashed border-l`}></div>
                    </div>

                    <div className="flex gap-2.5">
                      {cols.slice(2, 4).map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = occupiedSeats.includes(seatId);
                        const isSelected = selectedSeat === seatId;
                        return (
                          <button 
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seatId)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all duration-300 active:scale-90
                              ${isSelected ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : 
                                (isOccupied ? (isDarkMode ? 'bg-zinc-800/40 text-zinc-700' : 'bg-zinc-200 text-zinc-400') : 
                                (isDarkMode ? 'bg-white/5 text-zinc-400 border border-white/5 hover:border-white/20' : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:border-zinc-300'))}`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className={`p-6 border-t ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-zinc-100 bg-zinc-50'}`}>
             <div className="flex justify-between items-center mb-6 px-1">
                <div>
                   <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Selected Station</p>
                   <p className={`text-xl font-black italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{selectedSeat}</p>
                </div>
                <div className="text-right">
                   <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Boarding Class</p>
                   <p className={`text-[10px] font-black text-amber-500 tracking-widest uppercase`}>First • Platinum</p>
                </div>
             </div>
             <button 
               onClick={onClose}
               className="w-full bg-amber-500 hover:bg-amber-400 hover:brightness-110 text-black font-black py-4 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-amber-500/20 text-[10px] uppercase tracking-[0.2em]"
             >
               Confirm Seat Selection
             </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const MealOptionsModal: React.FC<{ flight: Flight; onClose: () => void; isDarkMode: boolean }> = ({ flight, onClose, isDarkMode }) => {
  const [selectedMeal, setSelectedMeal] = useState('Wagyu Platter');
  
  const meals = [
    { name: 'Wagyu Platter', desc: 'Slow-seared premium cuts with truffle reduction', icon: '🥩' },
    { name: 'Lobster Bisque', desc: 'Atlantic blue lobster with champagne cream', icon: '🦞' },
    { name: 'Plant Vitality', desc: 'Seasonal harvest with roasted hazelnut glaze', icon: '🥗' },
    { name: 'Truffle Pasta', desc: 'Hand-cut tagliatelle with wild mushroom medley', icon: '🍝' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      
      <div className="w-full max-sm relative animate-in slide-in-from-bottom-8 duration-500">
        <GlassCard isDarkMode={isDarkMode} className={`border-amber-500/20 shadow-3xl flex flex-col p-0 overflow-hidden`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'} flex justify-between items-center`}>
            <div>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Dining Service</h3>
              <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mt-0.5">{flight.flightNo} • GOURMET SELECTION</p>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'} transition-all`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto hide-scrollbar">
            {meals.map((meal) => (
              <button 
                key={meal.name}
                onClick={() => setSelectedMeal(meal.name)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 border transition-all duration-300 text-left active:scale-[0.98]
                  ${selectedMeal === meal.name 
                    ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                    : (isDarkMode ? 'bg-white/[0.03] text-zinc-300 border border-white/5 rounded-tl-none' : 'bg-zinc-100 text-zinc-800 rounded-tl-none')}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${selectedMeal === meal.name ? 'bg-amber-500 shadow-lg shadow-amber-500/30' : (isDarkMode ? 'bg-black/40' : 'bg-zinc-100')}`}>
                  {meal.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-black uppercase tracking-tight ${selectedMeal === meal.name ? 'text-amber-500' : (isDarkMode ? 'text-white' : 'text-zinc-900')}`}>{meal.name}</h4>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{meal.desc}</p>
                </div>
                {selectedMeal === meal.name && (
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          <div className={`p-6 border-t ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-zinc-100 bg-zinc-50'}`}>
            <button 
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-400 hover:brightness-110 text-black font-black py-4 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-amber-500/20 text-[10px] uppercase tracking-[0.2em]"
            >
              Confirm Dining Selection
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const ManageReservationModal: React.FC<{ hotel: Hotel; onClose: () => void; isDarkMode: boolean }> = ({ hotel, onClose, isDarkMode }) => {
  const [prefs, setPrefs] = useState({ lateCheckout: false, extraBed: false, allergy: true, earlyIn: false });

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      <div className="w-full max-sm relative animate-in slide-in-from-bottom-8 duration-500">
        <GlassCard isDarkMode={isDarkMode} className="p-0 overflow-hidden border-amber-500/30 shadow-3xl">
          <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
            <div>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Reservation</h3>
              <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mt-0.5">{hotel.name} • MODIFICATION</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 text-zinc-500 hover:text-amber-500 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
               <div>
                 <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Late Check-out</p>
                 <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Extend to 15:00</p>
               </div>
               <button onClick={() => toggle('lateCheckout')} className={`w-10 h-6 rounded-full transition-all duration-300 relative p-1 ${prefs.lateCheckout ? 'bg-amber-500' : 'bg-zinc-700'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${prefs.lateCheckout ? 'translate-x-4' : 'translate-x-0'}`} />
               </button>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
               <div>
                 <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Early Check-in</p>
                 <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Access from 10:00</p>
               </div>
               <button onClick={() => toggle('earlyIn')} className={`w-10 h-6 rounded-full transition-all duration-300 relative p-1 ${prefs.earlyIn ? 'bg-amber-500' : 'bg-zinc-700'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${prefs.earlyIn ? 'translate-x-4' : 'translate-x-0'}`} />
               </button>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
               <div>
                 <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Allergy Notice</p>
                 <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Hypoallergenic setup</p>
               </div>
               <button onClick={() => toggle('allergy')} className={`w-10 h-6 rounded-full transition-all duration-300 relative p-1 ${prefs.allergy ? 'bg-amber-500' : 'bg-zinc-700'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${prefs.allergy ? 'translate-x-4' : 'translate-x-0'}`} />
               </button>
            </div>
          </div>
          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
            <button onClick={onClose} className="w-full bg-amber-500 text-black font-black py-4 rounded-2xl active:scale-[0.98] transition-all shadow-xl shadow-amber-500/20 text-[10px] uppercase tracking-[0.2em]">Save Preferences</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const RoomUpgradeModal: React.FC<{ hotel: Hotel; onClose: () => void; isDarkMode: boolean }> = ({ hotel, onClose, isDarkMode }) => {
  const upgrades = [
    { title: 'Penthouse Panorama', desc: 'Highest floor, 360° city view', price: '+ €450/nt' },
    { title: 'Skyline Terrace', desc: 'Private heated outdoor deck', price: '+ €220/nt' },
    { title: 'Presidential Wing', desc: 'Enhanced security, private lift', price: '+ €600/nt' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      <div className="w-full max-sm relative animate-in slide-in-from-bottom-8 duration-500">
        <GlassCard isDarkMode={isDarkMode} className="p-0 overflow-hidden border-amber-500/30 shadow-3xl">
          <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
            <div>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Room Upgrade</h3>
              <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mt-0.5">{hotel.name} • ELITE TIER OPTIONS</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 text-zinc-500 hover:text-amber-500 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 space-y-3">
            {upgrades.map(u => (
              <button key={u.title} onClick={onClose} className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:border-amber-500/40' : 'bg-zinc-50 border-zinc-200 hover:border-amber-500'}`}>
                <div className="flex justify-between items-start mb-1">
                   <h4 className={`text-sm font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{u.title}</h4>
                   <span className="text-[10px] font-black text-amber-500">{u.price}</span>
                </div>
                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{u.desc}</p>
              </button>
            ))}
          </div>
          <div className="p-6 border-t border-white/5">
             <p className="text-[8px] text-center text-zinc-500 font-black uppercase tracking-widest">Upgrade confirmed instantly upon selection</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const SpaBookingModal: React.FC<{ onClose: () => void; isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  const treatments = [
    { name: 'Deep Tissue Recovery', time: '90 Min', icon: '💆‍♂️' },
    { name: 'Sauna & Cold Plunge', time: '60 Min', icon: '🧖‍♂️' },
    { name: 'VIP Oxygen Facial', time: '45 Min', icon: '✨' },
    { name: 'Hydro-Zen Ritual', time: '120 Min', icon: '🌊' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      <div className="w-full max-sm relative animate-in slide-in-from-bottom-8 duration-500">
        <GlassCard isDarkMode={isDarkMode} className="p-0 overflow-hidden border-amber-500/30 shadow-3xl">
          <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
            <div>
              <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Spa Sanctuary</h3>
              <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] mt-0.5">PLATINUM WELLNESS</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5 text-zinc-500 hover:text-amber-500 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 grid grid-cols-2 gap-3">
             {treatments.map(t => (
               <button key={t.name} onClick={onClose} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all active:scale-95 ${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:bg-amber-500/5 hover:border-amber-500/30' : 'bg-zinc-50 border-zinc-200 hover:bg-amber-50'}`}>
                  <span className="text-2xl mb-1">{t.icon}</span>
                  <p className={`text-[10px] font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{t.name}</p>
                  <p className="text-[8px] text-amber-500 font-bold uppercase tracking-widest">{t.time}</p>
               </button>
             ))}
          </div>
          <div className="p-6 border-t border-white/5">
            <button onClick={onClose} className="w-full bg-zinc-800 text-white font-black py-4 rounded-2xl active:scale-[0.98] transition-all text-[10px] uppercase tracking-[0.2em]">View Available Slots</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const Travel: React.FC<TravelProps> = ({ isDarkMode, initialTab = 'flights' }) => {
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

  // Sync activeTab with initialTab when it changes from props
  useEffect(() => {
    setActiveTab(initialTab);
    // Auto-scroll to top when switching tab from external navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTab]);

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const hotelImages = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/16/67/68/yanggakdo-hotel.jpg?w=1000&h=-1&s=1", // Iconic Yanggakdo Hotel imagery
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwo1o8INHKECjrvBj4KweAJjiQcuTlOkwj7ZA9L8XBL0W1oiZSNf1Q4DBqqbZd5QGWnyYviE-pzD8ugrRGwQ-TmK815p_nCa2ZYBCVN0JH6Na6AdjhcCcA8Hc91K1tDtBr5ywC0Jw=s680-w680-h510-rw"  // Authentic Koryo Twin Towers imagery
  ];

  return (
    <div className="pb-32 pt-10 px-6 space-y-6 animate-in fade-in duration-500 overflow-y-auto max-h-screen hide-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-end px-1">
        <div>
          <h2 className={`text-3xl font-black tracking-tight italic uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {activeTab}
          </h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Official Arrangements</p>
        </div>
        <button 
          onClick={() => setIsLookupOpen(true)}
          className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-zinc-200 shadow-sm'} px-3 py-1.5 rounded-xl flex items-center gap-2 border cursor-pointer active:scale-95 transition-all`}
        >
           <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Lookup</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className={`flex p-1 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-100 border-zinc-200'} rounded-2xl border`}>
        <button 
          onClick={() => { setActiveTab('flights'); setExpandedItem(null); }}
          className={`flex-1 py-3 text-[10px] font-black tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'flights' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500'}`}
        >
          FLIGHTS
        </button>
        <button 
          onClick={() => { setActiveTab('hotels'); setExpandedItem(null); }}
          className={`flex-1 py-3 text-[10px] font-black tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'hotels' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500'}`}
        >
          HOTELS
        </button>
      </div>

      {/* Content List */}
      <div className="space-y-6 pb-8">
        {activeTab === 'flights' ? (
          MOCK_FLIGHTS.map((flight: Flight) => (
            <GlassCard isDarkMode={isDarkMode} key={flight.id} noPadding className={`border-white/10 transition-all duration-500 ${expandedItem === flight.id ? 'shadow-[0_0_30px_rgba(245,158,11,0.1)] ring-1 ring-amber-500/20' : ''}`}>
               <div 
                  onClick={() => toggleExpand(flight.id)}
                  className={`p-4 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'} flex justify-between items-center cursor-pointer`}
               >
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
                      <p className={`text-3xl font-black italic tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{flight.departure.split(' ')[0]}</p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1">{flight.depTime}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-1 truncate">{flight.departure.split('(')[1]?.replace(')', '') || 'Gate TBA'}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 opacity-40">
                      <div className={`w-full h-px ${isDarkMode ? 'bg-white/20' : 'bg-zinc-300'} relative`}>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
                          <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.996.996 0 0 1-1.14 0l-7.9-4.44A.996.996 0 0 1 3 16.5V7.5c0-.38.21-.71.53-.88l7.9-4.44a.996.996 0 0 1 1.14 0l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>
                        </div>
                      </div>
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500">Non-Stop Flight</span>
                    </div>
                    <div className="text-center w-24">
                      <p className={`text-3xl font-black italic tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{flight.arrival.split(' ')[0]}</p>
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
                        <button 
                          onClick={() => setSeatingFlight(flight)}
                          className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95
                            ${isDarkMode 
                              ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:brightness-125' 
                              : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}
                        >
                          Select Seat
                        </button>
                        <button 
                          onClick={() => setMealFlight(flight)}
                          className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95
                            ${isDarkMode 
                              ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:brightness-125' 
                              : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}
                        >
                          Meal Options
                        </button>
                      </div>
                    </div>
                 )}

                 <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setSelectedTicket(flight)}
                      className={`border py-3 rounded-xl text-[9px] font-black uppercase tracking-widest active:bg-opacity-20 transition-all duration-300
                        ${isDarkMode 
                          ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:brightness-125' 
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}
                    >
                      Digital Ticket
                    </button>
                    <button 
                      onClick={() => setConfirmedFlight(flight)}
                      className="bg-amber-500 hover:bg-amber-400 hover:brightness-110 text-black py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-300"
                    >
                      Confirm Travel
                    </button>
                 </div>
               </div>
            </GlassCard>
          ))
        ) : (
          MOCK_HOTELS.map((hotel: Hotel, idx: number) => (
            <GlassCard isDarkMode={isDarkMode} key={hotel.id} noPadding className={`border-white/10 group overflow-hidden transition-all duration-500 ${expandedItem === hotel.id ? 'ring-1 ring-amber-500/20' : ''}`}>
              <div 
                onClick={() => toggleExpand(hotel.id)}
                className="h-64 relative cursor-pointer"
              >
                <img src={hotelImages[idx % hotelImages.length]} alt={hotel.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000" />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#050505] via-[#050505]/40' : 'from-zinc-900/80 via-transparent'} to-transparent`}></div>
                <div className="absolute top-4 right-4">
                  <StatusBadge isDarkMode={isDarkMode} status={hotel.status} />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <div className="space-y-1">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4,5].map(star => <svg key={star} className={`w-2.5 h-2.5 ${star <= 5 ? 'text-amber-500' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                      </div>
                      <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-0.5">{idx === 0 ? 'YANGGAKDO ISLAND' : 'KORYO TWIN TOWERS'}</p>
                      <h3 className="text-2xl font-black leading-tight text-white uppercase italic tracking-tighter">{hotel.name}</h3>
                   </div>
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform duration-300 ${expandedItem === hotel.id ? 'rotate-180 bg-amber-500 text-black' : 'bg-white/10 text-white/60'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                   </div>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div onClick={() => toggleExpand(hotel.id)} className="flex flex-wrap gap-1.5 cursor-pointer">
                  {hotel.amenities?.map(tag => (
                    <span key={tag} className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 ${isDarkMode ? 'bg-white/5 border-white/10 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500'} border rounded-md`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`grid grid-cols-2 gap-4 py-3 border-y ${isDarkMode ? 'border-white/5' : 'border-zinc-100'}`}>
                  <div>
                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Check In</p>
                    <p className={`text-xs font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>July 12 • 14:00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Check Out</p>
                    <p className={`text-xs font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>July 20 • 11:00</p>
                  </div>
                </div>

                {expandedItem === hotel.id && (
                  <div className="animate-in slide-in-from-top-2 duration-300 space-y-4">
                    <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.03]' : 'bg-zinc-50'} border border-white/5 space-y-3`}>
                      <div>
                        <p className="text-[8px] text-amber-500 font-black uppercase tracking-widest mb-1">Arrival Protocol</p>
                        <p className={`text-[10px] font-bold leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{hotel.checkInProcedure}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <div>
                          <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Assigned Butler</p>
                          <p className={`text-[10px] font-black text-amber-500 tracking-wider`}>{hotel.assignedButler}</p>
                        </div>
                        <button className="text-[8px] font-black text-white bg-amber-500 hover:bg-amber-400 hover:brightness-110 px-3 py-1 rounded-lg uppercase tracking-widest active:scale-95 transition-all duration-300">Secure Contact</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setUpgradeHotel(hotel)}
                        className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95
                        ${isDarkMode 
                          ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:brightness-125' 
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}>
                        Room Upgrade
                      </button>
                      <button 
                        onClick={() => setIsSpaBookingOpen(true)}
                        className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95
                        ${isDarkMode 
                          ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:brightness-125' 
                          : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}>
                        Spa Booking
                      </button>
                    </div>
                  </div>
                )}

                <div className={`${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'} p-3 rounded-xl border`}>
                   <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">Assigned Accomodation</p>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{hotel.roomType}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-lg ${isDarkMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-amber-50 border-amber-200 text-amber-600'} flex items-center justify-center border`}>
                         <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M8 11V7a4 4 0 118 0v4M5 11h14a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" /></svg>
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => setReservationHotel(hotel)}
                  className="w-full bg-amber-500 hover:bg-amber-400 hover:brightness-110 text-black font-black text-[10px] py-3.5 rounded-2xl active:scale-95 transition-all shadow-lg shadow-amber-500/20 uppercase tracking-[0.15em] duration-300"
                >
                  Manage Reservation
                </button>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      {/* Overlays */}
      {isLookupOpen && (
        <LookupModal 
          isDarkMode={isDarkMode}
          onClose={() => setIsLookupOpen(false)}
        />
      )}

      {selectedTicket && (
        <DigitalTicketModal 
          flight={selectedTicket} 
          isDarkMode={isDarkMode} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}

      {seatingFlight && (
        <SeatingChartModal 
          flight={seatingFlight} 
          isDarkMode={isDarkMode} 
          onClose={() => setSeatingFlight(null)} 
        />
      )}

      {mealFlight && (
        <MealOptionsModal 
          flight={mealFlight} 
          isDarkMode={isDarkMode} 
          onClose={() => setMealFlight(null)} 
        />
      )}

      {confirmedFlight && (
        <TravelConfirmationModal
          flight={confirmedFlight}
          isDarkMode={isDarkMode}
          onClose={() => setConfirmedFlight(null)}
        />
      )}

      {reservationHotel && (
        <ManageReservationModal 
          hotel={reservationHotel}
          isDarkMode={isDarkMode}
          onClose={() => setReservationHotel(null)}
        />
      )}

      {upgradeHotel && (
        <RoomUpgradeModal 
          hotel={upgradeHotel}
          isDarkMode={isDarkMode}
          onClose={() => setUpgradeHotel(null)}
        />
      )}

      {isSpaBookingOpen && (
        <SpaBookingModal 
          isDarkMode={isDarkMode}
          onClose={() => setIsSpaBookingOpen(false)}
        />
      )}
    </div>
  );
};

export default Travel;