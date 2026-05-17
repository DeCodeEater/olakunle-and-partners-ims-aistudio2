'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Receipt, Users, Grid, FileText, Banknote, Landmark, BarChart2, Settings, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dash' },
  { href: '/properties', icon: Building2, label: 'Properties' },
  { href: '/activity', icon: Receipt, label: 'Transactions', count: 3 },
  { href: '/people/landlords', icon: Users, label: 'People' },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreItems = [
    { href: '/documents', icon: FileText, label: 'Documents' },
    { href: '/finance/commissions', icon: Banknote, label: 'Commissions' },
    { href: '/finance/taxes', icon: Landmark, label: 'Taxes' },
    { href: '/finance/reports', icon: BarChart2, label: 'Financial Reports' },
    { href: '#', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-pure-surface border-t border-whisper-border z-[60] px-2 pb-safe pt-1 flex justify-between items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] min-h-[56px] pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col flex-1 items-center justify-center p-2 pt-2.5 rounded-lg transition-colors relative ${
                isActive ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate hover:bg-surface-container-low/50'
              }`}
            >
              <div className="relative">
                <item.icon className="w-[22px] h-[22px] mb-1 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
                {item.count && (
                  <span className="absolute -top-1.5 -right-2 bg-error text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-pure-surface z-20">
                    {item.count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-deep-slate rounded-b-full"></div>
              )}
            </Link>
          );
        })}
        
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex flex-col flex-1 items-center justify-center p-2 pt-2.5 rounded-lg transition-colors relative ${
            isMoreOpen ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate hover:bg-surface-container-low/50'
          }`}
        >
          <Grid className="w-[22px] h-[22px] mb-1 relative z-10" strokeWidth={isMoreOpen ? 2.5 : 2} />
          <span className={`text-[10px] sm:text-[11px] mt-0.5 ${isMoreOpen ? 'font-bold' : 'font-medium'}`}>More</span>
          {isMoreOpen && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-deep-slate rounded-b-full"></div>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 bg-deep-slate/40 backdrop-blur-sm z-[55] lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-[max(56px,env(safe-area-inset-bottom)+56px)] pb-4 left-0 right-0 bg-pure-surface rounded-t-2xl z-[55] shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.15)] lg:hidden overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-whisper-border">
                <h3 className="font-headline font-bold text-lg text-deep-slate">More Options</h3>
                <button 
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 -mr-2 bg-surface-container-low text-deep-slate rounded-full hover:bg-slate-200 transition-colors min-w-[44px] min-h-[44px] flex justify-center items-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex flex-col py-2 px-3 safe-bottom overflow-y-auto max-h-[50vh]">
                {moreItems.map((item, index) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-4 p-3 min-h-[44px] rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-deep-slate group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className="font-medium text-deep-slate text-base flex-1">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-deep-slate transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
