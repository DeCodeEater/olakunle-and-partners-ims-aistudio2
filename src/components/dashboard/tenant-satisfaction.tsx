'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Maintenance', A: 85, fullMark: 100 },
  { subject: 'Cleanliness', A: 90, fullMark: 100 },
  { subject: 'Security', A: 96, fullMark: 100 },
  { subject: 'Response Time', A: 78, fullMark: 100 },
  { subject: 'Amenities', A: 88, fullMark: 100 },
];

export function TenantSatisfaction() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper hover:shadow-whisper-hover transition-shadow duration-300">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Tenant Satisfaction</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Quarterly Survey Results</p>
        </div>
      </div>

      <div className="flex-grow min-h-[220px] w-full relative mt-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'var(--font-jetbrains-mono)' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip
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
            <Radar name="Satisfaction Score" dataKey="A" stroke="#0f172a" fill="#0f172a" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
