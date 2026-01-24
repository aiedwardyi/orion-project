
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bgImage?: string;
  noPadding?: boolean;
  isDarkMode?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, bgImage, noPadding, isDarkMode = true }) => {
  const baseClasses = isDarkMode 
    ? "glass border-white/5 bg-neutral-900/70 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
    : "bg-white/80 backdrop-blur-xl border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <div 
      onClick={onClick}
      className={`${baseClasses} rounded-3xl overflow-hidden active:scale-[0.98] transition-all relative ${noPadding ? '' : 'p-4'} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt="" className={`w-full h-full object-cover ${isDarkMode ? 'opacity-40 mix-blend-overlay' : 'opacity-20'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#050505]' : 'from-white/90'} via-transparent to-transparent`}></div>
        </div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
