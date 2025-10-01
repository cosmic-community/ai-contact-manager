import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-blue-700 transition-colors">
            <span className="text-2xl">🎯</span>
            <span>AI Contact Manager</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              Contacts
            </Link>
            <Link href="/organizations" className="text-gray-600 hover:text-primary transition-colors">
              Organizations
            </Link>
            <Link href="/map" className="text-gray-600 hover:text-primary transition-colors">
              Map View
            </Link>
            <Link href="/favorites" className="text-gray-600 hover:text-primary transition-colors">
              ⭐ Favorites
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="btn btn-primary">
              + Add Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}