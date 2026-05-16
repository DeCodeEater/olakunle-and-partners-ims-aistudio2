/**
 * Sale API service — consumes backend /api/v1/sales and /api/v1/deals/sales
 * Agent 4 scope: data access only, no business logic.
 *
 * Hits the real local backend API — no mock data.
 */

import { SaleCreatePayload, SaleUpdatePayload, SaleRecord, PropertyRef, ClientRef } from '@/types/sale';
import { apiFetch } from './api';

// ── Sales CRUD ────────────────────────────────────────

export async function fetchSales(skip = 0, limit = 100): Promise<SaleRecord[]> {
  const res = await apiFetch(`/sales?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch sales: ${res.statusText}`);
  return res.json();
}

export async function getSale(saleId: string): Promise<SaleRecord> {
  const res = await apiFetch(`/sales/${saleId}`);
  if (!res.ok) throw new Error(`Failed to fetch sale: ${res.statusText}`);
  return res.json();
}

export async function createSale(payload: SaleCreatePayload): Promise<SaleRecord> {
  const res = await apiFetch(`/deals/sales`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create sale: ${res.statusText}`);
  }
  return res.json();
}

export async function updateSale(saleId: string, payload: SaleUpdatePayload): Promise<SaleRecord> {
  const res = await apiFetch(`/sales/${saleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update sale: ${res.statusText}`);
  }
  return res.json();
}

// ── Reference Data Fetchers (for dropdowns) ───────────

export async function fetchPropertyRefs(): Promise<PropertyRef[]> {
  const res = await apiFetch(`/properties?skip=0&limit=500`);
  if (!res.ok) throw new Error(`Failed to fetch properties: ${res.statusText}`);
  const data = await res.json();
  return data.map((p: Record<string, unknown>) => ({
    property_id: p.property_id,
    property_address: p.property_address,
    upi_code: p.upi_code,
  }));
}

export async function fetchClientRefs(): Promise<ClientRef[]> {
  const res = await apiFetch(`/clients?skip=0&limit=500`);
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`);
  const data = await res.json();
  return data.map((c: Record<string, unknown>) => ({
    client_id: c.client_id,
    first_name: c.first_name,
    last_name: c.last_name,
    client_email: c.client_email,
  }));
}
