import { RevenueKpiChart } from './revenue-kpi-chart';
import { OccupancyChart } from './occupancy-chart';
import { PropertiesKpiChart } from './properties-kpi-chart';
import { YieldKpiChart } from './yield-kpi-chart';

export function KPIGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-fluid-s">
      <div className="h-full"><RevenueKpiChart /></div>
      <div className="h-full"><OccupancyChart /></div>
      <div className="h-full"><PropertiesKpiChart /></div>
      <div className="h-full"><YieldKpiChart /></div>
    </div>
  );
}
