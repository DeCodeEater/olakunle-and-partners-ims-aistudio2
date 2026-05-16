'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Utilities', amount: 450 },
  { category: 'Repairs', amount: 820 },
  { category: 'Legal', amount: 350 },
  { category: 'Marketing', amount: 600 },
  { category: 'Admin', amount: 250 },
];

export function RecentExpenses() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Recent Expenses</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Operating Costs</p>
        </div>
      </div>

      <div className="flex-grow min-h-[220px] w-full relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              hide 
            />
            <YAxis 
              type="category" 
              dataKey="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#7a757f', fontFamily: 'monospace' }} 
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '12px',
                fontFamily: 'var(--font-jetbrains-mono)',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`₦${value}k`, 'Amount']}
            />
            <Bar dataKey="amount" fill="#0f172a" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
