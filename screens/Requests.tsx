import React, { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { PoweredBy } from '../App';

interface Vehicle {
  id: string;
  type: 'Executive Armored SUV' | 'VIP Shuttle' | 'Executive Sedan';
  status: 'Available' | 'En Route' | 'Busy';
  driver: string;
  distance: string;
  eta: string;
  license: string;
  pos: { top: string; left: string };
  specs?: {
    engine: string;
    protection: string;
    connectivity: string;
    amenities: string[];
  };
}

const MOCK_FLEET: Vehicle[] = [
  { 
    id: 'v1', 
    type: 'Executive Armored SUV', 
    status: 'Available', 
    driver: 'Agent Thorne', 
    distance: '0.8 mi', 
    eta: '4 min', 
    license: 'ORION-X01', 
    pos: { top: '30%', left: '40%' },
    specs: {
      engine: '6.2L V8 Supercharged • 650 HP',
      protection: 'VR7 Ballistic Protection • Reinforced Run-Flats',
      connectivity: 'Dual-Provider Encrypted LTE Hub • SATCOM Failover',
      amenities: ['Built-in Oxygen Reserves', 'External Environment Sensors', 'Heated Biometric Seats', 'Fire Suppression System']
    }
  },
  { 
    id: 'v2', 
    type: 'Executive Sedan', 
    status: 'Available', 
    driver: 'S. Miller', 
    distance: '1.2 mi', 
    eta: '7 min', 
    license: 'ISC-992', 
    pos: { top: '60%', left: '20%' },
    specs: {
      engine: '4.0L V8 Biturbo • 520 HP',
      protection: 'Reinforced Door Panels • Shatter-Proof Glass',
      connectivity: 'High-Speed Wi-Fi 6E • Integrated Tablet Controls',
      amenities: ['Reclining Rear Lounge', 'Hot-Stone Massage Seats', 'Active Noise Cancellation', 'Champagne Chiller']
    }
  },
  { 
    id: 'v3', 
    type: 'VIP Shuttle', 
    status: 'En Route', 
    driver: 'Operations Team', 
    distance: '3.5 mi', 
    eta: '15 min', 
    license: 'SH-442', 
    pos: { top: '15%', left: '75%' },
    specs: {
      engine: 'High-Torque Dual Hydrogen Cell • Zero Emission',
      protection: 'Energy-Absorbing Safety Cage • Stability Control+',
      connectivity: 'Multi-Channel Conference Link • Surround Comms',
      amenities: ['12 Passenger Capacity', 'Executive Workstations', 'Premium 24-Speaker Audio', 'Self-Cleaning Air Filtration']
    }
  },
];

const FleetSpecsModal: React.FC<{ vehicle: Vehicle; onClose: () => void; isDarkMode: boolean }> = ({ vehicle, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-w-sm border-amber-500/30 shadow-3xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-center`}>
          <div>
            <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Technical Registry</h3>
            <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em] mt-0.5">{vehicle.license} • Configuration</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Powertrain</p>
                <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{vehicle.specs?.engine}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Protection Rating</p>
                <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{vehicle.specs?.protection}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Connectivity Suite</p>
              <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{vehicle.specs?.connectivity}</p>
            </div>
          </div>

          <div className="space-y-3">
             <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] border-b border-amber-500/10 pb-2">Interior Cabin Amenities</p>
             <div className="grid grid-cols-1 gap-2">
                {vehicle.specs?.amenities.map((feature, idx) => (
                  <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{feature}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-zinc-100 bg-zinc-50'} text-center`}>
           <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.4em]">ORION Fleet Logistics • Concierge Standard</p>
        </div>
      </GlassCard>
    </div>
  );
};

