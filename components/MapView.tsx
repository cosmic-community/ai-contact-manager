'use client'

import { Contact } from '@/types'
import { useState, useEffect } from 'react'
import { calculateDistance, getIndustryColor } from '@/lib/utils'

interface MapViewProps {
  contacts: Contact[]
}

export default function MapView({ contacts }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [nearestContacts, setNearestContacts] = useState<Array<Contact & { distance: number }>>([])
  
  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])
  
  useEffect(() => {
    if (userLocation) {
      // Calculate distances for all contacts with location data
      const contactsWithDistance = contacts
        .filter(c => c.metadata.latitude && c.metadata.longitude)
        .map(c => ({
          ...c,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lon,
            c.metadata.latitude!,
            c.metadata.longitude!
          )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
      
      setNearestContacts(contactsWithDistance)
    }
  }, [userLocation, contacts])
  
  const contactsWithLocation = contacts.filter(c => c.metadata.latitude && c.metadata.longitude)
  
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="card h-96 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map View</h3>
          <p className="text-gray-600 mb-4">
            Showing {contactsWithLocation.length} contacts with location data
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Finance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Healthcare</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nearest Contacts */}
      {userLocation && nearestContacts.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📍</span>
            Nearest Contacts
          </h3>
          <div className="space-y-3">
            {nearestContacts.map((contact) => {
              const industryColor = getIndustryColor(contact.metadata.organization?.metadata.industry?.key)
              
              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {contact.metadata.profile_photo?.imgix_url ? (
                      <img
                        src={`${contact.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={contact.metadata.full_name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                        {contact.metadata.full_name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {contact.metadata.full_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {contact.metadata.city}, {contact.metadata.country}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">
                      {contact.distance} km
                    </div>
                    {contact.metadata.organization && (
                      <div className={`text-xs px-2 py-0.5 rounded-full text-white ${industryColor} mt-1`}>
                        {contact.metadata.organization.metadata.industry?.value}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      
      {/* Location Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {contactsWithLocation.length}
          </div>
          <div className="text-sm text-gray-600">Contacts with Location</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {new Set(contactsWithLocation.map(c => c.metadata.city)).size}
          </div>
          <div className="text-sm text-gray-600">Cities</div>
        </div>
      </div>
    </div>
  )
}