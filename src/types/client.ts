export type ClientClassification = "Tenant" | "Buyer" | "Investor" | "Landlord";

export type ConsentStatus = "GRANTED" | "PENDING" | "WITHDRAWN";

export interface ClientRecord {
  client_id: string;
  first_name: string;
  last_name: string;
  client_phone: string;
  client_email: string;
  client_classification: ClientClassification;
  consent_status: ConsentStatus;
  consent_granted_at?: string | null;
  is_sensitive_pii?: boolean;
  is_deleted?: boolean;
  anonymized_at?: string | null;
  dpo_audit_flag?: boolean;
  created_at?: string;
  updated_at?: string;
  notes?: string | null;
}

export interface ClientCreatePayload {
  first_name: string;
  last_name: string;
  client_phone: string;
  client_email: string;
  client_classification: ClientClassification;
  consent_status?: ConsentStatus;
  consent_granted_at?: string | null;
  is_sensitive_pii?: boolean;
  notes?: string | null;
}
