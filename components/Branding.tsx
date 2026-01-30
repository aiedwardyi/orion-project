import React from 'react';

/**
 * Rock'n'Block Logo Component - High-fidelity SVG implementation
 * Balanced dimensions for professional mobile attribution
 */
export const RockNBlockLogo: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="flex items-center gap-1.5 h-[17px] select-none">
    {/* The Red Bolt Box */}
    <div className="h-full aspect-square bg-[#FF0000] rounded-[2px] flex items-center justify-center p-[2.5px] shadow-[0_0_8px_rgba(255,0,0,0.15)]">
      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
    {/* The Brand Text */}
    <span className={`text-[12px] font-black tracking-[-0.01em] leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>
      Rock'n'Block
    </span>
  </div>
);

export const PoweredBy: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="pt-8 pb-4 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-700">
    <p className={`text-[7px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} ml-[0.5em]`}>
      Powered by
    </p>
    <a 
      href="https://rocknblock.io" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="transition-transform active:scale-95"
    >
      <RockNBlockLogo isDarkMode={isDarkMode} />
    </a>
  </div>
);