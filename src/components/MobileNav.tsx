import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react'

const mobileNavItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/explore' },
  { icon: PlusSquare, label: 'Create', path: '/create' },
  { icon: Heart, label: 'Activity', path: '/activity' },
  { icon: User, label: 'Profile', path: '/profile/demo_user' },
]

export default function MobileNav() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-white border-t border-gray-200 px-4 py-2"
    >
      <div className="flex justify-around items-center">
        {mobileNavItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center space-y-1 p-2"
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  className={isActive ? 'text-gray-900' : 'text-gray-500'} 
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-gray-900 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}