/**
 * Commission API service — consumes backend /api/v1/commissions
 * Agent 3 scope: read-only data access for commission ledger entries.
 *
 * Hits the real local backend API — no mock data.
 */

import { CommissionDetailRecord, CommissionType, CommissionCreatePayload } from '@/types/commission';
import { apiFetch } from './api';

export async function fetchCommissions(
  skip = 0,
  limit = 100,
  commissionType?: CommissionType,
): Promise<CommissionDetailRecord[]> {
  let url = `/commissions?skip=${skip}&limit=${limit}`;
  if (commissionType) url += `&commission_type=${encodeURIComponent(commissionType)}`;

  const res = await apiFetch(url);
  if (!res.ok) throw new Error(`Failed to fetch commissions: ${res.statusText}`);
  return res.json();
}

export async function getCommission(commissionId: string): Promise<CommissionDetailRecord> {
  const res = await apiFetch(`/commissions/${commissionId}`);
  if (!res.ok) throw new Error(`Failed to fetch commission: ${res.statusText}`);
  return res.json();
}

export async function createCommission(payload: CommissionCreatePayload): Promise<CommissionDetailRecord> {
  const res = await apiFetch('/commissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create commission: ${res.statusText}`);
  return res.json();
}
