'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Building2, FileText, Receipt, 
  PlusCircle, RefreshCw, Tag, Building, FilePlus, ArrowRightLeft,
  UserCheck, User, Users, IdCard, ChevronDown, Settings, HelpCircle,
  Banknote, Landmark, BarChart2, Plus, X, Zap 
} from 'lucide-react';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItem = ({ href, icon: Icon, children, isActive = false, fillOnActive = false }: { href: string; icon: React.ElementType; children: React.ReactNode; isActive?: boolean; fillOnActive?: boolean }) => {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-3.5 px-8 py-3 min-h-[44px] transition-all duration-300 relative focus:outline-none">
        {isActive && (
          <motion.div 
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-0 bottom-0 w-1 bg-deep-slate rounded-r" 
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <div className={`absolute inset-0 right-4 ml-6 rounded-md opacity-0 transition-opacity duration-300 ${isActive ? 'bg-surface-dim/30 opacity-100' : 'group-hover:bg-surface-container-low/80 group-hover:opacity-100'}`} />
        <Icon 
          className={`w-[18px] h-[18px] relative z-10 transition-colors duration-300 ${isActive ? "text-deep-slate" : "text-muted-steel group-hover:text-deep-slate"} ${isActive && fillOnActive ? "fill-current" : ""}`} 
          strokeWidth={isActive ? 2.5 : 2} 
        />
        <span className={`text-[13px] relative z-10 transition-colors duration-300 ${isActive ? 'font-bold text-deep-slate' : 'font-medium text-muted-steel group-hover:text-deep-slate'}`}>
          {children}
        </span>
      </Link>
    </li>
  );
}

const CollapsibleSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between px-8 mb-1 py-2 min-h-[44px] group focus:outline-none"
      >
        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-[0.15em] font-bold group-hover:text-deep-slate transition-colors">
          {title}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-muted-steel transition-transform duration-200 group-hover:text-deep-slate ${isOpen ? '' : '-rotate-90'}`} 
          strokeWidth={2.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col">
              {children}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const QuickActionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mt-auto px-6 py-4 border-t border-whisper-border flex-shrink-0 bg-pure-surface" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[calc(100%-1rem)] left-6 right-6 bg-white border border-whisper-border rounded-xl shadow-xl p-2 z-50 origin-bottom"
          >
             <div className="px-3 py-2 mb-1 border-b border-whisper-border">
                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-[0.15em] font-bold">New Action</span>
             </div>
             <div className="flex flex-col gap-0.5">
               <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-3 min-h-[44px] text-[13px] font-medium text-deep-slate rounded-lg hover:bg-surface-container-low transition-colors w-full text-left">
                 <Banknote className="w-4 h-4 text-muted-steel" /> New Expense
               </button>
               <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-3 min-h-[44px] text-[13px] font-medium text-deep-slate rounded-lg hover:bg-surface-container-low transition-colors w-full text-left">
                 <Building className="w-4 h-4 text-muted-steel" /> New Property
               </button>
               <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-3 min-h-[44px] text-[13px] font-medium text-deep-slate rounded-lg hover:bg-surface-container-low transition-colors w-full text-left">
                 <FilePlus className="w-4 h-4 text-muted-steel" /> New Document
               </button>
               <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-3 min-h-[44px] text-[13px] font-medium text-deep-slate rounded-lg hover:bg-surface-container-low transition-colors w-full text-left">
                 <ArrowRightLeft className="w-4 h-4 text-muted-steel" /> Change Ownership
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0b1021] text-pure-surface font-mono text-[11px] font-bold py-3.5 min-h-[44px] rounded-lg hover:bg-opacity-90 transition-all active:translate-y-px flex items-center justify-center gap-2 relative z-10"
      >
        <Zap className="w-4 h-4 mt-[1px]" strokeWidth={2.5} />
        QUICK ACTIONS
      </button>
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-deep-slate/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ width: isOpen ? 256 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="hidden lg:block h-screen flex-shrink-0"
      />

      <motion.nav
        initial={false}
        animate={{ x: isOpen ? 0 : -256 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="fixed top-0 left-0 h-screen w-64 bg-pure-surface border-r border-whisper-border flex flex-col py-6 z-50 overflow-hidden shadow-2xl lg:shadow-none"
      >
        <button 
          onClick={onClose}
          aria-label="Close Sidebar"
          className="lg:hidden absolute top-6 right-4 text-muted-steel hover:text-deep-slate z-50"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="px-6 mb-8 flex-shrink-0 hidden lg:flex items-center gap-3">
          <div className="w-9 h-9 flex-shrink-0 bg-deep-slate text-pure-surface border border-whisper-border rounded-lg shadow-sm flex items-center justify-center">
            <span className="font-headline font-bold text-lg tracking-tighter">O</span>
          </div>
          <div>
            <h1 className="font-headline text-lg font-bold text-deep-slate leading-tight tracking-tight">
              Olakunle & Partners
            </h1>
            <p className="font-mono text-[9px] text-muted-steel uppercase tracking-widest">
              Management System
            </p>
          </div>
        </div>
        
        <div className="overflow-y-auto sidebar-scroll flex-grow pb-4 -mx-1">
          <div className="mb-6">
            <h3 className="px-8 mb-2.5 font-mono text-[10px] text-muted-steel uppercase tracking-[0.15em] font-bold">Main</h3>
            <ul className="flex flex-col">
              <NavItem href="/" icon={LayoutDashboard} isActive={pathname === '/'} fillOnActive>Dashboard</NavItem>
              <NavItem href="/properties" icon={Building2} isActive={pathname === '/properties' || pathname?.startsWith('/properties/')}>Properties</NavItem>
              <NavItem href="/documents" icon={FileText} isActive={pathname === '/documents'}>Documents</NavItem>
              <NavItem href="/activity" icon={Receipt} isActive={pathname === '/activity'}>Activity / Transactions</NavItem>
            </ul>
          </div>

          <div className="mb-2">
            <CollapsibleSection title="People">
              <NavItem href="/people/landlords" icon={UserCheck} isActive={pathname === '/people/landlords'}>Landlords</NavItem>
              <NavItem href="/people/tenants" icon={User} isActive={pathname === '/people/tenants'}>Tenants</NavItem>
              <NavItem href="/people/buyers" icon={Users} isActive={pathname === '/people/buyers'}>Buyers</NavItem>
              <NavItem href="/people/facilitators" icon={IdCard} isActive={pathname === '/people/facilitators'}>Facilitators</NavItem>
            </CollapsibleSection>
          </div>

          <div className="mb-6">
            <CollapsibleSection title="Finance">
              <NavItem href="/finance/commissions" icon={Banknote} isActive={pathname === '/finance/commissions'}>Commissions</NavItem>
              <NavItem href="/finance/taxes" icon={Landmark} isActive={pathname === '/finance/taxes'}>Taxes</NavItem>
              <NavItem href="/finance/reports" icon={BarChart2} isActive={pathname === '/finance/reports'}>Financial Reports</NavItem>
            </CollapsibleSection>
          </div>
          
          <div className="mb-2">
            <ul className="flex flex-col">
              <NavItem href="#" icon={Settings}>Settings</NavItem>
              <NavItem href="#" icon={HelpCircle}>Support</NavItem>
            </ul>
          </div>
        </div>

        <QuickActionsMenu />
      </motion.nav>
    </>
  );
}
