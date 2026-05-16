'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';

// Mock Data
const estateMetrics = [
  { label: 'Total Estates', value: '14' },
  { label: 'Available Plots', value: '342' },
  { label: 'Sold Plots', value: '1,894' },
  { label: 'Reserved Plots', value: '56' },
  { label: 'Verified Titles', value: '12', alert: false },
];

const estateData = [
  { id: '1', name: 'Coral City', loc: 'Epe', sizes: '300, 500 sqm', price: '₦1.5M - ₦3M', title: 'C of O', avail: '120 Plots Left', payment: 'Up to 12 Mos', rep: 'John D.', status: 'Active Selling' },
  { id: '2', name: 'The Haven', loc: 'Ibeju Lekki', sizes: '600 sqm', price: '₦12M', title: 'Excision', avail: '45 Plots Left', payment: 'Outright Only', rep: 'Sarah K.', status: 'Closing Out' },
  { id: '3', name: 'Green Park Phase 2', loc: 'Mowe', sizes: '450 sqm', price: '₦800k', title: 'Registered Survey', avail: 'Sold Out', payment: '-', rep: '-', status: 'Sold Out' },
];

const carcassMetrics = [
  { label: 'Total Carcass Bldgs', value: '8' },
  { label: 'Available Units', value: '24' },
  { label: 'Under Construction', value: '6' },
  { label: 'Reserved', value: '12' },
  { label: 'Sold', value: '38' },
] as Array<{ label: string; value: string; alert?: boolean }>;

const carcassData = [
  { id: '1', project: 'Sapphire Towers', loc: 'Victoria Island', stage: '75% (Roofing)', floors: '12', landSize: '2000 sqm', title: 'Deed of Ass.', price: '₦450M / unit', avail: '3 Units Left', rep: 'Michael O.', status: 'Selling Fast' },
  { id: '2', project: 'Oasis Terraces', loc: 'Lekki Phase 1', stage: '40% (Decking)', floors: '3', landSize: '1500 sqm', title: 'Gov. Consent', price: '₦120M / unit', avail: '8 Units Left', rep: 'Angela B.', status: 'Active Selling' },
  { id: '3', project: 'Ikoyi Shell', loc: 'Ikoyi', stage: '90% (Finishing)', floors: '5', landSize: '800 sqm', title: 'C of O', price: '₦800M (Whole)', avail: '1 Unit Left', rep: 'David W.', status: 'Reserved' },
];

const finishedMetrics = [
  { label: 'Total Finished Bldgs', value: '45' },
  { label: 'Available For Sale', value: '18' },
  { label: 'Sold', value: '124' },
  { label: 'Reserved', value: '5' },
  { label: 'Occupied', value: '112' },
  { label: 'Vacant', value: '6' },
] as Array<{ label: string; value: string; alert?: boolean }>;

