import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Explore from './pages/Explore'
import Direct from './pages/Direct'
import Create from './pages/Create'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="profile/:username" element={<Profile />} />
              <Route path="explore" element={<Explore />} />
              <Route path="direct" element={<Direct />} />
              <Route path="create" element={<Create />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  )
}

export default App