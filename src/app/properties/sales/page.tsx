'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, ArrowLeft, X, Edit2, MapPin, Building2, Wallet, Building, FileText, LayoutGrid, Tent, Home, TreePine, ChevronRight, Tags } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';

type PropertyCategory = 'estate_land' | 'non_estate_land' | 'estate_buildings' | 'non_estate_buildings';

const CATEGORIES = [
  {
    id: 'estate_land',
    title: 'Estate Land',
    description: 'Manage land parcels and plot sizes within structured, planned estates.',
    icon: TreePine,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
    count: 14,
    items: 'estates'
  },
  {
    id: 'non_estate_land',
    title: 'Non-Estate Land',
    description: 'Independent land parcels, direct allocations, and standalone plots.',
    icon: Tent,
    color: 'bg-amber-50 text-amber-600 border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    count: 8,
    items: 'properties'
  },
  {
    id: 'estate_buildings',
    title: 'Estate Buildings',
    description: 'Finished or carcass off-plan houses within gated communities.',
    icon: Home,
    color: 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    count: 24,
    items: 'buildings'
  },
  {
    id: 'non_estate_buildings',
    title: 'Non-Estate Buildings',
    description: 'Standalone buildings, private mansions, and commercial plazas.',
    icon: Building2,
    color: 'bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-400 hover:shadow-purple-100',
    count: 5,
    items: 'properties'
  }
];

