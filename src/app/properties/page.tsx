'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Search, Plus, ArrowUpRight, ArrowDownRight, Building2, TrendingUp, Wallet, Home } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { AreaChart, Area, BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const rentalData = [
  { month: 'Jan', val: 800 }, { month: 'Feb', val: 850 },
  { month: 'Mar', val: 820 }, { month: 'Apr', val: 880 },
  { month: 'May', val: 920 }, { month: 'Jun', val: 950 },
  { month: 'Jul', val: 1248 }
];

const salesData = [
  { month: 'Jan', val: 12 }, { month: 'Feb', val: 18 },
  { month: 'Mar', val: 15 }, { month: 'Apr', val: 24 },
  { month: 'May', val: 28 }, { month: 'Jun', val: 35 },
  { month: 'Jul', val: 45 }
];

const transactions = [
  { id: 'TRX-001', name: 'The Paramount Penthouse', location: 'Ikoyi, Lagos', type: 'RENT', value: '₦4.5M/yr', status: 'Active', date: 'Oct 24, 2023' },
  { id: 'TRX-002', name: 'Azure Heights Estate', location: 'Victoria Island', type: 'SALE', value: '₦240M', status: 'Pending', date: 'Oct 23, 2023' },
  { id: 'TRX-003', name: 'Lekki Waterfront Villa', location: 'Lekki Phase 1', type: 'SALE', value: '₦450M', status: 'Closed', date: 'Oct 21, 2023' },
  { id: 'TRX-004', name: 'Victoria Island Office Complex', location: 'Victoria Island', type: 'RENT', value: '₦12.8M/yr', status: 'Active', date: 'Oct 20, 2023' },
  { id: 'TRX-005', name: 'Maitama Luxury Terrace', location: 'Maitama, Abuja', type: 'SALE', value: '₦180M', status: 'Listed', date: 'Oct 19, 2023' },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-deep-slate tracking-tight">Properties Overview</h1>
            <p className="text-sm text-muted-steel mt-1 max-w-lg">
              Manage and track performance across your rental and sales portfolio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-steel/70 w-4 h-4 group-focus-within:text-emerald-trust transition-colors" />
              <input 
                className="w-full bg-white border border-whisper-border rounded-lg h-10 pl-9 pr-4 text-sm text-deep-slate focus:outline-none focus:border-emerald-trust focus:ring-1 focus:ring-emerald-trust/20 transition-all shadow-sm placeholder:text-muted-steel/50" 
                placeholder="Search properties..." 
                type="text"
              />
            </div>
            <button className="w-full sm:w-auto h-10 px-4 bg-deep-slate text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-[11px]">
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          </div>
        </motion.div>

        {/* Gateway Cards Grid */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rentals Gateway */}
          <Link href="/properties/rentals" className="group bg-white border border-whisper-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-trust/50 transition-all flex flex-col relative overflow-hidden">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1">
               <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
            
            <div className="flex justify-between items-start mb-6 relative z-10 pr-8">
              <div>
                <h2 className="text-2xl font-bold text-deep-slate group-hover:text-emerald-700 transition-colors">RENTALS</h2>
                <p className="text-sm text-muted-steel mt-1 max-w-xs">
                  Manage active leases, tenant relations, and monthly revenue streams.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
              <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100">
                <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">Occupancy Rate</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-deep-slate leading-none">98%</span>
                </div>
              </div>
              <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100">
                <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">Monthly Yield</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-deep-slate leading-none">₦42.5M</span>
                </div>
              </div>
            </div>

            <div className="h-[140px] w-full mt-auto relative z-10 flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Total Units</p>
                  <span className="text-2xl font-bold text-deep-slate font-mono leading-none">1,248</span>
                </div>
                <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md mb-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +22 this month
                </span>
              </div>
              <div className="flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rentalData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRentals)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Link>

          {/* Sales Gateway */}
          <Link href="/properties/sales" className="group bg-white border border-whisper-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-800/50 transition-all flex flex-col relative overflow-hidden">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1">
               <ArrowUpRight className="w-5 h-5 text-slate-800" />
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10 pr-8">
              <div>
                <h2 className="text-2xl font-bold text-deep-slate group-hover:text-slate-900 transition-colors">SALES</h2>
                <p className="text-sm text-muted-steel mt-1 max-w-xs">
                  Track acquisitions, luxury dispositions, and commission pipelines.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-slate-700" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
              <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100">
                <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">Pending Volume</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-deep-slate leading-none">₦1.2B</span>
                </div>
              </div>
              <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-100">
                <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-2">YTD Closed</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-deep-slate leading-none">12</span>
                </div>
              </div>
            </div>

            <div className="h-[140px] w-full mt-auto relative z-10 flex flex-col">
               <div className="flex justify-between items-end mb-3">
                <div>
                  <p className="text-xs font-semibold text-muted-steel uppercase tracking-wider mb-1">Active Listings</p>
                  <span className="text-2xl font-bold text-deep-slate font-mono leading-none">45</span>
                </div>
                <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md mb-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +5 this quarter
                </span>
              </div>
              <div className="flex-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="val" radius={[4, 4, 0, 0]} maxBarSize={35}>
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === salesData.length - 1 ? '#0f172a' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Operational Log / Recent Transactions */}
        <motion.div variants={item} className="bg-white border border-whisper-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-whisper-border">
            <div>
              <h3 className="text-base font-semibold text-deep-slate">Recent Transactions</h3>
              <p className="text-sm text-muted-steel mt-0.5">Latest updates from your properties.</p>
            </div>
            <button className="text-xs font-semibold uppercase tracking-wider text-deep-slate hover:bg-slate-50 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-whisper-border">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-whisper-border">
                  <th className="py-3 px-6 text-xs font-semibold text-muted-steel uppercase tracking-wider whitespace-nowrap">Property</th>
                  <th className="py-3 px-6 text-xs font-semibold text-muted-steel uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-muted-steel uppercase tracking-wider whitespace-nowrap">Type</th>
                  <th className="py-3 px-6 text-xs font-semibold text-muted-steel uppercase tracking-wider whitespace-nowrap">Value</th>
                  <th className="py-3 px-6 text-xs font-semibold text-muted-steel uppercase tracking-wider whitespace-nowrap text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {transactions.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3.5 px-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium text-deep-slate group-hover:text-emerald-700 transition-colors">{row.name}</span>
                        <span className="text-xs text-muted-steel">{row.location}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase
                        ${row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                          row.status === 'Pending' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
                          row.status === 'Closed' ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' :
                          'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium
                        ${row.type === 'RENT' ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {row.type === 'RENT' ? <Building2 className="w-3.5 h-3.5" /> : <Home className="w-3.5 h-3.5" />}
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-sm font-medium text-deep-slate font-mono">{row.value}</span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="text-sm text-muted-steel whitespace-nowrap">{row.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
