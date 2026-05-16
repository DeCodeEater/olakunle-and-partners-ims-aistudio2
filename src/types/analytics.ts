/**
 * Analytics domain types — mirrors backend KPIDashboardEngine outputs
 * from backend/app/models/analytics.py (Agent 5)
 *
 * These are read-only, PII-safe aggregate shapes.
 */

// ── Aggregation period (mirrors AggregationPeriod enum) ──
export type AggregationPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ANNUAL';

// ── Time range filter for dashboard ──────────────────
export type TimeRange = 'today' | '7d' | '30d' | '90d' | 'ytd' | '1y';

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'ytd', label: 'Year to Date' },
  { value: '1y', label: 'Last 12 Months' },
];

// ── KPI Snapshot (mirrors KpiSnapshot model) ─────────
export interface KpiSnapshot {
  metric_name: string;
  metric_value: number;
  aggregation_period: AggregationPeriod;
  dimension?: string;
  calculated_at: string; // ISO datetime
}

// ── Dashboard summary (aggregated response) ──────────
export interface DashboardKPIs {
  net_operating_income: number;
  occupancy_rate: number;        // 0–100 percentage
  tenant_turnover_rate: number;  // 0–100 percentage
  listing_to_sale_ratio: number; // 0–1 ratio
  average_yield_per_facilitator: number;
  total_revenue: number;
  calculated_at: string;
}

// ── Trend data point for time-series charts ──────────
export interface TrendPoint {
  label: string;   // e.g. "Jan", "Feb", "Mar"
  value: number;
}

// ── Revenue breakdown by source ──────────────────────
export interface RevenueBreakdown {
  source: string;  // e.g. "Lease Commissions", "Sales Commissions"
  amount: number;
  percentage: number;
}

// ── Recent activity item (no PII, IDs only) ──────────
export interface ActivityItem {
  id: string;
  type: 'lease_created' | 'sale_closed' | 'property_listed' | 'commission_paid';
  description: string;
  amount?: number;
  timestamp: string;
}

// ── Full dashboard payload ───────────────────────────
export interface DashboardData {
  kpis: DashboardKPIs;
  revenue_trend: TrendPoint[];
  occupancy_trend: TrendPoint[];
  revenue_breakdown: RevenueBreakdown[];
  recent_activity: ActivityItem[];
}
