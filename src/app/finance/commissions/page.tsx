'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Download, Plus, SearchIcon, Filter, 
  ChevronRight, X, User, Briefcase, CheckCircle2,
  Clock, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Calculator, Banknote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Commission {
  id: string;
  agentName: string;
  dealProperty: string;
  transactionType: 'Sale' | 'Lease' | 'Lease (Co-Broke)';
  dealValue: string;
  commissionRate: string;
  commissionAmount: string;
  status: 'Pending' | 'Paid' | 'Processing';
  dealDate: string;
  paymentDate?: string;
}

const mockCommissions: Commission[] = [
  {
    id: 'COM-001',
    agentName: 'Chioma Eze',
    dealProperty: '14B Admiralty Way, Lekki',
    transactionType: 'Sale',
    dealValue: '₦145,000,000',
    commissionRate: '3%',
    commissionAmount: '₦4,350,000',
    status: 'Pending',
    dealDate: 'Oct 12, 2023',
  },
  {
    id: 'COM-002',
    agentName: 'Michael Okeke',
    dealProperty: 'Victoria Island Block A',
    transactionType: 'Lease',
    dealValue: '₦4,500,000',
    commissionRate: '5%',
    commissionAmount: '₦225,000',
    status: 'Paid',
    dealDate: 'Oct 08, 2023',
    paymentDate: 'Oct 10, 2023',
  },
  {
    id: 'COM-003',
    agentName: 'Sarah Williams',
    dealProperty: 'Abuja Central Tower',
    transactionType: 'Lease',
    dealValue: '₦3,500,000',
    commissionRate: '5%',
    commissionAmount: '₦175,000',
    status: 'Processing',
    dealDate: 'Oct 15, 2023',
  },
  {
    id: 'COM-004',
    agentName: 'Michael Okeke',
    dealProperty: 'Plot 44, Freedom Way',
    transactionType: 'Sale',
    dealValue: '₦80,000,000',
    commissionRate: '2.5%',
    commissionAmount: '₦2,000,000',
    status: 'Paid',
    dealDate: 'Sep 22, 2023',
    paymentDate: 'Sep 25, 2023',
  },
  {
    id: 'COM-005',
    agentName: 'External: Platinum Realty',
    dealProperty: 'Lekki Phase 1 Estate',
    transactionType: 'Lease (Co-Broke)',
    dealValue: '₦8,000,000',
    commissionRate: '5% (Split 50/50)',
    commissionAmount: '₦200,000',
    status: 'Pending',
    dealDate: 'Oct 20, 2023',
  }
];

