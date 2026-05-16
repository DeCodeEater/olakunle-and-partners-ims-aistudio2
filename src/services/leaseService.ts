/**
 * Lease API service — consumes backend /api/v1/leases and /api/v1/deals/leases
 * Agent 3 scope: data access only, no business logic.
 *
 * Hits the real local backend API — no mock data.
 */

import { LeaseCreatePayload, LeaseUpdatePayload, LeaseRecord } from '@/types/lease';
import { apiFetch } from './api';

// ── API Functions ─────────────────────────────────────
export async function fetchLeases(): Promise<LeaseRecord[]> {
  const res = await apiFetch(`/leases`);
  if (!res.ok) throw new Error(`Failed to fetch leases: ${res.statusText}`);
  return res.json();
}

export async function createLease(payload: LeaseCreatePayload): Promise<LeaseRecord> {
  const res = await apiFetch(`/deals/leases`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create lease: ${res.statusText}`);
  }
  return res.json();
}

export async function updateLease(leaseId: string, payload: LeaseUpdatePayload): Promise<LeaseRecord> {
  const res = await apiFetch(`/leases/${leaseId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update lease: ${res.statusText}`);
  }
  return res.json();
}