const MOCK_DATA = {
  estate_land: [
    { 
      id: 'el1', name: 'Centenary City Premium', loc: 'Airport Road, Abuja', sizes: '500 sqm, 1000 sqm', price: '₦45,000,000 - ₦80,000,000', title: 'FCDA Allocation', avail: '40 Plots Left', 
      payment: 'Up to 24 Mos', rep: 'John D.', status: 'Active Selling', image: 'https://picsum.photos/id/201/800/600',
      type: 'Estate Land', city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'FCDA_ALLOCATION',
      notes: 'Premium estate land with proposed smart city infrastructure.', parcel_number: 'ABJ-CEN-01', zip_code: '900101',
      agency_fee_pct: 5, documents: ['Layout_Plan.pdf', 'FCDA_Approval.pdf']
    },
    { 
      id: 'el2', name: 'Apo Hills Terraces & Land', loc: 'Apo, Abuja', sizes: '400 sqm', price: '₦25,000,000', title: 'C of O', avail: '12 Plots Left', 
      payment: 'Outright Only', rep: 'Sarah K.', status: 'Closing Out', image: 'https://picsum.photos/id/202/800/600',
      type: 'Estate Land', city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'C_OF_O',
      notes: 'Elevated terrain with scenic views of the city.', parcel_number: 'APO-HIL-45', zip_code: '900104',
      agency_fee_pct: 5, documents: ['Survey_Plan.pdf']
    }
  ],
  non_estate_land: [
    { 
      id: 'nel1', name: 'Guzape Commercial Plot', loc: 'Guzape, Abuja', sizes: '2500 sqm', price: '₦850,000,000', title: 'C of O', avail: '1 Plot Available', 
      payment: 'Outright / 2 Mos', rep: 'Michael O.', status: 'Active Selling', image: 'https://picsum.photos/id/212/800/600',
      type: 'Non-Estate Land', city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'C_OF_O',
      notes: 'Direct allocation along the major expressway. Ideal for commercial mall or hotel.', parcel_number: 'GZ-COM-09', zip_code: '900110',
      agency_fee_pct: 5, documents: ['TDP.pdf', 'C_of_O.pdf']
    },
    { 
      id: 'nel2', name: 'Asokoro Private Plot', loc: 'Asokoro, Abuja', sizes: '1200 sqm', price: '₦600,000,000', title: 'FCDA Allocation', avail: '1 Plot Available', 
      payment: 'Outright', rep: 'David W.', status: 'Pending Offer', image: 'https://picsum.photos/id/216/800/600',
      type: 'Non-Estate Land', city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'FCDA_ALLOCATION',
      notes: 'Highly secured neighborhood near diplomatic corp.', parcel_number: 'ASK-PRV-01', zip_code: '900103',
      agency_fee_pct: 3, documents: ['Offer_Letter.pdf']
    }
  ],
  estate_buildings: [
    { 
      id: 'eb1', name: 'Gwarinpa Smart Homes', loc: 'Gwarinpa, Abuja', stage: 'Finished', type: '4 Bed Terraced Duplex', units: '5', price: '₦120,000,000 / unit', title: 'Deed of Ass.', 
      avail: '5 Units Left', rep: 'Angela B.', status: 'Active Selling', image: 'https://picsum.photos/id/204/800/600',
      city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'DEED_OF_ASSIGNMENT',
      notes: 'Newly built terraced duplexes within a secure, gated estate.', parcel_number: 'GWA-SMT-12', zip_code: '900108',
      agency_fee_pct: 5, bedrooms: 4, bathrooms: 5, documents: ['Architectural_Drawing.pdf']
    },
    {
      id: 'eb2', name: 'LifeCamp Carcass Duplexes', loc: 'Life Camp, Abuja', stage: '70% (Roofing)', type: '5 Bed Fully Detached', units: '2', price: '₦180,000,000 / unit', title: 'C of O (Global)', 
      avail: '2 Units Left', rep: 'Elena R.', status: 'Selling Fast', image: 'https://picsum.photos/id/208/800/600',
      city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'C_OF_O',
      notes: 'Sold at carcass stage for buyers to finish to their taste.', parcel_number: 'LFC-CRC-02', zip_code: '900108',
      agency_fee_pct: 5, bedrooms: 5, bathrooms: 6, documents: ['Structural_Drawing.pdf', 'Global_C_of_O.pdf']
    }
  ],
  non_estate_buildings: [
    { 
      id: 'neb1', name: 'Maitama Luxury Mansion', loc: 'Maitama, Abuja', stage: 'Finished', type: '7 Bed Mansion + BQ', units: '1', price: '₦2,500,000,000', title: 'C of O', 
      avail: '1 Unit Available', rep: 'John D.', status: 'Active Selling', image: 'https://picsum.photos/id/210/800/600',
      city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'C_OF_O',
      notes: 'Ultra-luxury mansion with swimming pool, cinema, and smart home automation.', parcel_number: 'MAI-MAN-01', zip_code: '900271',
      agency_fee_pct: 3, bedrooms: 7, bathrooms: 9, documents: ['Approval_Plan.pdf', 'C_of_O.pdf']
    },
    { 
      id: 'neb2', name: 'Wuse 2 Commercial Plaza', loc: 'Wuse 2, Abuja', stage: 'Finished', type: 'Commercial Plaza', units: '1', price: '₦1,800,000,000', title: 'C of O', 
      avail: '1 Unit Available', rep: 'Angela B.', status: 'Active Selling', image: 'https://picsum.photos/id/211/800/600',
      city: 'Abuja', state: 'FCT', listing_type: 'Sale', title_type: 'C_OF_O',
      notes: '3-storey commercial building with high visibility and parking.', parcel_number: 'WS2-PLZ-04', zip_code: '900288',
      agency_fee_pct: 5, bedrooms: 0, bathrooms: 10, documents: ['Building_Approval.pdf']
    }
  ]
};

