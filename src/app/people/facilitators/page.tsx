'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Search, Plus, Filter, Download, Phone, Mail, 
  MapPin, ChevronRight, X, 
  Briefcase, SearchIcon, Edit, Star, ShieldCheck, Hammer, Scale, ClipboardCheck, Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Facilitator {
  id: string;
  name: string;
  company: string;
  role: 'Lawyer' | 'Inspector' | 'Co-Broker' | 'Contractor' | 'Appraiser';
  phone: string;
  email: string;
  activeDeals: number;
  totalDeals: number;
  rating: number;
  location: string;
  notes: string;
}

const mockFacilitators: Facilitator[] = [
  {
    id: 'FAC-301',
    name: 'Barr. Chuka Obi',
    company: 'Obi & Partners Legal',
    role: 'Lawyer',
    phone: '+234 812 444 5566',
    email: 'chuka@obipartners.com.ng',
    activeDeals: 3,
    totalDeals: 42,
    rating: 4.8,
    location: 'Victoria Island, Lagos',
    notes: 'Excellent turnaround time on lease agreements. Standard fee is 5% of lease value. Highly recommended for commercial deals.'
  },
  {
    id: 'FAC-302',
    name: 'Samuel Peters',
    company: 'BuildRight Contractors',
    role: 'Contractor',
    phone: '+234 703 111 2233',
    email: 'hello@buildright.ng',
    activeDeals: 1,
    totalDeals: 15,
    rating: 4.2,
    location: 'Lekki Phase 1',
    notes: 'Good for quick renovations and painting. Can sometimes be delayed during rainy season. Affordable rates.'
  },
  {
    id: 'FAC-303',
    name: 'Aisha Danjuma',
    company: 'Platinum Realty Network',
    role: 'Co-Broker',
    phone: '+234 905 888 7766',
    email: 'aisha@platinumrealty.com',
    activeDeals: 2,
    totalDeals: 8,
    rating: 4.5,
    location: 'Abuja (Maitama)',
    notes: 'Strong network in the expatriate community. Standard 50/50 split on co-brokered leases.'
  },
  {
    id: 'FAC-304',
    name: 'Engr. Tunde Bakare',
    company: 'SafeHome Inspections Ltd',
    role: 'Inspector',
    phone: '+234 809 333 4455',
    email: 'inspections@safehome.ng',
    activeDeals: 0,
    totalDeals: 64,
    rating: 4.9,
    location: 'Ikeja, Lagos',
    notes: 'Very thorough structural inspections. Book at least 48 hours in advance.'
  },
  {
    id: 'FAC-305',
    name: 'Okoronkwo Appraisals',
    company: 'Okoronkwo & Co.',
    role: 'Appraiser',
    phone: '+234 811 555 9900',
    email: 'valuations@okoronkwo.co',
    activeDeals: 1,
    totalDeals: 28,
    rating: 4.6,
    location: 'Yaba, Lagos',
    notes: 'Accurate market valuations. Approved by top tier banks for mortgage appraisals.'
  }
];

