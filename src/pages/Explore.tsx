import { motion } from 'framer-motion'
import { Search, TrendingUp, Sparkles } from 'lucide-react'

// Mock explore data
const mockExplorePosts = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=400&fit=crop`,
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: Math.floor(Math.random() * 500) + 10,
  isVideo: Math.random() > 0.8,
  user: {
    username: `user_${i}`,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + i + 1000}?w=50&h=50&fit=crop&crop=face`
  }
}))

export default function Explore() {
  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10"
      >
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-b border-gray-200 p-4"
      >
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <TrendingUp size={16} />
          <span>Trending now</span>
          <Sparkles size={16} />
        </div>
      </motion.div>

      {/* Explore Grid */}
      <div className="bg-white">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {mockExplorePosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="relative aspect-square group cursor-pointer"
            >
              <img
                src={post.thumbnail}
                alt="Explore post"
                className="w-full h-full object-cover"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">❤️ {post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">💬 {post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Video Indicator */}
              {post.isVideo && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-black/50 rounded flex items-center justify-center">
                    <span className="text-white text-xs">▶</span>
                  </div>
                </div>
              )}

              {/* User Avatar */}
              <div className="absolute bottom-2 left-2">
                <img
                  src={post.user.avatar}
                  alt={post.user.username}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}