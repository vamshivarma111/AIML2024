import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  Smile,
  Play
} from 'lucide-react'
import { useUser } from '../contexts/UserContext'

interface PostProps {
  post: {
    id: string
    user: {
      username: string
      avatar: string
      isVerified: boolean
    }
    media: {
      type: 'image' | 'video'
      url: string
      thumbnail?: string
    }[]
    caption: string
    likes: number
    comments: number
    timestamp: Date
    location?: string
  }
}

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const { currentUser } = useUser()

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      // Handle comment submission
      setCommentText('')
    }
  }

  const nextMedia = () => {
    if (currentMediaIndex < post.media.length - 1) {
      setCurrentMediaIndex(prev => prev + 1)
    }
  }

  const previousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(prev => prev - 1)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-sm">{post.user.username}</span>
              {post.user.isVerified && (
                <span className="text-blue-500 text-sm">✓</span>
              )}
            </div>
            {post.location && (
              <span className="text-xs text-gray-500">{post.location}</span>
            )}
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Media */}
      <div className="relative">
        <div className="relative">
          {post.media[currentMediaIndex].type === 'image' ? (
            <img
              src={post.media[currentMediaIndex].url}
              alt="Post"
              className="w-full object-cover"
            />
          ) : (
            <div className="relative">
              <img
                src={post.media[currentMediaIndex].thumbnail || post.media[currentMediaIndex].url}
                alt="Post thumbnail"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <Play size={24} className="text-white ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Navigation Dots */}
        {post.media.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {post.media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Media Navigation Arrows */}
        {post.media.length > 1 && (
          <>
            {currentMediaIndex > 0 && (
              <button
                onClick={previousMedia}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                ←
              </button>
            )}
            {currentMediaIndex < post.media.length - 1 && (
              <button
                onClick={nextMedia}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              >
                →
              </button>
            )}
          </>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-full transition-colors"
            >
              <MessageCircle size={24} />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-gray-800 rounded-full transition-colors"
            >
              <Send size={24} />
            </motion.button>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors ${
              isSaved ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{post.likes.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.user.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments Toggle */}
        {post.comments > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            View all {post.comments} comments
          </button>
        )}

        {/* Timestamp */}
        <div className="mt-2">
          <span className="text-xs text-gray-400">
            {post.timestamp.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Comment Input */}
      <div className="border-t border-gray-200 p-3">
        <form onSubmit={handleComment} className="flex items-center space-x-2">
          <button type="button" className="p-2 text-gray-600 hover:text-gray-800 rounded-full transition-colors">
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className={`text-sm font-semibold ${
              commentText.trim() ? 'text-blue-500' : 'text-blue-300'
            }`}
          >
            Post
          </button>
        </form>
      </div>
    </motion.article>
  )
}