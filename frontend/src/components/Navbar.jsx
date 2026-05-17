import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Products' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Clothify
          </span>
          <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-medium tracking-wide">
            CATALOG
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                pathname === link.to ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/add" className="btn-primary text-sm">
            + Add Product
          </Link>
        </div>
      </div>
    </nav>
  )
}
