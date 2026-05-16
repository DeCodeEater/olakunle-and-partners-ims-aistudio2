'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, FileText, CheckCircle2, AlertCircle, Link2, Download, Eye, X, ArrowUpDown, Pencil, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const kpiMetrics = [
  { label: 'Total Documents', value: '1,492' },
  { label: 'Expiring Soon', value: '18', alert: true },
  { label: 'Missing', value: '12', alert: true },
];

const documentsData = [
  { id: '1', name: 'Deed of Assignment_Signed.pdf', type: 'Title Deed', linkedTo: 'Ikoyi Foreshore (Property)', uploaded: 'Oct 24, 2023', expiry: 'Permanent', owner: 'Legal Dept', uploadedBy: 'Jane Doe' },
  { id: '2', name: 'Tenancy_Agreement_2024.pdf', type: 'Tenancy Agreement', linkedTo: 'Chukwudi Eze (Tenant)', uploaded: 'Oct 23, 2023', expiry: 'Nov 24, 2024', owner: 'Mgt Team', uploadedBy: 'Admin' },
  { id: '3', name: 'C_of_O_Scan_Doc.pdf', type: 'C of O', linkedTo: 'Coral City (Estate)', uploaded: 'Oct 15, 2023', expiry: 'Permanent', owner: 'Legal Dept', uploadedBy: 'Jane Doe' },
  { id: '4', name: 'Service_Charge_Invoice_Q3.pdf', type: 'Invoice', linkedTo: 'Victoria Plaza (Property)', uploaded: 'Oct 01, 2023', expiry: '-', owner: 'Finance', uploadedBy: 'John Smith' },
  { id: '5', name: 'Building_Approval_Plan.pdf', type: 'Building Approval', linkedTo: 'Sapphire Towers (Carcass)', uploaded: 'Oct 10, 2023', expiry: '-', owner: 'Projects', uploadedBy: 'System' },
  { id: '6', name: 'ID_Passport_Bio.jpg', type: 'Identity Document', linkedTo: 'Sarah James (Tenant)', uploaded: 'Jan 10, 2023', expiry: 'Nov 15, 2023', owner: 'Mgt Team', uploadedBy: 'Admin' },
];

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<typeof documentsData[0] | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 space-y-12 relative flex flex-col min-h-screen">
        
        {/* Header section & Metrics */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h1 className="font-headline text-3xl md:text-4xl font-medium tracking-tight text-deep-slate">Document Center</h1>
              <p className="font-body text-base text-muted-steel mt-3 leading-relaxed">
                Securely store, organize, and manage all your property titles, tenancy agreements, and compliance records across your portfolios.
              </p>
            </div>
            <div className="flex flex-row gap-2 sm:gap-3 w-full md:w-auto relative">
              <button className="flex bg-pure-surface rounded-xl border border-whisper-border shadow-sm md:hidden h-11 w-11 items-center justify-center text-muted-steel hover:text-deep-slate hover:bg-surface-container-low transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
              </button>
              
              <button className="md:hidden flex-shrink-0 h-11 w-11 bg-pure-surface rounded-xl border border-whisper-border shadow-sm flex items-center justify-center text-muted-steel hover:text-deep-slate hover:bg-surface-container-low transition-colors" title="Sort">
                <ArrowUpDown className="w-5 h-5" />
              </button>

              <button className="md:hidden flex-shrink-0 h-11 w-11 bg-pure-surface rounded-xl border border-whisper-border shadow-sm flex items-center justify-center text-muted-steel hover:text-deep-slate hover:bg-surface-container-low transition-colors" title="Filter">
                <Filter className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setShowMetrics(!showMetrics)} 
                className={`flex-shrink-0 h-11 w-11 border rounded-xl flex items-center justify-center transition-colors shadow-sm ${showMetrics ? 'bg-surface-container-low border-slate-300 text-deep-slate' : 'bg-pure-surface border-whisper-border text-muted-steel hover:text-deep-slate hover:bg-surface-container-low'}`}
                title="View Metrics"
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button className="flex-1 md:flex-none h-11 px-4 sm:px-6 bg-deep-slate text-pure-surface font-medium text-[13px] rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm w-full">
                <Plus className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">Upload <span className="hidden sm:inline">new document</span></span>
              </button>

              <AnimatePresence>
                {showMetrics && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-3 w-full sm:w-[320px] bg-pure-surface border border-whisper-border rounded-2xl shadow-xl z-20 overflow-hidden"
                  >
                    <div className="p-4 border-b border-whisper-border bg-surface-container-lowest">
                      <h3 className="font-headline text-sm font-medium text-deep-slate">Document Metrics</h3>
                    </div>
                    <div className="flex flex-col">
                      {kpiMetrics.map((metric, i) => (
                        <div key={i} className="p-4 flex items-center justify-between border-b last:border-0 border-whisper-border/60 hover:bg-surface-container-lowest transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-surface-container-low rounded-lg text-deep-slate">
                              {metric.alert ? <AlertCircle className="w-4 h-4 text-amber-500" /> : (metric.label === 'Verified' ? <CheckCircle2 className="w-4 h-4 text-emerald-trust" /> : <BarChart2 className="w-4 h-4 text-muted-steel" />)}
                            </div>
                            <span className="text-muted-steel text-[12px] uppercase tracking-wider font-mono">{metric.label}</span>
                          </div>
                          <span className="font-headline text-lg font-medium text-deep-slate">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full">
          <div className="hidden md:flex relative flex-1 items-center h-14 bg-pure-surface rounded-xl border border-whisper-border shadow-sm w-full">
            <Search className="absolute left-4 text-muted-steel/70 w-5 h-5 pointer-events-none" />
            <input 
              className="w-full bg-transparent border-none h-full pl-12 pr-4 font-body text-[15px] text-deep-slate focus:outline-none focus:ring-0 placeholder:text-muted-steel/60" 
              placeholder="Search documents by name, type, or entity..." 
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto h-12 md:h-14">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-full px-5 bg-pure-surface rounded-xl border border-whisper-border shadow-sm text-[13px] md:text-[14px] font-medium text-slate-600 hover:text-deep-slate hover:bg-surface-container-lowest transition-colors">
              <ArrowUpDown className="w-4 h-4 text-muted-steel" />
              <span>Sort</span>
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 h-full px-5 bg-pure-surface rounded-xl border border-whisper-border shadow-sm text-[13px] md:text-[14px] font-medium text-slate-600 hover:text-deep-slate hover:bg-surface-container-lowest transition-colors">
              <Filter className="w-4 h-4 text-muted-steel" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex-grow min-h-[500px]">
          
          <div>
            {/* Document Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-20">
              {documentsData.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`relative p-6 rounded-2xl border transition-all cursor-pointer group bg-pure-surface hover:shadow-md flex flex-col justify-between min-h-[220px] ${
                     selectedDoc?.id === doc.id ? 'border-deep-slate ring-1 ring-deep-slate shadow-sm' : 'border-whisper-border hover:border-slate-300'
                  }`}
                >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="p-3 rounded-xl bg-surface-container-low text-deep-slate">
                          <FileText className="w-6 h-6" />
                        </div>
                      </div>
                      
                      <h3 className="font-headline text-[17px] font-medium text-deep-slate break-words line-clamp-2 leading-tight group-hover:text-slate-700 transition-colors">
                        {doc.name}
                      </h3>
                    </div>
                    
                    <div className="mt-6 pt-5 border-t border-whisper-border/60 flex flex-col gap-2.5">
                       <div className="flex items-center gap-3 text-[13px]">
                         <span className="text-muted-steel w-14 font-mono text-[10px] uppercase tracking-wider">Type</span>
                         <span className="text-deep-slate font-medium truncate">{doc.type}</span>
                       </div>
                       <div className="flex items-center gap-3 text-[13px]">
                         <span className="text-muted-steel w-14 font-mono text-[10px] uppercase tracking-wider">Linked</span>
                         <span className="text-deep-slate font-medium truncate flex-1 flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5 text-muted-steel" />{doc.linkedTo}</span>
                       </div>
                    </div>
                </div>
              ))}
            </div>
          </div>

          {/* detail panel right side overlay/fixed relative to container */}
          <AnimatePresence>
            {selectedDoc && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                  onClick={() => setSelectedDoc(null)}
                />
                <motion.div 
                  initial={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                  animate={{ x: 0, boxShadow: '-20px 0 30px -10px rgba(0, 0, 0, 0.15)' }}
                  exit={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 h-screen w-full sm:w-[540px] bg-pure-surface z-50 border-l border-whisper-border overflow-y-auto shadow-2xl flex flex-col"
                >
                  <div className="sticky top-0 z-20 flex justify-between items-center p-6 border-b border-whisper-border bg-white/90 backdrop-blur-xl">
                  <h3 className="font-headline text-lg font-medium text-deep-slate">Document Preview</h3>
                  <button onClick={() => setSelectedDoc(null)} className="p-2 text-muted-steel hover:bg-surface-container-high hover:text-deep-slate rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Thumbnail Mock */}
                  <div className="w-full aspect-[4/3] bg-surface-container-highest rounded-xl border border-whisper-border flex flex-col items-center justify-center text-muted-steel relative overflow-hidden group shadow-inner">
                     <FileText className="w-16 h-16 text-muted-steel/20" />
                     <span className="font-mono text-xs uppercase tracking-widest mt-4 font-bold opacity-60">No Preview Available</span>
                  </div>

                  <div>
                    <h4 className="font-headline text-2xl font-medium text-deep-slate break-words leading-tight">{selectedDoc.name}</h4>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                     <button className="flex-1 h-11 bg-deep-slate text-pure-surface font-medium text-[13px] rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                       <Eye className="w-4 h-4" /> View
                     </button>
                     <button className="flex-1 h-11 bg-pure-surface border border-whisper-border text-deep-slate font-medium text-[13px] rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 shadow-sm">
                       <Download className="w-4 h-4" /> Download
                     </button>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-whisper-border/60">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Linked To</span>
                        <span className="text-[14px] text-deep-slate font-medium flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5 text-muted-steel" /> {selectedDoc.linkedTo}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Doc Type</span>
                        <span className="text-[14px] text-deep-slate font-medium">{selectedDoc.type}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                         <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Uploaded By</span>
                         <span className="text-[14px] text-deep-slate flex items-center gap-1.5">
                           <div className="w-5 h-5 rounded-full bg-surface-dim border border-whisper-border"></div>
                           {selectedDoc.uploadedBy}
                         </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                         <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Assignee</span>
                         <span className="text-[14px] text-deep-slate">{selectedDoc.owner}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Upload Date</span>
                        <span className="text-[14px] text-deep-slate">{selectedDoc.uploaded}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">Expiry Date</span>
                        <span className={`text-[14px] ${selectedDoc.expiry !== 'Permanent' && selectedDoc.expiry !== '-' ? 'text-amber-600 font-medium' : 'text-deep-slate'}`}>{selectedDoc.expiry}</span>
                      </div>
                    </div>
                    
                    <button className="w-full h-11 bg-pure-surface border border-whisper-border text-deep-slate font-medium text-[13px] rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 shadow-sm">
                       <Pencil className="w-4 h-4" /> Edit Details
                    </button>
                  </div>
                </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>
      </div>
    </DashboardLayout>
  );
}

