'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { month: 'Jun', expiring: 2, monthsAway: 0 },
  { month: 'Jul', expiring: 5, monthsAway: 1 },
  { month: 'Aug', expiring: 1, monthsAway: 2 },
  { month: 'Sep', expiring: 8, monthsAway: 3 },
  { month: 'Oct', expiring: 3, monthsAway: 4 },
  { month: 'Nov', expiring: 0, monthsAway: 5 },
  { month: 'Dec', expiring: 12, monthsAway: 6 },
];

const getBarColor = (monthsAway: number) => {
  if (monthsAway < 1) return '#E24B4A'; // Red
  if (monthsAway <= 3) return '#EF9F27'; // Amber
  return '#639922'; // Green
};

export function LeaseExpirations() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper hover:shadow-whisper-hover transition-shadow duration-300">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate font-medium">Lease Expiration Timeline</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 font-medium">Upcoming Leases (Next 7 Months)</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#E24B4A]"></div>
                <span className="text-[10px] text-muted-steel font-mono font-medium">Urgent &lt;30 days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#EF9F27]"></div>
                <span className="text-[10px] text-muted-steel font-mono font-medium">Soon 30-90 days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#639922]"></div>
                <span className="text-[10px] text-muted-steel font-mono font-medium">Planned 90+ days</span>
              </div>
            </div>
        </div>
      </div>

      <div className="flex-grow min-h-[220px] max-h-[280px] lg:max-h-[300px] w-full relative mt-2 overflow-x-auto overflow-y-hidden no-scrollbar">
        <div className="min-w-[500px] lg:min-w-0 h-[220px] lg:h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-jetbrains-mono)' }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'var(--font-jetbrains-mono)' }} 
              />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-jetbrains-mono)',
                  color: '#f8fafc',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="expiring" name="Expiring Leases" radius={[2, 2, 0, 0]} maxBarSize={48} minPointSize={32} fill="#64748b">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.monthsAway)} />
                ))}
                <LabelList dataKey="expiring" position="top" style={{ fill: '#64748b', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 text-center">
        <a href="/properties?filter=expiring" className="text-[11px] font-mono font-bold text-muted-steel hover:text-deep-slate transition-colors inline-flex items-center">
          View expiring leases →
        </a>
      </div>
    </div>
  );
}
