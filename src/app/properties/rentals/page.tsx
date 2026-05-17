'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, Filter, ArrowLeft, X, Edit2, MapPin, Building2, Wallet, Building, FileText, LayoutGrid, Home, ChevronRight, Tags, Store, Trees } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { AddPropertyModal } from '@/components/properties/AddPropertyModal';

type PropertyCategory = 'residential_rental' | 'commercial_rental' | 'land_lease';

const CATEGORIES = [
  {
    id: 'residential_rental',
    title: 'Residential Rental',
    description: 'Manage apartments, houses, terraces, and residential spaces for rent.',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
    count: 45,
    items: 'units'
  },
  {
    id: 'commercial_rental',
    title: 'Commercial Rental',
    description: 'Manage office spaces, retail shops, plazas, and commercial buildings.',
    icon: Store,
    color: 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    count: 12,
    items: 'spaces'
  },
  {
    id: 'land_lease',
    title: 'Land Lease',
    description: 'Long-term and short-term leasing for agricultural, commercial, or residential plots.',
    icon: Trees,
    color: 'bg-amber-50 text-amber-600 border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    count: 6,
    items: 'plots'
  }
];

const MOCK_DATA = {
  residential_rental: [
    { 
      id: 'rr1', name: 'Federal Housing Flat', loc: 'River Park Estate, Abuja', type: 'Flat', 
      tenant: 'Chukwudi Eze', rent: '₦6,000,000/yr', service: '₦1,000,000', status: 'Occupied', expiry: 'Nov 2024', maint: 'Clear', 
      landlord: 'ABC Holdings', image: 'https://picsum.photos/id/101/800/600',
      bedrooms: 3, bathrooms: 3, notes: 'Standard 3-bedroom flat on the first floor with updated fittings.', 
      caution_fee: '₦300,000', management_fee_pct: 5, remittance_frequency: 'MONTHLY', title_type: 'C_OF_O', 
      parcel_number: 'Block 4, Plot A4', city: 'Abuja', state: 'FCT', listing_type: 'Rent',
      documents: ['Deed_of_Assignment.pdf', 'Survey_Plan_A4.jpg'], units: 'A4'
    },
    { 
      id: 'rr2', name: 'Semi-Detached Duplex', loc: 'River Park Estate, Abuja', type: 'Building', 
      tenant: '-', rent: '₦12,000,000/yr', service: '₦2,000,000', status: 'Vacant', expiry: '-', maint: 'Needs Paint', 
      landlord: 'Private Investor', image: 'https://picsum.photos/id/102/800/600',
      bedrooms: 4, bathrooms: 5, notes: 'Spacious semi-detached duplex with bq. Needs minor touch up paint.', 
      caution_fee: '₦1,000,000', management_fee_pct: 7.5, remittance_frequency: 'QUARTERLY', title_type: 'GOVERNORS_CONSENT', 
      parcel_number: 'Block 1, Plot V12', city: 'Abuja', state: 'FCT', listing_type: 'Rent', units: 'V12'
    }
  ],
  commercial_rental: [
    { 
      id: 'cr1', name: 'Victoria Plaza', loc: 'Victoria Island, Lagos', area: '450 sqm', 
      tenant: 'Acme Corp', rent: '₦25,000,000/yr', service: '₦5,000,000/yr', term: '3 Yrs', type: 'Commercial Space', status: 'Occupied', maint: 'Clear', 
      landlord: 'Victoria Assets Ltd', image: 'https://picsum.photos/id/104/800/600',
      bedrooms: 0, bathrooms: 4, notes: 'Prime office space on the 4th floor of Victoria Plaza.', 
      caution_fee: '₦2,000,000', management_fee_pct: 5, remittance_frequency: 'QUARTERLY', title_type: 'C_OF_O', 
      parcel_number: 'VI-502', city: 'Lagos', state: 'Lagos', listing_type: 'Rent'
    },
    { 
      id: 'cr2', name: 'Lekki Retail Hub', loc: 'Lekki Phase 1, Lagos', area: '120 sqm', 
      tenant: '-', rent: '₦8,000,000/yr', service: '₦1,500,000/yr', term: '-', type: 'Retail Shop', status: 'Vacant', maint: 'Clear', 
      landlord: 'CRE Mgt', image: 'https://picsum.photos/id/106/800/600',
      bedrooms: 0, bathrooms: 1, notes: 'Ground floor retail space suitable for quick-service restaurants or boutiques.', 
      caution_fee: '₦500,000', management_fee_pct: 7.5, remittance_frequency: 'MONTHLY', title_type: 'GOVERNORS_CONSENT', 
      parcel_number: 'Lekki-COM-92', city: 'Lagos', state: 'Lagos', listing_type: 'Rent'
    }
  ],
  land_lease: [
    { 
      id: 'll1', name: 'Kuje Agricultural Land', loc: 'Kuje, Abuja', area: '5 Hectares', sizes: '50,000 sqm',
      tenant: 'GreenFarm Ltd', rent: '₦2,000,000/yr', service: '-', term: '10 Yrs', type: 'Agricultural Land', status: 'Leased', maint: 'Clear', 
      landlord: 'Kuje Farms Council', image: 'https://picsum.photos/id/214/800/600',
      notes: 'Fertile land suitable for crop farming with close proximity to the main water source.', 
      caution_fee: '₦500,000', management_fee_pct: 0, remittance_frequency: 'ANNUALLY', title_type: 'CUSTOMARY_RIGHT_OF_OCCUPANCY', 
      parcel_number: 'KUJ-AG-04', city: 'Abuja', state: 'FCT', listing_type: 'Rent',
      documents: ['Lease_Agreement.pdf', 'Soil_Report.pdf']
    },
    { 
      id: 'll2', name: 'Apo Commercial Lease Plot', loc: 'Apo, Abuja', area: '2000 sqm', sizes: '2000 sqm',
      tenant: '-', rent: '₦15,000,000/yr', service: '-', term: 'Long Term', type: 'Commercial Land', status: 'Vacant', maint: 'Clear', 
      landlord: 'FCT Properties Ltd', image: 'https://picsum.photos/id/215/800/600',
      notes: 'Fenced commercial plot along the expressway. Ideal for car dealership or heavy equipment display.', 
      caution_fee: '₦1,000,000', management_fee_pct: 5, remittance_frequency: 'ANNUALLY', title_type: 'C_OF_O', 
      parcel_number: 'APO-COM-L1', city: 'Abuja', state: 'FCT', listing_type: 'Rent'
    }
  ]
};

