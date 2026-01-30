import React from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import { MOCK_SCHEDULE } from '../mockData';
import { PoweredBy } from '../components/Branding';

interface MyDayProps {
  isDarkMode: boolean;
}

const SectionHeader: React.FC<{ label: string; count?: number }> = ({ label, count }) => (
  <div className="flex justify-between items-center px-1 pt-6 pb-2 first:pt-0">
    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em]">{label}</h3>
    {count !== undefined && <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{count} Items</span>}
  </div>
);

const MyDay: React.FC<MyDayProps> = ({ isDarkMode }) => {
  const active = MOCK_SCHEDULE.filter(i => i.group === 'active');
  const upcoming = MOCK_SCHEDULE.filter(i => i.group === 'next' || i.group === 'later');
  const completed = MOCK_SCHEDULE.filter(i => i.group === 'completed');

  const renderItem = (item: typeof MOCK_SCHEDULE[0], isLast: boolean) => (
    <div key={item.id} className="relative flex gap-6 pl-2 group">
      <div className="flex flex-col items-center">
        <div className={`w-2.5 h-2.5 rounded-full border-2 z-10 transition-colors ${item.group === 'active' ? 'bg-amber-500 border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : (isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200')}`}></div>
        {!isLast && <div className={`w-px flex-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} my-1`}></div>}
      </div>

      <GlassCard isDarkMode={isDarkMode} className={`flex-1 mb-4 p-4 border-white/10 ${item.group === 'active' ? 'amber-border-glow bg-amber-500/[0.02]' : 'opacity-80'}`}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <p className={`text-[10px] font-black uppercase tracking-widest ${item.group === 'active' ? 'text-amber-500' : 'text-zinc-500'}`}>
                {item.time} {item.group === 'active' && '• LIVE NOW'}
              </p>
              <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>{item.title}</h4>
            </div>
            <StatusBadge isDarkMode={isDarkMode} status={item.status} />
          </div>
          <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {item.location}
          </div>
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="pb-28 pt-10 px-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto max-h-screen hide-scrollbar">
      <div className="mb-2">
        <h2 className={`text-3xl font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>SCHEDULE</h2>
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Official Timeline • Day 04</p>
      </div>

      <div className="space-y-2">
        {active.length > 0 && (
          <>
            <SectionHeader label="Currently Active" />
            {active.map((item, idx) => renderItem(item, false))}
          </>
        )}
        
        {upcoming.length > 0 && (
          <>
            <SectionHeader label="Upcoming Sessions" />
            {upcoming.slice(0, 5).map((item, idx) => renderItem(item, idx === upcoming.slice(0,5).length - 1 && completed.length === 0))}
            {upcoming.length > 5 && (
              <button className={`w-full py-3 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-zinc-600' : 'bg-zinc-100 border-zinc-200 text-zinc-500'} rounded-xl border active:scale-95 mb-4`}>
                + Expand Remaining Agenda
              </button>
            )}
          </>
        )}

        {completed.length > 0 && (
          <>
            <SectionHeader label="Completed" />
            {completed.map((item, idx) => renderItem(item, idx === completed.length - 1))}
          </>
        )}
      </div>
      <PoweredBy isDarkMode={isDarkMode} />
    </div>
  );
};

export default MyDay;