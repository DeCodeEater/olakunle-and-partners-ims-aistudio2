'use client';

import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { label: '2019', revenue: 1200000000 },
  { label: '2020', revenue: 1500000000 },
  { label: '2021', revenue: 2100000000 },
  { label: '2022', revenue: 2800000000 },
  { label: '2023', revenue: 1900000000 },
  { label: '2024', revenue: 3420000000 },
];

const periodDataMapping: Record<string, { income: string, espenses: string, margin: string, chart: { label: string, revenue: number }[] }> = {
  '1M': { 
    income: '₦142.5M', espenses: '₦64.1M', margin: '55%', 
    chart: [
      { label: 'Week 1', revenue: 30000000 },
      { label: 'Week 2', revenue: 35000000 },
      { label: 'Week 3', revenue: 32000000 },
      { label: 'Week 4', revenue: 45500000 }
    ] 
  },
  '3M': { 
    income: '₦428.5M', espenses: '₦184.2M', margin: '57%', 
    chart: [
      { label: 'Sep', revenue: 135000000 },
      { label: 'Oct', revenue: 142000000 },
      { label: 'Nov', revenue: 151500000 }
    ] 
  },
  '6M': { 
    income: '₦812.3M', espenses: '₦410.1M', margin: '49%', 
    chart: [
      { label: 'Jun', revenue: 120000000 },
      { label: 'Jul', revenue: 130000000 },
      { label: 'Aug', revenue: 125000000 },
      { label: 'Sep', revenue: 135000000 },
      { label: 'Oct', revenue: 142000000 },
      { label: 'Nov', revenue: 160300000 }
    ] 
  },
  'YTD': { 
    income: '₦1.2B', espenses: '₦584.2M', margin: '51%', 
    chart: [
      { label: 'Jan', revenue: 95000000 },
      { label: 'Feb', revenue: 102000000 },
      { label: 'Mar', revenue: 110000000 },
      { label: 'Apr', revenue: 108000000 },
      { label: 'May', revenue: 115000000 },
      { label: 'Jun', revenue: 120000000 },
      { label: 'Jul', revenue: 130000000 },
      { label: 'Aug', revenue: 125000000 },
      { label: 'Sep', revenue: 135000000 },
      { label: 'Oct', revenue: 142000000 },
      { label: 'Nov', revenue: 160300000 }
    ] 
  },
  'ALL': { 
    income: '₦5.4B', espenses: '₦2.1B', margin: '61%', 
    chart: data 
  },
};

export function FinancialChart() {
  const [period, setPeriod] = useState('3M');
  
  const currentData = periodDataMapping[period];

  const formatCurrencyFriendly = (val: number) => {
    if (val === 0) return '0';
    if (val >= 1000000000) return `₦${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `₦${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `₦${(val / 1000).toFixed(0)}k`;
    return `₦${val}`;
  };

  const formatCurrencyPrecise = (val: number) => {
    if (val === 0) return '0';
    if (val >= 1000000000) return `₦${(val / 1000000000).toFixed(2)}B`;
    if (val >= 1000000) return `₦${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `₦${(val / 1000).toFixed(0)}k`;
    return `₦${val}`;
  };

  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex flex-col mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-fluid-xs w-full">
          <div>
            <h3 className="font-headline text-fluid-lg text-deep-slate font-medium tracking-tight">Financial Performance</h3>
            <p className="font-mono text-fluid-xs text-muted-steel mt-1 font-medium">All figures below reflect the selected period.</p>
          </div>
          
          <div className="flex bg-surface-container-low p-1 rounded-full gap-1 self-start md:self-auto overflow-x-auto max-w-full no-scrollbar">
            {['1M', '3M', '6M', 'YTD', 'ALL'].map((t) => (
              <button 
                key={t} 
                onClick={() => setPeriod(t)}
                className={`px-3 sm:px-4 min-h-[44px] lg:min-h-0 h-10 lg:h-8 flex items-center justify-center font-mono text-[11px] rounded-full transition-all font-medium shrink-0 ${period === t ? 'bg-deep-slate text-pure-surface shadow-sm' : 'text-muted-steel hover:text-deep-slate hover:bg-pure-surface hover:shadow-sm'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 flex-grow mt-2">
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-mono text-[11px] font-bold text-deep-slate uppercase tracking-widest border-b-2 border-deep-slate pb-1 inline-block">Business Revenue Growth</h4>
            <span className="text-[10px] font-mono text-muted-steel uppercase font-medium bg-surface-container-low px-2 py-1 rounded">Current: {formatCurrencyPrecise(currentData.chart[currentData.chart.length - 1].revenue)}</span>
          </div>
          
          <div className="flex-grow w-full relative sm:block h-[220px] lg:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.chart} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="label" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-jetbrains-mono)' }} 
                  dy={16} 
                  minTickGap={20}
                />
                <YAxis 
                   tickFormatter={formatCurrencyFriendly}
                   axisLine={false}
                   tickLine={false}
                   tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-jetbrains-mono)' }}
                   width={60}
                />
                <Tooltip 
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '6px', color: '#ffffff', fontFamily: 'var(--font-jetbrains-mono)', fontSize: '12px' }}
                  itemStyle={{ color: '#ffffff' }}
                  formatter={(value: number) => [formatCurrencyPrecise(value), 'Revenue']}
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

        <div className="border-t lg:border-t-0 lg:border-l border-whisper-border pt-6 lg:pt-0 lg:pl-10 xl:pl-12 flex flex-col justify-center gap-6">
          <h4 className="font-mono text-[11px] font-bold text-deep-slate uppercase tracking-widest border-b border-whisper-border pb-3">Income vs. Expense</h4>
          
          <div className="space-y-1">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Gross Income ({period})</p>
            <p className="font-mono font-bold text-[32px] leading-none text-emerald-trust">{currentData.income}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Total Expenses ({period})</p>
            <p className="font-mono font-bold text-2xl leading-none text-deep-slate tracking-tight">{currentData.espenses}</p>
          </div>
          
          <div className="mt-2">
            <div className="w-full flex h-3 bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-trust transition-all duration-500" style={{ width: currentData.margin }} title={`Margin: ${currentData.margin}`}></div>
               <div className="h-full bg-deep-slate transition-all duration-500" style={{ width: `${100 - parseInt(currentData.margin)}%` }} title={`Expense: ${100 - parseInt(currentData.margin)}%`}></div>
            </div>
            <div className="flex justify-between text-[9px] font-mono text-muted-steel mt-2">
               <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-trust"></span> Margin ({currentData.margin})</div>
               <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-deep-slate"></span> Expense ({100 - parseInt(currentData.margin)}%)</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-5 border-t border-whisper-border/50 mt-auto">
            <p className="text-[10px] text-muted-steel uppercase font-mono tracking-widest font-medium">Operating Margin ({period})</p>
            <span className="bg-emerald-trust/10 text-emerald-trust border border-emerald-trust/20 text-[11px] font-mono font-bold px-3 py-1 rounded">
              {currentData.margin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
