import { getContacts } from '@/lib/cosmic'
import ContactCard from '@/components/ContactCard'

export default async function FavoritesPage() {
  const contacts = await getContacts()
  const favorites = contacts.filter(c => c.metadata.favorite)
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⭐ Favorite Contacts</h1>
        <p className="text-gray-600">
          Quick access to your most important contacts
        </p>
      </div>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {favorites.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No favorite contacts yet
          </h2>
          <p className="text-gray-600">
            Click the star icon on any contact to add them to your favorites
          </p>
        </div>
      )}
    </div>
  )
}