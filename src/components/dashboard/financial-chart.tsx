'use client';

import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2019', revenue: 1200000000 },
  { year: '2020', revenue: 1500000000 },
  { year: '2021', revenue: 2100000000 },
  { year: '2022', revenue: 2800000000 },
  { year: '2023', revenue: 1900000000 },
  { year: '2024', revenue: 3420000000 },
];

export function FinancialChart() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-fluid-s gap-fluid-xs border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Financial Performance</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Income vs. Expense & Yield Velocity</p>
        </div>
        
        <div className="flex bg-surface-container-low p-1 rounded gap-1 self-start md:self-auto">
          {['1W', '1M'].map((t) => (
            <button key={t} className="px-4 py-1.5 font-mono text-[10px] rounded hover:bg-pure-surface hover:shadow-whisper transition-all font-medium text-muted-steel hover:text-deep-slate">{t}</button>
          ))}
          <button className="px-4 py-1.5 font-mono text-[10px] rounded bg-deep-slate text-pure-surface font-medium border border-deep-slate shadow-whisper">3M</button>
          {['6M', 'YTD', 'ALL'].map((t) => (
            <button key={t} className="px-4 py-1.5 font-mono text-[10px] rounded hover:bg-pure-surface hover:shadow-whisper transition-all font-medium text-muted-steel hover:text-deep-slate">{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 flex-grow">
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-mono text-[11px] font-bold text-deep-slate uppercase tracking-widest border-b-2 border-deep-slate pb-1 inline-block">Business Revenue Growth</h4>
            <span className="text-[10px] font-mono text-muted-steel uppercase font-medium bg-surface-container-low px-2 py-1 rounded">VOL: ₦3.42B AVG</span>
          </div>
          
          <div className="flex-grow min-h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-jetbrains-mono)' }} 
                  dy={16} 
                />
                <Tooltip 
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '6px', color: '#ffffff', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px' }}
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(value: number) => [`₦${(value / 1000000000).toFixed(2)}B`, 'Revenue']}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0f172a" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  activeDot={{ r: 5, fill: '#0f172a', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-whisper-border pt-6 lg:pt-0 lg:pl-10 xl:pl-12 flex flex-col justify-center gap-8">
          <h4 className="font-mono text-[11px] font-bold text-deep-slate uppercase tracking-widest border-b border-whisper-border pb-3">Income vs. Expense</h4>
          
          <div className="space-y-1">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Gross Income</p>
            <p className="font-mono font-bold text-[32px] leading-none text-emerald-trust">₦428.5M</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Total Expenses</p>
            <p className="font-mono font-bold text-2xl leading-none text-deep-slate tracking-tight">₦184.2M</p>
          </div>
          
          <div className="flex items-center justify-between pt-5 border-t border-whisper-border/50 mt-auto">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Operating Margin</p>
            <span className="bg-emerald-trust/10 text-emerald-trust border border-emerald-trust/20 text-[11px] font-mono font-bold px-3 py-1 rounded">
              57%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
