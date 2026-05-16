'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  Download, SearchIcon, Filter, 
  ArrowUpRight, ArrowDownRight, 
  BarChart3, PieChart, LineChart, TrendingUp, DollarSign, Target, Calendar
} from 'lucide-react';

interface ReportRow {
  id: string;
  category: string;
  description: string;
  type: 'Income' | 'Expense';
  amount: string;
  date: string;
}

const mockReportData: ReportRow[] = [
  {
    id: 'TRX-1092',
    category: 'Agency Fee',
    description: '14B Admiralty Way Lease',
    type: 'Income',
    amount: '₦4,500,000',
    date: 'Oct 15, 2023'
  },
  {
    id: 'TRX-1093',
    category: 'Commission',
    description: 'Chioma Eze - Plot 44 Sale',
    type: 'Expense',
    amount: '₦2,000,000',
    date: 'Oct 14, 2023'
  },
  {
    id: 'TRX-1094',
    category: 'Management Fee',
    description: 'Victoria Island Block A (Q4)',
    type: 'Income',
    amount: '₦8,500,000',
    date: 'Oct 10, 2023'
  },
  {
    id: 'TRX-1095',
    category: 'Operational',
    description: 'Office Rent & Utilities',
    type: 'Expense',
    amount: '₦1,200,000',
    date: 'Oct 01, 2023'
  },
  {
    id: 'TRX-1096',
    category: 'Legal Fee',
    description: 'Title transfer processing',
    type: 'Income',
    amount: '₦850,000',
    date: 'Sep 28, 2023'
  },
  {
    id: 'TRX-1097',
    category: 'Marketing',
    description: 'PropertyPro & Google Ads',
    type: 'Expense',
    amount: '₦450,000',
    date: 'Sep 25, 2023'
  }
];

