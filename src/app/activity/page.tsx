'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Receipt, Building2, UserCircle2, Landmark, Wallet, AlertTriangle, X } from 'lucide-react';
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

const feedEvents = [
  { id: '1', type: 'payment_received', title: 'Rent Payment Received', desc: '₦4.5M from Chukwudi Eze for Azure Heights Unit A4', time: '10 mins ago', user: 'System (Auto)', icon: Receipt, iconColor: 'text-emerald-trust', iconBg: 'bg-emerald-trust/10' },
  { id: '2', type: 'property_sold', title: 'Property Sold', desc: 'Lekki Waterfront Villa sold for ₦450M to Alhaji Musa', time: '2 hours ago', user: 'Elena R.', icon: Landmark, iconColor: 'text-deep-slate', iconBg: 'bg-surface-dim' },
  { id: '3', type: 'document_uploaded', title: 'Document Uploaded', desc: 'Deed of Assignment uploaded for Coral City', time: '4 hours ago', user: 'Legal Dept', icon: FileTextIcon, iconColor: 'text-muted-steel', iconBg: 'bg-surface-container-high' },
  { id: '4', type: 'expense_logged', title: 'Expense Added', desc: '₦850k for HVAC Maintenance at Victoria Plaza', time: '5 hours ago', user: 'Facility Mgt', icon: Wallet, iconColor: 'text-amber-600', iconBg: 'bg-amber-500/10' },
  { id: '5', type: 'lease_renewed', title: 'Lease Renewed', desc: 'TechNova renewed lease for Ikoyi Foreshore (5 Yrs)', time: '1 day ago', user: 'Mgt Team', icon: Building2, iconColor: 'text-emerald-trust', iconBg: 'bg-emerald-trust/10' },
];

const paymentsData = [
  { id: 'PAY-8842', type: 'Rent Payment', payer: 'Chukwudi Eze', property: 'Azure Heights Unit A4', amount: '₦4.5M', status: 'Paid', method: 'Bank Transfer', date: 'Oct 24, 2023' },
  { id: 'PAY-8843', type: 'Installment', payer: 'Zenith Construction', property: 'Banana Island', amount: '₦15M', status: 'Pending', method: 'Wire Transfer', date: 'Oct 23, 2023' },
  { id: 'PAY-8844', type: 'Service Charge', payer: 'Acme Corp', property: 'Victoria Plaza', amount: '₦1.2M', status: 'Overdue', method: 'Card', date: 'Oct 15, 2023' },
  { id: 'PAY-8845', type: 'Deposit', payer: 'Sarah James', property: 'The Meridian B2', amount: '₦800k', status: 'Paid', method: 'Bank Transfer', date: 'Oct 14, 2023' },
];

