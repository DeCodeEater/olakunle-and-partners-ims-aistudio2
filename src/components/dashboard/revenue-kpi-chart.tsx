'use client';

import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Banknote, TrendingUp, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const data = [
  { month: 'Jan', value: 120 }, { month: 'Feb', value: 142 },
  { month: 'Mar', value: 135 }, { month: 'Apr', value: 180 },
  { month: 'May', value: 210 }, { month: 'Jun', value: 260 },
  { month: 'Jul', value: 342 }
];

export function RevenueKpiChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Link href="/finance/reports?period=ytd" title="View financial reports for the year to date">
      <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover hover:bg-slate-50 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
          <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel block font-medium transition-colors">Total Sales Revenue</span>
          <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
            <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
          </div>
        </div>

        <div className="relative z-10 font-mono font-bold text-fluid-2xl text-deep-slate mb-1 tracking-tight">₦342.1M</div>

        <div className="relative z-10 flex-grow w-full h-[60px] min-h-[60px] -mx-1 mt-2 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
              <Area type="monotone" dataKey="value" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
          <span className="text-[10px] text-muted-steel font-mono font-medium">YTD Recognized</span>
          <span className="text-[10px] font-mono font-bold flex items-center gap-1 text-emerald-trust">
            <TrendingUp className="w-3 h-3" /> 12.4%
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
