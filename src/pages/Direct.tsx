import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Send, MoreHorizontal, Phone, Video, Info } from 'lucide-react'

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    user: {
      username: 'travel_lover',
      avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: new Date()
    },
    lastMessage: 'Hey! How was your trip?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      username: 'foodie_adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    lastMessage: 'That pasta recipe was amazing!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0
  },
  {
    id: '3',
    user: {
      username: 'fitness_goals',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: new Date()
    },
    lastMessage: 'Great workout today! 💪',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 1
  }
]

// Mock messages data
const mockMessages = [
  {
    id: '1',
    text: 'Hey! How was your trip?',
    sender: 'travel_lover',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isOwn: false
  },
  {
    id: '2',
    text: 'It was incredible! The mountains were breathtaking 🏔️',
    sender: 'demo_user',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    isOwn: true
  },
  {
    id: '3',
    text: 'I\'m so jealous! Can\'t wait to see your photos',
    sender: 'travel_lover',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    isOwn: false
  },
  {
    id: '4',
    text: 'I\'ll share them soon! The views were amazing',
    sender: 'demo_user',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isOwn: true
  }
]

export default function Direct() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageText, setMessageText] = useState('')
  const [showConversations, setShowConversations] = useState(true)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      // Handle message sending
      setMessageText('')
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Conversations List */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${
          showConversations ? 'block' : 'hidden md:block'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Messages</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">
                      {conversation.user.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {conversation.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!showConversations ? 'block' : 'hidden md:block'}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowConversations(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ←
                </button>
                <img
                  src={selectedConversation.user.avatar}
                  alt={selectedConversation.user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold">{selectedConversation.user.username}</span>
                  <div className="text-xs text-gray-500">
                    {selectedConversation.user.isOnline ? 'Active now' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Info size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.isOwn ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Message..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className={`p-2 rounded-full transition-colors ${
                    messageText.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}