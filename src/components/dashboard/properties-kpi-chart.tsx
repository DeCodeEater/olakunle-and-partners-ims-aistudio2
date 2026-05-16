'use client';

import { BarChart, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Building2, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Jan', val: 12 }, { month: 'Feb', val: 13 },
  { month: 'Mar', val: 14 }, { month: 'Apr', val: 14 },
  { month: 'May', val: 16 }, { month: 'Jun', val: 17 },
  { month: 'Jul', val: 18 }
];

export function PropertiesKpiChart() {
  return (
    <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
        <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel uppercase block tracking-widest font-medium transition-colors">Properties Managed</span>
        <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
        </div>
      </div>

      <div className="relative z-10 font-mono font-bold text-fluid-2xl text-deep-slate mb-1 tracking-tight">18</div>

      <div className="relative z-10 flex-grow w-full h-[60px] min-h-[60px] mt-2 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ display: 'none' }} />
            <Bar dataKey="val" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#0f172a' : '#e4e2e4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
        <span className="text-[10px] text-muted-steel uppercase font-mono tracking-widest">Active Contracts</span>
        <span className="text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1 text-emerald-trust">
          <TrendingUp className="w-3 h-3" /> 2 Added
        </span>
      </div>
    </div>
  );
}
