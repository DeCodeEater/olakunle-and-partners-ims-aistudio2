'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Search, Plus, Filter, Download, UserCheck, Phone, Mail, 
  Building2, MoreVertical, FileText, ChevronRight, X, 
  CreditCard, FileClock, CheckCircle2, AlertCircle, Clock, SearchIcon, Upload, Landmark, Edit, Archive,
  AlertTriangle, History, Calendar, Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Tenant {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate';
  phone: string;
  email: string;
  property: string;
  unit: string;
  moveInDate: string;
  leaseEndDate: string;
  leaseStatus: 'Active' | 'Expiring Soon' | 'Terminated';
  paymentStatus: 'Up-to-date' | 'Pending' | 'Arrears';
  monthlyRent: string;
  securityDeposit: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

const mockTenants: Tenant[] = [
  {
    id: 'TEN-101',
    name: 'Sarah Johnson',
    type: 'Individual',
    phone: '+234 812 345 6789',
    email: 'sarah.j@example.com',
    property: 'Victoria Island Block A',
    unit: 'Apt 4B',
    moveInDate: 'Jan 15, 2023',
    leaseEndDate: 'Jan 14, 2024',
    leaseStatus: 'Expiring Soon',
    paymentStatus: 'Up-to-date',
    monthlyRent: '₦450,000',
    securityDeposit: '₦450,000',
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '+234 809 876 5432',
      relation: 'Brother'
    }
  },
  {
    id: 'TEN-102',
    name: 'Chinedu Eze',
    type: 'Individual',
    phone: '+234 703 222 1111',
    email: 'ceze.business@example.com',
    property: 'Lekki Phase 1 Estate',
    unit: 'Villa 12',
    moveInDate: 'Mar 01, 2022',
    leaseEndDate: 'Feb 28, 2025',
    leaseStatus: 'Active',
    paymentStatus: 'Pending',
    monthlyRent: '₦800,000',
    securityDeposit: '₦1,000,000',
    emergencyContact: {
      name: 'Ngozi Eze',
      phone: '+234 705 333 4444',
      relation: 'Wife'
    }
  },
  {
    id: 'TEN-103',
    name: 'Aisha Mohammed',
    type: 'Individual',
    phone: '+234 802 555 7777',
    email: 'aisha.m@example.com',
    property: 'Abuja Central Tower',
    unit: 'Suite 201',
    moveInDate: 'Jun 10, 2023',
    leaseEndDate: 'Jun 09, 2024',
    leaseStatus: 'Active',
    paymentStatus: 'Up-to-date',
    monthlyRent: '₦350,000',
    securityDeposit: '₦350,000',
    emergencyContact: {
      name: 'Ibrahim Mohammed',
      phone: '+234 803 777 8888',
      relation: 'Father'
    }
  },
  {
    id: 'TEN-104',
    name: 'David Oladapo',
    type: 'Individual',
    phone: '+234 912 444 5555',
    email: 'd.oladapo@example.com',
    property: 'Yaba Tech Hub Apartments',
    unit: 'Unit 8',
    moveInDate: 'Nov 01, 2021',
    leaseEndDate: 'Oct 31, 2023',
    leaseStatus: 'Terminated',
    paymentStatus: 'Arrears',
    monthlyRent: '₦200,000',
    securityDeposit: '₦200,000',
    emergencyContact: {
      name: 'Grace Oladapo',
      phone: '+234 811 222 3333',
      relation: 'Sister'
    }
  },
  {
    id: 'TEN-105',
    name: 'TechWave Solutions Ltd',
    type: 'Corporate',
    phone: '+234 805 999 0000',
    email: 'admin@techwave.ng',
    property: 'Victoria Island Block A',
    unit: 'Ground Fl Commercial',
    moveInDate: 'Aug 15, 2023',
    leaseEndDate: 'Aug 14, 2028',
    leaseStatus: 'Active',
    paymentStatus: 'Up-to-date',
    monthlyRent: '₦1,200,000',
    securityDeposit: '₦2,400,000',
    emergencyContact: {
      name: 'Funmi Alabi',
      phone: '+234 802 111 2222',
      relation: 'HR Manager'
    }
  }
];

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const getLeaseStatusBadge = (status: Tenant['leaseStatus']) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>;
      case 'Terminated':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20"><Archive className="w-3.5 h-3.5" /> Terminated</span>;
      case 'Expiring Soon':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"><Clock className="w-3.5 h-3.5" /> Expiring Soon</span>;
    }
  };

  const getPaymentStatusBadge = (status: Tenant['paymentStatus']) => {
    switch (status) {
      case 'Up-to-date':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-emerald-700 bg-emerald-50"><CheckCircle2 className="w-3 h-3" /> Up-to-date</span>;
      case 'Arrears':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-red-700 bg-red-50"><AlertTriangle className="w-3 h-3" /> Arrears</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-amber-700 bg-amber-50"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Tenants</h1>
            <p className="text-muted-steel mt-1 text-sm">Manage current, past, and prospective tenants across your portfolio.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors shadow-sm bg-white">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Tenant
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 flex-shrink-0">
          {[
            { label: 'Total Tenants', value: '458', trend: '+12 this month' },
            { label: 'Active Leases', value: '382', trend: '83% occupancy' },
            { label: 'Expiring (30d)', value: '14', trend: 'Requires renewal', trendColor: 'text-amber-600' },
            { label: 'Payment Arrears', value: '₦4.2M', trend: '8 tenants in arrears', trendColor: 'text-red-600' },
            { label: 'On-time Payments', value: '94%', trend: 'Rolling 12 months', trendColor: 'text-emerald-600' },
            { label: 'Avg Tenancy', value: '2.4 yrs', trend: 'Stable retention' }
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
                placeholder="Search name, email, unit..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Lease Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="terminated">Terminated</option>
              </select>
              <select className="px-3 py-2 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                <option value="">Payment Status</option>
                <option value="up-to-date">Up-to-date</option>
                <option value="pending">Pending</option>
                <option value="arrears">Arrears</option>
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
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Tenant</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Contact</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Property / Unit</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Lease Timeline</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Status & Payment</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockTenants.map((tenant) => (
                  <tr 
                    key={tenant.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-deep-slate/5 flex items-center justify-center text-deep-slate font-bold shrink-0">
                          {tenant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-deep-slate text-sm group-hover:text-black transition-colors">{tenant.name}</div>
                          <div className="text-xs text-muted-steel mt-0.5">{tenant.id} • {tenant.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate mb-1">{tenant.phone}</div>
                      <div className="text-xs text-muted-steel">{tenant.email}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm font-medium text-deep-slate truncate max-w-[200px]" title={tenant.property}>{tenant.property}</div>
                      <div className="text-xs text-muted-steel mt-0.5 font-mono bg-gray-100 inline-block px-1.5 py-0.5 rounded">{tenant.unit}</div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-sm text-deep-slate flex items-center gap-1.5 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-muted-steel" />
                        In: {tenant.moveInDate}
                      </div>
                      <div className="text-xs text-muted-steel flex items-center gap-1.5">
                        <History className="w-3.5 h-3.5" />
                        Out: {tenant.leaseEndDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col items-start gap-2">
                        {getLeaseStatusBadge(tenant.leaseStatus)}
                        {getPaymentStatusBadge(tenant.paymentStatus)}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                       <button className="p-2 text-muted-steel hover:bg-slate-100 rounded-lg transition-colors inline-block" onClick={(e) => { e.stopPropagation(); setSelectedTenant(tenant); }}>
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
        {selectedTenant && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTenant(null)}
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
                      {selectedTenant.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-deep-slate">{selectedTenant.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        {getLeaseStatusBadge(selectedTenant.leaseStatus)}
                        <span className="text-sm text-muted-steel">{selectedTenant.id}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTenant(null)}
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
                  <Link href="/rentals/renew" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <FileClock className="w-4 h-4" /> Renew Lease
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-deep-slate hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                    <AlertTriangle className="w-4 h-4 text-red-600" /> Log Maintenance
                  </button>
                  <div className="flex-1"></div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-deep-slate hover:bg-opacity-90 rounded-lg transition-colors whitespace-nowrap">
                    <CreditCard className="w-4 h-4" /> Log Payment
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
                          <Phone className="w-4 h-4 text-muted-steel" /> {selectedTenant.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-deep-slate mt-2">
                          <Mail className="w-4 h-4 text-muted-steel" /> {selectedTenant.email}
                        </div>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Emergency Contact</p>
                        <p className="text-sm text-deep-slate font-medium">{selectedTenant.emergencyContact.name}</p>
                        <p className="text-xs text-muted-steel mt-0.5">{selectedTenant.emergencyContact.relation} • {selectedTenant.emergencyContact.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div className="bg-gray-50 border border-whisper-border rounded-xl p-4">
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Monthly Rent</p>
                          <p className="text-2xl font-bold text-deep-slate">{selectedTenant.monthlyRent}</p>
                          <div className="mt-2 flex items-center justify-between">
                             <span className="text-xs text-muted-steel">Deposit held:</span>
                             <span className="text-sm font-semibold text-deep-slate">{selectedTenant.securityDeposit}</span>
                          </div>
                       </div>
                       <div className="flex items-center justify-between p-3 border border-whisper-border rounded-xl">
                          <div>
                            <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider">Payment Status</p>
                            <p className="text-sm font-medium text-deep-slate mt-0.5">Current Balance</p>
                          </div>
                          {getPaymentStatusBadge(selectedTenant.paymentStatus)}
                       </div>
                    </div>
                  </div>

                  {/* Lease Details Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-deep-slate mb-4">Lease Summary</h3>
                    <div className="border border-whisper-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-start gap-3">
                          <Building2 className="w-10 h-10 text-deep-slate bg-gray-100 p-2 rounded-lg" />
                          <div>
                             <p className="text-sm font-semibold text-deep-slate">{selectedTenant.property}</p>
                             <p className="font-mono text-xs text-muted-steel mt-1 bg-gray-100 inline-block px-1.5 py-0.5 rounded">{selectedTenant.unit}</p>
                          </div>
                       </div>
                       <div className="w-px h-10 bg-whisper-border hidden md:block"></div>
                       <div>
                          <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider">Timeline</p>
                          <p className="text-sm text-deep-slate font-medium mt-1">{selectedTenant.moveInDate} — {selectedTenant.leaseEndDate}</p>
                       </div>
                    </div>
                  </div>

                  {/* Recent Activity / History */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-bold text-deep-slate">Recent History</h3>
                       <div className="flex gap-2">
  <button className="text-xs font-medium border border-whisper-border px-2 py-1 rounded bg-white text-deep-slate hover:bg-gray-50">Payments</button>
  <button className="text-xs font-medium border border-transparent px-2 py-1 rounded text-muted-steel hover:text-deep-slate">Maintenance</button>
                       </div>
                    </div>
                    <div className="border border-whisper-border rounded-xl overflow-hidden">
                       <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50/50">
                            <tr>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Date</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider">Description</th>
                              <th className="px-4 py-3 font-semibold text-muted-steel text-xs uppercase tracking-wider text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-whisper-border">
                            {/* Dummy Rows for History */}
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Oct 01, 2023</td>
                              <td className="px-4 py-3 font-medium text-deep-slate">Rent Payment - October</td>
                              <td className="px-4 py-3 font-medium text-emerald-700 text-right">+ {selectedTenant.monthlyRent}</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Sep 05, 2023</td>
                              <td className="px-4 py-3 font-medium text-deep-slate flex items-center gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                Maintenance: AC Repair
                              </td>
                              <td className="px-4 py-3 text-muted-steel text-right">—</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-muted-steel whitespace-nowrap">Sep 01, 2023</td>
                              <td className="px-4 py-3 font-medium text-deep-slate">Rent Payment - September</td>
                              <td className="px-4 py-3 font-medium text-emerald-700 text-right">+ {selectedTenant.monthlyRent}</td>
                            </tr>
                          </tbody>
                       </table>
                       <div className="p-3 border-t border-whisper-border bg-gray-50/30 text-center">
                         <button className="text-sm font-medium text-deep-slate hover:underline">View Full Ledger →</button>
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
