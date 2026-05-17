'use client';

import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import Link from 'next/link';

const data = [
  { subject: 'Maintenance', score: 8.5, prevRaw: 8.2 },
  { subject: 'Cleanliness', score: 9.0, prevRaw: 8.8 },
  { subject: 'Security', score: 9.6, prevRaw: 9.6 },
  { subject: 'Response Time', score: 7.2, prevRaw: 7.5 },
  { subject: 'Amenities', score: 8.8, prevRaw: 8.5 },
];

export function TenantSatisfaction() {
  const avgScore = (data.reduce((acc, curr) => acc + curr.score, 0) / data.length).toFixed(1);

  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-whisper hover:shadow-whisper-hover transition-shadow duration-300 relative">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate font-medium">Tenant Satisfaction</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 font-medium">Quarterly Survey Results</p>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-deep-slate">{avgScore}</div>
          <p className="font-mono text-[10px] text-muted-steel">/ 10 avg</p>
        </div>
      </div>

      <div className="flex-grow w-full relative mt-4 flex flex-col justify-center gap-4">
        {/* The 7.5 Target Line Background */}
        <div className="absolute top-0 bottom-0 left-[100px] right-[60px] pointer-events-none">
          <div className="absolute top-[-10px] bottom-[10px] left-[75%] border-l border-dashed border-slate-300 z-0"></div>
          <div className="absolute top-[-24px] left-[75%] -translate-x-1/2 text-[9px] text-slate-400 font-mono bg-pure-surface px-1">7.5 Target</div>
        </div>

        {data.map((item, idx) => {
          const delta = (item.score - item.prevRaw).toFixed(1);
          const isPositive = Number(delta) > 0;
          const isNeutral = Number(delta) === 0;
          const isBelowThreshold = item.score < 7.5;

          return (
            <div key={idx} className="flex flex-col relative z-10 w-full mb-1">
              <div className="flex items-center gap-3 w-full">
                <div className="w-[88px] text-[11px] font-medium text-slate-600 flex-shrink-0 truncate" title={item.subject}>
                  {item.subject}
                </div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden flex relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isBelowThreshold ? 'bg-amber-500' : 'bg-slate-900'}`}
                    style={{ width: `${(item.score / 10) * 100}%` }}
                  />
                </div>
                <div className="w-[50px] flex-shrink-0 flex items-center justify-end gap-1">
                  <span className={`text-[12px] font-bold ${isBelowThreshold ? 'text-amber-600' : 'text-slate-800'}`}>{item.score.toFixed(1)}</span>
                </div>
              </div>
              <div className="pl-[100px] flex items-center gap-1 mt-0.5">
                {isPositive ? <ArrowUp className="w-3 h-3 text-emerald-600" /> : isNeutral ? <Minus className="w-3 h-3 text-slate-400" /> : <ArrowDown className="w-3 h-3 text-red-500" />}
                <span className={`text-[9px] font-mono ${isPositive ? 'text-emerald-600' : isNeutral ? 'text-slate-400' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{delta} vs last qtr
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-whisper-border text-center">
         <Link href="/analytics" className="inline-block w-full sm:w-auto px-4 bg-surface-container-low text-deep-slate font-mono text-[11px] font-bold py-2.5 sm:py-2 rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all focus:outline-none">
           View full survey &rarr;
         </Link>
      </div>
    </div>
  );
}
