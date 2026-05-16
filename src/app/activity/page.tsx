'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Receipt, Building2, UserCircle2, Landmark, Wallet, AlertTriangle, X, ArrowUpDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data for Metrics
const metrics = [
  { label: 'Total Transactions', value: '4,284', trend: '+12%', positive: true, desc: 'Volume this month' },
  { label: 'Sales This Month', value: '₦850M', trend: '+5%', positive: true, desc: 'Closed revenue' },
  { label: 'Rent Received', value: '₦42.5M', trend: '+8%', positive: true, desc: 'Collected rent' },
  { label: 'Pending Payments', value: '₦18.2M', trend: '-2%', positive: false, desc: 'Overdue & awaiting' },
  { label: 'Expenses Logged', value: '₦8.4M', trend: '+15%', positive: false, desc: 'Operational costs' },
  { label: 'Commission Payouts', value: '₦42M', trend: '+4%', positive: true, desc: 'Disbursed commissions' },
];

const unifiedData = [
  { id: '1', txId: 'PAY-8842', type: 'Rent Payment', entity: 'Chukwudi Eze', property: 'Azure Heights Unit A4', amount: '₦4.5M', status: 'Completed', date: 'Oct 24, 2023', kind: 'payment', icon: Receipt },
  { id: '2', txId: 'SAL-102', type: 'Property Sale', entity: 'Alhaji Musa', property: 'Lekki Waterfront Villa', amount: '₦450M', status: 'Completed', date: 'Oct 23, 2023', kind: 'sale', icon: Landmark },
  { id: '3', txId: 'PAY-8843', type: 'Service Charge', entity: 'Acme Corp', property: 'Victoria Plaza', amount: '₦1.2M', status: 'Pending', date: 'Oct 15, 2023', kind: 'payment', icon: Wallet },
  { id: '4', txId: 'EVT-091', type: 'Lease Renewal', entity: 'TechNova', property: 'Ikoyi Foreshore', amount: '-', status: 'Signed', date: 'Oct 10, 2023', kind: 'event', icon: Building2 },
  { id: '5', txId: 'EVT-092', type: 'Document Upload', entity: 'Legal Dept', property: 'Coral City', amount: '-', status: 'Verified', date: 'Oct 08, 2023', kind: 'event', icon: FileText },
  { id: '6', txId: 'PAY-8844', type: 'Maintenance Exp.', entity: 'Facility Mgt', property: 'Victoria Plaza', amount: '₦850k', status: 'Completed', date: 'Oct 05, 2023', kind: 'expense', icon: Wallet },
];

