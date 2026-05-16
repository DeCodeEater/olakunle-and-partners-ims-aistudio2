/**
 * Sale domain types — mirrors backend SaleCreate / SaleResponse schemas
 * from backend/app/schemas/deal.py and backend/app/models/sales.py
 */

// ── Enums ──────────────────────────────────────────────
export type PaymentPlan = 'Outright Payment' | 'Installment';
export type DealStatus = 'Closed' | 'Pending' | 'Cancelled';
export type AssetType = 'Building' | 'Land';

export const ASSET_TYPE_OPTIONS: { value: AssetType; label: string }[] = [
  { value: 'Building', label: 'Building (5% Agency + 5% Legal)' },
  { value: 'Land',     label: 'Land (0% Agency + 0% Legal)' },
];

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

// ── Create Payload (matches SaleCreate schema) ────────
export interface SaleCreatePayload {
  property_id: string;
  buyer_id: string;
  date_of_sale: string;      // ISO date: YYYY-MM-DD
  payment_plan: PaymentPlan;
  asset_type: AssetType;     // S1: drives surcharge calculation
  property_sales_price: number;
  amount_paid: number;
  facilitator_name: string;
}

// ── Update Payload (for edit form S4) ────────────────
export interface SaleUpdatePayload {
  payment_plan?: PaymentPlan;
  amount_paid?: number;
  facilitator_name?: string;
}

// ── Response (matches SaleResponse schema) ────────────
export interface SaleRecord {
  sale_id: string;
  property_id: string;
  buyer_id: string;
  date_of_sale: string;
  payment_plan: PaymentPlan;
  asset_type?: AssetType;
  property_sales_price: number;
  amount_paid: number;
  outstanding_balance: number;
  deal_status: DealStatus;
  facilitator_name?: string;
  commission: CommissionResponse | null;
}

// ── Form validation errors ───────────────────────────
export type SaleFormErrors = Partial<Record<keyof SaleCreatePayload, string>>;
export type SaleUpdateErrors = Partial<Record<keyof SaleUpdatePayload, string>>;

// ── Payment plan options for selects ─────────────────
export const PAYMENT_PLAN_OPTIONS: { value: PaymentPlan; label: string }[] = [
  { value: 'Outright Payment', label: 'Outright Payment' },
  { value: 'Installment',      label: 'Installment' },
];

// ── Lightweight reference types for dropdowns ────────
export interface PropertyRef {
  property_id: string;
  property_address: string;
  upi_code: string;
}

export interface ClientRef {
  client_id: string;
  first_name: string | null;
  last_name: string | null;
  client_email: string | null;
}
