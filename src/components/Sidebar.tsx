import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  User, 
  MessageCircle,
  Compass,
  Bookmark,
  Settings
} from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/explore' },
  { icon: PlusSquare, label: 'Create', path: '/create' },
  { icon: Heart, label: 'Activity', path: '/activity' },
  { icon: MessageCircle, label: 'Direct', path: '/direct' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: Bookmark, label: 'Saved', path: '/saved' },
  { icon: User, label: 'Profile', path: '/profile/demo_user' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const { currentUser } = useUser()

  return (
    <div className="h-full flex flex-col p-4">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Instagram
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {currentUser && (
        <div className="mt-auto">
          <Link
            to={`/profile/${currentUser.username}`}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {currentUser.username}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {currentUser.fullName}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}