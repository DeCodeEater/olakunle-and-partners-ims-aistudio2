'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jun', expiring: 2 },
  { month: 'Jul', expiring: 5 },
  { month: 'Aug', expiring: 1 },
  { month: 'Sep', expiring: 8 },
  { month: 'Oct', expiring: 3 },
  { month: 'Nov', expiring: 0 },
  { month: 'Dec', expiring: 12 },
];

export function LeaseExpirations() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper hover:shadow-whisper-hover transition-shadow duration-300">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Lease Expiration Timeline</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Upcoming Leases (Next 7 Months)</p>
        </div>
      </div>

      <div className="flex-grow h-[300px] w-full relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
            <Bar dataKey="expiring" name="Expiring Leases" fill="#0f172a" radius={[2, 2, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