export default function RentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeData = selectedCategory ? MOCK_DATA[selectedCategory].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.loc.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'occupied': case 'leased': return 'bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20';
      case 'vacant': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'overdue': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'verified': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-surface-container-low text-muted-steel border-whisper-border';
    }
  };

  const getCategoryTitle = () => CATEGORIES.find(c => c.id === selectedCategory)?.title || 'Rentals & Leases';
  const getCategoryDesc = () => CATEGORIES.find(c => c.id === selectedCategory)?.description || 'Select a rental category to manage inventory.';

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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase backdrop-blur-md bg-white/95 shadow-sm border ${getStatusColor(row.status)}`}>
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
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">Tenant</span>
                            <span className="text-xs font-medium text-deep-slate truncate">
                               {row.tenant === '-' ? <span className="text-muted-steel italic">None</span> : row.tenant}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-whisper-border grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Rent</p>
                          <p className="font-mono font-semibold text-deep-slate text-sm line-clamp-1">{row.rent}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">
                            {row.sizes ? 'Size' : (row.area ? 'Area' : 'Unit')}
                          </p>
                          <p className="text-sm font-medium text-deep-slate line-clamp-1">
                            {row.sizes || row.area || row.units}
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
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">We couldn&apos;t find any properties matching &quot;{searchQuery}&quot;. Try adjusting your search or add a new listing.</p>
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
                      <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide uppercase backdrop-blur-md bg-white shadow-sm border ${getStatusColor(selectedProperty.status)}`}>
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
                      <span>{selectedProperty.tenant === '-' ? 'Add Tenant' : 'Change Tenant'}</span>
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
                        <span className="text-sm font-medium text-slate-600">Rent</span>
                        <span className="font-mono font-bold text-deep-slate text-lg">{selectedProperty.rent}</span>
                      </div>
                      {selectedProperty.service && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Service Charge</span>
                          <span className="font-mono font-semibold text-deep-slate text-sm">{selectedProperty.service}</span>
                        </div>
                      )}
                      {(selectedProperty.management_fee_pct !== undefined) && (
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="text-sm font-medium text-slate-600">Management Fee</span>
                          <span className="font-semibold text-deep-slate text-sm">
                            {selectedProperty.management_fee_pct}% ({selectedProperty.remittance_frequency?.toLowerCase().replace('_', ' ')})
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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Plot Size</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.sizes}</p>
                        </div>
                      )}
                      {selectedProperty.area && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Area / Size</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.area}</p>
                        </div>
                      )}
                      {(selectedProperty.bedrooms !== undefined) && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Layout</p>
                          <p className="text-sm font-medium text-deep-slate">
                            {selectedProperty.bedrooms > 0 ? `${selectedProperty.bedrooms} Bed${selectedProperty.bedrooms !== 1 ? 's' : ''}` : 'No Beds'} / {selectedProperty.bathrooms !== undefined ? `${selectedProperty.bathrooms} Bath${selectedProperty.bathrooms !== 1 ? 's' : ''}` : '-'}
                          </p>
                        </div>
                      )}
                      {selectedProperty.units && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Unit Info</p>
                          <p className="text-sm font-medium text-deep-slate">{selectedProperty.units}</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Landlord / Owner</p>
                        <p className="text-sm font-medium text-deep-slate">{selectedProperty.landlord || 'Unassigned'}</p>
                      </div>

                      <div className="col-span-2 pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-steel mb-1">Location Address</p>
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
        defaultListingType="rent"
      />
    </DashboardLayout>
  );
}
