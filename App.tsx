import React, { useState, useEffect, useCallback, useRef } from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import MyDay from './screens/MyDay';
import Requests from './screens/Requests';
import Travel from './screens/Travel';
import GlassCard from './components/GlassCard';
import { PoweredBy } from './components/Branding';

type Screen = 'Home' | 'MyDay' | 'Requests' | 'Travel' | 'Profile';
type CryptoCurrency = 'BTC' | 'ETH' | 'USDT';

interface AppState {
  isAuthenticated: boolean;
  currentScreen: Screen;
  travelTab: 'flights' | 'hotels';
}

const AssistancePopup: React.FC<{ isOpen: boolean; onClose: () => void; isDarkMode: boolean }> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  const handleCall = () => {
    window.location.href = 'tel:+850191999000';
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <GlassCard isDarkMode={isDarkMode} className="w-full max-sm border-amber-500 shadow-2xl relative z-10 p-0 overflow-hidden">
        <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-neutral-900' : 'border-zinc-100 bg-zinc-50'} flex justify-between items-start`}>
           <div>
             <h3 className={`text-xl font-black italic tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Emergency Dispatch</h3>
             <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em] mt-1">Direct Priority Link</p>
           </div>
           <button 
            onClick={onClose}
            className={`p-2 -mr-2 -mt-2 rounded-xl transition-all active:scale-90 ${isDarkMode ? 'text-zinc-500 hover:text-white hover:bg-white/5' : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'}`}
           >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
        <div className="p-8 text-center space-y-6">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'} border-2 animate-pulse`}>
            <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Priority Number</p>
            <p className={`text-2xl font-black mono tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>+850 191 999 000</p>
          </div>
          <button 
            onClick={handleCall}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20 text-[11px] uppercase tracking-[0.3em] transition-all active:scale-[0.98]"
          >
            Initiate Voice Call
          </button>
          <button 
            onClick={onClose}
            className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} hover:text-amber-500 transition-colors`}
          >
            Cancel Dispatch
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

const CryptoRegistry: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeCrypto, setActiveCrypto] = useState<CryptoCurrency>('ETH');
  const [copied, setCopied] = useState(false);

  const wallets = {
    BTC: {
      address: 'bc1qorion7x92kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      color: '#f59e0b',
      network: 'Bitcoin Mainnet'
    },
    ETH: {
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      color: '#6366f1',
      network: 'Ethereum Mainnet'
    },
    USDT: {
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      color: '#26a17b',
      network: 'ERC-20 Protocol'
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallets[activeCrypto].address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end px-1">
        <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">FINANCIAL REGISTRY</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">ENCRYPTED PAYMENTS</span>
        </div>
      </div>
      
      <GlassCard isDarkMode={isDarkMode} className={`p-0 overflow-hidden border-white/5 ${isDarkMode ? 'bg-black/40' : 'bg-white shadow-lg'}`}>
        {/* Currency Tabs */}
        <div className={`flex border-b ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50'}`}>
          {(['BTC', 'ETH', 'USDT'] as CryptoCurrency[]).map((c) => (
            <button
              key={c}
              onClick={() => setActiveCrypto(c)}
              className={`flex-1 py-5 flex flex-col items-center justify-center transition-all relative ${activeCrypto === c ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'}`}
            >
              <span className={`text-[11px] font-black tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{c}</span>
              {activeCrypto === c && (
                <div 
                  className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full" 
                  style={{ backgroundColor: wallets[c].color, boxShadow: `0 0 15px ${wallets[c].color}` }}
                ></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6 flex flex-col items-center">
          {/* QR Container */}
          <div 
            className={`relative w-[160px] h-[160px] flex items-center justify-center rounded-2xl border transition-all duration-500 ${isDarkMode ? 'bg-black/60' : 'bg-zinc-50'}`}
            style={{ borderColor: `${wallets[activeCrypto].color}33` }}
          >
            {/* Animated Scanning Beam */}
            <div 
              className="absolute top-4 left-4 right-4 h-[2px] z-30 opacity-60 pointer-events-none"
              style={{ 
                background: `linear-gradient(to right, transparent, ${wallets[activeCrypto].color}, transparent)`,
                animation: 'scanner-beam-enhanced 4s linear infinite'
              }}
            ></div>
            
            <div className="bg-black p-2 rounded-xl shadow-2xl relative z-10 transition-transform hover:scale-105 duration-500">
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${activeCrypto}:${wallets[activeCrypto].address}&bgcolor=000&color=${wallets[activeCrypto].color.replace('#','')}&margin=0`} 
                 alt="Payment QR" 
                 className="w-[120px] h-[120px] object-contain"
               />
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl-md" style={{ borderColor: wallets[activeCrypto].color }}></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr-md" style={{ borderColor: wallets[activeCrypto].color }}></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl-md" style={{ borderColor: wallets[activeCrypto].color }}></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 rounded-br-md" style={{ borderColor: wallets[activeCrypto].color }}></div>
          </div>

          <div className="w-full space-y-4">
            <div className="text-center">
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Target Network</p>
              <p className={`text-[10px] font-black uppercase tracking-widest italic ${isDarkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>{wallets[activeCrypto].network}</p>
            </div>

            <div className={`p-3 rounded-xl border flex flex-col gap-2 transition-all ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
               <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest">Recipient Address</p>
               <div className="flex justify-between items-center gap-4">
                  <p className={`mono text-[9px] break-all flex-1 tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{wallets[activeCrypto].address}</p>
                  <button 
                    onClick={copyAddress}
                    className={`shrink-0 p-2 rounded-lg transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 text-zinc-400 hover:text-white' : 'bg-white text-zinc-500 shadow-sm'}`}
                  >
                    {copied ? (
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    )}
                  </button>
               </div>
            </div>
          </div>
        </div>
        
        <div className={`p-3 border-t text-center ${isDarkMode ? 'border-white/5 bg-black/20 text-zinc-600' : 'border-zinc-100 bg-zinc-50 text-zinc-400'}`}>
           <p className="text-[7px] font-black uppercase tracking-[0.4em]">Settlement Registry Secure • No Confirmation Required</p>
        </div>
      </GlassCard>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [travelTab, setTravelTab] = useState<'flights' | 'hotels'>('flights');
  
  const currentStateRef = useRef<AppState>({ isAuthenticated, currentScreen, travelTab });
  
  useEffect(() => {
    currentStateRef.current = { isAuthenticated, currentScreen, travelTab };
  }, [isAuthenticated, currentScreen, travelTab]);

  const navigateTo = useCallback((screen: Screen, tab: 'flights' | 'hotels' = 'flights', push: boolean = true) => {
    const isDifferent = screen !== currentStateRef.current.currentScreen || 
                        tab !== currentStateRef.current.travelTab;
    
    if (isDifferent) {
      setCurrentScreen(screen);
      setTravelTab(tab);
      
      if (push) {
        const state: AppState = { isAuthenticated: true, currentScreen: screen, travelTab: tab };
        window.history.pushState(state, '', '');
      }

      if (screen !== currentStateRef.current.currentScreen) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentScreen('Home');
    setTravelTab('flights');
    const state: AppState = { isAuthenticated: true, currentScreen: 'Home', travelTab: 'flights' };
    window.history.replaceState(state, '', '');
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    window.history.pushState({ isAuthenticated: false }, '', '');
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as AppState | null;
      if (state) {
        setIsAuthenticated(state.isAuthenticated);
        if (state.isAuthenticated) {
          setCurrentScreen(state.currentScreen || 'Home');
          setTravelTab(state.travelTab || 'flights');
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (!window.history.state) {
      window.history.replaceState({ isAuthenticated: false }, '', '');
    } else {
      const existingState = window.history.state as AppState;
      if (existingState.isAuthenticated) {
        setIsAuthenticated(true);
        setCurrentScreen(existingState.currentScreen || 'Home');
        setTravelTab(existingState.travelTab || 'flights');
      }
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const overlay = document.getElementById('ambient-overlay-root');
    if (!overlay) return;
    overlay.classList.remove('tint-neutral', 'tint-amber', 'tint-green');
    if (!isAuthenticated) {
      overlay.classList.add('tint-neutral');
      return;
    }
    switch (currentScreen) {
      case 'Home': overlay.classList.add('tint-neutral'); break;
      case 'Travel':
      case 'Profile': overlay.classList.add('tint-amber'); break;
      case 'MyDay':
      case 'Requests': overlay.classList.add('tint-green'); break;
      default: overlay.classList.add('tint-neutral');
    }
  }, [currentScreen, isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isDarkMode={isDarkMode} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home': return (
        <Home 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme} 
          onNavigateToTravel={(tab) => navigateTo('Travel', tab)} 
          onNavigateToProfile={() => navigateTo('Profile')}
        />
      );
      case 'MyDay': return <MyDay isDarkMode={isDarkMode} />;
      case 'Requests': return <Requests isDarkMode={isDarkMode} />;
      case 'Travel': return (
        <Travel 
          isDarkMode={isDarkMode} 
          initialTab={travelTab} 
          onTabChange={(tab) => navigateTo('Travel', tab)} 
        />
      );
      case 'Profile': return (
        <div className="pb-32 pt-10 px-6 space-y-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 overflow-y-auto max-h-screen hide-scrollbar">
          <div className="flex justify-between items-end px-1">
            <div>
              <h2 className={`text-3xl font-black tracking-tight italic uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>SECURITY PASS</h2>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Secure Identity Protocol</p>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-[2.5rem] ${isDarkMode ? 'blur-2xl' : 'blur-xl'} opacity-20 group-hover:opacity-40 transition-opacity duration-1000`}></div>
              <GlassCard isDarkMode={isDarkMode} className={`relative p-0 overflow-hidden ${isDarkMode ? 'border-amber-500/30 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]' : 'border-zinc-200 shadow-lg'}`}>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at top left, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className={`p-5 ${isDarkMode ? 'bg-gradient-to-br from-neutral-900/60 to-black/80' : 'bg-gradient-to-br from-white to-zinc-50'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-amber-500/10 blur-md rounded-2xl animate-pulse"></div>
                      <div className={`w-16 h-16 rounded-2xl border-2 border-amber-500/40 p-1 flex items-center justify-center relative z-10 overflow-hidden shadow-2xl ${isDarkMode ? 'bg-neutral-900' : 'bg-zinc-50'}`}>
                        <img src="https://aiedwardyi.s3.ap-northeast-2.amazonaws.com/wonikyi.jpg" alt="Edward Yi Avatar" className="w-full h-full object-cover rounded-xl"/>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className={`border px-2 py-0.5 rounded-lg flex items-center gap-1.5 mb-2 ${isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
                        <svg className="w-2.5 h-2.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">VERIFIED</span>
                      </div>
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-0.5 opacity-60">ACCESS TIER</p>
                      <p className={`text-sm font-black uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>PLATINUM VIP</p>
                    </div>
                  </div>
                  <div className="space-y-0.5 mb-4">
                    <h3 className={`text-xl font-black tracking-tighter leading-tight uppercase italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Edward Yi</h3>
                    <div className="flex items-center gap-2">
                      <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-amber-500/70' : 'text-amber-600'}`}>NGO International Sports Committee</p>
                      <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">USA 2026</p>
                    </div>
                  </div>
                  <div className={`flex justify-between items-end border-t ${isDarkMode ? 'border-white/10' : 'border-zinc-200'} pt-4`}>
                    <div className="space-y-0.5">
                      <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Digital Auth Key</p>
                      <p className={`mono text-[10px] font-bold tracking-[0.2em] ${isDarkMode ? 'text-amber-500/90' : 'text-amber-600'}`}>ORION-SEC-0982X</p>
                    </div>
                    <div className="text-right opacity-20">
                      <svg className={`w-8 h-8 ${isDarkMode ? 'text-amber-500' : 'text-zinc-300'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 22L4 18V6l8-4 8 4v12l-8 4zM12 4.2L5.8 7.3v9.4l6.2 3.1 6.2 3.1V7.3L12 4.2zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Crypto Section ONLY */}
            <CryptoRegistry isDarkMode={isDarkMode} />

            <div className="space-y-4">
              <div className="space-y-2">
                 <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] px-1">CLEARANCE LEVELS</h3>
                 <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Venue Access', status: 'ALL GATES', icon: 'M8 21V9a2 2 0 012-2h4a2 2 0 012 2v12' },
                      { label: 'VIP Lounge', status: 'PLATINUM', icon: 'M12 4l2.45 4.97L20 9.77l-4 3.9 1.18 6.88L12 17.3l-5.18 3.25L8 13.67l-4-3.9 5.55-.79L12 4z' },
                      { label: 'Transport', status: 'CHAUFFEUR', icon: 'M19 17h1a1 1 0 001-1v-3.5c0-.8-.6-1.5-1.4-1.7C18 10.4 15.5 10 15.5 10s-1-1-2-2a2 2 0 00-1.5-.5H5a2 2 0 00-2 2v7a1 1 0 001 1h1M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
                      { label: 'Media Deck', status: 'UNRESTRICTED', icon: 'M15 10l4.55-2.27A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
                    ].map(p => (
                      <GlassCard isDarkMode={isDarkMode} key={p.label} className={`p-3 flex flex-col gap-2 group relative overflow-hidden ${isDarkMode ? 'border-white/5' : 'border-zinc-200 shadow-sm'}`}>
                         <div className={`w-8 h-8 rounded-lg border flex items-center justify-center p-1.5 transition-colors group-hover:border-amber-500/40 group-hover:text-amber-500 ${isDarkMode ? 'bg-white/[0.04] border-white/10 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-500'}`}>
                            <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                         </div>
                         <div>
                           <p className="text-[7px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-0.5">{p.label}</p>
                           <p className="text-[9px] font-black text-amber-500 tracking-[0.2em] uppercase">{p.status}</p>
                         </div>
                      </GlassCard>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] px-1">SUPPORT & OPERATIONS</h3>
                <GlassCard isDarkMode={isDarkMode} className={`p-4 ${isDarkMode ? 'border-white/5' : 'border-zinc-200 shadow-sm'}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">EMERGENCY PROTOCOL</p>
                        <p className={`text-xs font-black italic tracking-wider ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>+850 191 999 000</p>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-red-500/10 text-red-500' : 'bg-red-50 text-red-600'} border ${isDarkMode ? 'border-red-500/20' : 'border-red-200'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[7px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">OPERATIONS HOTLINE</p>
                        <p className={`text-xs font-black italic tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>+850 191 442 101</p>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-zinc-400' : 'bg-zinc-100 text-zinc-500'} border ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                    </div>
                    <button onClick={() => setIsAssistanceOpen(true)} className={`w-full py-3 border-2 border-amber-500/50 rounded-xl text-[8px] font-black uppercase tracking-[0.3em] transition-all active:scale-[0.98] ${isDarkMode ? 'text-amber-500 hover:bg-amber-500/10' : 'text-amber-600 hover:bg-amber-50'}`}>Request Immediate Assistance</button>
                  </div>
                </GlassCard>
              </div>
              <button onClick={handleLogout} className={`w-full py-6 font-black text-[8px] transition-all uppercase tracking-[0.6em] active:scale-95 ${isDarkMode ? 'text-zinc-800 hover:text-red-500/60' : 'text-zinc-300 hover:text-red-600/60'}`}>Terminate Active Session</button>
            </div>
          </div>
          <PoweredBy isDarkMode={isDarkMode} />
          <AssistancePopup isOpen={isAssistanceOpen} onClose={() => setIsAssistanceOpen(false)} isDarkMode={isDarkMode} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
      <main className="max-w-2xl mx-auto min-h-screen pb-32 relative">
        {renderScreen()}
      </main>

      <div className="fixed bottom-8 left-6 right-6 z-50 pointer-events-none">
        <nav className={`max-w-md mx-auto rounded-[2.5rem] border p-1.5 pointer-events-auto transition-all duration-500 ${isDarkMode ? 'glass border-white/10 shadow-3xl' : 'bg-white shadow-2xl border-zinc-200'}`}>
          <div className="flex justify-between items-center px-2">
            <NavItem isDarkMode={isDarkMode} active={currentScreen === 'Home'} onClick={() => navigateTo('Home')} label="Home" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 011 1m-6 0h6" /></svg>} />
            <NavItem isDarkMode={isDarkMode} active={currentScreen === 'MyDay'} onClick={() => navigateTo('MyDay')} label="Day" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
            <NavItem isDarkMode={isDarkMode} active={currentScreen === 'Requests'} onClick={() => navigateTo('Requests')} label="Taxi" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h1M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>} />
            <NavItem isDarkMode={isDarkMode} active={currentScreen === 'Travel'} onClick={() => navigateTo('Travel', 'flights')} label="TRAVEL" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.24V14.5L14.2 9V3.5C14.2 2.67 13.53 2 12.7 2C11.87 2 11.2 2.67 11.2 3.5V9L3.4 14.5V16.24L11.2 13.75V19.25L9.2 20.75V22.25L12.7 21.25L16.2 22.25V20.75L14.2 19.25V13.75L22 16.24Z" /></svg>} />
            <NavItem isDarkMode={isDarkMode} active={currentScreen === 'Profile'} onClick={() => navigateTo('Profile')} label="Pass" icon={
              <div className={`w-6 h-6 rounded-full overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${currentScreen === 'Profile' ? 'border-amber-500 scale-110 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'border-zinc-300 grayscale opacity-60'}`}>
                <img src="https://aiedwardyi.s3.ap-northeast-2.amazonaws.com/wonikyi.jpg" alt="EY Avatar" className="w-full h-full object-cover" />
              </div>
            } />
          </div>
        </nav>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; label: string; icon: React.ReactNode; onClick: () => void; isDarkMode: boolean }> = ({ active, label, icon, onClick, isDarkMode }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center py-2.5 px-3.5 transition-all rounded-full ${active ? 'bg-amber-500/10 text-amber-500' : 'text-zinc-400 active:scale-90'}`}>
    <div className={`transition-colors ${active ? (isDarkMode ? 'text-amber-500' : 'text-amber-600') : (isDarkMode ? 'text-zinc-500' : 'text-zinc-400')}`}>{icon}</div>
    <span className={`text-[7px] font-black uppercase tracking-[0.1em] mt-1 transition-all ${active ? 'opacity-100' : 'opacity-0 h-0'}`}>{label}</span>
  </button>
);

export default App;