export default function FacilitatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(null);

  const getRoleIcon = (role: Facilitator['role']) => {
    switch (role) {
      case 'Lawyer':
        return <Scale className="w-4 h-4 text-slate-600" />;
      case 'Inspector':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Contractor':
        return <Hammer className="w-4 h-4 text-amber-600" />;
      case 'Co-Broker':
        return <Briefcase className="w-4 h-4 text-purple-600" />;
      case 'Appraiser':
        return <ClipboardCheck className="w-4 h-4 text-blue-600" />;
    }
  };

  const getRoleBadge = (role: Facilitator['role']) => {
    switch (role) {
      case 'Lawyer':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">{getRoleIcon(role)} Legal</span>;
      case 'Inspector':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">{getRoleIcon(role)} Inspector</span>;
      case 'Contractor':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">{getRoleIcon(role)} Contractor</span>;
      case 'Co-Broker':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">{getRoleIcon(role)} Co-Broker</span>;
      case 'Appraiser':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">{getRoleIcon(role)} Appraiser</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Facilitators & Partners</h1>
            <p className="text-muted-steel mt-1 text-sm">Directory of external professionals, vendors, and co-brokers.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm bg-white">
              <Download className="w-4 h-4" /> Export Directory
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Facilitator
            </button>
          </div>
        </div>

        {/* Categories / Roles Quick Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-shrink-0">
          {[
            { role: 'Lawyers', count: '12', icon: Scale, color: 'text-slate-600', bg: 'bg-slate-50' },
            { role: 'Inspectors', count: '8', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { role: 'Contractors', count: '24', icon: Hammer, color: 'text-amber-600', bg: 'bg-amber-50' },
            { role: 'Co-Brokers', count: '45', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
            { role: 'Appraisers', count: '5', icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((cat, i) => (
             <div key={i} className="bg-white border border-whisper-border rounded-xl p-4 shadow-sm hover:border-deep-slate/30 transition-colors cursor-pointer group">
                <div className={`w-8 h-8 rounded-lg ${cat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`w-4 h-4 ${cat.color}`} />
                </div>
                <p className="text-sm font-semibold text-deep-slate">{cat.role}</p>
                <p className="text-xs text-muted-steel mt-0.5">{cat.count} registered</p>
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
                placeholder="Search name, company..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">All Roles</option>
                <option value="lawyer">Lawyer</option>
                <option value="inspector">Inspector</option>
                <option value="contractor">Contractor</option>
                <option value="broker">Co-Broker</option>
                <option value="appraiser">Appraiser</option>
              </select>
              <button className="flex items-center gap-2 px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white">
                <Filter className="w-4 h-4" /> More Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Professional Image</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Role & Performance</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Contact Info</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockFacilitators.map((fac) => (
                  <tr 
                    key={fac.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedFacilitator(fac)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-muted-steel border border-gray-200 shrink-0">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{fac.name}</div>
                          <div className="text-xs text-muted-steel mt-0.5">{fac.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-1.5">
                        {getRoleBadge(fac.role)}
                        <div className="flex items-center gap-2 mt-1">
                           <div className="flex items-center text-amber-500 text-xs font-medium">
                             <Star className="w-3.5 h-3.5 fill-current mr-1" /> {fac.rating}
                           </div>
                           <span className="text-muted-steel text-xs">•</span>
                           <span className="text-xs text-muted-steel">{fac.activeDeals} active</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate mb-1">{fac.phone}</div>
                      <div className="text-xs text-muted-steel">{fac.email}</div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedFacilitator(fac); }}>
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

      {/* Detail Side Panel */}
      <AnimatePresence>
        {selectedFacilitator && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFacilitator(null)}
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
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-muted-steel border border-gray-200 shrink-0 mt-1">
                      <Building className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-deep-slate">{selectedFacilitator.company}</h2>
                      <p className="text-sm font-medium text-deep-slate mt-1">Contact: {selectedFacilitator.name}</p>
                      <div className="flex items-center gap-3 mt-3">
                        {getRoleBadge(selectedFacilitator.role)}
                        <span className="flex items-center text-amber-500 text-sm font-semibold">
                           <Star className="w-4 h-4 fill-current mr-1" /> {selectedFacilitator.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedFacilitator(null)}
                    className="p-2 rounded-full hover:bg-gray-100 text-muted-steel transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               {/* Panel Actions / Toolbar */}
               <div className="px-8 py-3 border-b border-whisper-border bg-white flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <Edit className="w-4 h-4" /> Edit Details
                  </button>
                  <div className="flex-1"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-deep-slate hover:bg-opacity-90 rounded-lg transition-colors whitespace-nowrap">
                    <Briefcase className="w-4 h-4" /> Assign to Deal
                  </button>
               </div>

               {/* Panel Scrollable Content */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  
                  {/* Overview Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Contact Methods</p>
                        <div className="flex items-center gap-2 text-sm text-deep-slate font-medium mt-2">
                          <Phone className="w-4 h-4 text-muted-steel" /> {selectedFacilitator.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-deep-slate mt-2">
                          <Mail className="w-4 h-4 text-muted-steel" /> {selectedFacilitator.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-deep-slate mt-2">
                          <MapPin className="w-4 h-4 text-muted-steel" /> {selectedFacilitator.location}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div className="bg-gray-50 border border-whisper-border rounded-xl p-4 flex items-center justify-around text-center">
                          <div>
                            <p className="text-3xl font-bold text-deep-slate">{selectedFacilitator.activeDeals}</p>
                            <p className="text-xs font-medium text-muted-steel mt-1 uppercase tracking-wider">Active Deals</p>
                          </div>
                          <div className="w-px h-10 bg-whisper-border"></div>
                          <div>
                            <p className="text-3xl font-bold text-deep-slate">{selectedFacilitator.totalDeals}</p>
                            <p className="text-xs font-medium text-muted-steel mt-1 uppercase tracking-wider">Total History</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <div>
                    <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider mb-3">Internal Notes & Reviews</h3>
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4 text-sm text-deep-slate leading-relaxed relative">
                       <div className="absolute top-4 right-4 text-amber-500/30">
                         <Star className="w-8 h-8 fill-current" />
                       </div>
                       {selectedFacilitator.notes}
                    </div>
                  </div>

                  {/* Associated Deals History */}
                  <div>
                    <h3 className="text-lg font-bold text-deep-slate mb-4">Associated Deals</h3>
                    <div className="border border-whisper-border rounded-xl overflow-hidden">
                       <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50/50">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Property/Deal</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Transaction Type</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-whisper-border">
                            {/* Dummy Rows */}
                            {selectedFacilitator.activeDeals > 0 && (
                               <tr className="hover:bg-slate-50">
                                 <td className="px-4 py-3 font-medium text-deep-slate">8A Banana Island Road</td>
                                 <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Sale Agreement Review</td>
                                 <td className="px-4 py-3 text-right">
                                   <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">In Progress</span>
                                 </td>
                               </tr>
                            )}
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-deep-slate">Plot 44, Freedom Way</td>
                              <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Commercial Title Search</td>
                              <td className="px-4 py-3 text-right">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">Completed</span>
                              </td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-medium text-deep-slate">Unit 12, Nicon Town</td>
                              <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Lease Drafting</td>
                              <td className="px-4 py-3 text-right">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">Completed</span>
                              </td>
                            </tr>
                          </tbody>
                       </table>
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