const TacticalMapModal: React.FC<{ onClose: () => void; isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      <GlassCard isDarkMode={isDarkMode} noPadding className="w-full max-lg h-[80vh] border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden relative">
        <div className={`absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center ${isDarkMode ? 'bg-gradient-to-b from-black/80' : 'bg-gradient-to-b from-white/80'} to-transparent`}>
          <div>
            <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Tactical Grid</h3>
            <p className="text-[9px] text-amber-500 font-black uppercase tracking-[0.3em] mt-0.5">Pyongyang 01 • Live Tracking</p>
          </div>
          <button onClick={onClose} className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/10 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500'} hover:brightness-125 transition-all`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className={`w-full h-full relative ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-zinc-100'} overflow-hidden`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 400 600">
             <path d="M0 100 L400 120 M150 0 L180 600 M0 450 L400 420 M320 0 L290 600" stroke="currentColor" strokeWidth="20" fill="none" />
             <circle cx="200" cy="300" r="150" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <div className="relative">
                <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-ping opacity-30"></div>
                <div className="absolute -inset-4 bg-blue-500/40 rounded-full animate-pulse opacity-50"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] relative z-10"></div>
             </div>
             <p className="absolute top-6 left-1/2 -translate-x-1/2 text-[7px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap">You • Station Alpha</p>
          </div>
          {MOCK_FLEET.map(vehicle => (
            <div 
              key={vehicle.id} 
              className="absolute z-20 transition-all duration-1000"
              style={{ top: vehicle.pos.top, left: vehicle.pos.left }}
            >
              <div className="group relative">
                <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-amber-500/30 transform transition-transform group-hover:scale-110 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 17h1a1 1 0 001-1v-3.5c0-.8-.6-1.5-1.4-1.7C18 10.4 15.5 10 15.5 10s-1-1-2-2a2 2 0 00-1.5-.5H5a2 2 0 00-2 2v7a1 1 0 001 1h1M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>
                </div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-2 py-1 rounded-lg border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  <p className="text-[7px] font-black text-amber-500 uppercase tracking-widest">{vehicle.type}</p>
                  <p className="text-[6px] text-zinc-400 uppercase font-bold text-center mt-0.5">{vehicle.eta} ETA</p>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-8 right-6 space-y-3">
             <div className={`w-12 h-12 rounded-2xl ${isDarkMode ? 'bg-black/60' : 'bg-white shadow-xl'} border border-white/10 flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors cursor-pointer active:scale-95`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 21l-8-18 8 5 8-5-8 18z" /></svg>
             </div>
             <div className={`w-12 h-12 rounded-2xl ${isDarkMode ? 'bg-black/60' : 'bg-white shadow-xl'} border border-white/10 flex flex-col items-center justify-around py-1`}>
                <button className="text-zinc-500 hover:text-white transition-colors">+</button>
                <div className="w-4 h-px bg-white/10"></div>
                <button className="text-zinc-500 hover:text-white transition-colors">-</button>
             </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(245,158,11,0.2)_1px,transparent_1px)] bg-[length:100%_4px]"></div>
      </GlassCard>
    </div>
  );
};

interface RequestsProps {
  isDarkMode: boolean;
}

const Taxi: React.FC<RequestsProps> = ({ isDarkMode }) => {
  const [activeRide, setActiveRide] = useState<Vehicle | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState<Vehicle | null>(null);

  const handleBook = (vehicle: Vehicle) => {
    setIsBooking(true);
    setTimeout(() => {
      setActiveRide(vehicle);
      setIsBooking(false);
    }, 2000);
  };

  return (
    <div className="pb-40 pt-10 px-6 space-y-8 animate-in fade-in duration-700 overflow-y-auto max-h-screen hide-scrollbar">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black tracking-tight italic uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Taxi</h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Secure Transportation Service</p>
        </div>
        <button 
          onClick={() => setShowMap(true)}
          className={`w-11 h-11 rounded-2xl ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-100 border-amber-200'} border flex items-center justify-center shadow-lg active:scale-95 hover:brightness-125 transition-all`}
        >
           <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>

      <GlassCard isDarkMode={isDarkMode} noPadding className={`relative h-[220px] border-white/10 group ${isDarkMode ? 'bg-black/60' : 'bg-zinc-100'} overflow-hidden shadow-2xl transition-all duration-500`}>
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(245,158,11,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-amber-500/5 to-transparent"></div>
         </div>
         
         <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            {activeRide ? (
              <div className="animate-in zoom-in duration-500 space-y-4">
                 <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] mb-3">
                       <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 17h1a1 1 0 001-1v-3.5c0-.8-.6-1.5-1.4-1.7C18 10.4 15.5 10 15.5 10s-1-1-2-2a2 2 0 00-1.5-.5H5a2 2 0 00-2 2v7a1 1 0 001 1h1M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>
                    </div>
                    <h3 className={`text-lg font-black uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Dispatch Confirmed</h3>
                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">{activeRide.eta} TO ARRIVAL</p>
                 </div>
                 <div className={`px-4 py-2 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-sm'} border border-white/5 flex items-center gap-3`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Protocol: Secure-Channel-V9</span>
                 </div>
                 <button 
                  onClick={() => setActiveRide(null)}
                  className="text-[8px] font-black text-zinc-500 uppercase tracking-widest hover:text-amber-500 transition-colors"
                 >
                  Abort Transport Request
                 </button>
              </div>
            ) : isBooking ? (
              <div className="flex flex-col items-center gap-4">
                 <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">SECURE DISPATCHING...</p>
              </div>
            ) : (
              <div onClick={() => setShowMap(true)} className="cursor-pointer group">
                 <div className="w-20 h-20 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/10 group-hover:border-amber-500/40 transition-all">
                    <svg className="w-10 h-10 text-amber-500/40 group-hover:text-amber-500/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>
                 </div>
                 <h3 className={`text-base font-black uppercase italic tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'} group-hover:text-amber-500 transition-colors`}>View Interactive Grid</h3>
                 <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Pyongyang Operations Center • Ready</p>
              </div>
            )}
         </div>
      </GlassCard>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-1">Nearby Fleet</h3>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_FLEET.map(vehicle => (
            <GlassCard 
              isDarkMode={isDarkMode} 
              key={vehicle.id} 
              className={`group transition-all duration-300 border-white/5 active:scale-95 ${activeRide?.id === vehicle.id ? 'ring-2 ring-amber-500 bg-amber-500/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 ${isDarkMode ? 'bg-black/40' : 'bg-zinc-100'} group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500 shadow-inner`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 17h1a1 1 0 001-1v-3.5c0-.8-.6-1.5-1.4-1.7C18 10.4 15.5 10 15.5 10s-1-1-2-2a2 2 0 00-1.5-.5H5a2 2 0 00-2 2v7a1 1 0 001 1h1M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>
                  </div>
                  <div>
                    <h4 className={`text-sm font-black italic tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'} group-hover:brightness-150 group-hover:text-amber-500 transition-all duration-300`}>{vehicle.type}</h4>
                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">{vehicle.driver} • {vehicle.license}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-amber-500 uppercase italic tracking-tighter leading-none group-hover:brightness-125 transition-all">{vehicle.eta}</p>
                   <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{vehicle.distance}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button 
                  onClick={() => handleBook(vehicle)}
                  disabled={!!activeRide}
                  className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95 
                    ${isDarkMode 
                      ? 'bg-amber-500 border-amber-400 text-black hover:brightness-125 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                      : 'bg-amber-500 text-black hover:brightness-105 shadow-md shadow-amber-500/20'}`}
                >
                  Confirm Pickup
                </button>
                <button 
                  onClick={() => setSelectedSpecs(vehicle)}
                  className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all duration-300 active:scale-95
                  ${isDarkMode 
                    ? 'bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:border-white/20 hover:brightness-125' 
                    : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:brightness-105'}`}>
                  Fleet Specs
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-1 opacity-60">Transit History</h3>
        <div className="space-y-3 opacity-40">
           {[
             { title: 'Airport Secure Ingress', time: 'June 12, 09:14', id: 'TR-9821' },
             { title: 'Victory Plaza Egress', time: 'June 11, 23:45', id: 'TR-9804' }
           ].map((log, idx) => (
             <GlassCard isDarkMode={isDarkMode} key={idx} className="p-3 border-white/5 flex justify-between items-center group active:scale-[0.99] transition-all">
                <div>
                   <p className={`text-[10px] font-black uppercase tracking-tight ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} group-hover:text-amber-500 transition-colors`}>{log.title}</p>
                   <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{log.time}</p>
                </div>
                <div className={`${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'} flex items-center gap-2`}>
                  <span className="text-[7px] font-black tracking-widest uppercase">{log.id}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
                </div>
             </GlassCard>
           ))}
        </div>
      </div>

      <PoweredBy isDarkMode={isDarkMode} />

      {showMap && (
        <TacticalMapModal 
          isDarkMode={isDarkMode} 
          onClose={() => setShowMap(false)} 
        />
      )}

      {selectedSpecs && (
        <FleetSpecsModal 
          vehicle={selectedSpecs}
          isDarkMode={isDarkMode}
          onClose={() => setSelectedSpecs(null)}
        />
      )}
    </div>
  );
};

export default Taxi;