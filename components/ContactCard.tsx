'use client'

import { Contact } from '@/types'
import { formatPhoneNumber, getInitials, getIndustryColor } from '@/lib/utils'
import { useState } from 'react'

interface ContactCardProps {
  contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
  const [isFavorite, setIsFavorite] = useState(contact.metadata.favorite)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleToggleFavorite = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would call an API route
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const profileImage = contact.metadata.profile_photo?.imgix_url
  const industryColor = getIndustryColor(contact.metadata.organization?.metadata.industry?.key)
  
  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          {profileImage ? (
            <img
              src={`${profileImage}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={contact.metadata.full_name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              {getInitials(contact.metadata.full_name)}
            </div>
          )}
        </div>
        
        {/* Contact Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {contact.metadata.full_name}
              </h3>
              {contact.metadata.job_title && (
                <p className="text-sm text-gray-600">{contact.metadata.job_title}</p>
              )}
            </div>
            
            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              disabled={isLoading}
              className="text-2xl hover:scale-110 transition-transform"
              aria-label="Toggle favorite"
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </div>
          
          {/* Organization */}
          {contact.metadata.organization && (
            <div className="flex items-center gap-2 mb-2">
              {contact.metadata.organization.metadata.logo?.imgix_url && (
                <img
                  src={`${contact.metadata.organization.metadata.logo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                  alt={contact.metadata.organization.title}
                  width={20}
                  height={20}
                  className="rounded"
                />
              )}
              <span className="text-sm text-gray-600">
                {contact.metadata.organization.title}
              </span>
              {contact.metadata.organization.metadata.industry && (
                <span className={`px-2 py-0.5 text-xs rounded-full text-white ${industryColor}`}>
                  {contact.metadata.organization.metadata.industry.value}
                </span>
              )}
            </div>
          )}
          
          {/* Contact Details */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span>📞</span>
              <span>{formatPhoneNumber(contact.metadata.phone)}</span>
            </div>
            
            {contact.metadata.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <span>📧</span>
                <span>{contact.metadata.email}</span>
              </div>
            )}
            
            {contact.metadata.city && (
              <div className="flex items-center gap-2 text-gray-700">
                <span>📍</span>
                <span>{contact.metadata.city}, {contact.metadata.country}</span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {contact.metadata.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {contact.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          
          {/* Contact Source */}
          {contact.metadata.contact_source && (
            <div className="mt-2 text-xs text-gray-500">
              Added via: {contact.metadata.contact_source.value}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}