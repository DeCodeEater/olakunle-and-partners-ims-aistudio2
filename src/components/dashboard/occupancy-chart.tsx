'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Key, TrendingUp, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function OccupancyChart() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const data = [
    { name: 'Occupied', value: 87, fill: '#0f172a' },
    { name: 'Vacant', value: 13, fill: '#f3f0f2' } 
  ];

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

        <div className="relative z-10 flex-grow w-full h-[80px] min-h-[80px] mt-2 mb-2 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center gap-4">
             <div className="w-[80px] h-[80px] flex-shrink-0 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={data}
                     cx="50%"
                     cy="50%"
                     innerRadius={28}
                     outerRadius={40}
                     stroke="none"
                     dataKey="value"
                   >
                     {data.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#141f30', border: 'none', borderRadius: '4px', fontSize: '10px', color: '#fff', padding: '4px' }}
                     itemStyle={{ color: '#fff' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="font-mono font-bold text-sm text-deep-slate">87%</span>
               </div>
             </div>
             
             <div className="flex flex-col gap-1.5 justify-center">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-sm bg-deep-slate"></div>
                 <span className="font-mono text-[10px] text-deep-slate font-bold">87 Units Occ.</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-sm bg-whisper-border"></div>
                 <span className="font-mono text-[10px] text-muted-steel font-medium">13 Units Vac.</span>
               </div>
             </div>
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
