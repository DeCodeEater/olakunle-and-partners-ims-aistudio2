'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, MoreHorizontal, FileText, CheckCircle2, AlertCircle, Clock, Link2, Download, Eye, Folder, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const kpiMetrics = [
  { label: 'Total Documents', value: '1,492' },
  { label: 'Verified', value: '1,204' },
  { label: 'Pending Review', value: '45', alert: true },
  { label: 'Expiring Soon', value: '18', alert: true },
  { label: 'Missing Files', value: '12', alert: true },
];

const complianceAlerts = [
  { title: 'Expired Tenancy Agreement', desc: 'Azure Heights Unit A4 (Chukwudi Eze)', severity: 'high' },
  { title: 'Missing Land Title', desc: 'Lekki Phase 1 Plot 45 (Olakunle & Co)', severity: 'critical' },
  { title: 'Pending Signature', desc: 'Sale Agreement - The Pantheon (Elena R.)', severity: 'medium' },
];

const documentsData = [
  { id: '1', name: 'Deed of Assignment_Signed.pdf', type: 'Title Deed', linkedTo: 'Ikoyi Foreshore (Property)', status: 'Verified', uploaded: 'Oct 24, 2023', expiry: 'Permanent', owner: 'Legal Dept' },
  { id: '2', name: 'Tenancy_Agreement_2024.pdf', type: 'Tenancy Agreement', linkedTo: 'Chukwudi Eze (Tenant)', status: 'Pending Review', uploaded: 'Oct 23, 2023', expiry: 'Nov 24, 2024', owner: 'Mgt Team' },
  { id: '3', name: 'C_of_O_Scan_Doc.pdf', type: 'C of O', linkedTo: 'Coral City (Estate)', status: 'Verified', uploaded: 'Oct 15, 2023', expiry: 'Permanent', owner: 'Legal Dept' },
  { id: '4', name: 'Service_Charge_Invoice_Q3.pdf', type: 'Invoice', linkedTo: 'Victoria Plaza (Property)', status: 'Verified', uploaded: 'Oct 01, 2023', expiry: '-', owner: 'Finance' },
  { id: '5', name: 'Building_Approval_Plan.pdf', type: 'Building Approval', linkedTo: 'Sapphire Towers (Carcass)', status: 'Missing', uploaded: '-', expiry: '-', owner: 'Projects' },
  { id: '6', name: 'ID_Passport_Bio.jpg', type: 'Identity Document', linkedTo: 'Sarah James (Tenant)', status: 'Expiring Soon', uploaded: 'Jan 10, 2023', expiry: 'Nov 15, 2023', owner: 'Mgt Team' },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'Property' | 'Tenant' | 'Landlord' | 'Buyer' | 'Transaction' | 'Compliance'>('Property');
  const [selectedDoc, setSelectedDoc] = useState<typeof documentsData[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'verified': return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'pending review': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'missing': case 'expiring soon': case 'rejected': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch(severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-error" />;
      case 'high': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-muted-steel" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 relative flex flex-col min-h-screen">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-whisper-border pb-6">
          <div className="max-w-xl">
            <h1 className="font-headline text-3xl font-medium tracking-tight text-deep-slate uppercase">Documents Vault</h1>
            <p className="font-body text-sm text-muted-steel mt-2 leading-relaxed">
              Manage titles, contracts, agreements, and property records. Verify documentation and track compliance across all assets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="h-10 px-4 bg-pure-surface border border-whisper-border text-deep-slate font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
              <Link2 className="w-4 h-4" />
              <span>Link Document</span>
            </button>
            <button className="h-10 px-6 bg-deep-slate text-pure-surface font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Global Search */}
        <div className="relative w-full max-w-2xl mt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-steel w-5 h-5 pointer-events-none" />
          <input 
            className="w-full bg-pure-surface border border-whisper-border rounded-lg h-12 pl-12 pr-4 font-body text-base text-deep-slate focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-muted-steel/60 shadow-sm" 
            placeholder="Search document name, property, person, or reference..." 
            type="text"
          />
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpiMetrics.map((metric, i) => (
            <div key={i} className={`p-5 rounded-lg border bg-pure-surface transition-colors ${metric.alert ? 'border-error/30 bg-error/5' : 'border-whisper-border'}`}>
              <p className={`font-mono text-[10px] uppercase tracking-widest font-medium mb-3 ${metric.alert ? 'text-error' : 'text-muted-steel'}`}>
                {metric.label}
              </p>
              <div className="flex items-center gap-3">
                <p className={`font-mono text-3xl font-bold ${metric.alert ? 'text-error' : 'text-deep-slate'}`}>
                  {metric.value}
                </p>
                {metric.label === 'Verified' && <CheckCircle2 className="w-5 h-5 text-emerald-trust opacity-80" />}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Alerts */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/10 rounded-full mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-bold text-amber-700 uppercase tracking-widest mb-1">Compliance Action Required</h4>
              <p className="font-body text-sm text-amber-800/80">You have 3 active compliance issues that require immediate attention.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto flex-wrap">
            {complianceAlerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-2 bg-pure-surface border border-amber-500/20 rounded px-3 py-2 shadow-sm">
                {getAlertIcon(alert.severity)}
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold text-deep-slate uppercase tracking-wider">{alert.title}</span>
                  <span className="text-[10px] text-muted-steel">{alert.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6 relative flex-grow min-h-[500px]">
          
          {/* List Section */}
          <div className={`flex-1 flex flex-col gap-4 transition-all duration-300 ${selectedDoc ? 'pr-[400px]' : ''}`}>
            
            {/* Tabs */}
            <div className="bg-surface-container-low p-1 rounded-lg inline-flex overflow-x-auto hide-scrollbar border border-whisper-border/50 max-w-full">
              {(['Property', 'Tenant', 'Landlord', 'Buyer', 'Transaction', 'Compliance'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2.5 rounded-md font-mono text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="docs-active-tab"
                      className="absolute inset-0 bg-pure-surface rounded-md shadow-sm border border-whisper-border"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab} Docs</span>
                </button>
              ))}
            </div>

            {/* Document Table */}
            <div className="bg-pure-surface border border-whisper-border rounded-lg overflow-hidden flex-1 shadow-sm">
               <div className="flex justify-between items-center p-4 border-b border-whisper-border bg-surface-container-low/30">
                 <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-whisper-border rounded text-[10px] font-mono font-bold uppercase tracking-widest text-deep-slate bg-pure-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                      <Filter className="w-3 h-3" /> Filters
                    </button>
                    <button className="px-3 py-1.5 border border-whisper-border rounded text-[10px] font-mono font-bold uppercase tracking-widest text-deep-slate bg-pure-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                      <Folder className="w-3 h-3" /> Folders
                    </button>
                 </div>
                 <div className="text-[10px] font-mono text-muted-steel tracking-widest uppercase font-medium">
                   Showing 62 Files
                 </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-surface-container-low/50">
                     <tr>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Document Name</th>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Linked Entity</th>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Assignee</th>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Upload / Expiry</th>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Status</th>
                       <th className="py-3 px-5 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border text-right"></th>
                     </tr>
                   </thead>
                   <tbody className="font-body text-sm align-top">
                     {documentsData.map((doc, i) => (
                       <tr 
                         key={i} 
                         onClick={() => setSelectedDoc(doc)}
                         className={`border-b border-whisper-border/50 hover:bg-surface-container-low/80 transition-colors cursor-pointer group ${selectedDoc?.id === doc.id ? 'bg-surface-container-low/80' : ''}`}
                       >
                         <td className="py-4 px-5">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded ${doc.status === 'Missing' ? 'bg-error/10 text-error' : 'bg-surface-dim text-deep-slate'}`}>
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className={`font-medium ${doc.status === 'Missing' ? 'text-error' : 'text-deep-slate'} group-hover:text-slate-700 transition-colors`}>{doc.name}</span>
                                <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest">{doc.type}</span>
                              </div>
                            </div>
                         </td>
                         <td className="py-4 px-5">
                           <div className="flex items-center gap-2">
                             <Link2 className="w-3 h-3 text-muted-steel" />
                             <span className="text-deep-slate">{doc.linkedTo}</span>
                           </div>
                         </td>
                         <td className="py-4 px-5 text-muted-steel">{doc.owner}</td>
                         <td className="py-4 px-5">
                            <div className="flex flex-col gap-1">
                              <span className="text-deep-slate">{doc.uploaded}</span>
                              <span className={`text-[11px] ${doc.expiry !== 'Permanent' && doc.expiry !== '-' ? 'text-amber-600' : 'text-muted-steel'}`}>Exp: {doc.expiry}</span>
                            </div>
                         </td>
                         <td className="py-4 px-5">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                         </td>
                         <td className="py-4 px-5 text-right">
                           <button className="p-1.5 text-muted-steel hover:text-deep-slate hover:bg-surface-container-high rounded transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                             <MoreHorizontal className="w-5 h-5" />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          {/* detail panel right side overlay/fixed relative to container */}
          <AnimatePresence>
            {selectedDoc && (
              <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute right-0 top-0 bottom-0 w-[380px] bg-pure-surface border border-whisper-border rounded-lg shadow-xl flex flex-col z-10 overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 border-b border-whisper-border bg-surface-container-low/50">
                  <h3 className="font-headline text-lg font-medium text-deep-slate">Document Details</h3>
                  <button onClick={() => setSelectedDoc(null)} className="p-1.5 text-muted-steel hover:bg-surface-container-high hover:text-deep-slate rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Thumbnail Mock */}
                  <div className="w-full aspect-[3/4] bg-surface-container-highest rounded border border-whisper-border flex flex-col items-center justify-center text-muted-steel relative overflow-hidden group">
                     {selectedDoc.status === 'Missing' ? (
                       <AlertCircle className="w-12 h-12 text-error/30 mb-2" />
                     ) : (
                       <FileText className="w-16 h-16 text-muted-steel/20" />
                     )}
                     <span className="font-mono text-xs uppercase tracking-widest mt-4 font-bold">{selectedDoc.type} Preview</span>
                     
                     {selectedDoc.status !== 'Missing' && (
                       <div className="absolute inset-0 bg-deep-slate/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                         <button className="p-3 bg-pure-surface text-deep-slate rounded-full hover:scale-105 transition-transform"><Eye className="w-5 h-5" /></button>
                         <button className="p-3 bg-pure-surface text-deep-slate rounded-full hover:scale-105 transition-transform"><Download className="w-5 h-5" /></button>
                       </div>
                     )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-body text-xl font-medium text-deep-slate break-words">{selectedDoc.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(selectedDoc.status)}`}>
                          {selectedDoc.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-whisper-border">
                      <div className="flex flex-col pb-2">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest mb-1">Linked To</span>
                        <span className="text-sm text-deep-slate font-medium">{selectedDoc.linkedTo}</span>
                      </div>
                      <div className="flex flex-col pb-2">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest mb-1">Doc Type</span>
                        <span className="text-sm text-deep-slate font-medium">{selectedDoc.type}</span>
                      </div>
                      <div className="flex flex-col pb-2">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest mb-1">Uploaded</span>
                        <span className="text-sm text-deep-slate">{selectedDoc.uploaded}</span>
                      </div>
                      <div className="flex flex-col pb-2">
                        <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest mb-1">Expiry Date</span>
                        <span className="text-sm text-deep-slate">{selectedDoc.expiry}</span>
                      </div>
                      <div className="flex flex-col pb-2">
                         <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest mb-1">Assignee</span>
                         <span className="text-sm text-deep-slate flex items-center gap-2">
                           <div className="w-5 h-5 rounded-full bg-surface-dim border border-whisper-border"></div>
                           {selectedDoc.owner}
                         </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-whisper-border space-y-3">
                       <span className="font-mono text-[10px] text-muted-steel uppercase tracking-widest font-bold">Actions</span>
                       <button className="w-full py-2.5 px-4 bg-deep-slate text-pure-surface font-mono text-[11px] uppercase font-bold tracking-widest rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                         {selectedDoc.status === 'Missing' ? 'Upload Document' : 'Verify Document'}
                       </button>
                       <button className="w-full py-2.5 px-4 bg-pure-surface border border-whisper-border text-deep-slate font-mono text-[11px] uppercase font-bold tracking-widest rounded hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
                          Replace File
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </DashboardLayout>
  );
}
