import { motion } from 'framer-motion'
import { useState } from 'react'

interface StoryBubbleProps {
  story: {
    id: string
    user: {
      username: string
      avatar: string
      isVerified: boolean
    }
    hasUnviewedStories: boolean
  }
  onClick: () => void
  index: number
}

export default function StoryBubble({ story, onClick, index }: StoryBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col items-center space-y-2 cursor-pointer"
      onClick={onClick}
    >
      {/* Story Border */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-full p-0.5 ${
          story.hasUnviewedStories 
            ? 'story-gradient' 
            : 'bg-gray-300'
        }`}>
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        
        {/* Verified Badge */}
        {story.user.isVerified && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
        
        {/* Hover Effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-full bg-black/20"
          />
        )}
      </div>
      
      {/* Username */}
      <span className="text-xs text-gray-600 max-w-16 truncate">
        {story.user.username}
      </span>
    </motion.div>
  )
}