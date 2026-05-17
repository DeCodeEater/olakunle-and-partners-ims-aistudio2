'use client';

import { Building2, TrendingUp, RefreshCcw, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function PropertiesKpiChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Link href="/properties" title="View all managed properties">
      <div className="group border border-whisper-border p-fluid-s rounded-lg bg-pure-surface shadow-whisper hover:shadow-whisper-hover hover:bg-slate-50 cursor-pointer transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-container-low opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-fluid-xs">
          <span className="font-mono text-[11px] sm:text-fluid-xs text-muted-steel block font-medium transition-colors">Properties Managed</span>
          <div className="p-fluid-3xs bg-surface-container-low rounded-md group-hover:bg-deep-slate group-hover:text-pure-surface transition-colors duration-300">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-deep-slate group-hover:text-pure-surface transition-colors" />
          </div>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center mt-2 mb-2">
           <div className="flex items-baseline gap-3">
             <span className="font-mono font-bold text-5xl md:text-6xl text-deep-slate tracking-tighter">18</span>
             <span className="font-mono text-[10px] font-bold text-emerald-trust flex items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
               <TrendingUp className="w-3 h-3 mr-1" /> +2 this mo
             </span>
           </div>
           
           <div className="mt-1 flex items-center gap-1.5 opacity-80">
             <MapPin className="w-3 h-3 text-muted-steel" />
             <span className="text-[11px] text-muted-steel font-medium">
               Properties across 6 locations
             </span>
           </div>
           
           <div className="flex gap-2 items-end h-8 mt-4 pl-1">
             <Building2 className="w-4 h-4 text-slate-300" />
             <Building2 className="w-4 h-4 text-slate-300" />
             <Building2 className="w-5 h-5 text-slate-400" />
             <Building2 className="w-6 h-6 text-slate-500" />
             <Building2 className="w-7 h-7 text-deep-slate" />
           </div>
        </div>

        <div className="flex items-center justify-between mt-fluid-xs pt-fluid-3xs border-t border-whisper-border/50 relative z-10">
          <span className="text-[10px] text-muted-steel font-mono font-medium">Active Contracts</span>
          <span className="text-[10px] font-mono font-bold text-deep-slate">
            18
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
