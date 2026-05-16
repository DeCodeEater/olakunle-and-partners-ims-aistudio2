'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Search, Plus, Filter, Download, UserCheck, Phone, Mail, 
  MapPin, Home, DollarSign, ChevronRight, X, 
  MessageSquare, FileText, CheckCircle2, Navigation, SearchIcon, Edit, User, Bath, Bed, Briefcase, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Buyer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'New Lead' | 'Viewing' | 'Negotiating' | 'Closed';
  assignedAgent: string;
  preferences: {
    propertyType: string;
    budgetMin: string;
    budgetMax: string;
    locations: string[];
    beds: number;
    baths: number;
    purpose: 'Investment' | 'Primary Residence' | 'Commercial';
  };
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
}

const mockBuyers: Buyer[] = [
  {
    id: 'BUY-201',
    name: 'Eleanor Vance',
    phone: '+234 811 222 3344',
    email: 'eleanor.v@example.com',
    status: 'Viewing',
    assignedAgent: 'Michael Okeke',
    preferences: {
      propertyType: 'Detached Duplex',
      budgetMin: '₦120,000,000',
      budgetMax: '₦180,000,000',
      locations: ['Lekki Phase 1', 'Ikoyi'],
      beds: 4,
      baths: 4.5,
      purpose: 'Primary Residence'
    },
    preferredContact: 'WhatsApp'
  },
  {
    id: 'BUY-202',
    name: 'Oluwaseun Adebayo',
    phone: '+234 803 444 5566',
    email: 'seun.invest@example.com',
    status: 'Negotiating',
    assignedAgent: 'Sarah Williams',
    preferences: {
      propertyType: 'Block of Flats',
      budgetMin: '₦300,000,000',
      budgetMax: '₦450,000,000',
      locations: ['Victoria Island', 'Yaba'],
      beds: 0, // N/A for block
      baths: 0,
      purpose: 'Investment'
    },
    preferredContact: 'Email'
  },
  {
    id: 'BUY-203',
    name: 'Jessica Nnamdi',
    phone: '+234 902 111 8899',
    email: 'jess.n@example.com',
    status: 'New Lead',
    assignedAgent: 'Unassigned',
    preferences: {
      propertyType: 'Terraced House',
      budgetMin: '₦60,000,000',
      budgetMax: '₦90,000,000',
      locations: ['Ajah', 'Sangotedo'],
      beds: 3,
      baths: 3,
      purpose: 'Primary Residence'
    },
    preferredContact: 'Phone'
  },
  {
    id: 'BUY-204',
    name: 'Atlas Holdings Ltd',
    phone: '+234 809 777 6655',
    email: 'acquisitions@atlasholdings.ng',
    status: 'Closed',
    assignedAgent: 'Chioma Eze',
    preferences: {
      propertyType: 'Commercial Land',
      budgetMin: '₦500,000,000',
      budgetMax: '₦1,000,000,000',
      locations: ['Epe', 'Ibeju-Lekki'],
      beds: 0,
      baths: 0,
      purpose: 'Commercial'
    },
    preferredContact: 'Email'
  }
];

