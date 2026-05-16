/**
 * Tenant API service — consumes backend /api/v1/tenants
 * Agent 1 scope: NDPA-compliant tenant CRUD, independent consent from Clients.
 * Agent 4 scope: Onboarding state machine exposed via onboarding_status.
 */

import { apiFetch } from './api';

// ── Enums (mirrors backend) ────────────────────────────────────
export type TenantType = 'INDIVIDUAL' | 'CORPORATE';
export type TenantConsentStatus = 'GRANTED' | 'PENDING' | 'WITHDRAWN';
export type OnboardingStatus =
  | 'INITIATED'
  | 'DOCS_PENDING'
  | 'CONSENT_CAPTURED'
  | 'LEASE_DRAFTED'
  | 'ACTIVE'
  | 'VACATED';

// ── Types ──────────────────────────────────────────────────────
export interface TenantRecord {
  tenant_id: string;
  tenant_code: string;
  tenant_type: TenantType;
  first_name: string | null;
  last_name: string | null;
  company_name: string | null;
  primary_phone: string | null;
  secondary_phone: string | null;
  email: string | null;
  onboarding_status: OnboardingStatus;
  consent_status: TenantConsentStatus;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  notes: string | null;
}

export interface TenantCreatePayload {
  tenant_type: TenantType;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  primary_phone: string;
  secondary_phone?: string;
  email: string;
  notes?: string;
}

export interface TenantUpdatePayload {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  primary_phone?: string;
  secondary_phone?: string;
  email?: string;
  notes?: string;
}

// ── API Functions ──────────────────────────────────────────────

export async function fetchTenants(skip = 0, limit = 100): Promise<TenantRecord[]> {
  const res = await apiFetch(`/tenants?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch tenants: ${res.statusText}`);
  return res.json();
}

export async function getTenant(tenantId: string): Promise<TenantRecord> {
  const res = await apiFetch(`/tenants/${tenantId}`);
  if (!res.ok) throw new Error(`Failed to fetch tenant: ${res.statusText}`);
  return res.json();
}

export async function createTenant(payload: TenantCreatePayload): Promise<TenantRecord> {
  const res = await apiFetch('/tenants', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create tenant: ${res.statusText}`);
  }
  return res.json();
}

export async function updateTenant(tenantId: string, payload: TenantUpdatePayload): Promise<TenantRecord> {
  const res = await apiFetch(`/tenants/${tenantId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update tenant: ${res.statusText}`);
  }
  return res.json();
}

export async function deleteTenant(tenantId: string): Promise<void> {
  const res = await apiFetch(`/tenants/${tenantId}`, { method: 'DELETE' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to delete tenant: ${res.statusText}`);
  }
}