export default function SalesPage() {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeData = selectedCategory ? MOCK_DATA[selectedCategory].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.loc.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active selling': case 'active': return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'sold out': return 'bg-surface-container-high text-muted-steel border-whisper-border';
      case 'reserved': case 'pending offer': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'closing out': case 'selling fast': return 'bg-deep-slate/10 text-deep-slate border-deep-slate/20';
      default: return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  const getCategoryTitle = () => CATEGORIES.find(c => c.id === selectedCategory)?.title || 'Sales & Acquisitions';
  const getCategoryDesc = () => CATEGORIES.find(c => c.id === selectedCategory)?.description || 'Select a property category to manage inventory.';

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Dynamic Header */}
        <div className="flex flex-col gap-4 border-b border-whisper-border pb-6">
          <Link 
            href={selectedCategory ? "#" : "/properties"} 
            onClick={(e) => {
              if (selectedCategory) {
                e.preventDefault();
                setSelectedCategory(null);
                setSearchQuery('');
              }
            }}
            className="flex items-center text-xs font-semibold uppercase tracking-wider text-muted-steel hover:text-deep-slate transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> 
            {selectedCategory ? 'Back to Categories' : 'Back to Properties'}
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-deep-slate tracking-tight">
                {getCategoryTitle()}
              </h1>
              <p className="text-sm text-muted-steel mt-1 max-w-2xl">
                {getCategoryDesc()}
              </p>
            </div>
            {selectedCategory && (
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
                 <button className="h-10 px-4 bg-white border border-whisper-border text-deep-slate text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm flex-1 sm:flex-none">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="h-10 px-4 bg-deep-slate text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm flex-1 sm:flex-none w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  <span>New Listing</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Selection View */}
        {!selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as PropertyCategory)}
                  className={`group text-left p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-sm ${category.color} bg-white flex flex-col justify-between min-h-[220px]`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-xl ${category.color.split(' ')[0]} bg-opacity-20`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                      View Inventory <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-deep-slate mb-2">{category.title}</h2>
                    <p className="text-sm text-slate-500 mb-4">{category.description}</p>
                    <div className="inline-flex items-center gap-2 bg-slate-50 border border-whisper-border text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider">
                      <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
                      {category.count} {category.items} tracked
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Property Grid View */}
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="flex bg-white p-2 rounded-xl border border-whisper-border shadow-sm">
              <div className="relative w-full max-w-lg group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-steel/70 w-4 h-4 group-focus-within:text-emerald-trust transition-colors" />
                <input 
                  className="w-full bg-slate-50 border-none rounded-lg h-10 pl-9 pr-4 text-sm text-deep-slate focus:outline-none focus:ring-2 focus:ring-emerald-trust/20 transition-all font-medium placeholder:text-muted-steel/60 placeholder:font-normal" 
                  placeholder={`Search ${getCategoryTitle().toLowerCase()} inventory...`} 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeData.map((row) => (
                  <div 
                    key={row.id} 
                    onClick={() => setSelectedProperty(row)}
                    className="group bg-white border border-whisper-border rounded-xl overflow-hidden hover:shadow-md hover:border-emerald-trust/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                      <Image 
                        src={row.image} 
                        alt={row.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md bg-white/95 shadow-sm ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </div>
                      {row.type && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-slate-900/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1.5">
                            <Tags className="w-3 h-3" />
                            {row.type}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Details Half */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-full">
                          <h3 className="text-lg font-semibold text-deep-slate group-hover:text-emerald-700 transition-colors line-clamp-1">{row.name}</h3>
                          <p className="text-sm text-muted-steel flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {row.loc}
                          </p>
                           <div className="flex items-center gap-2 mt-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">Rep</span>
                            <span className="text-xs font-medium text-deep-slate truncate">{row.rep}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-whisper-border grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Asking Price</p>
                          <p className="font-mono font-semibold text-deep-slate text-sm">{row.price.split(' ')[0]}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">
                            {row.sizes ? 'Plot Sizes' : 'Units'}
                          </p>
                          <p className="text-sm font-medium text-deep-slate line-clamp-1">
                            {row.sizes || row.units || row.avail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {activeData.length === 0 && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 border border-dashed border-whisper-border rounded-xl">
                    <Search className="w-8 h-8 text-slate-300 mb-3" />
                    <h3 className="text-lg font-semibold text-deep-slate">No properties found</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">We couldn't find any properties matching "{searchQuery}". Try adjusting your search or add a new listing.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Side Pane Overlay (Property Details) */}
        <AnimatePresence>
          {selectedProperty && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                onClick={() => setSelectedProperty(null)}
              />
              <motion.div 
                initial={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                animate={{ x: 0, boxShadow: '-20px 0 30px -10px rgba(0, 0, 0, 0.15)' }}
                exit={{ x: '100%', boxShadow: '-20px 0 25px -5px rgba(0, 0, 0, 0)' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-full sm:w-[540px] bg-white z-50 border-l border-whisper-border overflow-y-auto"
              >
                {/* Pane Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-20 p-5 sm:p-6 border-b border-whisper-border flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-deep-slate">{selectedProperty.name}</h2>
                    <p className="text-sm text-muted-steel flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedProperty.loc}
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
                <div className="p-5 sm:p-6 space-y-8">
                  {/* Property Hero Image */}
                  <div className="relative h-64 w-full rounded-xl overflow-hidden border border-whisper-border shadow-sm bg-slate-100">
                    <Image 
                      src={selectedProperty.image} 
                      alt={selectedProperty.name} 
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
                      <Edit2 className="w-4 h-4 text-muted-steel" />
                      <span>Edit Info</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-whisper-border bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-semibold uppercase tracking-wider text-deep-slate shadow-sm">
                      <Plus className="w-4 h-4 text-muted-steel" />
                      <span>Sell Plot/Unit</span>
                    </button>
                  </div>

                  {/* Financial Details */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <Wallet className="w-4 h-4" />
                       Financial Overview
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-5 space-y-4 border border-whisper-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600">Asking Price</span>
                        <span className="font-mono font-bold text-deep-slate text-lg">{selectedProperty.price}</span>
                      </div>
                      {selectedProperty.payment && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Payment Plan</span>
                          <span className="font-mono font-semibold text-deep-slate text-sm">{selectedProperty.payment}</span>
                        </div>
                      )}
                      {selectedProperty.agency_fee_pct && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Agency / Commission</span>
                          <span className="font-semibold text-deep-slate text-sm">
                            {selectedProperty.agency_fee_pct}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                       <Building className="w-4 h-4" />
                       Property Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-white rounded-xl">
                      {selectedProperty.type && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Property Type</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.type}</p>
                        </div>
                      )}
                      {selectedProperty.title_type && (
                         <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Title Document</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.title_type.replace(/_/g, ' ')}</p>
                        </div>
                      )}
                      {selectedProperty.sizes && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Plot Sizes</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.sizes}</p>
                        </div>
                      )}
                      {(selectedProperty.bedrooms !== undefined) && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Layout</p>
                          <p className="text-sm font-medium text-deep-slate">
                            {selectedProperty.bedrooms} Bed / {selectedProperty.bathrooms} Bath
                          </p>
                        </div>
                      )}
                      {selectedProperty.units && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Total Units</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.units}</p>
                        </div>
                      )}
                      {selectedProperty.avail && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Availability</p>
                          <p className="text-sm font-semibold text-emerald-700">{selectedProperty.avail}</p>
                        </div>
                      )}
                      {selectedProperty.stage && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Construction Stage</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.stage}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Sales Rep</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.rep || 'Unassigned'}</p>
                      </div>

                      <div className="col-span-2 pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Location string</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.loc}, {selectedProperty.city}, {selectedProperty.state}</p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Description</p>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedProperty.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents section */}
                  {selectedProperty.documents && selectedProperty.documents.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-steel mb-4 border-b border-whisper-border pb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Attached Documents
                      </h3>
                      <div className="grid gap-2">
                        {selectedProperty.documents.map((doc: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between group bg-slate-50 hover:bg-slate-100 border border-whisper-border rounded-lg px-4 py-3 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded shadow-sm border border-slate-200">
                                <FileText className="w-4 h-4 text-emerald-600" />
                              </div>
                              <span className="text-sm text-deep-slate font-medium">{doc}</span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
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
        defaultListingType="sale"
      />
    </DashboardLayout>
  );
}
