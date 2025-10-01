import { getOrganizations, getContactsByOrganization } from '@/lib/cosmic'
import { getIndustryColor } from '@/lib/utils'

export default async function OrganizationsPage() {
  const organizations = await getOrganizations()
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organizations</h1>
        <p className="text-gray-600">
          Manage and view all organizations in your contact network
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => {
          const industryColor = getIndustryColor(org.metadata.industry?.key)
          
          return (
            <div key={org.id} className="card">
              <div className="flex items-start gap-4 mb-4">
                {org.metadata.logo?.imgix_url && (
                  <img
                    src={`${org.metadata.logo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                    alt={org.title}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {org.title}
                  </h3>
                  {org.metadata.industry && (
                    <span className={`inline-block px-3 py-1 text-xs rounded-full text-white ${industryColor}`}>
                      {org.metadata.industry.value}
                    </span>
                  )}
                </div>
              </div>
              
              {org.metadata.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {org.metadata.description}
                </p>
              )}
              
              {org.metadata.website && (
                <a
                  href={org.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <span>🌐</span>
                  <span>Visit Website</span>
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}