import { BarChart2 } from 'lucide-react';

const facilitators = [
  { name: 'Chinedu Okeke', deals: 12, volume: '₦120M', earned: '₦6.0M' },
  { name: 'Aisha Bello', deals: 8, volume: '₦95M', earned: '₦4.7M' },
  { name: 'Tunde Bakare', deals: 15, volume: '₦80M', earned: '₦4.0M' },
  { name: 'Sarah Johnson', deals: 5, volume: '₦65M', earned: '₦3.2M' },
];

export function CommissionAnalytics() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-6 lg:p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-headline text-xl text-deep-slate font-medium">Commission Analytics</h3>
          <p className="font-mono text-[10px] text-muted-steel mt-2 font-medium">Facilitator Performance Matrix</p>
        </div>
        <div className="p-2 bg-surface-container-low rounded-md">
          <BarChart2 className="text-deep-slate w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="border border-whisper-border rounded-md p-4 text-center transition-all hover:bg-surface-container-low/50 hover:border-slate-300">
          <p className="text-[9px] text-muted-steel font-mono mb-2 font-medium">Total Paid (YTD)</p>
          <p className="font-mono font-bold text-[18px] text-deep-slate">₦84.2M</p>
        </div>
        <div className="border border-whisper-border rounded-md p-4 text-center transition-all hover:bg-surface-container-low/50 hover:border-slate-300">
          <p className="text-[9px] text-muted-steel font-mono mb-2 font-medium">Pending</p>
          <p className="font-mono font-bold text-[18px] text-deep-slate">₦18.6M</p>
        </div>
        <div className="border border-whisper-border/50 rounded-md p-4 text-center bg-surface-container-low transition-colors hover:bg-surface-dim/70">
          <p className="text-[9px] text-muted-steel font-mono mb-2 font-medium">Avg Conv.</p>
          <p className="font-mono font-bold text-[18px] text-deep-slate">14.2%</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-end border-b border-whisper-border pb-3 mb-2 mt-auto">
          <h4 className="font-mono text-[11px] font-bold text-deep-slate">
            Top Facilitators
          </h4>
          <span className="text-[9px] font-mono text-muted-steel">This Quarter</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-2 font-mono text-[10px] text-muted-steel font-medium">Agent</th>
                <th className="py-3 px-2 font-mono text-[10px] text-muted-steel font-medium text-right">Deals</th>
                <th className="py-3 px-2 font-mono text-[10px] text-muted-steel font-medium text-right">Volume</th>
                <th className="py-3 px-2 font-mono text-[10px] text-muted-steel font-medium text-right">Earned</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {facilitators.map((f, i) => (
                <tr key={i} className="border-b border-whisper-border/40 hover:bg-surface-container-low transition-colors group last:border-0">
                  <td className="py-4 px-2 text-deep-slate font-body font-medium flex items-center gap-3">
                    <span className="text-[10px] text-muted-steel/50 font-mono">0{i+1}</span>
                    {f.name}
                  </td>
                  <td className="py-4 px-2 text-right font-medium">{f.deals}</td>
                  <td className="py-4 px-2 text-right text-muted-steel">{f.volume}</td>
                  <td className="py-4 px-2 text-right font-bold text-emerald-trust">{f.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
