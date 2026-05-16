import { Search, AlertTriangle, Bell, Menu } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-pure-surface/90 backdrop-blur-md border-b border-whisper-border flex justify-between items-center h-16 px-4 lg:px-6 w-full gap-4">
      <div className="flex items-center flex-1">
        <button 
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="p-1.5 rounded-md hover:bg-surface-container-low text-muted-steel hover:text-deep-slate transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="flex items-center gap-2 bg-surface-container-low/50 border border-whisper-border rounded-full h-10 px-4 focus-within:border-muted-steel/50 focus-within:bg-pure-surface transition-all">
          <Search className="w-4 h-4 text-muted-steel flex-shrink-0" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm font-body w-full text-deep-slate placeholder:text-muted-steel outline-none h-full" 
            placeholder="Search operational data..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 lg:gap-4 flex-1">
        <button aria-label="Alerts" className="p-2 rounded-full text-muted-steel hover:bg-surface-container-low hover:text-deep-slate transition-all relative group">
          <AlertTriangle className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full pointer-events-none border-2 border-pure-surface group-hover:border-surface-container-low transition-colors"></span>
          
          <div className="absolute top-full mt-2 right-0 w-64 bg-pure-surface border border-whisper-border rounded-lg shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] p-3 hidden group-hover:block text-left opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <p className="font-mono text-[10px] text-error font-bold mb-2 uppercase tracking-widest bg-error/10 inline-block px-2 py-0.5 rounded">Alerts</p>
            <div className="space-y-2">
              <p className="text-xs text-deep-slate border-b border-whisper-border pb-2">3 leases expiring in 30 days</p>
              <p className="text-xs text-deep-slate">₦4.2M overdue rent (Ikoyi)</p>
            </div>
          </div>
        </button>
        
        <button aria-label="Notifications" className="p-2 rounded-full text-muted-steel hover:bg-surface-container-low hover:text-deep-slate transition-all relative group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-trust rounded-full border-2 border-pure-surface group-hover:border-surface-container-low transition-colors"></span>
        </button>
        
        <button aria-label="User Profile" className="w-9 h-9 rounded-full border border-whisper-border overflow-hidden bg-surface-dim flex-shrink-0 hover:ring-2 hover:ring-deep-slate hover:border-transparent transition-all ml-2 cursor-pointer relative group">
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
