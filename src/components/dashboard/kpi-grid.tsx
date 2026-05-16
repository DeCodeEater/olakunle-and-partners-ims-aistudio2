import { RevenueKpiChart } from './revenue-kpi-chart';
import { OccupancyChart } from './occupancy-chart';
import { PropertiesKpiChart } from './properties-kpi-chart';
import { YieldKpiChart } from './yield-kpi-chart';

export function KPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fluid-s">
      <RevenueKpiChart />
      <OccupancyChart />
      <PropertiesKpiChart />
      <YieldKpiChart />
    </div>
  );
}
