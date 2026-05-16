'use client';

import { KPIGrid } from '@/components/dashboard/kpi-grid';
import { FinancialChart } from '@/components/dashboard/financial-chart';
import { FacilitatorPerformance } from '@/components/dashboard/facilitator-performance';
import { LeaseExpirations } from '@/components/dashboard/lease-expirations';
import { RecentExpenses } from '@/components/dashboard/recent-expenses';
import { ActivityHub } from '@/components/dashboard/activity-hub';
import { TenantSatisfaction } from '@/components/dashboard/tenant-satisfaction';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { motion, Variants } from 'motion/react';

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
  return (
    <DashboardLayout>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1800px] w-full mx-auto p-fluid-s space-y-fluid-m"
      >
        <motion.div variants={item} className="flex flex-col gap-fluid-xs">
          <h2 className="font-headline text-fluid-2xl text-deep-slate leading-tight tracking-[-0.02em] font-medium uppercase">
            Dashboard
          </h2>
        </motion.div>

        <motion.div variants={item}>
          <KPIGrid />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-fluid-m">
          <div className="lg:col-span-2 h-full">
            <FinancialChart />
          </div>
          <div className="h-full">
             <RecentExpenses />
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-fluid-m">
          <div className="h-full">
            <FacilitatorPerformance />
          </div>
          <div className="h-full">
            <TenantSatisfaction />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <LeaseExpirations />
        </motion.div>

        <motion.div variants={item}>
          <ActivityHub />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
