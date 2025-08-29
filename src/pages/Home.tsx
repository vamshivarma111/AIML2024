import { useState } from 'react'
import { motion } from 'framer-motion'
import Stories from '../components/Stories'
import StoryBubble from '../components/StoryBubble'
import Post from '../components/Post'

// Mock data for stories
const mockStories = [
  {
    id: '1',
    user: {
      username: 'travel_lover',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    hasUnviewedStories: true
  },
  {
    id: '2',
    user: {
      username: 'foodie_adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isVerified: false
    },
    hasUnviewedStories: true
  },
  {
    id: '3',
    user: {
      username: 'fitness_goals',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    hasUnviewedStories: false
  },
  {
    id: '4',
    user: {
      username: 'art_creations',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isVerified: false
    },
    hasUnviewedStories: true
  },
  {
    id: '5',
    user: {
      username: 'tech_insights',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    hasUnviewedStories: false
  }
]

// Mock data for full stories
const mockFullStories = [
  {
    id: '1',
    user: {
      username: 'travel_lover',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
      duration: 5000
    },
    timestamp: new Date()
  },
  {
    id: '2',
    user: {
      username: 'foodie_adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isVerified: false
    },
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=1000&fit=crop',
      duration: 5000
    },
    timestamp: new Date()
  }
]

// Mock data for posts
const mockPosts = [
  {
    id: '1',
    user: {
      username: 'travel_lover',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop'
      }
    ],
    caption: 'Exploring the beautiful mountains today! 🏔️ Nature never fails to amaze me. #adventure #mountains #nature',
    likes: 1247,
    comments: 89,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    location: 'Mountain Peak, Colorado'
  },
  {
    id: '2',
    user: {
      username: 'foodie_adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isVerified: false
    },
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=1000&fit=crop'
      }
    ],
    caption: 'Homemade pasta night! 🍝 Nothing beats fresh ingredients and love in every bite. #homemade #pasta #cooking',
    likes: 892,
    comments: 45,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    location: 'My Kitchen'
  },
  {
    id: '3',
    user: {
      username: 'fitness_goals',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isVerified: true
    },
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop'
      }
    ],
    caption: 'Morning workout complete! 💪 Consistency is key to achieving your fitness goals. #fitness #workout #motivation',
    likes: 2156,
    comments: 123,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    location: 'Gym'
  }
]

export default function Home() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)
  const [isStoriesOpen, setIsStoriesOpen] = useState(false)

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index)
    setIsStoriesOpen(true)
  }

  const closeStories = () => {
    setIsStoriesOpen(false)
    setSelectedStoryIndex(null)
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0">
      {/* Stories Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 p-4 mb-6"
      >
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {mockStories.map((story, index) => (
            <StoryBubble
              key={story.id}
              story={story}
              onClick={() => handleStoryClick(index)}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {mockPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Post post={post} />
          </motion.div>
        ))}
      </div>

      {/* Stories Modal */}
      <Stories
        stories={mockFullStories}
        isOpen={isStoriesOpen}
        onClose={closeStories}
        initialStoryIndex={selectedStoryIndex || 0}
      />
    </div>
  )
}