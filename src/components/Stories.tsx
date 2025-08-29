import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react'

interface Story {
  id: string
  user: {
    username: string
    avatar: string
    isVerified: boolean
  }
  media: {
    type: 'image' | 'video'
    url: string
    duration?: number
  }
  timestamp: Date
}

interface StoriesProps {
  stories: Story[]
  isOpen: boolean
  onClose: () => void
  initialStoryIndex?: number
}

export default function Stories({ stories, isOpen, onClose, initialStoryIndex = 0 }: StoriesProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)

  useEffect(() => {
    if (isOpen && stories.length > 0) {
      setCurrentStoryIndex(initialStoryIndex)
      setProgress(0)
      setIsPaused(false)
    }
  }, [isOpen, initialStoryIndex, stories.length])

  useEffect(() => {
    if (isOpen && stories.length > 0) {
      setCurrentStory(stories[currentStoryIndex])
    }
  }, [currentStoryIndex, stories, isOpen])

  useEffect(() => {
    if (!isOpen || !currentStory || isPaused) return

    const duration = currentStory.media.duration || 5000 // 5 seconds default
    const interval = 50 // Update every 50ms for smooth progress
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStory()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [currentStory, isPaused, isOpen])

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleStoryClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    if (x < width / 2) {
      previousStory()
    } else {
      nextStory()
    }
  }

  if (!isOpen || !currentStory) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        onClick={handleStoryClick}
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex space-x-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: index === currentStoryIndex ? `${progress}%` : 
                           index < currentStoryIndex ? '100%' : '0%' 
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={currentStory.user.avatar}
              alt={currentStory.user.username}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <div className="text-white">
              <span className="font-semibold">{currentStory.user.username}</span>
              {currentStory.user.isVerified && (
                <span className="ml-1 text-blue-400">✓</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsPaused(!isPaused)
              }}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {currentStory.media.type === 'image' ? (
            <img
              src={currentStory.media.url}
              alt="Story"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={currentStory.media.url}
              autoPlay
              muted
              loop
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {currentStoryIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              previousStory()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentStoryIndex < stories.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextStory()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}