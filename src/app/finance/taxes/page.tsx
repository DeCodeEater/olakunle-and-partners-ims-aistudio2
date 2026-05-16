'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Download, Plus, SearchIcon, Filter, 
  ChevronRight, X, CheckCircle2, Clock, 
  AlertTriangle, Landmark, Calendar, FileText, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaxRecord {
  id: string;
  type: 'VAT' | 'Income Tax' | 'Property Tax' | 'Withholding Tax';
  description: string;
  amount: string;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Overdue';
  period: string;
  referenceNo?: string;
  paymentDate?: string;
}

const mockTaxes: TaxRecord[] = [
  {
    id: 'TAX-23-010',
    type: 'VAT',
    description: 'Q3 2023 Value Added Tax Remittance',
    amount: '₦1,250,500',
    dueDate: 'Oct 21, 2023',
    status: 'Due',
    period: 'Jul - Sep 2023'
  },
  {
    id: 'TAX-23-009',
    type: 'Withholding Tax',
    description: 'Contractor Withholding Remittance',
    amount: '₦450,000',
    dueDate: 'Oct 15, 2023',
    status: 'Overdue',
    period: 'Sep 2023'
  },
  {
    id: 'TAX-23-008',
    type: 'Property Tax',
    description: 'Annual Land Use Charge - Lekki HQ',
    amount: '₦850,000',
    dueDate: 'Nov 30, 2023',
    status: 'Due',
    period: '2023 Annual'
  },
  {
    id: 'TAX-23-007',
    type: 'Income Tax',
    description: 'Company Income Tax (CIT) Q2 Provisional',
    amount: '₦4,500,000',
    dueDate: 'Jul 31, 2023',
    status: 'Paid',
    period: 'Apr - Jun 2023',
    referenceNo: 'FIRS/CIT/23/0445',
    paymentDate: 'Jul 28, 2023'
  },
  {
    id: 'TAX-23-006',
    type: 'VAT',
    description: 'Q2 2023 Value Added Tax Remittance',
    amount: '₦1,100,000',
    dueDate: 'Jul 21, 2023',
    status: 'Paid',
    period: 'Apr - Jun 2023',
    referenceNo: 'FIRS/VAT/23/0891',
    paymentDate: 'Jul 19, 2023'
  }
];

