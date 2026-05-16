/**
 * Client API service — consumes backend /api/v1/clients
 * Agent 1 scope: NDPA-compliant client CRUD, PII handled by backend.
 *
 * Hits the real local backend API — no mock data.
 */

import { apiFetch } from './api';

// ── Types (mirrors backend ClientResponse / ClientCreate) ─────
export interface ClientRecord {
  client_id: string;
  first_name: string | null;
  last_name: string | null;
  client_phone: string | null;
  client_email: string | null;
  client_classification: string;
  consent_status: string;
  is_sensitive_pii: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientCreatePayload {
  first_name: string;
  last_name: string;
  client_phone: string;
  client_email: string;
  client_classification: string;
  is_sensitive_pii?: boolean;
}

export interface ClientUpdatePayload {
  first_name?: string;
  last_name?: string;
  client_phone?: string;
  client_email?: string;
  client_classification?: string;
}

// ── API Functions ─────────────────────────────────────

export async function fetchClients(skip = 0, limit = 100): Promise<ClientRecord[]> {
  const res = await apiFetch(`/clients?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`);
  return res.json();
}

export async function getClient(clientId: string): Promise<ClientRecord> {
  const res = await apiFetch(`/clients/${clientId}`);
  if (!res.ok) throw new Error(`Failed to fetch client: ${res.statusText}`);
  return res.json();
}

export async function createClient(payload: ClientCreatePayload): Promise<ClientRecord> {
  const res = await apiFetch(`/clients`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create client: ${res.statusText}`);
  }
  return res.json();
}

export async function updateClient(clientId: string, payload: ClientUpdatePayload): Promise<ClientRecord> {
  const res = await apiFetch(`/clients/${clientId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update client: ${res.statusText}`);
  }
  return res.json();
}

export async function deleteClient(clientId: string): Promise<void> {
  const res = await apiFetch(`/clients/${clientId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to delete client: ${res.statusText}`);
  }
}
