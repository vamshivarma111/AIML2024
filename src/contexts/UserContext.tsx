import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  username: string
  fullName: string
  avatar: string
  isVerified: boolean
  followersCount: number
  followingCount: number
  postsCount: number
  bio: string
}

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    username: 'demo_user',
    fullName: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    followersCount: 1234,
    followingCount: 567,
    postsCount: 89,
    bio: 'Living life one post at a time ✨'
  })

  const login = (user: User) => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    setCurrentUser,
    isAuthenticated: !!currentUser,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}