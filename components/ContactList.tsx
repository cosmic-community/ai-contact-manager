'use client'

import { Contact } from '@/types'
import ContactCard from './ContactCard'
import { useState } from 'react'

interface ContactListProps {
  contacts: Contact[]
}

export default function ContactList({ contacts }: ContactListProps) {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all')
  
  const filteredContacts = filter === 'favorites' 
    ? contacts.filter(c => c.metadata.favorite)
    : contacts
  
  // Group by organization
  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const orgName = contact.metadata.organization?.title || 'No Organization'
    if (!acc[orgName]) {
      acc[orgName] = []
    }
    acc[orgName].push(contact)
    return acc
  }, {} as Record<string, Contact[]>)
  
  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Contacts ({contacts.length})
        </button>
        <button
          onClick={() => setFilter('favorites')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'favorites'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ⭐ Favorites ({contacts.filter(c => c.metadata.favorite).length})
        </button>
      </div>
      
      {/* Grouped Contacts */}
      <div className="space-y-8">
        {Object.entries(groupedContacts).map(([orgName, orgContacts]) => (
          <div key={orgName}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              {orgName}
              <span className="text-sm font-normal text-gray-500">
                ({orgContacts.length} {orgContacts.length === 1 ? 'contact' : 'contacts'})
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {orgContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No contacts found</p>
        </div>
      )}
    </div>
  )
}