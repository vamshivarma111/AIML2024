import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Grid3X3, Bookmark, Heart, Settings, MoreHorizontal } from 'lucide-react'

// Mock profile data
const mockProfile = {
  username: 'demo_user',
  fullName: 'Demo User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  isVerified: true,
  bio: 'Living life one post at a time ✨\nPassionate about photography, travel, and good coffee ☕',
  followersCount: 1234,
  followingCount: 567,
  postsCount: 89,
  isFollowing: false,
  isOwnProfile: true
}

// Mock posts data
const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=300&fit=crop`,
  likes: Math.floor(Math.random() * 1000) + 100,
  comments: Math.floor(Math.random() * 100) + 10,
  isVideo: Math.random() > 0.7
}))

export default function Profile() {
  const { username } = useParams()
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts')
  const [isFollowing, setIsFollowing] = useState(mockProfile.isFollowing)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-0">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={mockProfile.avatar}
              alt={mockProfile.username}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-2xl font-light">{mockProfile.username}</h1>
              {mockProfile.isVerified && (
                <span className="text-blue-500 text-xl">✓</span>
              )}
              {mockProfile.isOwnProfile ? (
                <button className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className={`px-6 py-1.5 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mb-4">
              <div>
                <span className="font-semibold">{mockProfile.postsCount}</span>
                <span className="text-gray-600 ml-1">posts</span>
              </div>
              <div>
                <span className="font-semibold">{mockProfile.followersCount.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">followers</span>
              </div>
              <div>
                <span className="font-semibold">{mockProfile.followingCount.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="whitespace-pre-line text-sm">
              <span className="font-semibold">{mockProfile.fullName}</span>
              {'\n'}
              {mockProfile.bio}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex justify-center">
          <div className="flex space-x-8">
            {[
              { id: 'posts', icon: Grid3X3, label: 'POSTS' },
              { id: 'saved', icon: Bookmark, label: 'SAVED' },
              { id: 'tagged', icon: Heart, label: 'TAGGED' }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-t-2 transition-colors ${
                    isActive
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-white">
        <div className="grid grid-cols-3 gap-1">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative aspect-square group cursor-pointer"
            >
              <img
                src={post.thumbnail}
                alt="Post"
                className="w-full h-full object-cover"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <Heart size={20} fill="currentColor" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">{post.comments}</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}