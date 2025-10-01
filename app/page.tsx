import { getContacts, getOrganizations } from '@/lib/cosmic'
import ContactList from '@/components/ContactList'
import OrganizationFilter from '@/components/OrganizationFilter'
import VoiceSearch from '@/components/VoiceSearch'
import MapView from '@/components/MapView'

export default async function HomePage() {
  const contacts = await getContacts()
  const organizations = await getOrganizations()
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🎯 AI Contact Manager
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Intelligent contact management with voice recognition, duplicate detection, and smart organization grouping
        </p>
      </div>
      
      {/* Voice Search */}
      <div className="mb-8">
        <VoiceSearch />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary mb-2">{contacts.length}</div>
          <div className="text-gray-600">Total Contacts</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary mb-2">{organizations.length}</div>
          <div className="text-gray-600">Organizations</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {contacts.filter(c => c.metadata.favorite).length}
          </div>
          <div className="text-gray-600">Favorites</div>
        </div>
      </div>
      
      {/* Organization Filter */}
      <div className="mb-8">
        <OrganizationFilter organizations={organizations} />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Contacts</h2>
          <ContactList contacts={contacts} />
        </div>
        
        {/* Map View */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Locations</h2>
          <MapView contacts={contacts} />
        </div>
      </div>
    </div>
  )
}