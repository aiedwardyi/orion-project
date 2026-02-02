import React from 'react';

/**
 * Rock'n'Block Logo Component - High-fidelity SVG implementation
 * Balanced dimensions for professional mobile attribution
 */
export const RockNBlockLogo: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="flex items-center gap-1.5 h-4 select-none">
    {/* The Red Bolt Box */}
    <div className="h-full aspect-square bg-[#FF0000] rounded flex items-center justify-center p-0.5 shadow-[0_0_10px_rgba(255,0,0,0.4)]">
      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
    {/* The Brand Text */}
    <span className={`text-xs font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>
      Rock'n'Block
    </span>
  </div>
);

export const PoweredBy: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="pt-2 pb-4 flex flex-col items-center gap-2 opacity-100 transition-all duration-700">
    <p className={`text-[9px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} ml-[0.5em]`}>
      Powered by
    </p>
    <a 
      href="https://rocknblock.io" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="transition-all duration-300 ease-out active:scale-95 hover:scale-[1.02] hover:-translate-y-1 block"
    >
      <RockNBlockLogo isDarkMode={isDarkMode} />
    </a>
  </div>
);