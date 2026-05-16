/**
 * Commission domain types — mirrors backend CommissionDetailResponse
 * from backend/app/schemas/commission.py and backend/app/models/commissions.py
 */

// ── Enums ──────────────────────────────────────────────
export type CommissionType = 'Sale' | 'Lease';
export type FacilitatorType = 'Staff' | 'Partner';
export type PaymentStatus = 'Pending' | 'Paid';
export type DealRole = 'Client Sourcing' | 'Property Sourcing' | 'Deal Closure' | 'Dual Agency';

export const FACILITATOR_TYPE_OPTIONS: { value: FacilitatorType; label: string }[] = [
  { value: 'Staff',   label: 'Staff (Internal)' },
  { value: 'Partner', label: 'Partner (External)' },
];

export const DEAL_ROLE_OPTIONS: { value: DealRole; label: string }[] = [
  { value: 'Client Sourcing',   label: 'Client Sourcing' },
  { value: 'Property Sourcing', label: 'Property Sourcing' },
  { value: 'Deal Closure',      label: 'Deal Closure' },
  { value: 'Dual Agency',       label: 'Dual Agency' },
];

export const PAYMENT_STATUS_OPTIONS: { value: PaymentStatus; label: string; color: string }[] = [
  { value: 'Pending', label: 'Pending', color: '#f59e0b' },
  { value: 'Paid',    label: 'Paid',    color: '#10b981' },
];

// ── Response (matches CommissionDetailResponse schema) ─
export interface CommissionDetailRecord {
  commission_id: string;
  transaction_id: string;
  commission_type: CommissionType;

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

  facilitator_type?: FacilitatorType;
  deal_role?: DealRole;
  payment_status?: PaymentStatus;

  created_at: string;
  updated_at: string;
}

// ── Create Payload (for CommissionCreateForm) ─────────
export interface CommissionCreatePayload {
  transaction_id: string;
  commission_type: CommissionType;
  facilitator_name: string;
  facilitator_type: FacilitatorType;
  deal_role: DealRole;
  amount_basis: number;          // Amount Paid (not sales price) — Agent 3 rule C1
  payment_status: PaymentStatus; // C5: defaults to 'Pending', Finance-only toggle to 'Paid'
}

export type CommissionFormErrors = Partial<Record<keyof CommissionCreatePayload, string>>;

// ── Commission type options for filters ───────────────
export const COMMISSION_TYPE_OPTIONS: { value: CommissionType; label: string }[] = [
  { value: 'Sale',  label: 'Sale Commission' },
  { value: 'Lease', label: 'Lease Commission' },
];