export default function TaxesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTax, setSelectedTax] = useState<TaxRecord | null>(null);

  const getStatusBadge = (status: TaxRecord['status']) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="w-3.5 h-3.5" /> Paid</span>;
      case 'Due':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"><Clock className="w-3.5 h-3.5" /> Due</span>;
      case 'Overdue':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"><AlertTriangle className="w-3.5 h-3.5" /> Overdue</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Taxes & Liabilities</h1>
            <p className="text-muted-steel mt-1 text-sm">Manage corporate tax obligations, VAT remittances, and property charges.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Log Tax Payment
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
          {[
            { label: 'Upcoming Due', value: '₦2,100,500', trend: 'Due within 30 days', trendColor: 'text-amber-600' },
            { label: 'Overdue Liabilities', value: '₦450,000', trend: 'Requires immediate action', trendColor: 'text-red-600' },
            { label: 'Taxes Paid YTD', value: '₦12,450,000', trend: '2023 Fiscal Year', trendColor: 'text-emerald-600' },
            { label: 'Effective Tax Rate', value: '18.4%', trend: 'Estimated based on gross profit', trendColor: 'text-muted-steel' }
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
                placeholder="Search description, reference..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Status</option>
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
                <option value="paid">Paid</option>
              </select>
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Tax Type</option>
                <option value="vat">VAT</option>
                <option value="cit">Income Tax (CIT)</option>
                <option value="property">Property Tax</option>
                <option value="wht">Withholding Tax</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Tax Type & Details</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Amount</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Period</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Status & Due Date</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockTaxes.map((tax) => (
                  <tr 
                    key={tax.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedTax(tax)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-muted-steel border border-gray-200 shrink-0">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{tax.type}</div>
                          <div className="text-xs text-muted-steel mt-0.5 truncate max-w-[250px]">{tax.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-bold text-deep-slate">{tax.amount}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate mb-1">{tax.period}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        {getStatusBadge(tax.status)}
                        <span className="text-[11px] text-muted-steel flex items-center gap-1"><Calendar className="w-3 h-3"/> Due: {tax.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedTax(tax); }}>
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
        {selectedTax && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTax(null)}
              className="fixed inset-0 bg-deep-slate/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[70] border-l border-whisper-border flex flex-col"
            >
               <div className="px-8 py-6 border-b border-whisper-border flex items-start justify-between bg-gray-50/30 shrink-0">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-muted-steel border border-gray-200">
                        <Landmark className="w-6 h-6" />
                     </div>
                     <div>
                       <h2 className="text-xl font-bold text-deep-slate leading-tight">{selectedTax.type}</h2>
                       <p className="text-sm text-muted-steel mt-1 font-mono">{selectedTax.id}</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTax(null)}
                    className="p-2 rounded-full hover:bg-gray-100 text-muted-steel transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="bg-gray-50 border border-whisper-border rounded-xl p-5 flex items-center justify-between">
                     <div>
                       <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Tax Liability</p>
                       <p className="text-3xl font-bold text-deep-slate">{selectedTax.amount}</p>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                       {getStatusBadge(selectedTax.status)}
                       <p className="text-xs text-muted-steel font-medium">Due: {selectedTax.dueDate}</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                       <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider border-b border-whisper-border pb-2 mb-4">Obligation Details</h3>
                       <div className="space-y-4">
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Description</p>
                            <p className="text-sm font-medium text-deep-slate leading-relaxed">{selectedTax.description}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-steel mb-1">Applicable Period</p>
                            <p className="text-sm font-medium text-deep-slate">{selectedTax.period}</p>
                          </div>
                          {selectedTax.status === 'Paid' && selectedTax.paymentDate && (
                            <div className="bg-emerald-50 text-emerald-900 border border-emerald-100 p-4 rounded-lg flex items-center justify-between mt-4">
                               <div>
                                 <p className="text-xs font-medium text-emerald-700/80 uppercase tracking-wider mb-1">Payment Cleared</p>
                                 <p className="font-semibold text-sm">{selectedTax.paymentDate}</p>
                               </div>
                               {selectedTax.referenceNo && (
                                 <div className="text-right">
                                   <p className="text-xs font-medium text-emerald-700/80 uppercase tracking-wider mb-1">Receipt Ref</p>
                                   <p className="font-mono text-sm font-semibold">{selectedTax.referenceNo}</p>
                                 </div>
                               )}
                            </div>
                          )}
                       </div>
                    </div>

                    <div>
                       <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider border-b border-whisper-border pb-2 mb-4">Documentation</h3>
                       {selectedTax.status === 'Paid' ? (
                          <div className="flex items-center gap-3 p-3 border border-whisper-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                             <FileText className="w-8 h-8 text-blue-500 bg-blue-50 p-1.5 rounded" />
                             <div className="flex-1">
                               <p className="text-sm font-medium text-deep-slate group-hover:underline">FIRS_Receipt_{selectedTax.period.replace(/\s+/g, '_')}.pdf</p>
                               <p className="text-xs text-muted-steel">142 KB • PDF Document</p>
                             </div>
                             <Download className="w-4 h-4 text-muted-steel group-hover:text-deep-slate" />
                          </div>
                       ) : (
                          <p className="text-sm text-muted-steel italic">No receipts attached yet.</p>
                       )}
                    </div>
                  </div>
               </div>

               <div className="p-6 border-t border-whisper-border bg-gray-50/50 shrink-0">
                 {selectedTax.status !== 'Paid' ? (
                   <button className="w-full bg-deep-slate text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                     Mark Tax as Remitted <ArrowRight className="w-4 h-4" />
                   </button>
                 ) : (
                   <button className="w-full border border-whisper-border bg-white text-deep-slate py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                     <Download className="w-4 h-4" />
                     Download Receipt
                   </button>
                 )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