export default function CommissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  const getStatusBadge = (status: Commission['status']) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="w-3.5 h-3.5" /> Paid</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"><AlertTriangle className="w-3.5 h-3.5" /> Processing</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Commissions</h1>
            <p className="text-muted-steel mt-1 text-sm">Track team commissions, splits, and payouts across deals.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm bg-white">
              <Download className="w-4 h-4" /> Export Ledger
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Log Custom Payout
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
          {[
            { label: 'Unpaid Pending', value: '₦4,550,000', trend: 'Awaiting clearance', trendColor: 'text-amber-600' },
            { label: 'Paid This Month', value: '₦2,400,000', trend: '+15% vs last month', trendColor: 'text-emerald-600' },
            { label: 'Total Commissions YTD', value: '₦18,250,000', trend: 'Rolling 12 months', trendColor: 'text-deep-slate' },
            { label: 'Average Split Margin', value: '65% / 35%', trend: 'In-house vs Agent', trendColor: 'text-muted-steel' }
          ].map((metric, i) => (
            <div key={i} className="bg-white border border-whisper-border rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-deep-slate">{metric.value}</span>
              </div>
              <p className={`text-[11px] mt-1 font-medium ${metric.trendColor}`}>{metric.trend}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-whisper-border rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-whisper-border flex flex-col lg:flex-row justify-between gap-4 bg-gray-50/50">
            <div className="relative w-full lg:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel" />
              <input 
                type="text" 
                placeholder="Search agent, property..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
              </select>
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Agent</option>
                <option value="michael">Michael Okeke</option>
                <option value="chioma">Chioma Eze</option>
                <option value="sarah">Sarah Williams</option>
                <option value="external">External / Co-Broker</option>
              </select>
              <button className="flex items-center gap-2 px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white">
                <Filter className="w-4 h-4" /> Filter Date
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Agent Name</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Deal / Property</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Commission (Rate)</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Status & Timeline</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockCommissions.map((commission) => (
                  <tr 
                    key={commission.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedCommission(commission)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{commission.agentName}</div>
                          <div className="text-[11px] text-muted-steel mt-0.5">{commission.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate mb-1 truncate max-w-[200px]" title={commission.dealProperty}>{commission.dealProperty}</div>
                      <div className="text-xs text-muted-steel flex items-center gap-1.5"><Briefcase className="w-3 h-3" /> {commission.transactionType} ({commission.dealValue})</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-bold text-deep-slate mb-1">{commission.commissionAmount}</div>
                      <div className="text-xs text-muted-steel inline-flex items-center gap-1 bg-gray-100 rounded px-1.5 py-0.5"><Calculator className="w-3 h-3"/> {commission.commissionRate}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        {getStatusBadge(commission.status)}
                        <span className="text-[11px] text-muted-steel">Closed: {commission.dealDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedCommission(commission); }}>
                         <ChevronRight className="w-5 h-5" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {selectedCommission && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCommission(null)}
              className="fixed inset-0 bg-deep-slate/20 backdrop-blur-sm z-[60]"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[70] border-l border-whisper-border flex flex-col"
            >
               {/* Panel Header */}
               <div className="px-8 py-6 border-b border-whisper-border flex items-start justify-between bg-gray-50/30 shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-deep-slate leading-tight">Payout Details</h2>
                    <p className="text-sm text-muted-steel mt-1 font-mono">{selectedCommission.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedCommission(null)}
                    className="p-2 rounded-full hover:bg-gray-100 text-muted-steel transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               {/* Panel Content */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="bg-gray-50 border border-whisper-border rounded-xl p-5 flex items-center justify-between">
                     <div>
                       <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Commission Due</p>
                       <p className="text-3xl font-bold text-deep-slate">{selectedCommission.commissionAmount}</p>
                     </div>
                     <div>
                       {getStatusBadge(selectedCommission.status)}
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                       <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider border-b border-whisper-border pb-2 mb-4">Agent Profile</h3>
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold shrink-0">
                            <User className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-base font-semibold text-deep-slate">{selectedCommission.agentName}</p>
                            <p className="text-sm text-muted-steel">Bank: Zenith Bank • 0123456789</p>
                         </div>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider border-b border-whisper-border pb-2 mb-4">Deal Information</h3>
                       <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Property</p>
                            <p className="text-sm font-medium text-deep-slate">{selectedCommission.dealProperty}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Transaction Type</p>
                            <p className="text-sm font-medium text-deep-slate">{selectedCommission.transactionType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Total Deal Value</p>
                            <p className="text-sm font-bold text-deep-slate">{selectedCommission.dealValue}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Commission Rate</p>
                            <p className="text-sm font-medium text-deep-slate">{selectedCommission.commissionRate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Deal Date</p>
                            <p className="text-sm font-medium text-deep-slate">{selectedCommission.dealDate}</p>
                          </div>
                          {selectedCommission.paymentDate && (
                            <div>
                              <p className="text-xs text-muted-steel mb-1">Payment Date</p>
                              <p className="text-sm font-medium text-deep-slate">{selectedCommission.paymentDate}</p>
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
               </div>

               {/* Footer Action */}
               <div className="p-6 border-t border-whisper-border bg-gray-50/50 shrink-0">
                 {selectedCommission.status !== 'Paid' ? (
                   <button className="w-full bg-deep-slate text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                     <Banknote className="w-5 h-5" />
                     Mark as Paid
                   </button>
                 ) : (
                   <div className="w-full border border-whisper-border bg-white text-emerald-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                     <CheckCircle2 className="w-5 h-5" />
                     Payment Cleared
                   </div>
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
