/**
 * Analytics API service — consumes GET /api/v1/analytics/dashboard
 * Agent 5 scope: read-only data access, no business logic.
 *
 * Hits the real local backend API — no mock data.
 */

import { DashboardData, TimeRange } from '@/types/analytics';
import { apiFetch } from './api';

// ── API Functions ─────────────────────────────────────
export async function fetchDashboardData(timeRange: TimeRange = '30d'): Promise<DashboardData> {
  const res = await apiFetch(`/analytics/dashboard?range=${timeRange}`);
  if (!res.ok) throw new Error(`Failed to fetch dashboard: ${res.statusText}`);
  return res.json();
}