export default function FinancialReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-theme(spacing.16))] gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h1 className="font-headline text-3xl font-semibold text-deep-slate tracking-tight">Financial Reports</h1>
            <p className="text-muted-steel mt-1 text-sm">Analyze revenue, expenses, and overall portfolio profitability.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none items-center justify-center gap-2 border border-whisper-border text-deep-slate bg-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4" /> This Year (2023)
            </button>
            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-deep-slate text-white px-4 py-2 font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Complete P&L
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-shrink-0">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp className="w-24 h-24 text-emerald-600" /></div>
             <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2 relative z-10">Total Revenue</p>
             <p className="text-4xl font-bold text-emerald-950 relative z-10">₦145.2M</p>
             <div className="flex items-center gap-2 mt-4 relative z-10">
               <span className="flex items-center text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                 <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
               </span>
               <span className="text-xs text-emerald-700/70 font-medium">vs Last Year</span>
             </div>
          </div>
          
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><LineChart className="w-24 h-24 text-red-600" /></div>
             <p className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2 relative z-10">Total Expenses</p>
             <p className="text-4xl font-bold text-red-950 relative z-10">₦42.8M</p>
             <div className="flex items-center gap-2 mt-4 relative z-10">
               <span className="flex items-center text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                 <ArrowDownRight className="w-3 h-3 mr-1" /> -5.2%
               </span>
               <span className="text-xs text-red-700/70 font-medium">vs Last Year</span>
             </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Target className="w-24 h-24 text-blue-600" /></div>
             <p className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2 relative z-10">Net Profit</p>
             <p className="text-4xl font-bold text-blue-950 relative z-10">₦102.4M</p>
             <div className="flex items-center gap-2 mt-4 relative z-10">
               <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                 70.5% Margin
               </span>
               <span className="text-xs text-blue-700/70 font-medium">Healthy Status</span>
             </div>
          </div>
        </div>

        {/* Charts Mockup Layout (Textual/Structural representation) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-shrink-0">
           <div className="lg:col-span-2 bg-white border border-whisper-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-deep-slate">Revenue vs Expenses (YTD)</h3>
                 <BarChart3 className="w-5 h-5 text-muted-steel" />
              </div>
              <div className="h-48 w-full flex items-end gap-2 sm:gap-4 justify-between border-b border-whisper-border pb-2">
                 {/* Mock Chart Bars */}
                 {[
                   { income: 60, expense: 20 },
                   { income: 75, expense: 25 },
                   { income: 45, expense: 30 },
                   { income: 80, expense: 15 },
                   { income: 90, expense: 35 },
                   { income: 55, expense: 40 },
                   { income: 85, expense: 20 },
                   { income: 95, expense: 25 },
                 ].map((data, i) => (
                    <div key={i} className="flex gap-1 w-full max-w-[40px] items-end justify-center group h-full">
                       <div className="w-full bg-emerald-400 rounded-t-sm group-hover:bg-emerald-500 transition-colors" style={{ height: `${data.income}%` }}></div>
                       <div className="w-full bg-red-300 rounded-t-sm group-hover:bg-red-400 transition-colors" style={{ height: `${data.expense}%` }}></div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-2 px-2">
                 <span className="text-xs text-muted-steel font-medium">Mar</span>
                 <span className="text-xs text-muted-steel font-medium">Apr</span>
                 <span className="text-xs text-muted-steel font-medium">May</span>
                 <span className="text-xs text-muted-steel font-medium">Jun</span>
                 <span className="text-xs text-muted-steel font-medium">Jul</span>
                 <span className="text-xs text-muted-steel font-medium">Aug</span>
                 <span className="text-xs text-muted-steel font-medium">Sep</span>
                 <span className="text-xs text-muted-steel font-medium">Oct</span>
              </div>
           </div>

           <div className="bg-white border border-whisper-border rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-deep-slate">Income Breakdown</h3>
                 <PieChart className="w-5 h-5 text-muted-steel" />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-4">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                         <span className="text-sm font-medium text-deep-slate">Agency Fees</span>
                       </div>
                       <span className="text-sm font-semibold text-deep-slate">62%</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                         <span className="text-sm font-medium text-deep-slate">Management Fees</span>
                       </div>
                       <span className="text-sm font-semibold text-deep-slate">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                         <span className="text-sm font-medium text-deep-slate">Consultation</span>
                       </div>
                       <span className="text-sm font-semibold text-deep-slate">7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                         <span className="text-sm font-medium text-deep-slate">Other</span>
                       </div>
                       <span className="text-sm font-semibold text-deep-slate">3%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white border border-whisper-border rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-0">
          <div className="p-4 border-b border-whisper-border flex flex-col lg:flex-row justify-between gap-4 bg-gray-50/50">
             <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-deep-slate mr-4">Recent Ledger</h3>
                <div className="relative w-full lg:w-64">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-steel" />
                  <input 
                    type="text" 
                    placeholder="Search ledger..." 
                    className="w-full pl-9 pr-4 py-1.5 text-sm border border-whisper-border rounded-lg bg-white focus:outline-none focus:border-deep-slate focus:ring-1 focus:ring-deep-slate transition-all placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
             </div>
             <div className="flex flex-wrap gap-2">
               <select className="px-3 py-1.5 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white focus:outline-none">
                 <option value="">All Transactions</option>
                 <option value="income">Income Only</option>
                 <option value="expense">Expense Only</option>
               </select>
               <button className="flex items-center gap-2 px-3 py-1.5 border border-whisper-border text-deep-slate font-medium text-sm rounded-lg hover:bg-surface-container-low transition-colors bg-white">
                 <Filter className="w-4 h-4" /> Filter
               </button>
             </div>
          </div>
          <div className="overflow-x-auto flex-1 h-full min-h-0">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_theme(colors.whisper-border)]">
                <tr className="text-[11px] uppercase tracking-wider text-muted-steel font-semibold">
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Transaction ID & Date</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Category</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4">Description</th>
                  <th className="px-6 py-4 font-semibold pb-3 pt-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {mockReportData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                       <p className="text-sm font-semibold text-deep-slate">{row.id}</p>
                       <p className="text-xs text-muted-steel mt-0.5">{row.date}</p>
                    </td>
                    <td className="px-6 py-3">
                       <span className="inline-block px-2 py-1 rounded bg-gray-100 text-deep-slate text-xs font-medium">
                         {row.category}
                       </span>
                    </td>
                    <td className="px-6 py-3">
                       <p className="text-sm text-deep-slate font-medium">{row.description}</p>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <p className={`text-sm font-bold ${row.type === 'Income' ? 'text-emerald-600' : 'text-red-600'}`}>
                         {row.type === 'Income' ? '+' : '-'} {row.amount}
                       </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
