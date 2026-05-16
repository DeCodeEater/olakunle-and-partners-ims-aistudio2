'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, ArrowLeft, X, Edit2, UserPlus, MapPin, Building2, Calendar, Wallet, History, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';

// Mock Data
const residentialData = [
  { id: 'r1', property: 'Federal Housing Flat', location: 'River Park Estate, Abuja', unit: 'A4', type: '3 Bedroom', tenant: 'Chukwudi Eze', rent: '₦6M/yr', service: '₦1M', status: 'Occupied', expiry: 'Nov 2024', maint: 'Clear', landlord: 'ABC Holdings', image: 'https://picsum.photos/id/101/800/600' },
  { id: 'r2', property: 'Semi-Detached Duplex', location: 'River Park Estate, Abuja', unit: 'V12', type: '4 Bedroom', tenant: '-', rent: '₦12M/yr', service: '₦2M', status: 'Vacant', expiry: '-', maint: 'Needs Paint', landlord: 'Private', image: 'https://picsum.photos/id/102/800/600' },
  { id: 'r3', property: 'Penthouse Duplex', location: 'River Park Estate, Abuja', unit: 'B2', type: '2 Bedroom', tenant: 'Sarah James', rent: '₦4M/yr', service: '₦800k', status: 'Occupied', expiry: 'Jan 2024', maint: 'Plumbing Issue', landlord: 'Olakunle Mgt', image: 'https://picsum.photos/id/103/800/600' },
  { id: 'r4', property: 'Luxury Terraced House', location: 'Lekki Phase 1, Lagos', unit: 'C1', type: '4 Bedroom', tenant: 'Michael Okon', rent: '₦9M/yr', service: '₦1.5M', status: 'Occupied', expiry: 'Mar 2025', maint: 'Clear', landlord: 'Olakunle Mgt', image: 'https://picsum.photos/id/108/800/600' },
  { id: 'r5', property: 'Studio Apartment', location: 'Yaba, Lagos', unit: 'F3', type: '1 Bedroom', tenant: '-', rent: '₦2.5M/yr', service: '₦300k', status: 'Vacant', expiry: '-', maint: 'Clear', landlord: 'Aisha Bello', image: 'https://picsum.photos/id/111/800/600' },
];

const commercialData = [
  { id: 'c1', property: 'Victoria Plaza', location: 'Victoria Island, Lagos', loc: 'VI', area: '450 sqm', tenant: 'Acme Corp', rent: '₦25M/yr', service: '₦5M/yr', term: '3 Yrs', type: 'Office', status: 'Occupied', maint: 'Clear', landlord: 'Victoria Assets Ltd', image: 'https://picsum.photos/id/104/800/600' },
  { id: 'c2', property: 'Lekki Retail Hub', location: 'Lekki Phase 1, Lagos', loc: 'Lekki', area: '120 sqm', tenant: '-', rent: '₦8M/yr', service: '₦1.5M/yr', term: '-', type: 'Retail', status: 'Vacant', maint: 'Clear', landlord: 'CRE Mgt', image: 'https://picsum.photos/id/106/800/600' },
  { id: 'c3', property: 'Ikeja Trade Centre', location: 'Ikeja, Lagos', loc: 'Ikeja', area: '800 sqm', tenant: 'Global Logistics', rent: '₦30M/yr', service: '₦6M/yr', term: '5 Yrs', type: 'Warehouse', status: 'Occupied', maint: 'HVAC Repair', landlord: 'Ikeja Properties', image: 'https://picsum.photos/id/107/800/600' },
];

