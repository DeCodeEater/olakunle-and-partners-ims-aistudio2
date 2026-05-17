'use client';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const data = [
  { quarter: 'Q1', 'Sola Adebayo — 37 deals YTD': 12, 'Emeka Okafor — 38 deals YTD': 8, 'Amina Yusuf — 39 deals YTD': 15 },
  { quarter: 'Q2', 'Sola Adebayo — 37 deals YTD': 15, 'Emeka Okafor — 38 deals YTD': 12, 'Amina Yusuf — 39 deals YTD': 10 },
  { quarter: 'Q3', 'Sola Adebayo — 37 deals YTD': 10, 'Emeka Okafor — 38 deals YTD': 18, 'Amina Yusuf — 39 deals YTD': 14 },
  { quarter: 'Q4 (Proj)', 'Sola Adebayo — 37 deals YTD': 18, 'Emeka Okafor — 38 deals YTD': 15, 'Amina Yusuf — 39 deals YTD': 20 },
];

export function FacilitatorPerformance() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate font-medium">Facilitator Performance</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 font-medium">Deals Closed by Quarter</p>
        </div>
      </div>

      <div className="flex-grow w-full relative mt-2 hidden sm:block h-[220px] lg:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <pattern id="patternSola" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line stroke="#0f172a" strokeWidth="3" y2="6"/>
              </pattern>
              <pattern id="patternEmeka" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line stroke="#10b981" strokeWidth="3" y2="6"/>
              </pattern>
              <pattern id="patternAmina" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line stroke="#94a3b8" strokeWidth="3" y2="6"/>
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="quarter" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                fontSize: '12px',
                fontFamily: 'var(--font-jetbrains-mono)',
                boxShadow: 'var(--shadow-whisper)'
              }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend 
               wrapperStyle={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains-mono)', paddingTop: '20px' }}
               iconType="circle"
               iconSize={8}
            />
            <ReferenceLine y={12} stroke="#cbd5e1" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Target (12)', fill: '#64748b', fontSize: 10 }} />
            
            <Bar dataKey="Sola Adebayo — 37 deals YTD" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={`sola-${index}`} fill={entry.quarter.includes('Proj') ? "url(#patternSola)" : "#0f172a"} />
              ))}
            </Bar>
            <Bar dataKey="Emeka Okafor — 38 deals YTD" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={`emeka-${index}`} fill={entry.quarter.includes('Proj') ? "url(#patternEmeka)" : "#10b981"} />
              ))}
            </Bar>
            <Bar dataKey="Amina Yusuf — 39 deals YTD" radius={[2, 2, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={`amina-${index}`} fill={entry.quarter.includes('Proj') ? "url(#patternAmina)" : "#94a3b8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="sm:hidden flex flex-col gap-4 mt-2">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[11px] font-mono font-medium">
              <span>1. Amina Yusuf</span>
              <span>39 deals</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[75%] border-l border-dashed border-slate-300 z-10" title="Target (48 YTD)"></div>
              <div className="h-full bg-slate-400 rounded-full" style={{ width: '81.25%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-muted-steel font-mono mt-1">
              <span>Rank 1</span>
              <span>81% to Target</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[11px] font-mono font-medium">
              <span>2. Emeka Okafor</span>
              <span>38 deals</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[75%] border-l border-dashed border-slate-300 z-10" title="Target (48 YTD)"></div>
              <div className="h-full bg-emerald-trust rounded-full" style={{ width: '79.1%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-muted-steel font-mono mt-1">
              <span>Rank 2</span>
              <span>79% to Target</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[11px] font-mono font-medium">
              <span>3. Sola Adebayo</span>
              <span>37 deals</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-[75%] border-l border-dashed border-slate-300 z-10" title="Target (48 YTD)"></div>
              <div className="h-full bg-deep-slate rounded-full" style={{ width: '77%' }}></div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-muted-steel font-mono mt-1">
              <span>Rank 3</span>
              <span>77% to Target</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-2 text-center">
        <span className="text-[10px] text-muted-steel font-mono italic">* Q4 contains projected data</span>
      </div>
    </div>
  );
}
