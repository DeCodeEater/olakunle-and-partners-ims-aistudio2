export type PropertyType = 
  | "Land"
  | "Building"
  | "Semi-Detached Duplex"
  | "Detached Duplex"
  | "Terrace"
  | "Bungalow"
  | "Flat"
  | "Commercial"
  | "Mixed Use";

export type StandardStatus = "Active" | "Pending" | "Closed";

export type OccupancyStatus = "Occupied" | "Vacant";

export type ListingType = "sale" | "rent";

export type TitleType = "C_OF_O" | "GOVERNORS_CONSENT" | "DEED_OF_ASSIGNMENT" | "EXCISION";

export interface LandlordCreatePayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  bank_name?: string | null;
  bank_account_number?: string | null;
  bank_account_name?: string | null;
  ownership_type?: "MANAGED_BY_FIRM" | "THIRD_PARTY_INVESTOR";
  management_fee_pct?: number;
  remittance_frequency?: "MONTHLY" | "QUARTERLY" | "ANNUALLY" | "ON_COLLECTION";
}

export interface PropertyRecord {
  property_id: string;
  upi_code: string;
  property_address: string;
  property_type: PropertyType;
  above_grade_finished_area: number | null;
  standard_status: StandardStatus;
  occupancy_status: OccupancyStatus;
  
  // New MVP Fields
  listing_type?: ListingType;
  parent_property_id?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  list_price?: number | null;
  title_type?: TitleType | null;
  cover_image_url?: string | null;

  created_at?: string;
  updated_at?: string;
  notes?: string | null;
  
  landlord_id?: string | null;
  documents?: string[] | null;
  management_fee_pct?: number | null;
  remittance_frequency?: string | null;
  caution_fee?: number | null;
}

export interface PropertyCreatePayload {
  upi_code?: string;
  property_address: string;
  property_type: PropertyType;
  subdivision_code?: string;
  parcel_number?: string;
  subcomponent?: string;
  above_grade_finished_area?: number | null;
  standard_status?: StandardStatus;
  occupancy_status?: OccupancyStatus;
  
  // New MVP Fields
  listing_type?: ListingType;
  parent_property_id?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  list_price?: number | null;
  title_type?: TitleType | null;
  cover_image_url?: string | null;

  notes?: string | null;
  
  landlord_id?: string | null;
  landlord?: LandlordCreatePayload | null;
  documents?: string[] | null;
  management_fee_pct?: number | null;
  remittance_frequency?: string | null;
  caution_fee?: number | null;
}
