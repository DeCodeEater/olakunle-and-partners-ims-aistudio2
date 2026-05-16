'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Search, Plus, Filter, Download, UserCheck, Phone, Mail, 
  Building2, MoreVertical, FileText, ChevronRight, X, 
  CreditCard, FileClock, CheckCircle2, AlertCircle, Clock, SearchIcon, Upload, Landmark, Edit, Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Landlord {
  id: string;
  name: string;
  type: 'Individual' | 'Company';
  phone: string;
  email: string;
  propertyCount: number;
  portfolioValue: string;
  payoutBalance: string;
  status: 'Active' | 'Inactive' | 'Pending Verification';
  documentStatus: 'Complete' | 'Needs Documents' | 'Under Review';
  lastActivity: string;
}

const mockLandlords: Landlord[] = [
  {
    id: 'LND-001',
    name: 'Alhaji Bashir Usman',
    type: 'Individual',
    phone: '+234 803 123 4567',
    email: 'b.usman@example.com',
    propertyCount: 14,
    portfolioValue: '₦850,000,000',
    payoutBalance: '₦2,400,000',
    status: 'Active',
    documentStatus: 'Complete',
    lastActivity: '2 days ago'
  },
  {
    id: 'LND-002',
    name: 'Crown Real Estate Sub',
    type: 'Company',
    phone: '+234 812 987 6543',
    email: 'investments@crown.ng',
    propertyCount: 22,
    portfolioValue: '₦4,200,000,000',
    payoutBalance: '₦0',
    status: 'Active',
    documentStatus: 'Needs Documents',
    lastActivity: '5 hours ago'
  },
  {
    id: 'LND-003',
    name: 'Mrs. Stella Okoro',
    type: 'Individual',
    phone: '+234 705 444 3333',
    email: 'stella.o@example.com',
    propertyCount: 3,
    portfolioValue: '₦120,000,000',
    payoutBalance: '₦450,000',
    status: 'Pending Verification',
    documentStatus: 'Under Review',
    lastActivity: '1 week ago'
  },
  {
    id: 'LND-004',
    name: 'Chief Dr. Adebayo',
    type: 'Individual',
    phone: '+234 809 111 2222',
    email: 'adebayo.doc@example.com',
    propertyCount: 8,
    portfolioValue: '₦680,000,000',
    payoutBalance: '₦1,200,000',
    status: 'Active',
    documentStatus: 'Complete',
    lastActivity: '1 month ago'
  },
  {
    id: 'LND-005',
    name: 'Zenith Properties Ltd',
    type: 'Company',
    phone: '+234 802 888 9999',
    email: 'contact@zenithprop.cm',
    propertyCount: 45,
    portfolioValue: '₦12,500,000,000',
    payoutBalance: '₦5,800,000',
    status: 'Active',
    documentStatus: 'Complete',
    lastActivity: '1 day ago'
  }
];