export default function BuyersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  const getStatusBadge = (status: Buyer['status']) => {
    switch (status) {
      case 'New Lead':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"><User className="w-3.5 h-3.5" /> New Lead</span>;
      case 'Viewing':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20"><Navigation className="w-3.5 h-3.5" /> Viewing</span>;
      case 'Negotiating':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"><MessageSquare className="w-3.5 h-3.5" /> Negotiating</span>;
      case 'Closed':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="w-3.5 h-3.5" /> Closed</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Buyers & Leads</h1>
            <p className="text-muted-steel mt-1 text-sm">Manage potential buyers, track property preferences, and monitor pipeline.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm bg-white">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Buyer
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
          {[
            { label: 'Total Buyers', value: '1,248', trend: '+45 this month' },
            { label: 'Active Leads', value: '86', trend: 'Viewing or Negotiating', trendColor: 'text-purple-600' },
            { label: 'Pipeline Value', value: '₦4.8B', trend: 'Est. active closing value', trendColor: 'text-emerald-600' },
            { label: 'Avg Time to Close', value: '42 days', trend: 'Rolling 3 months' }
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
          <div className="p-4 border-b border-whisper-border flex flex-col lg:flex-row justify-between gap-4 bg-gray-50/50">
            <div className="relative w-full lg:w-96">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel" />
              <input 
                type="text" 
                placeholder="Search name, phone, email..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Status</option>
                <option value="new">New Lead</option>
                <option value="viewing">Viewing</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed">Closed</option>
              </select>
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Property Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Budget Range</option>
                <option value="<50m">Under ₦50M</option>
                <option value="50m-150m">₦50M - ₦150M</option>
                <option value="150m-500m">₦150M - ₦500M</option>
                <option value=">500m">Over ₦500M</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Buyer Info</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Target Budget</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Property Req.</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Status & Agent</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockBuyers.map((buyer) => (
                  <tr 
                    key={buyer.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedBuyer(buyer)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold shrink-0">
                          {buyer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{buyer.name}</div>
                          <div className="text-xs text-muted-steel mt-0.5">{buyer.phone} • {buyer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-semibold text-deep-slate mb-1">{buyer.preferences.budgetMax}</div>
                      <div className="text-xs text-muted-steel">Min: {buyer.preferences.budgetMin}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate">{buyer.preferences.propertyType}</div>
                      <div className="text-xs text-muted-steel mt-0.5 truncate max-w-[200px]" title={buyer.preferences.locations.join(', ')}>
                         {buyer.preferences.locations.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-2">
                        {getStatusBadge(buyer.status)}
                        <span className="text-[11px] text-muted-steel flex items-center gap-1"><Briefcase className="w-3 h-3" /> {buyer.assignedAgent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedBuyer(buyer); }}>
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
        {selectedBuyer && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBuyer(null)}
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
                      {selectedBuyer.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-deep-slate">{selectedBuyer.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        {getStatusBadge(selectedBuyer.status)}
                        <span className="text-sm text-muted-steel">{selectedBuyer.id}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedBuyer(null)}
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
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <UserCheck className="w-4 h-4" /> Assign Agent
                  </button>
                  <div className="flex-1"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-deep-slate hover:bg-opacity-90 rounded-lg transition-colors whitespace-nowrap">
                    <FileText className="w-4 h-4" /> Log Offer
                  </button>
               </div>

               {/* Panel Scrollable Content */}
               <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Overview */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-whisper-border">
                    <h3 className="text-sm font-bold text-deep-slate uppercase tracking-wider mb-4">Contact Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <p className="text-xs text-muted-steel mb-1">Phone Number</p>
                         <p className="text-sm font-medium text-deep-slate flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-muted-steel"/> {selectedBuyer.phone}</p>
                       </div>
                       <div>
                         <p className="text-xs text-muted-steel mb-1">Email Address</p>
                         <p className="text-sm font-medium text-deep-slate flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-muted-steel"/> {selectedBuyer.email}</p>
                       </div>
                       <div>
                         <p className="text-xs text-muted-steel mb-1">Preferred Contact</p>
                         <p className="text-sm font-medium text-deep-slate">{selectedBuyer.preferredContact}</p>
                       </div>
                       <div>
                         <p className="text-xs text-muted-steel mb-1">Assigned To</p>
                         <p className="text-sm font-medium text-deep-slate flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-muted-steel"/> {selectedBuyer.assignedAgent}</p>
                       </div>
                    </div>
                  </div>

                  {/* Purchasing Criteria */}
                  <div>
                    <h3 className="text-lg font-bold text-deep-slate mb-4">Purchasing Criteria</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="border border-whisper-border rounded-xl p-4">
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">Budget Range</p>
                          <p className="text-lg font-bold text-deep-slate">{selectedBuyer.preferences.budgetMin}</p>
                          <p className="text-sm text-muted-steel mt-1">to {selectedBuyer.preferences.budgetMax}</p>
                       </div>
                       <div className="border border-whisper-border rounded-xl p-4 flex flex-col justify-center">
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Purpose</p>
                          <p className="text-sm font-medium text-deep-slate flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-600"/> {selectedBuyer.preferences.purpose}</p>
                       </div>
                       <div className="border border-whisper-border rounded-xl p-4 col-span-2">
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-3">Property Details</p>
                          <div className="flex flex-wrap gap-4">
                             <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-whisper-border">
                                <Home className="w-4 h-4 text-muted-steel" />
                                <span className="text-sm font-medium text-deep-slate">{selectedBuyer.preferences.propertyType}</span>
                             </div>
                             {(selectedBuyer.preferences.beds > 0 || selectedBuyer.preferences.baths > 0) && (
                               <>
                                 <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-whisper-border">
                                    <Bed className="w-4 h-4 text-muted-steel" />
                                    <span className="text-sm font-medium text-deep-slate">{selectedBuyer.preferences.beds}+ Beds</span>
                                 </div>
                                 <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-whisper-border">
                                    <Bath className="w-4 h-4 text-muted-steel" />
                                    <span className="text-sm font-medium text-deep-slate">{selectedBuyer.preferences.baths}+ Baths</span>
                                 </div>
                               </>
                             )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-whisper-border">
                             <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Preferred Locations</p>
                             <div className="flex flex-wrap gap-2">
                               {selectedBuyer.preferences.locations.map(loc => (
                                 <span key={loc} className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">{loc}</span>
                               ))}
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Activity History */}
                  <div>
                    <h3 className="text-lg font-bold text-deep-slate mb-4">Activity & Pipeline</h3>
                    <div className="relative border-l-2 border-whisper-border ml-3 space-y-6 pb-4">
                       {/* Timeline Item */}
                       <div className="relative pl-6">
                         <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-500"></div>
                         <p className="text-xs text-muted-steel font-medium mb-1">Yesterday, 2:30 PM</p>
                         <p className="text-sm font-semibold text-deep-slate">Submitted Offer on 14B Admiralty Way</p>
                         <p className="text-sm text-muted-steel mt-1">Offered ₦145,000,000 via Agent Michael Okeke. Awaiting seller response.</p>
                       </div>
                       {/* Timeline Item */}
                       <div className="relative pl-6">
                         <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                         <p className="text-xs text-muted-steel font-medium mb-1">Oct 12, 2023</p>
                         <p className="text-sm font-semibold text-deep-slate">Property Viewing</p>
                         <div className="bg-gray-50 border border-whisper-border rounded-lg p-3 mt-2">
                           <p className="text-sm font-medium text-deep-slate">14B Admiralty Way, Lekki Phase 1</p>
                           <p className="text-xs text-muted-steel mt-1">Feedback: Loved the layout, requested second viewing with architect.</p>
                         </div>
                       </div>
                       {/* Timeline Item */}
                       <div className="relative pl-6">
                         <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-400"></div>
                         <p className="text-xs text-muted-steel font-medium mb-1">Oct 01, 2023</p>
                         <p className="text-sm font-semibold text-deep-slate">Lead Generated</p>
                         <p className="text-sm text-muted-steel mt-1">Registered via PropertyPro.ng listing inquiry.</p>
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
