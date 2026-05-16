import { PlusCircle, FileEdit, UserPlus, Users, ArrowRight, Building, Key } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    title: 'Add Property',
    subtitle: 'List a new property',
    icon: Building,
    href: '/properties',
    color: 'bg-indigo-50 text-indigo-700',
  },
  {
    title: 'New Lease',
    subtitle: 'Draft a lease agreement',
    icon: FileEdit,
    href: '/rentals/new',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'New Sale',
    subtitle: 'Record a new sale',
    icon: Key,
    href: '/sales/new',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    title: 'Add Client/Lead',
    subtitle: 'Register buyer or tenant',
    icon: UserPlus,
    href: '/people/buyers',
    color: 'bg-amber-50 text-amber-700',
  },
];

export function ActionCenter() {
  return (
    <div className="bg-pure-surface border border-whisper-border rounded-lg p-fluid-s lg:p-fluid-m flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-center mb-fluid-s border-b border-whisper-border pb-fluid-xs">
        <div>
          <h3 className="font-headline text-fluid-lg text-deep-slate uppercase tracking-tight font-medium">Quick Actions</h3>
          <p className="font-mono text-fluid-xs text-muted-steel mt-1 uppercase tracking-widest font-medium">Common Tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-fluid-xs flex-grow">
        {actions.map((action, i) => (
          <Link href={action.href} key={i} className="group block focus:outline-none">
            <div className="border border-whisper-border/60 rounded-md p-fluid-s hover:border-slate-300 hover:shadow-sm transition-all duration-300 bg-surface-container-low/50 hover:bg-pure-surface h-full flex flex-col justify-between">
              <div className="flex items-start justify-between mb-fluid-xs">
                <div className={`p-fluid-3xs rounded-md ${action.color} transition-colors`}>
                  <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <ArrowRight className="w-3 h-3 text-muted-steel opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <div>
                <h4 className="font-body font-medium text-fluid-sm text-deep-slate">{action.title}</h4>
                <p className="font-mono text-[10px] sm:text-fluid-xs text-muted-steel/80 mt-1">{action.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