export default function RentalsPage() {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = () => {
    switch(activeTab) {
      case 'residential': return residentialData;
      case 'commercial': return commercialData;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'occupied': return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
      case 'vacant': return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20';
      case 'overdue': return 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20';
      case 'verified': return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
      case 'pending': return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
      default: return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col gap-4">
          <Link href="/properties" className="flex items-center text-xs font-semibold uppercase tracking-wider text-muted-steel hover:text-deep-slate transition-colors w-fit">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Properties
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-deep-slate tracking-tight">Rental Operations</h1>
              <p className="text-sm text-muted-steel mt-1">Manage active rental leases, tenancy tracking, and revenue collections.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
              <button className="h-10 px-4 bg-white border border-whisper-border text-deep-slate text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm flex-1 sm:flex-none">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
              <button className="h-10 px-4 bg-white border border-whisper-border text-deep-slate text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm flex-1 sm:flex-none">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Onboard Tenant</span>
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-10 px-4 bg-deep-slate text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm flex-1 sm:flex-none w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-2 rounded-xl border border-whisper-border shadow-sm">
          {/* Segmented Control */}
          <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto">
            {(['residential', 'commercial'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 sm:px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-1 md:flex-none ${
                  activeTab === tab ? 'text-deep-slate shadow-sm' : 'text-muted-steel hover:text-slate-700'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="rentals-active-tab"
                    className="absolute inset-0 bg-white rounded-md border border-slate-200"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {tab === 'residential' ? <Building2 className="w-3.5 h-3.5" /> : <Building className="w-3.5 h-3.5" />}
                  {tab}
                </div>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-steel/70 w-4 h-4 group-focus-within:text-emerald-trust transition-colors" />
             <input 
               className="w-full bg-white border border-whisper-border rounded-lg h-10 pl-9 pr-4 text-sm text-deep-slate focus:outline-none focus:border-emerald-trust focus:ring-1 focus:ring-emerald-trust/20 transition-all shadow-sm placeholder:text-muted-steel/50" 
               placeholder={`Search ${activeTab} records...`} 
               type="text"
             />
          </div>
        </div>

        {/* Property Grid Area */}
        <div className="min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {getData().map((row) => (
              <div 
                key={row.id} 
                onClick={() => setSelectedProperty(row)}
                className="group bg-white border border-whisper-border rounded-xl overflow-hidden hover:shadow-md hover:border-emerald-trust/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={row.image} 
                    alt={row.property || row.estate} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md bg-white/95 shadow-sm ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </div>
                  {row.type && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-slate-900/90 text-white backdrop-blur-md shadow-sm">
                        {row.type}
                      </span>
                    </div>
                   )}
                </div>
                
                {/* Details Half */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-deep-slate group-hover:text-emerald-700 transition-colors line-clamp-1">{row.property || row.estate}</h3>
                      <p className="text-sm text-muted-steel flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {row.location || row.loc || row.unit || row.size}
                      </p>
                       <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">Landlord</span>
                        <span className="text-xs font-medium text-deep-slate truncate">{row.landlord}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-whisper-border grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Rental Price</p>
                      <p className="font-mono font-semibold text-deep-slate text-sm">{row.rent || row.value}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Tenant</p>
                      <p className="text-sm font-medium text-deep-slate line-clamp-1">
                        {row.tenant === '-' ? <span className="text-muted-steel italic font-normal">None</span> : row.tenant}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Pane Overlay */}
        <AnimatePresence>
          {selectedProperty && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
                onClick={() => setSelectedProperty(null)}
              />
              <motion.div 
                initial={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                animate={{ x: 0, boxShadow: '-20px 0 30px -10px rgba(0, 0, 0, 0.15)' }}
                exit={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-white z-50 border-l border-whisper-border overflow-y-auto"
              >
                {/* Pane Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-20 p-6 border-b border-whisper-border flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-deep-slate">{selectedProperty.property || selectedProperty.estate}</h2>
                    <p className="text-sm text-muted-steel flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedProperty.loc || selectedProperty.unit || selectedProperty.size}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="p-2 text-muted-steel hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Pane Content */}
                <div className="p-6 space-y-8">
                  {/* Property Hero Image */}
                  <div className="relative h-64 w-full rounded-xl overflow-hidden border border-whisper-border shadow-sm">
                    <Image 
                      src={selectedProperty.image} 
                      alt={selectedProperty.property || selectedProperty.estate} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide uppercase backdrop-blur-md bg-white shadow-sm ${getStatusColor(selectedProperty.status)}`}>
                        {selectedProperty.status}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-whisper-border bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold uppercase tracking-wider text-deep-slate shadow-sm">
                      <UserPlus className="w-4 h-4 text-muted-steel" />
                      <span>{selectedProperty.tenant === '-' ? 'Add Tenant' : 'Change Tenant'}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-whisper-border bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold uppercase tracking-wider text-deep-slate shadow-sm">
                      <Edit2 className="w-4 h-4 text-muted-steel" />
                      <span>Edit Details</span>
                    </button>
                  </div>

                  {/* Financial Details */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <Wallet className="w-4 h-4" />
                       Financial Details
                    </h3>
                    <div className="bg-slate-50/50 rounded-xl p-5 space-y-4 border border-whisper-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600">Rent Price</span>
                        <span className="font-mono font-bold text-deep-slate text-lg">{selectedProperty.rent || selectedProperty.value}</span>
                      </div>
                      {selectedProperty.service && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Service Charge</span>
                          <span className="font-mono font-semibold text-deep-slate">{selectedProperty.service}</span>
                        </div>
                      )}
                      {(selectedProperty.payment || selectedProperty.rentCollected) && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Payment Status</span>
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase ${getStatusColor(selectedProperty.payment || 'pending')}`}>
                            {selectedProperty.payment || 'Pending'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <Building className="w-4 h-4" />
                       Property Information
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-xl">
                      {selectedProperty.type && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Property Type</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.type}</p>
                        </div>
                      )}
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Property Location</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.fullLocation || selectedProperty.location}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Property Description</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.description || 'Spacious and well-maintained property with excellent amenities.'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Size / Layout</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.area || selectedProperty.size || selectedProperty.unit}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Landlord / Owner</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.landlord || 'Managed Property'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tenancy & Dates */}
                  <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <Calendar className="w-4 h-4" />
                       Tenancy Information
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                       <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Current Tenant</p>
                        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-whisper-border">
                          <p className={`text-sm font-semibold ${selectedProperty.tenant === '-' ? 'text-slate-400 italic font-medium' : 'text-deep-slate'}`}>
                            {selectedProperty.tenant === '-' ? 'No active tenant' : selectedProperty.tenant}
                          </p>
                          {selectedProperty.tenant !== '-' && (
                            <Link href="/people/tenants" className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-800 transition-colors">View Profile</Link>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Lease Term</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.term || '1 Year'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Renewal / Expiry</p>
                        <p className="text-sm font-medium text-rose-600">{selectedProperty.renewal || selectedProperty.expiry || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <History className="w-4 h-4" />
                       Recent Property Activity
                    </h3>
                    <div className="space-y-5">
                       <div className="relative pl-6">
                        <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-emerald-500 border-[3px] border-white box-content shadow-sm"></div>
                        <div className="absolute left-[10px] top-[18px] bottom-[-24px] w-[2px] bg-slate-100"></div>
                        <p className="text-sm font-medium text-deep-slate">Rent Payment Received</p>
                        <p className="text-xs text-muted-steel mt-0.5">₦1,500,000 received from {selectedProperty.tenant !== '-' ? selectedProperty.tenant : 'Tenant'}</p>
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 uppercase">2 days ago</p>
                      </div>
                       <div className="relative pl-6">
                        <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-slate-300 border-[3px] border-white box-content shadow-sm"></div>
                        <div className="absolute left-[10px] top-[18px] bottom-[-24px] w-[2px] bg-slate-100"></div>
                        <p className="text-sm font-medium text-deep-slate">Maintenance Completed</p>
                        <p className="text-xs text-muted-steel mt-0.5">Plumbing repairs in guest bathroom (Expenses: ₦45,000)</p>
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 uppercase">1 week ago</p>
                      </div>
                       <div className="relative pl-6">
                        <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-slate-300 border-[3px] border-white box-content shadow-sm"></div>
                        <p className="text-sm font-medium text-deep-slate">Tenant Move-in</p>
                        <p className="text-xs text-muted-steel mt-0.5">Keys handed over to {selectedProperty.tenant !== '-' ? selectedProperty.tenant : 'Tenant'} and inventory signed</p>
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 mt-1 uppercase">6 months ago</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>

      <AddPropertyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          alert('Property successfully created!');
        }}
        defaultListingType="rent"
      />
    </DashboardLayout>
  );
}


