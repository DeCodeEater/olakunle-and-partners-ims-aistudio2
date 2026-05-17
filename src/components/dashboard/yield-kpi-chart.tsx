'use client';

import { AreaChart, Area, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { Activity, TrendingDown, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const data = [
  { month: 'Jan', val: 7.2 }, { month: 'Feb', val: 7.4 },
  { month: 'Mar', val: 7.3 }, { month: 'Apr', val: 7.9 },
  { month: 'May', val: 8.1 }, { month: 'Jun', val: 8.2 },
  { month: 'Jul', val: 8.4 }
];

export function YieldKpiChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Link href="/finance/reports?view=yield" title="View financial reports with portfolio yield breakdown">
      <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover hover:bg-slate-50 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel block font-medium transition-colors">Portfolio Yield</span>
            <div className="w-2 h-2 rounded-full bg-amber-500" title="Below target" />
          </div>
          <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
          </div>
        </div>

        <div className="relative z-10 font-mono font-bold text-fluid-2xl text-amber-500 mb-1 tracking-tight">8.4%</div>

        <div className="relative z-10 flex-grow w-full h-[60px] min-h-[60px] -mx-1 mt-2 mb-2" title="Below target by 0.6% — 3M trend: declining">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
              <ReferenceLine y={9.0} stroke="#64748b" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Target', fill: '#64748b', fontSize: 10 }} />
              <Area type="monotone" dataKey="val" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorYield)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
          <span className="text-[10px] text-muted-steel font-mono font-medium">Target 9.0%</span>
          <span className="text-[10px] font-mono font-bold flex items-center gap-1 text-red-500">
            <TrendingDown className="w-3 h-3" /> -0.2%
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-whisper-border/30 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-steel">Last updated: 2m ago</span>
            <button onClick={handleRefresh} className="text-muted-steel hover:text-deep-slate transition-colors" title="Refresh data">
              <RefreshCcw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <span className="text-[11px] font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">View details &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
