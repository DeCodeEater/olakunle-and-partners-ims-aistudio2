'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, ReferenceLine } from 'recharts';

const data = [
  { category: 'Utilities', amount: 450, budget: 500 },
  { category: 'Repairs', amount: 820, budget: 600 },
  { category: 'Legal', amount: 350, budget: 400 },
  { category: 'Marketing', amount: 600, budget: 600 },
  { category: 'Admin', amount: 250, budget: 300 },
];

export function RecentExpenses() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate font-medium">Recent Expenses</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 font-medium">Operating Costs vs Budget</p>
        </div>
      </div>

      <div className="flex-grow w-full relative mt-2 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
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
              formatter={(value, name, props) => {
                if (name === 'amount') return [`₦${value}k`, 'Amount'];
                if (name === 'budget') return [`₦${value}k`, 'Budget'];
                return [value, name];
              }}
            />
            <ReferenceLine x={600} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Budget Limit', fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.amount > entry.budget ? '#E24B4A' : '#0f172a'} />
              ))}
              <LabelList dataKey="amount" position="right" formatter={(val: number) => `₦${val}k`} style={{ fill: '#64748b', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
