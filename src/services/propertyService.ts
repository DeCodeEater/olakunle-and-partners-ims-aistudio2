/**
 * Property API service — consumes backend /api/v1/properties
 * Agent 2 scope: RESO-compliant property CRUD, no business logic.
 *
 * Hits the real local backend API — no mock data.
 */

import { apiFetch } from './api';
import { PropertyRecord, PropertyCreatePayload } from '../types/property';

export type PropertyUpdatePayload = Partial<PropertyCreatePayload>;

// ── API Functions ─────────────────────────────────────

export async function fetchProperties(skip = 0, limit = 100, listingType?: string): Promise<PropertyRecord[]> {
  let path = `/properties?skip=${skip}&limit=${limit}`;
  if (listingType) {
    path += `&listing_type=${listingType}`;
  }
  const res = await apiFetch(path);
  if (!res.ok) throw new Error(`Failed to fetch properties: ${res.statusText}`);
  return res.json();
}

export async function getProperty(propertyId: string): Promise<PropertyRecord> {
  const res = await apiFetch(`/properties/${propertyId}`);
  if (!res.ok) throw new Error(`Failed to fetch property: ${res.statusText}`);
  return res.json();
}

export async function createProperty(payload: PropertyCreatePayload): Promise<PropertyRecord> {
  const res = await apiFetch(`/properties`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to create property: ${res.statusText}`);
  }
  return res.json();
}

export async function updateProperty(propertyId: string, payload: PropertyUpdatePayload): Promise<PropertyRecord> {
  const res = await apiFetch(`/properties/${propertyId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Failed to update property: ${res.statusText}`);
  }
  return res.json();
}
