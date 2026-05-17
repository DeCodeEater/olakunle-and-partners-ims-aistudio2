import { Bell, Menu, Clock, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-pure-surface/90 backdrop-blur-md border-b border-whisper-border flex justify-between items-center h-16 px-4 lg:px-6 w-full gap-4">
      <div className="flex items-center flex-1 lg:hidden">
        <button 
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-surface-container-low text-muted-steel hover:text-deep-slate transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 hidden sm:block lg:ml-0">
        <h2 className="font-headline text-lg text-deep-slate leading-tight tracking-tight font-medium">
          Good morning, Olakunle
        </h2>
        <p suppressHydrationWarning className="text-muted-steel text-xs font-mono">
          Today is {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2 lg:gap-4 flex-1">
        <div className="relative group">
          <button aria-label="Notifications" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-muted-steel hover:bg-surface-container-low hover:text-deep-slate transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-600 border-2 border-pure-surface text-[10px] font-bold text-white flex items-center justify-center rounded-full pointer-events-none group-hover:border-surface-container-low transition-colors">3</span>
          </button>
          
          <div className="absolute top-full mt-2 right-[-60px] sm:right-0 w-[320px] bg-pure-surface border border-whisper-border rounded-xl shadow-lg p-0 hidden group-hover:block text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 overflow-hidden z-50">
            <div className="bg-slate-50 border-b border-whisper-border p-3 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-deep-slate">Notifications (3)</span>
              <button className="text-[10px] min-h-[44px] min-w-[44px] justify-end font-mono text-slate-500 hover:text-deep-slate uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Mark all read</button>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Clock className="w-3 h-3" /></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">Urgent</span>
                    <span className="text-[10px] text-slate-400">1h ago</span>
                  </div>
                  <p className="text-xs font-medium text-deep-slate">3 leases expiring in &lt;30 days</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Victoria Island Plaza, Lekki Comm Hub</p>
                </div>
              </div>
              
              <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 bg-amber-50/30">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[12px] font-serif font-bold">₦</span></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600">Action Required</span>
                    <span className="text-[10px] text-slate-400">4h ago</span>
                  </div>
                  <p className="text-xs font-medium text-deep-slate">₦4.2M overdue rent</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ikoyi Residence Unit 3A</p>
                </div>
              </div>

              <div className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5"><FileText className="w-3 h-3" /></div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Informational</span>
                    <span className="text-[10px] text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-xs font-medium text-deep-slate">3 new documents uploaded</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">C-of-O and survey plan</p>
                </div>
              </div>
            </div>
            
            <Link href="/notifications" className="w-full bg-slate-50 text-center text-xs font-medium text-blue-600 hover:text-blue-700 py-3 min-h-[44px] border-t border-whisper-border transition-colors flex items-center justify-center gap-1">
              View all notifications <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
        
        <button aria-label="User Profile" className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-whisper-border overflow-hidden bg-surface-dim flex-shrink-0 hover:ring-2 hover:ring-deep-slate hover:border-transparent transition-all ml-2 cursor-pointer relative group">
          <Image 
            src="https://picsum.photos/seed/avatar/100/100" 
            alt="User Avatar" 
            width={36} 
            height={36}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
}