const finishedData = [
  { id: '1', name: 'The Pantheon', loc: 'Banana Island', type: 'Luxury Apartment', units: '24', price: '₦850M', title: 'C of O', occupancy: '18 Occupied, 6 Vacant', readiness: 'Move-in Ready', rep: 'Elena R.', status: 'Active' },
  { id: '2', name: 'Silverstone Mall', loc: 'Ikeja', type: 'Commercial Retail', units: '1', price: '₦4.2B', title: 'Deed of Ass.', occupancy: 'Vacant', readiness: 'Requires Renovation', rep: 'John D.', status: 'Pending Offer' },
  { id: '3', name: 'Orchid Villas', loc: 'Chevron Drive', type: '4 Bed Semi-Detached', units: '8', price: '₦180M', title: 'Gov. Consent', occupancy: 'All Vacant', readiness: 'Move-in Ready', rep: 'Angela B.', status: 'Active' },
];

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<'estate' | 'carcass' | 'finished'>('estate');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMetrics = () => {
    switch(activeTab) {
      case 'estate': return estateMetrics;
      case 'carcass': return carcassMetrics;
      case 'finished': return finishedMetrics;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active selling': case 'active': return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'sold out': return 'bg-surface-container-high text-muted-steel border-whisper-border';
      case 'reserved': case 'pending offer': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'closing out': case 'selling fast': return 'bg-deep-slate/10 text-deep-slate border-deep-slate/20';
      default: return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col gap-4">
          <Link href="/properties" className="flex items-center text-[11px] font-mono uppercase tracking-widest text-muted-steel hover:text-deep-slate transition-colors w-fit">
            <ArrowLeft className="w-3 h-3 mr-2" /> back to properties
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="font-headline text-3xl font-medium tracking-tight text-deep-slate uppercase">Sales & Acquisitions</h1>
              <p className="font-body text-sm text-muted-steel mt-1">Manage estates, off-plan constructions, and finished property inventory.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
               <button className="h-10 px-4 bg-pure-surface border border-whisper-border text-deep-slate font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors flex-1 md:flex-none">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-10 px-4 bg-deep-slate text-pure-surface font-mono text-[11px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors flex-1 md:flex-none">
                <Plus className="w-4 h-4" />
                <span>New Listing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="bg-surface-container-low p-1 rounded-lg inline-flex w-full md:w-auto overflow-x-auto hide-scrollbar border border-whisper-border/50">
          {(['estate', 'carcass', 'finished'] as const).map((tab) => (
             <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`relative px-6 py-2.5 rounded-md font-mono text-[11px] uppercase tracking-widest font-bold transition-colors whitespace-nowrap ${
               activeTab === tab ? 'text-deep-slate' : 'text-muted-steel hover:text-deep-slate'
             }`}
           >
             {activeTab === tab && (
               <motion.div
                 layoutId="sales-active-tab"
                 className="absolute inset-0 bg-pure-surface rounded-md shadow-sm border border-whisper-border"
                 initial={false}
                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
               />
             )}
             <span className="relative z-10">{tab === 'estate' ? 'Estate Land' : tab === 'carcass' ? 'Carcass Bldgs' : 'Finished Bldgs'}</span>
           </button>
          ))}
        </div>

        {/* KPIs */}
        <motion.div 
          key={activeTab + '-metrics'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {getMetrics().map((metric, i) => (
            <div key={i} className={`p-4 rounded-lg border bg-pure-surface transition-colors ${metric.alert ? 'border-error/30 bg-error/5' : 'border-whisper-border hover:border-slate-300'}`}>
              <p className={`font-mono text-[10px] uppercase tracking-widest font-medium mb-2 ${metric.alert ? 'text-error' : 'text-muted-steel'}`}>
                {metric.label}
              </p>
              <p className={`font-mono text-2xl font-bold ${metric.alert ? 'text-error' : 'text-deep-slate'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Data Table Area */}
        <div className="bg-pure-surface border border-whisper-border rounded-lg overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-4 border-b border-whisper-border bg-surface-container-low/30">
             <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-steel w-4 h-4" />
              <input 
                className="w-full bg-pure-surface border border-whisper-border rounded h-9 pl-9 pr-3 font-body text-sm text-deep-slate focus:outline-none focus:border-deep-slate focus:ring-0 transition-all placeholder:text-muted-steel/60" 
                placeholder={`Search ${activeTab} inventory...`} 
                type="text"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-surface-container-low/50">
                {activeTab === 'estate' && (
                  <tr>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Estate Details</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Plot Info</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Pricing & Payment</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Title / Rep</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Status</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border right-0"></th>
                  </tr>
                )}
                 {activeTab === 'carcass' && (
                  <tr>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Project Info</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Construction Detail</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Asking Price</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Title / Rep</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Status</th>
                     <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border right-0"></th>
                  </tr>
                )}
                {activeTab === 'finished' && (
                  <tr>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Building Profile</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Unit Specs</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Asking Price</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Occupancy / Rep</th>
                    <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border">Status</th>
                     <th className="py-3 px-4 font-mono text-[10px] text-muted-steel uppercase font-bold tracking-widest border-b border-whisper-border right-0"></th>
                  </tr>
                )}
              </thead>
              <tbody className="font-body text-sm align-top">
                {activeTab === 'estate' && estateData.map((row, i) => (
                  <tr key={i} className="border-b border-whisper-border/50 hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                    <td className="py-3 px-4">
                       <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate font-medium">{row.name}</span>
                        <span className="text-[11px] text-muted-steel">{row.loc}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                       <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs font-medium text-deep-slate">{row.sizes}</span>
                        <span className="text-[11px] text-muted-steel">{row.avail}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                       <div className="flex flex-col gap-0.5">
                         <span className="font-mono text-xs font-bold text-deep-slate">{row.price}</span>
                         <span className="text-[11px] text-muted-steel">{row.payment}</span>
                       </div>
                    </td>
                    <td className="py-3 px-4">
                       <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate">{row.title}</span>
                        <span className="text-[11px] text-muted-steel">{row.rep}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.status)}`}>{row.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-muted-steel hover:text-deep-slate hover:bg-surface-container-high rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {activeTab === 'carcass' && carcassData.map((row, i) => (
                  <tr key={i} className="border-b border-whisper-border/50 hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate font-medium">{row.project}</span>
                        <span className="text-[11px] text-muted-steel">{row.loc}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                       <div className="flex flex-col gap-0.5">
                         <span className="text-deep-slate text-xs font-medium">{row.stage}</span>
                         <span className="text-[11px] text-muted-steel">{row.floors} Floors • {row.landSize}</span>
                       </div>
                    </td>
                    <td className="py-3 px-4">
                       <span className="font-mono text-xs font-bold text-deep-slate">{row.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate">{row.title}</span>
                        <span className="text-[11px] text-muted-steel">{row.rep}</span>
                      </div>
                    </td>
                     <td className="py-3 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.status)}`}>{row.status}</span>
                        <span className="text-[10px] font-mono font-medium text-muted-steel">{row.avail}</span>
                      </div>
                    </td>
                     <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-muted-steel hover:text-deep-slate hover:bg-surface-container-high rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                 {activeTab === 'finished' && finishedData.map((row, i) => (
                  <tr key={i} className="border-b border-whisper-border/50 hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate font-medium">{row.name}</span>
                        <span className="text-[11px] text-muted-steel">{row.loc}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate">{row.type}</span>
                        <span className="text-[11px] text-muted-steel">{row.units} Units Total</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                        <span className="font-mono text-xs font-bold text-deep-slate">{row.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-deep-slate text-[11px]">{row.occupancy}</span>
                        <span className="text-[11px] text-muted-steel">{row.readiness} • {row.rep}</span>
                      </div>
                    </td>
                     <td className="py-3 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-bold border ${getStatusColor(row.status)}`}>{row.status}</span>
                      </div>
                    </td>
                     <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-muted-steel hover:text-deep-slate hover:bg-surface-container-high rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <AddPropertyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          alert('Property successfully created!');
        }}
        defaultListingType="sale"
      />
    </DashboardLayout>
  );
}
