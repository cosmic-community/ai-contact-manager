// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Organization interface
export interface Organization extends CosmicObject {
  type: 'organizations';
  metadata: {
    organization_name: string;
    industry?: {
      key: string;
      value: string;
    };
    website?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
  };
}

// Contact interface
export interface Contact extends CosmicObject {
  type: 'contacts';
  metadata: {
    full_name: string;
    phone: string;
    email?: string;
    organization?: Organization;
    job_title?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    address?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    contact_source?: {
      key: string;
      value: string;
    };
    tags?: string;
    notes?: string;
    favorite: boolean;
    last_contact_date?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isContact(obj: CosmicObject): obj is Contact {
  return obj.type === 'contacts';
}

export function isOrganization(obj: CosmicObject): obj is Organization {
  return obj.type === 'organizations';
}

// Utility types
export type ContactSource = 'manual' | 'truecaller' | 'imported' | 'voice';
export type Industry = 'tech' | 'finance' | 'healthcare' | 'retail' | 'education' | 'consulting' | 'other';

// Form data types
export interface CreateContactFormData {
  full_name: string;
  phone: string;
  email?: string;
  organization?: string;
  job_title?: string;
  address?: string;
  city?: string;
  country?: string;
  tags?: string;
  notes?: string;
}

// Filter types
export interface ContactFilters {
  organization?: string;
  industry?: string;
  favorite?: boolean;
  tags?: string;
  searchTerm?: string;
}