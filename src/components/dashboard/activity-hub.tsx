import { ArrowRightLeft, Verified, FileText } from 'lucide-react';

const activities = [
  {
    title: 'New Lease Signed - Unit 4B',
    subtitle: 'Victoria Island Plaza • 2hrs ago',
    type: 'Lease',
    typeColor: 'bg-emerald-trust/20 text-emerald-trust border border-emerald-trust/30',
    indicatorColor: 'bg-emerald-trust'
  },
  {
    title: 'Commission Payout',
    subtitle: 'Ikoyi Residence Sale • 1d ago',
    type: 'Finance',
    typeColor: 'bg-pure-surface/10 text-pure-surface border border-pure-surface/20',
    indicatorColor: 'bg-surface-dim'
  },
  {
    title: 'Document Uploaded',
    subtitle: 'Lekki Commercial Hub C-of-O • 2d ago',
    type: 'Doc',
    typeColor: 'bg-pure-surface/10 text-pure-surface border border-pure-surface/20',
    indicatorColor: 'bg-surface-dim'
  }
];

export function ActivityHub() {
  return (
    <div className="bg-deep-slate text-pure-surface rounded-lg p-fluid-s lg:p-fluid-m flex flex-col md:flex-row gap-fluid-m shadow-sm h-full">
      <div className="md:w-[35%] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-fluid-s">
            <div>
              <h3 className="font-headline text-fluid-lg uppercase tracking-tight font-medium w-full truncate">Transactions Hub</h3>
              <p className="font-mono text-fluid-xs text-surface-dim/70 uppercase mt-1 tracking-widest">Recent Actions</p>
            </div>
            <div className="p-2 bg-pure-surface/10 rounded-md shrink-0 ml-2">
              <ArrowRightLeft className="text-pure-surface w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-fluid-s">
            <div className="bg-pure-surface/5 rounded-md p-3 border border-pure-surface/10 hover:border-pure-surface/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-surface-dim font-bold">Sales</span>
                <Verified className="w-3 h-3 text-emerald-trust" />
              </div>
              <div className="flex justify-between items-end">
                <div className="font-mono text-xl font-bold leading-none tracking-tight">12</div>
                <span className="text-[9px] font-mono text-surface-dim/60">This Mo</span>
              </div>
            </div>
            
            <div className="bg-pure-surface/5 rounded-md p-3 border border-pure-surface/10 hover:border-pure-surface/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-surface-dim font-bold">Leases</span>
                <FileText className="w-3 h-3 text-surface-dim" />
              </div>
              <div className="flex justify-between items-end">
                <div className="font-mono text-xl font-bold leading-none tracking-tight">8</div>
                <span className="text-[9px] font-mono text-surface-dim/60">Last 30d</span>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-pure-surface/5 hover:bg-pure-surface/10 border border-pure-surface/10 text-center text-[10px] font-mono font-bold text-pure-surface uppercase tracking-widest transition-all duration-300 py-3 rounded group mt-4">
          View All <span className="inline-block transform group-hover:translate-x-1 transition-transform ml-1">→</span>
        </button>
      </div>

      <div className="md:w-[65%] flex flex-col md:border-l border-t md:border-t-0 border-pure-surface/10 pt-6 md:pt-0 md:pl-fluid-m">
        <div className="flex justify-between items-end border-b border-pure-surface/10 pb-2 mb-2">
          <h4 className="font-mono text-[11px] font-bold uppercase text-pure-surface tracking-widest flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-trust mr-2 inline-block animate-pulse"></span>
            Live Actions
          </h4>
        </div>
        
        <div className="space-y-1">
          {activities.map((act, i) => (
            <div key={i} className="flex justify-between items-center group cursor-default py-2 border-b border-pure-surface/5 last:border-0 hover:bg-pure-surface/5 px-2 -mx-2 rounded transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${act.indicatorColor} group-hover:scale-125 transition-transform`}></div>
                <div>
                  <p className="font-body text-fluid-sm font-medium text-pure-surface opacity-90">{act.title}</p>
                  <p className="text-[9px] font-mono text-surface-dim/60 mt-0.5 tracking-wider uppercase">{act.subtitle}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-bold flex-shrink-0 ${act.typeColor}`}>
                {act.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
