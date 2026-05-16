'use client';

import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', val: 7.2 }, { month: 'Feb', val: 7.4 },
  { month: 'Mar', val: 7.3 }, { month: 'Apr', val: 7.9 },
  { month: 'May', val: 8.1 }, { month: 'Jun', val: 8.2 },
  { month: 'Jul', val: 8.4 }
];

export function YieldKpiChart() {
  return (
    <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
        <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel uppercase block tracking-widest font-medium transition-colors">Portfolio Yield</span>
        <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
        </div>
      </div>

      <div className="relative z-10 font-mono font-bold text-fluid-2xl text-deep-slate mb-1 tracking-tight">8.4%</div>

      <div className="relative z-10 flex-grow w-full h-[60px] min-h-[60px] mt-2 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
            <Line type="monotone" dataKey="val" stroke="#0f172a" strokeWidth={2} dot={{ r: 3, fill: '#0f172a', strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
        <span className="text-[10px] text-muted-steel uppercase font-mono tracking-widest">Target 9.0%</span>
        <span className="text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 text-emerald-trust">
          <TrendingUp className="w-3 h-3" /> 0.2%
        </span>
      </div>
    </div>
  );
}
