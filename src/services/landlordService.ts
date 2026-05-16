/**
 * Landlord API service — consumes backend /api/v1/landlords
 * Agent 1 scope: NDPA-compliant landlord CRUD, independent consent.
 * Agent 3 scope: management_fee_pct, remittance_frequency for fee engine.
 * Level-3 PII: bank_* fields may be null/redacted for non-DPO roles.
 */

import { apiFetch } from './api';

// ── Enums (mirrors backend) ────────────────────────────────────
export type LandlordConsentStatus = 'GRANTED' | 'PENDING' | 'WITHDRAWN';
/** Alias used by form components */
export type ConsentStatus = LandlordConsentStatus;
export type PropertyOwnershipType = 'MANAGED_BY_FIRM' | 'THIRD_PARTY_INVESTOR';
export type RemittanceFrequency = 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY' | 'ON_COLLECTION';

// ── Types ──────────────────────────────────────────────────────
export interface LandlordRecord {
  landlord_id: string;
  /** Convenience alias for landlord_id — used by page-level handlers */
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  /** Level-3 PII — null if caller lacks DPO clearance */
  bank_name: string | null;
  /** Level-3 PII — null if caller lacks DPO clearance */
  bank_account_number: string | null;
  /** Level-3 PII — null if caller lacks DPO clearance */
  bank_account_name: string | null;
  ownership_type: PropertyOwnershipType;
  management_fee_pct: number;
  remittance_frequency: RemittanceFrequency;
  consent_status: LandlordConsentStatus;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  notes: string | null;
}

export interface LandlordCreatePayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  ownership_type?: PropertyOwnershipType;
  management_fee_pct?: number;
  remittance_frequency?: RemittanceFrequency;
  bank_name?: string;
  bank_account_number?: string;
  bank_account_name?: string;
  notes?: string;
}

export interface LandlordUpdatePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  ownership_type?: PropertyOwnershipType;
  management_fee_pct?: number | null;
  remittance_frequency?: RemittanceFrequency;
  consent_status?: LandlordConsentStatus;
  /** Level-3 PII — only sent by DPO-cleared callers */
  bank_name?: string;
  /** Level-3 PII — only sent by DPO-cleared callers */
  bank_account_number?: string;
  /** Level-3 PII — only sent by DPO-cleared callers */
  bank_account_name?: string;
  notes?: string;
}

// ── API Functions ──────────────────────────────────────────────

export async function fetchLandlords(skip = 0, limit = 100): Promise<LandlordRecord[]> {
  const res = await apiFetch(`/landlords?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch landlords: ${res.statusText}`);
  return res.json();
}

export async function getLandlord(landlordId: string): Promise<LandlordRecord> {
  const res = await apiFetch(`/landlords/${landlordId}`);
  if (!res.ok) throw new Error(`Failed to fetch landlord: ${res.statusText}`);
  return res.json();
}

export async function createLandlord(payload: LandlordCreatePayload): Promise<LandlordRecord> {
  const res = await apiFetch('/landlords', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create landlord: ${res.statusText}`);
  }
  return res.json();
}

export async function updateLandlord(landlordId: string, payload: LandlordUpdatePayload): Promise<LandlordRecord> {
  const res = await apiFetch(`/landlords/${landlordId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update landlord: ${res.statusText}`);
  }
  return res.json();
}

export async function deleteLandlord(landlordId: string): Promise<void> {
  const res = await apiFetch(`/landlords/${landlordId}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to delete landlord: ${res.statusText}`);
  }
}

export async function updateLandlordConsent(
  landlordId: string,
  consentStatus: LandlordConsentStatus,
): Promise<LandlordRecord> {
  const res = await apiFetch(
    `/landlords/${landlordId}/consent?consent_status=${encodeURIComponent(consentStatus)}`,
    { method: 'PATCH' },
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update consent: ${res.statusText}`);
  }
  return res.json();
}

// ── Remittance Types ───────────────────────────────────────────
export type RemittanceStatus = 'PENDING' | 'APPROVED' | 'TRANSFERRED';

export interface RemittanceRecord {
  remittance_id: string;
  landlord_id: string;
  period_start: string;   // ISO date string e.g. "2025-01-01"
  period_end: string;     // ISO date string e.g. "2025-03-31"
  /** Human-readable e.g. "Jan 2025 – Mar 2025" */
  period_label: string;
  total_rent_collected: number;
  management_fee_amount: number;
  management_fee_pct: number;
  wht_on_management_fee: number;
  repair_deductions: number;
  repair_ticket_count: number;
  net_remittance: number;
  status: RemittanceStatus;
  approved_at: string | null;
  approved_by_role: string | null;
  transferred_at: string | null;
  created_at: string;
  updated_at: string;
  notes: string | null;
}

// ── Remittance API Functions ───────────────────────────────────

export async function fetchLandlordRemittances(
  landlordId: string,
  skip = 0,
  limit = 50,
): Promise<RemittanceRecord[]> {
  const res = await apiFetch(
    `/landlords/${landlordId}/remittances?skip=${skip}&limit=${limit}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch remittances: ${res.statusText}`);
  return res.json();
}

export async function approveRemittance(
  landlordId: string,
  remittanceId: string,
): Promise<RemittanceRecord> {
  const res = await apiFetch(
    `/landlords/${landlordId}/remittances/${remittanceId}/approve`,
    { method: 'PATCH' },
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to approve remittance: ${res.statusText}`);
  }
  return res.json();
}

export async function markRemittanceTransferred(
  landlordId: string,
  remittanceId: string,
): Promise<RemittanceRecord> {
  const res = await apiFetch(
    `/landlords/${landlordId}/remittances/${remittanceId}/transfer`,
    { method: 'PATCH' },
  );
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to mark as transferred: ${res.statusText}`);
  }
  return res.json();
}

