import { createBucketClient } from '@cosmicjs/sdk';
import { Contact, Organization, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper for handling Cosmic SDK errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all contacts with organization data
export async function getContacts(): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'contacts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Contact[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch contacts');
  }
}

// Get single contact by slug
export async function getContactBySlug(slug: string): Promise<Contact | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'contacts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Contact;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch contact');
  }
}

// Search contacts by name or phone
export async function searchContacts(searchTerm: string): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'contacts',
        $or: [
          { 'metadata.full_name': { $regex: searchTerm, $options: 'i' } },
          { 'metadata.phone': { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Contact[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search contacts');
  }
}

// Get all organizations
export async function getOrganizations(): Promise<Organization[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'organizations' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Organization[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch organizations');
  }
}

// Get contacts by organization
export async function getContactsByOrganization(organizationId: string): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'contacts',
        'metadata.organization': organizationId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Contact[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch contacts by organization');
  }
}

// Check for duplicate contact
export async function checkDuplicate(phone: string): Promise<Contact | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'contacts',
        'metadata.phone': phone
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    if (response.objects && response.objects.length > 0) {
      return response.objects[0] as Contact;
    }
    return null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to check for duplicate');
  }
}

// Create new contact
export async function createContact(data: {
  full_name: string;
  phone: string;
  email?: string;
  organization?: string;
  job_title?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  contact_source?: string;
  tags?: string;
  notes?: string;
}): Promise<Contact> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'contacts',
      title: data.full_name,
      metadata: {
        full_name: data.full_name,
        phone: data.phone,
        email: data.email || '',
        organization: data.organization || '',
        job_title: data.job_title || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        contact_source: data.contact_source ? { key: data.contact_source, value: data.contact_source === 'manual' ? 'Manual Entry' : data.contact_source === 'voice' ? 'Voice Input' : data.contact_source === 'truecaller' ? 'Truecaller' : 'Imported' } : { key: 'manual', value: 'Manual Entry' },
        tags: data.tags || '',
        notes: data.notes || '',
        favorite: false
      }
    });
    
    return response.object as Contact;
  } catch (error) {
    throw new Error('Failed to create contact');
  }
}

// Update contact favorite status
export async function toggleFavorite(contactId: string, favorite: boolean): Promise<Contact> {
  try {
    const response = await cosmic.objects.updateOne(contactId, {
      metadata: {
        favorite: favorite
      }
    });
    
    return response.object as Contact;
  } catch (error) {
    throw new Error('Failed to update favorite status');
  }
}

// Get favorite contacts
export async function getFavoriteContacts(): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'contacts',
        'metadata.favorite': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Contact[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch favorite contacts');
  }
}