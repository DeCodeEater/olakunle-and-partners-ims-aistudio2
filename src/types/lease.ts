/**
 * Lease domain types — mirrors backend LeaseCreate / LeaseResponse schemas
 * from backend/app/schemas/deal.py and backend/app/models/leases.py
 */

// ── Enums ──────────────────────────────────────────────
export type LeaseClassification = 'New Tenant' | 'Renewal' | 'Extension';

// ── Commission (read-only, computed by backend Agent 3) ──
export interface CommissionResponse {
  commission_id: string;
  facilitator_name: string;
  facilitator_commission_percentage: number;
  facilitator_commission_amount: number;
  agency_fee_amount: number;
  legal_fee_amount: number;
  management_fee_amount: number;
  vat_rate: number;
  vat_deduction: number;
  wht_rate: number;
  wht_deduction: number;
  net_commission: number;
}

// ── Create Payload (matches LeaseCreate schema) ──────
export interface LeaseCreatePayload {
  property_id: string;
  tenant_id: string;
  lease_classification: LeaseClassification;
  lease_start_date: string;   // ISO date: YYYY-MM-DD
  lease_expiry_date: string;
  annual_rent: number;
  caution_fee: number;
  estate_charge: number;
  rent_paid_upfront: number;
  facilitator_name: string;
}

// ── Update Payload (for LeaseEditForm LS6) ──────────
export interface LeaseUpdatePayload {
  lease_expiry_date?: string;
  annual_rent?: number;
  caution_fee?: number;
  estate_charge?: number;
  rent_paid_upfront?: number;
  facilitator_name?: string;
}

export type LeaseUpdateErrors = Partial<Record<keyof LeaseUpdatePayload, string>>;

// ── Response (matches LeaseResponse schema) ───────────
export interface LeaseRecord {
  lease_id: string;
  property_id: string;
  tenant_id: string;
  lease_classification: LeaseClassification;
  lease_start_date: string;
  lease_expiry_date: string;
  annual_rent: number;
  caution_fee: number;
  estate_charge: number;
  agency_fee_amount: number;
  legal_fee_amount: number;
  management_fee_amount: number;
  rent_paid_upfront: number;
  total_package: number;
  rent_owed: number;
  amount_to_landlord: number;
  facilitator_name?: string;
  commission: CommissionResponse | null;
}

// ── Form validation errors ───────────────────────────
export type LeaseFormErrors = Partial<Record<keyof LeaseCreatePayload, string>>;

// ── Classification options for selects ────────────────
export const LEASE_CLASSIFICATION_OPTIONS: { value: LeaseClassification; label: string }[] = [
  { value: 'New Tenant', label: 'New Tenant' },
  { value: 'Renewal',    label: 'Renewal' },
  { value: 'Extension',  label: 'Extension' },
];
