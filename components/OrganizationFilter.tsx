'use client'

import { Organization } from '@/types'
import { getIndustryColor } from '@/lib/utils'

interface OrganizationFilterProps {
  organizations: Organization[]
}

export default function OrganizationFilter({ organizations }: OrganizationFilterProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Organization</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {organizations.map((org) => {
          const industryColor = getIndustryColor(org.metadata.industry?.key)
          
          return (
            <button
              key={org.id}
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                {org.metadata.logo?.imgix_url && (
                  <img
                    src={`${org.metadata.logo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={org.title}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                )}
                <div className="flex-grow">
                  <div className="font-medium text-gray-900 text-sm line-clamp-1">
                    {org.title}
                  </div>
                  {org.metadata.industry && (
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full text-white ${industryColor} mt-1`}>
                      {org.metadata.industry.value}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}