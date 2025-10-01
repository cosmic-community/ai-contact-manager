import { getContacts } from '@/lib/cosmic'
import MapView from '@/components/MapView'

export default async function MapPage() {
  const contacts = await getContacts()
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Map</h1>
        <p className="text-gray-600">
          View all contacts on an interactive map and find the nearest ones
        </p>
      </div>
      
      <MapView contacts={contacts} />
    </div>
  )
}