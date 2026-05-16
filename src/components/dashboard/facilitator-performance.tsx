'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { quarter: 'Q1', 'Sola Adebayo': 12, 'Emeka Okafor': 8, 'Amina Yusuf': 15 },
  { quarter: 'Q2', 'Sola Adebayo': 15, 'Emeka Okafor': 12, 'Amina Yusuf': 10 },
  { quarter: 'Q3', 'Sola Adebayo': 10, 'Emeka Okafor': 18, 'Amina Yusuf': 14 },
  { quarter: 'Q4', 'Sola Adebayo': 18, 'Emeka Okafor': 15, 'Amina Yusuf': 20 },
];

export function FacilitatorPerformance() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Facilitator Performance</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Deals Closed by Quarter</p>
        </div>
      </div>

      <div className="flex-grow min-h-[220px] w-full relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
            <Bar dataKey="Sola Adebayo" fill="#0f172a" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Emeka Okafor" fill="#10b981" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="Amina Yusuf" fill="#94a3b8" radius={[2, 2, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
