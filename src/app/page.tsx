'use client';

import { useState, useEffect } from 'react';
import { KPIGrid } from '@/components/dashboard/kpi-grid';
import { FinancialChart } from '@/components/dashboard/financial-chart';
import { FacilitatorPerformance } from '@/components/dashboard/facilitator-performance';
import { LeaseExpirations } from '@/components/dashboard/lease-expirations';
import { RecentExpenses } from '@/components/dashboard/recent-expenses';
import { ActivityHub } from '@/components/dashboard/activity-hub';
import { TenantSatisfaction } from '@/components/dashboard/tenant-satisfaction';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Building2, AlertTriangle, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([
    { id: 1, text: '3 leases expiring in <30 days', urgent: true },
    { id: 2, text: '₦4.2M overdue rent', urgent: true }
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1800px] w-full mx-auto p-fluid-s space-y-fluid-m flex flex-col"
      >
        {isLoading ? (
          <div className="space-y-fluid-m animate-pulse order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fluid-s">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[140px] bg-whisper-border rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-fluid-m">
              <div className="lg:col-span-2 h-[380px] bg-whisper-border rounded-lg"></div>
              <div className="h-[380px] bg-whisper-border rounded-lg"></div>
            </div>
            <div className="h-[400px] bg-whisper-border rounded-lg"></div>
          </div>
        ) : (
          <>
            {/* Mobile Alerts - Only visible on small screens */}
            <motion.div variants={item} className="w-full flex-col gap-2 mt-2 order-2 lg:hidden flex">
              <AnimatePresence>
                {alerts.map(alert => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 w-full"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-amber-900 font-medium text-sm">{alert.text}</p>
                    </div>
                    <button 
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 -mr-1 -mt-1 text-amber-600 hover:bg-amber-100 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="order-3">
              <KPIGrid />
            </motion.div>

            {/* Mobile Activity Hub Order */}
            <motion.div variants={item} className="order-4 lg:order-6 block lg:hidden">
              <ActivityHub />
            </motion.div>

            <motion.div variants={item} className="order-5 lg:order-7 block lg:hidden">
              <LeaseExpirations />
            </motion.div>

            {/* Hidden charts on mobile */}
            <motion.div variants={item} className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-fluid-m order-4">
              <div className="lg:col-span-2 h-full">
                <FinancialChart />
              </div>
              <div className="h-full">
                 <RecentExpenses />
              </div>
            </motion.div>

            <motion.div variants={item} className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-fluid-m order-5">
              <div className="h-full">
                <FacilitatorPerformance />
              </div>
              <div className="h-full">
                <TenantSatisfaction />
              </div>
            </motion.div>

            {/* Desktop sections that were previously here */}
            <motion.div variants={item} className="hidden lg:block order-6">
              <LeaseExpirations />
            </motion.div>

            <motion.div variants={item} className="hidden lg:block order-7">
              <ActivityHub />
            </motion.div>

            {/* Mobile "More Analytics" Button */}
            <motion.div variants={item} className="order-8 lg:hidden mt-4 text-center">
              <Link 
                href="/finance/reports" 
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-deep-slate text-pure-surface rounded-xl font-medium shadow-sm active:scale-[0.98] transition-transform"
              >
                More analytics <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
