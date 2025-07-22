import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-semibold text-gray-900">utab - Web Dev</h1>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Canvas
            </Link>
            <Link
              to="/settings"
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                location.pathname === '/settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}