export default function ActivityPage() {
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'activities' | 'transactions'>('activities');

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': case 'signed': case 'verified':
        return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'failed':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  const displayData = unifiedData.filter(item => 
    viewMode === 'transactions' 
      ? ['payment', 'sale', 'expense'].includes(item.kind)
      : ['event'].includes(item.kind)
  );

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-6 md:space-y-10 relative flex flex-col min-h-screen">
        
        <div className="space-y-6 md:space-y-10">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <div className="max-w-2xl">
              <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-deep-slate">Activities & Transactions</h1>
              <p className="font-body text-sm md:text-base text-muted-steel mt-1.5 md:mt-3 leading-relaxed">
                Track all operational activity, payments, sales, and business events across the entire property portfolio.
              </p>
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <div className="flex gap-2 md:hidden">
                 <button className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-pure-surface rounded-lg border border-whisper-border shadow-sm text-muted-steel hover:text-deep-slate transition-colors">
                   <Search className="w-5 h-5" />
                 </button>
                 <button className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-pure-surface rounded-lg border border-whisper-border shadow-sm text-muted-steel hover:text-deep-slate transition-colors">
                   <ArrowUpDown className="w-5 h-5" />
                 </button>
                 <button className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-pure-surface rounded-lg border border-whisper-border shadow-sm text-muted-steel hover:text-deep-slate transition-colors">
                   <Filter className="w-5 h-5" />
                 </button>
              </div>
              <button className="flex-1 md:flex-none h-11 px-6 bg-deep-slate text-pure-surface font-medium text-[13px] rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                <span className="whitespace-nowrap">New Record</span>
              </button>
            </div>
          </div>

          {/* KPI Summary (Scrollable horizontally on mobile) */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-px md:bg-whisper-border md:border md:border-whisper-border md:rounded-2xl md:overflow-hidden md:shadow-sm w-full">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-pure-surface p-4 md:p-5 flex flex-col justify-between group md:hover:bg-surface-container-lowest transition-colors min-w-[180px] md:min-w-0 rounded-xl md:rounded-none border border-whisper-border md:border-none shadow-sm md:shadow-none flex-shrink-0">
                  <div>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className={`flex items-center px-1.5 py-0.5 rounded text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-widest ${metric.positive ? 'text-emerald-trust bg-emerald-trust/10' : 'text-error bg-error/10'}`}>
                        {metric.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                        {metric.trend}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest font-semibold md:font-medium text-muted-steel mb-0.5">
                      {metric.label}
                    </p>
                  </div>
                  <div className="mt-1 md:mt-2">
                    <p className="font-headline text-xl md:text-2xl font-medium text-deep-slate">
                      {metric.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* View Toggle */}
          <div className="bg-surface-container-low p-1 rounded-lg inline-flex overflow-x-auto border border-whisper-border w-max max-w-full hide-scrollbar">
            {(['activities', 'transactions'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`relative px-4 md:px-5 py-2 md:py-2.5 rounded-md font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap capitalize ${
                  viewMode === mode ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate'
                }`}
              >
                {viewMode === mode && (
                  <motion.div
                    layoutId="view-mode-tab-2"
                    className="absolute inset-0 bg-pure-surface rounded-md shadow-sm border border-whisper-border"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{mode === 'activities' ? 'Activities' : 'Transactions'}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex flex-col lg:flex-row items-center gap-3 md:gap-4 w-full">
            <div className="relative flex-1 flex items-center h-14 bg-pure-surface rounded-xl border border-whisper-border shadow-sm w-full">
              <Search className="absolute left-4 text-muted-steel/70 w-5 h-5 pointer-events-none" />
              <input 
                className="w-full bg-transparent border-none h-full pl-12 pr-4 font-body text-[15px] text-deep-slate focus:outline-none focus:ring-0 placeholder:text-muted-steel/60" 
                placeholder={`Search across all ${viewMode}...`}
                type="text"
              />
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto h-14">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-full px-5 bg-pure-surface rounded-xl border border-whisper-border shadow-sm text-[14px] font-medium text-slate-600 hover:text-deep-slate hover:bg-surface-container-lowest transition-colors">
                <ArrowUpDown className="w-4 h-4 text-muted-steel" />
                <span>Sort</span>
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 h-full px-5 bg-pure-surface rounded-xl border border-whisper-border shadow-sm text-[14px] font-medium text-slate-600 hover:text-deep-slate hover:bg-surface-container-lowest transition-colors">
                <Filter className="w-4 h-4 text-muted-steel" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative flex-grow min-h-[500px]">
             <div className="grid grid-cols-1 gap-3 md:gap-4 pb-10">
              {displayData.map((row) => {
                const Icon = row.icon;
                return (
                  <div 
                    key={row.id} 
                    onClick={() => setSelectedTx(row)}
                    className={`bg-pure-surface border border-whisper-border rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 ${selectedTx?.id === row.id ? 'ring-2 ring-deep-slate border-transparent' : ''}`}
                  >
                    <div className="flex items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-lowest border border-whisper-border text-deep-slate flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-muted-steel" />
                      </div>
                      <div className="flex flex-col gap-0.5 md:gap-1 flex-1 min-w-0">
                        <div className="flex justify-between items-start md:block w-full">
                           <span className="font-medium text-base md:text-lg text-deep-slate leading-tight">{row.type}</span>
                           {/* Show amount on mobile inline if it exists, rather than a separate row, to save space. */}
                           <span className="md:hidden font-mono text-base font-bold text-deep-slate ml-2">{row.amount !== '-' && row.amount}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-[12px] md:text-[13px] text-muted-steel mt-0.5">
                          <span className="font-mono">{row.txId}</span>
                          <span className="hidden sm:block w-1 h-1 rounded-full bg-whisper-border"></span>
                          <span className="truncate">{row.property}</span>
                          <span className="hidden sm:block w-1 h-1 rounded-full bg-whisper-border"></span>
                          <span className="truncate">{row.entity}</span>
                        </div>
                        <span className="md:hidden text-[11px] text-muted-steel mt-1">{row.date}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex flex-col items-end justify-center">
                      {row.amount !== '-' && (
                        <span className="font-mono text-[17px] font-bold text-deep-slate">{row.amount}</span>
                      )}
                      <span className="text-[13px] text-muted-steel">{row.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transaction Detail Fixed Drawer Overlay */}
            <AnimatePresence>
              {selectedTx && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                    onClick={() => setSelectedTx(null)}
                  />
                  <motion.div 
                    initial={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                    animate={{ x: 0, boxShadow: '-20px 0 30px -10px rgba(0, 0, 0, 0.15)' }}
                    exit={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-screen w-full sm:w-[540px] bg-pure-surface z-50 border-l border-whisper-border overflow-y-auto shadow-2xl flex flex-col"
                  >
                    <div className="sticky top-0 z-20 flex justify-between items-center p-6 border-b border-whisper-border bg-white/90 backdrop-blur-xl">
                      <h3 className="font-headline text-lg font-medium text-deep-slate">{viewMode === 'transactions' ? 'Transaction Record' : 'Activity Record'}</h3>
                      <button onClick={() => setSelectedTx(null)} className="p-2 text-muted-steel hover:bg-surface-container-high hover:text-deep-slate rounded-full transition-colors flex-shrink-0">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                      {/* Detailed Content */}
                      <div className="flex items-center justify-between pb-6 border-b border-whisper-border/60">
                        <div className="flex flex-col gap-2">
                          <span className="font-headline text-2xl font-medium text-deep-slate">{selectedTx.type}</span>
                          <span className="text-[13px] text-muted-steel font-mono">ID: {selectedTx.txId}</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-xs text-muted-steel uppercase tracking-widest font-medium">Record Value</span>
                          <span className="font-headline text-4xl font-medium text-deep-slate tracking-tight">{selectedTx.amount}</span>
                        </div>

                        <div className="bg-surface-container-lowest rounded-xl p-6 space-y-5 border border-whisper-border/60">
                          <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                              <span className="font-mono text-xs text-muted-steel uppercase tracking-widest">Property</span>
                              <span className="text-[15px] font-medium text-deep-slate">{selectedTx.property}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="font-mono text-xs text-muted-steel uppercase tracking-widest">Related Entity</span>
                              <span className="text-[15px] font-medium text-deep-slate">{selectedTx.entity}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="font-mono text-xs text-muted-steel uppercase tracking-widest">Date</span>
                              <span className="text-[15px] font-medium text-deep-slate">{selectedTx.date}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="font-mono text-xs text-muted-steel uppercase tracking-widest">Category</span>
                              <span className="text-[15px] font-medium text-deep-slate capitalize">{selectedTx.kind}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-whisper-border/60">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-xs text-muted-steel uppercase tracking-widest">Date Created</span>
                            <span className="text-[15px] font-medium text-deep-slate">{selectedTx.date} by System</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-whisper-border bg-white flex gap-3">
                       <button className="flex-1 h-12 bg-pure-surface border border-whisper-border text-deep-slate font-medium text-[14px] rounded-lg hover:bg-surface-container-lowest transition-colors flex items-center justify-center shadow-sm">
                         View Details
                       </button>
                       <button className="h-12 w-12 bg-surface-container-low text-deep-slate rounded-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center">
                         <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