export default function LandlordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLandlord, setSelectedLandlord] = useState<Landlord | null>(null);

  const getStatusBadge = (status: Landlord['status']) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>;
      case 'Inactive':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20"><Archive className="w-3.5 h-3.5" /> Inactive</span>;
      case 'Pending Verification':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  const getDocumentBadge = (status: Landlord['documentStatus']) => {
    switch (status) {
      case 'Complete':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-emerald-700 bg-emerald-50"><CheckCircle2 className="w-3 h-3" /> Complete</span>;
      case 'Needs Documents':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-red-700 bg-red-50"><AlertCircle className="w-3 h-3" /> Missing Files</span>;
      case 'Under Review':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-blue-700 bg-blue-50"><FileClock className="w-3 h-3" /> Reviewing</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Landlords</h1>
            <p className="text-muted-steel mt-1 text-sm">Manage property owners, portfolios, documents, and landlord relationships.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm bg-white">
              <Download className="w-4 h-4" /> Import
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Landlord
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 flex-shrink-0">
          {[
            { label: 'Total Landlords', value: '142', trend: '+4 this month' },
            { label: 'Active Portfolios', value: '118', trend: '83% active rate' },
            { label: 'Managed Properties', value: '384', trend: 'Across all landlords' },
            { label: 'Pending Payouts', value: '₦12.4M', trend: '14 landlords due', trendColor: 'text-amber-600' },
            { label: 'Missing Documents', value: '18', trend: 'Requires attention', trendColor: 'text-red-600' },
            { label: 'Outstanding Issues', value: '3', trend: 'Maintenance/Legal', trendColor: 'text-red-600' }
          ].map((metric, i) => (
            <div key={i} className="bg-white border border-whisper-border rounded-xl p-4 shadow-sm">
              <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-deep-slate">{metric.value}</span>
              </div>
              <p className={`text-[11px] mt-1 font-medium ${metric.trendColor || 'text-muted-steel'}`}>{metric.trend}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-whisper-border rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-whisper-border flex flex-col sm:flex-row justify-between gap-4 bg-gray-50/50">
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel" />
              <input 
                type="text" 
                placeholder="Search name, email, phone..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Landlord</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Contact</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Properties</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Status & Docs</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Payout Balance</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockLandlords.map((landlord) => (
                  <tr 
                    key={landlord.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLandlord(landlord)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold shrink-0">
                          {landlord.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{landlord.name}</div>
                          <div className="text-xs text-muted-steel mt-0.5">{landlord.id} • {landlord.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate mb-1">{landlord.phone}</div>
                      <div className="text-xs text-muted-steel">{landlord.email}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate">{landlord.propertyCount}</div>
                      <div className="text-xs text-muted-steel mt-0.5">{landlord.portfolioValue}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-2">
                        {getStatusBadge(landlord.status)}
                        {getDocumentBadge(landlord.documentStatus)}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      <div className={`text-sm font-semibold ${landlord.payoutBalance === '₦0' ? 'text-muted-steel' : 'text-deep-slate'}`}>{landlord.payoutBalance}</div>
                      <div className="text-xs text-muted-steel mt-1">Due now</div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedLandlord(landlord); }}>
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

      {/* Profile Side Panel */}
      <AnimatePresence>
        {selectedLandlord && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLandlord(null)}
              className="fixed inset-0 bg-deep-slate/20 backdrop-blur-sm z-[60]"
            />
            {/* Panel */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-[70] border-l border-whisper-border flex flex-col"
            >
               {/* Panel Header */}
               <div className="px-8 py-6 border-b border-whisper-border flex items-start justify-between bg-gray-50/30 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold text-2xl shrink-0 ring-1 ring-deep-slate/10">
                      {selectedLandlord.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-deep-slate">{selectedLandlord.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        {getStatusBadge(selectedLandlord.status)}
                        <span className="text-sm text-muted-steel">{selectedLandlord.id}</span>
                        <span className="text-sm text-muted-steel">Added Oct 2023</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLandlord(null)}
                    className="p-2 rounded-full hover:bg-gray-100 text-muted-steel transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               {/* Panel Actions / Toolbar */}
               <div className="px-8 py-3 border-b border-whisper-border bg-white flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <Edit className="w-4 h-4" /> Edit Profile
                  </button>
                  <div className="w-px h-4 bg-whisper-border mx-1"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <Building2 className="w-4 h-4" /> Add Property
                  </button>
                  <Link href="/rentals/new" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <FileText className="w-4 h-4" /> New Rent
                  </Link>
                  <Link href="/sales/new" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <Landmark className="w-4 h-4" /> New Sale
                  </Link>
                  <div className="flex-1"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-deep-slate hover:bg-opacity-90 rounded-lg transition-colors whitespace-nowrap">
                    <CreditCard className="w-4 h-4" /> Record Payout
                  </button>
               </div>

               {/* Panel Scrollable Content */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Overview Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Contact Info</p>
                        <div className="flex items-center gap-2 text-sm text-deep-slate font-medium">
                          <Phone className="w-4 h-4 text-muted-steel" /> {selectedLandlord.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-deep-slate mt-2">
                          <Mail className="w-4 h-4 text-muted-steel" /> {selectedLandlord.email}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Ownership Type</p>
                        <p className="text-sm text-deep-slate">{selectedLandlord.type}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div className="bg-gray-50 border border-whisper-border rounded-xl p-4">
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Payout Balance</p>
                          <p className="text-2xl font-bold text-deep-slate">{selectedLandlord.payoutBalance}</p>
                          <p className="text-xs text-muted-steel mt-1">Pending distribution</p>
                       </div>
                       <div className="flex items-center justify-between p-3 border border-whisper-border rounded-xl">
                          <div>
                            <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider">Docs Verify</p>
                            <p className="text-sm font-medium text-deep-slate mt-0.5">{selectedLandlord.documentStatus}</p>
                          </div>
                          {getDocumentBadge(selectedLandlord.documentStatus)}
                       </div>
                    </div>
                  </div>

                  {/* Properties Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-bold text-deep-slate">Portfolio Overview</h3>
                       <p className="font-mono text-sm text-muted-steel font-bold">{selectedLandlord.propertyCount} Properties</p>
                    </div>
                    <div className="border border-whisper-border rounded-xl overflow-hidden">
                       <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50/50">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Property</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Type</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-whisper-border">
                            {/* Dummy Rows */}
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-deep-slate">Victoria Island Block A</td>
                              <td className="px-4 py-3 text-muted-steel">Commercial</td>
                              <td className="px-4 py-3"><span className="text-emerald-700 font-medium">Fully Rented</span></td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-deep-slate">Lekki Phase 1 Estate</td>
                              <td className="px-4 py-3 text-muted-steel">Residential</td>
                              <td className="px-4 py-3"><span className="text-amber-600 font-medium">1 Vacancy</span></td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-deep-slate">Abuja Central Tower</td>
                              <td className="px-4 py-3 text-muted-steel">Mixed Use</td>
                              <td className="px-4 py-3"><span className="text-deep-slate font-medium">For Sale</span></td>
                            </tr>
                          </tbody>
                       </table>
                       <div className="p-3 border-t border-whisper-border bg-gray-50/30 text-center">
                         <button className="text-sm font-medium text-deep-slate hover:underline">View All Properties →</button>
                       </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-bold text-deep-slate">Key Documents</h3>
                       <button className="text-sm font-medium text-deep-slate flex items-center gap-1.5 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors">
                         <Upload className="w-4 h-4" /> Upload
                       </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <div className="flex items-start gap-3 p-3 border border-whisper-border rounded-xl">
                        <FileText className="w-8 h-8 text-emerald-600 shrink-0 p-1.5 bg-emerald-50 rounded-lg" />
                        <div>
                          <p className="text-sm font-semibold text-deep-slate line-clamp-1">Management Agreement.pdf</p>
                          <p className="text-[11px] text-muted-steel mt-0.5">Signed Oct 2023 • 2.4 MB</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border border-whisper-border rounded-xl">
                        <FileText className="w-8 h-8 text-blue-600 shrink-0 p-1.5 bg-blue-50 rounded-lg" />
                        <div>
                          <p className="text-sm font-semibold text-deep-slate line-clamp-1">ID Verification.jpg</p>
                          <p className="text-[11px] text-muted-steel mt-0.5">Verified Nov 2023</p>
                        </div>
                      </div>
                      {selectedLandlord.documentStatus === 'Needs Documents' && (
                        <div className="flex items-start gap-3 p-3 border border-red-200 bg-red-50/30 rounded-xl sm:col-span-2">
                          <AlertCircle className="w-8 h-8 text-red-600 shrink-0 p-1.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-900">Missing Tax Identification Number (TIN)</p>
                            <p className="text-xs text-red-700 mt-1">Please upload the TIN certificate to process the next payout.</p>
                            <button className="mt-2 text-xs font-semibold bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded-md hover:bg-red-50">Upload Now</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h3 className="text-lg font-bold text-deep-slate mb-4">Recent Activity</h3>
                    <div className="space-y-6">
                       <div className="flex gap-4">
                         <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0 ring-4 ring-blue-50"></div>
                         <div>
                           <p className="text-sm font-medium text-deep-slate">Payout generated for October</p>
                           <p className="text-xs text-muted-steel mt-0.5">2 days ago • System</p>
                         </div>
                       </div>
                       <div className="flex gap-4">
                         <div className="w-2.5 h-2.5 rounded-full bg-gray-300 mt-1.5 shrink-0 ring-4 ring-gray-100"></div>
                         <div>
                           <p className="text-sm font-medium text-deep-slate">New rent agreement signed: Lekki Phase 1</p>
                           <p className="text-xs text-muted-steel mt-0.5">1 week ago • By Sarah M.</p>
                         </div>
                       </div>
                       <div className="flex gap-4">
                         <div className="w-2.5 h-2.5 rounded-full bg-gray-300 mt-1.5 shrink-0 ring-4 ring-gray-100"></div>
                         <div>
                           <p className="text-sm font-medium text-deep-slate">Property Added: Victoria Island Block A</p>
                           <p className="text-xs text-muted-steel mt-0.5">3 weeks ago • By Admin</p>
                         </div>
                       </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
