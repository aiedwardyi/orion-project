
import React from 'react';
import { RequestStatus } from '../types';

interface StatusBadgeProps {
  status: RequestStatus;
  isDarkMode?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isDarkMode = true }) => {
  const getColors = () => {
    switch (status) {
      case 'Confirmed': 
        return isDarkMode 
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
          : 'bg-emerald-50 text-emerald-600 border-emerald-200/60';
      case 'Approved': 
        return isDarkMode 
          ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
          : 'bg-blue-50 text-blue-600 border-blue-200/60';
      case 'Pending': 
        return isDarkMode 
          ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
          : 'bg-amber-50 text-amber-600 border-amber-200/60';
      default: 
        return isDarkMode 
          ? 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40' 
          : 'bg-zinc-100 text-zinc-500 border-zinc-200';
    }
  };

  return (
    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg border transition-all ${getColors()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
