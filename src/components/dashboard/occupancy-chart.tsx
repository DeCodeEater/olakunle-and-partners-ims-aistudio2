'use client';

import { Key, TrendingUp, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function OccupancyChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Link href="/properties?filter=occupancy" title="View properties filtered by occupancy status">
      <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover hover:bg-slate-50 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
          <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel block font-medium transition-colors">Occupied vs Vacant</span>
          <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
            <Key className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
          </div>
        </div>

        <div className="relative z-10 flex-grow w-full h-[80px] min-h-[80px] mt-2 mb-2 flex flex-col justify-center gap-3">
           <div className="flex justify-between items-end">
             <div>
               <div className="font-mono font-bold text-fluid-2xl text-deep-slate leading-none">87%</div>
               <div className="font-mono text-[10px] text-muted-steel font-medium mt-1">Occupied</div>
             </div>
             <div className="text-right">
               <div className="font-mono font-bold text-lg text-slate-400 leading-none">13%</div>
               <div className="font-mono text-[10px] text-muted-steel font-medium mt-1">Vacant</div>
             </div>
           </div>
           
           <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
             <div className="h-full bg-deep-slate" style={{ width: '87%' }}></div>
           </div>
        </div>

        <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
          <span className="text-[10px] text-muted-steel font-mono font-medium">Lease Efficiency</span>
          <span className="text-[10px] font-mono font-bold flex items-center gap-1 text-emerald-trust">
            <TrendingUp className="w-3 h-3" /> 2.1%
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