const salesData = [
  { id: 'SAL-102', property: 'Lekki Waterfront Villa', buyer: 'Alhaji Musa', facilitator: 'Michael O.', amount: '₦450M', progress: '100%', titleStatus: 'Transferred', agreement: 'Signed', date: 'Oct 25, 2023' },
  { id: 'SAL-103', property: 'Sapphire Towers U12', buyer: 'TechNova', facilitator: 'Angela B.', amount: '₦450M', progress: '40%', titleStatus: 'Pending', agreement: 'Drafting', date: 'Oct 20, 2023' },
];

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<'Feed' | 'Payments' | 'Sales' | 'Rentals' | 'Expenses' | 'Commissions'>('Feed');
  const [selectedTx, setSelectedTx] = useState<any | null>(null);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid': case 'signed': case 'transferred': case 'approved':
        return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'pending': case 'drafting':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'overdue': case 'failed': case 'disputed':
        return 'bg-error/10 text-error border-error/20';
      case 'refunded':
        return 'bg-surface-container-high text-muted-steel border-whisper-border';
      default:
        return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 relative flex flex-col min-h-screen">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-whisper-border pb-6">
          <div className="max-w-xl">
            <h1 className="font-headline text-3xl font-medium tracking-tight text-deep-slate uppercase">Activity & Transactions</h1>
            <p className="font-body text-sm text-muted-steel mt-2 leading-relaxed">
              Track operational activity, payments, sales, rentals, and business events across the entire portfolio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-steel w-4 h-4 pointer-events-none" />
              <input 
                className="w-full bg-pure-surface border border-whisper-border rounded h-10 pl-9 pr-4 font-body text-sm text-deep-slate focus:outline-none focus:border-deep-slate transition-all placeholder:text-muted-steel/60 shadow-sm" 
                placeholder="Search specific transactions..." 
                type="text"
              />
            </div>
            <button className="h-10 px-4 bg-pure-surface border border-whisper-border text-deep-slate font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm flex-shrink-0">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Add Expense</span>
            </button>
            <button className="h-10 px-6 bg-deep-slate text-pure-surface font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span>New Transaction</span>
            </button>
          </div>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="p-4 rounded-lg border border-whisper-border bg-pure-surface flex flex-col justify-between hover:border-slate-300 transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest font-medium text-muted-steel mb-2">
                {metric.label}
              </p>
              <div>
                <div className="flex items-end gap-2 mb-1">
                  <p className="font-mono text-xl lg:text-2xl font-bold text-deep-slate leading-none">
                    {metric.value}
                  </p>
                  <span className={`flex items-center text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5 ${metric.positive ? 'text-emerald-trust' : 'text-error'}`}>
                    {metric.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {metric.trend}
                  </span>
                </div>
                <p className="text-[10px] text-muted-steel font-body">{metric.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 relative flex-grow min-h-[600px]">
          
          <div className={`flex-1 flex flex-col gap-4 transition-all duration-300 ${selectedTx ? 'lg:pr-[400px]' : ''}`}>
            
            {/* Tabs */}
            <div className="bg-surface-container-low p-1 rounded-lg inline-flex overflow-x-auto hide-scrollbar border border-whisper-border/50 max-w-full">
              {(['Feed', 'Payments', 'Sales', 'Rentals', 'Expenses', 'Commissions'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2.5 rounded-md font-mono text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activity-active-tab"
                      className="absolute inset-0 bg-pure-surface rounded-md shadow-sm border border-whisper-border"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* List/Table Container */}
            <div className="bg-pure-surface border border-whisper-border rounded-lg overflow-hidden flex-1 shadow-sm flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-whisper-border bg-surface-container-low/30">
                <button className="px-3 py-1.5 border border-whisper-border rounded text-[10px] font-mono font-bold uppercase tracking-widest text-deep-slate bg-pure-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Filters
                </button>
                <div className="text-[10px] font-mono text-muted-steel tracking-widest uppercase font-medium">
                  {activeTab === 'Feed' ? 'Live Stream' : 'Most Recent'}
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-auto flex-1">
                {activeTab === 'Feed' ? (
                  <div className="p-6">
                    <div className="relative border-l border-whisper-border/50 ml-4 space-y-8 pb-4">
                      {feedEvents.map((event, i) => {
                        const Icon = event.icon;
                        return (
                          <div key={event.id} className="relative pl-8 group">
                            <div className={`absolute -left-5 top-0 w-10 h-10 rounded-full border-4 border-pure-surface flex items-center justify-center ${event.iconBg} ${event.iconColor} group-hover:scale-110 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="bg-pure-surface border border-whisper-border rounded p-4 shadow-sm hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-all cursor-pointer">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-deep-slate">{event.title}</h4>
                                <span className="text-[11px] text-muted-steel font-mono">{event.time}</span>
                              </div>
                              <p className="text-sm text-on-surface-variant mb-2">{event.desc}</p>
                              <div className="flex items-center gap-2">
                                <UserCircle2 className="w-3.5 h-3.5 text-muted-steel" />
                                <span className="text-[11px] text-muted-steel">{event.user}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : activeTab === 'Payments' ? (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-surface-container-low/50 sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Ref / Property</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Type / Payer</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Amount / Method</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Date</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-body text-sm align-top">
                      {paymentsData.map((row) => (
                        <tr 
                          key={row.id} 
                          onClick={() => setSelectedTx({ ...row, kind: 'payment' })}
                          className={`border-b border-whisper-border/50 hover:bg-surface-container-low/80 transition-colors cursor-pointer ${selectedTx?.id === row.id ? 'bg-surface-container-low/80' : ''}`}
                        >
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-xs font-bold text-deep-slate">{row.id}</span>
                              <span className="text-[11px] text-muted-steel">{row.property}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-deep-slate font-medium">{row.type}</span>
                              <span className="text-[11px] text-muted-steel font-mono">{row.payer}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-sm font-bold text-deep-slate">{row.amount}</span>
                              <span className="text-[11px] text-muted-steel">{row.method}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5 text-muted-steel">{row.date}</td>
                          <td className="py-4 px-5">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : activeTab === 'Sales' ? (
                  <table className="w-full text-left border-collapse min-w-[800px]">
                     <thead className="bg-surface-container-low/50 sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">ID / Property</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Buyer / Rep</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Amount / Progress</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Docs</th>
                        <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Date</th>
                      </tr>
                    </thead>
                    <tbody className="font-body text-sm align-top">
                      {salesData.map((row) => (
                        <tr 
                          key={row.id} 
                          onClick={() => setSelectedTx({ ...row, kind: 'sale' })}
                          className={`border-b border-whisper-border/50 hover:bg-surface-container-low/80 transition-colors cursor-pointer ${selectedTx?.id === row.id ? 'bg-surface-container-low/80' : ''}`}
                        >
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-xs font-bold text-deep-slate">{row.id}</span>
                              <span className="text-sm font-medium text-deep-slate">{row.property}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-deep-slate font-medium">{row.buyer}</span>
                              <span className="text-[11px] text-muted-steel">Rep: {row.facilitator}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-sm font-bold text-deep-slate">{row.amount}</span>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-surface-container-high rounded overflow-hidden">
                                  <div className="h-full bg-emerald-trust" style={{ width: row.progress }}></div>
                                </div>
                                <span className="text-[10px] font-mono text-muted-steel">{row.progress}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                             <div className="flex flex-col gap-1.5 items-start">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.titleStatus)}`}>Title: {row.titleStatus}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.agreement)}`}>Agr: {row.agreement}</span>
                             </div>
                          </td>
                          <td className="py-4 px-5 text-muted-steel">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-64">
                    <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-muted-steel/50" />
                    </div>
                    <p className="text-deep-slate font-medium mb-1">Select a section to view records</p>
                    <p className="text-sm text-muted-steel max-w-sm">Data for {activeTab} will populate here based on operational activity.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Detail Drawer Overlay */}
          <AnimatePresence>
            {selectedTx && (
              <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute right-0 top-0 bottom-0 w-full lg:w-[380px] bg-pure-surface border border-whisper-border rounded-lg shadow-xl flex flex-col z-10 overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 border-b border-whisper-border bg-surface-container-low/50">
                  <h3 className="font-headline text-lg font-medium text-deep-slate">{selectedTx.kind === 'payment' ? 'Payment Record' : 'Sale Record'}</h3>
                  <button onClick={() => setSelectedTx(null)} className="p-1.5 text-muted-steel hover:bg-surface-container-high hover:text-deep-slate rounded-full transition-colors flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Status Banner */}
                  <div className="flex items-center justify-between pb-4 border-b border-whisper-border">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xl font-bold text-deep-slate">{selectedTx.id}</span>
                      <span className="text-[11px] text-muted-steel font-mono">Recorded: {selectedTx.date}</span>
                    </div>
                    {selectedTx.status && (
                       <span className={`px-2.5 py-1.5 rounded text-[11px] font-mono tracking-widest font-bold border ${getStatusColor(selectedTx.status)}`}>
                        {selectedTx.status}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest font-bold mb-1">Total Amount</span>
                      <span className="font-mono text-3xl font-bold text-deep-slate">{selectedTx.amount}</span>
                    </div>

                    <div className="bg-surface-container-low/50 rounded p-4 space-y-4 border border-whisper-border/50">
                       <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Property</span>
                          <span className="text-sm font-medium text-deep-slate">{selectedTx.property}</span>
                        </div>
                         {selectedTx.kind === 'payment' ? (
                            <>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Payer</span>
                                <span className="text-sm font-medium text-deep-slate">{selectedTx.payer}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Type</span>
                                <span className="text-sm font-medium text-deep-slate">{selectedTx.type}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Method</span>
                                <span className="text-sm font-medium text-deep-slate">{selectedTx.method}</span>
                              </div>
                            </>
                         ) : (
                            <>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Buyer</span>
                                <span className="text-sm font-medium text-deep-slate">{selectedTx.buyer}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Rep/Agent</span>
                                <span className="text-sm font-medium text-deep-slate">{selectedTx.facilitator}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Progress</span>
                                <span className="text-sm font-medium text-deep-slate flex items-center gap-2">
                                  <div className="h-1.5 w-12 bg-surface-container-high rounded overflow-hidden mt-0.5">
                                    <div className="h-full bg-emerald-trust" style={{ width: selectedTx.progress }}></div>
                                  </div>
                                  {selectedTx.progress}
                                </span>
                              </div>
                            </>
                         )}
                       </div>
                    </div>

                    <div className="pt-2">
                       <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest font-bold block mb-3">Audit Trail / History</span>
                       <div className="relative border-l border-whisper-border ml-2 space-y-4 pb-2">
                          <div className="relative pl-4">
                            <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-deep-slate ring-4 ring-pure-surface"></div>
                            <p className="text-sm text-deep-slate">Record created</p>
                            <p className="text-[10px] text-muted-steel">{selectedTx.date} by System</p>
                          </div>
                           {selectedTx.status === 'Paid' && (
                             <div className="relative pl-4">
                              <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-trust ring-4 ring-pure-surface"></div>
                              <p className="text-sm text-deep-slate">Payment successful via {selectedTx.method}</p>
                              <p className="text-[10px] text-muted-steel">{selectedTx.date} via Processor</p>
                            </div>
                           )}
                       </div>
                    </div>

                  </div>
                </div>
                
                <div className="p-4 border-t border-whisper-border bg-surface-container-low/30 flex gap-2">
                   <button className="flex-1 py-2.5 px-4 bg-pure-surface border border-whisper-border text-deep-slate font-mono text-[11px] uppercase font-bold tracking-widest rounded hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                     Generate Receipt
                   </button>
                   <button className="py-2.5 px-4 bg-deep-slate text-pure-surface rounded hover:bg-slate-800 transition-colors flex items-center justify-center">
                     <MoreHorizontal className="w-4 h-4" />
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </DashboardLayout>
  );
}
