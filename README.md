# Instagram Clone App 🚀

A modern, responsive Instagram-like web application built with React, TypeScript, and Tailwind CSS. This app replicates the core features of Instagram with beautiful animations and a smooth user experience.

## ✨ Features

### 🎭 Stories System
- **Interactive Story Bubbles**: Click on story avatars to view full-screen stories
- **Progress Bars**: Visual progress indicators for each story
- **Auto-advance**: Stories automatically progress with smooth transitions
- **Pause/Play Controls**: Users can pause and resume story playback
- **Navigation**: Swipe or click to navigate between stories
- **Gradient Borders**: Beautiful Instagram-style gradient borders for unviewed stories

### 📱 Main Feed
- **Post Display**: Clean, Instagram-like post layout
- **Like System**: Heart animations with like/unlike functionality
- **Comment System**: Add comments with real-time updates
- **Save Posts**: Bookmark posts for later viewing
- **Media Navigation**: Support for multiple images/videos per post
- **Location Tags**: Display post locations
- **User Verification**: Blue checkmarks for verified users

### 👤 User Profiles
- **Profile Information**: Username, bio, follower counts
- **Posts Grid**: 3-column grid layout of user posts
- **Follow System**: Follow/unfollow functionality
- **Profile Stats**: Posts, followers, and following counts
- **Edit Profile**: Profile customization options

### 🔍 Explore Page
- **Search Functionality**: Search for users and content
- **Trending Content**: Discover trending posts
- **Grid Layout**: Responsive grid of explore content
- **Hover Effects**: Interactive hover overlays with engagement metrics

### 💬 Direct Messages
- **Conversation List**: View all conversations
- **Real-time Chat**: Send and receive messages
- **Online Status**: See who's currently online
- **Unread Counts**: Track unread message notifications
- **Media Support**: Support for text and media messages

### ➕ Create Posts
- **File Upload**: Drag & drop or click to upload photos/videos
- **Multi-step Process**: Upload → Edit → Share workflow
- **Caption Editor**: Add captions and hashtags
- **Location Tagging**: Add location to posts
- **Audience Selection**: Choose between followers and public
- **Preview Mode**: See how your post will look before sharing

### 🎨 Design & Animations
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Instagram Colors**: Authentic Instagram color scheme
- **Modern UI**: Clean, minimalist interface design
- **Hover Effects**: Interactive hover states throughout the app
- **Loading States**: Beautiful loading animations and spinners

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for beautiful icons
- **Routing**: React Router for navigation
- **Build Tool**: Vite for fast development and building
- **State Management**: React Context API for global state

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instagram-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout
│   ├── Sidebar.tsx     # Desktop navigation sidebar
│   ├── MobileNav.tsx   # Mobile bottom navigation
│   ├── Stories.tsx     # Full-screen story viewer
│   ├── StoryBubble.tsx # Individual story preview
│   └── Post.tsx        # Individual post component
├── pages/              # Page components
│   ├── Home.tsx        # Main feed with stories and posts
│   ├── Profile.tsx     # User profile page
│   ├── Explore.tsx     # Discover and search page
│   ├── Direct.tsx      # Direct messaging
│   └── Create.tsx      # Create new posts
├── contexts/           # React contexts
│   └── UserContext.tsx # User authentication and state
├── main.tsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Features Explained

### Stories System
The stories feature mimics Instagram's story functionality:
- **Story Bubbles**: Circular avatars with gradient borders for unviewed stories
- **Full-screen Viewer**: Immersive story viewing experience
- **Progress Tracking**: Visual progress bars for each story
- **Auto-play**: Automatic story progression with manual controls
- **Touch Navigation**: Swipe gestures for story navigation

### Post Interactions
Each post supports:
- **Like/Unlike**: Heart button with smooth animations
- **Comments**: Add and view comments
- **Save**: Bookmark posts for later
- **Share**: Share posts with other users
- **Media Navigation**: Navigate between multiple images/videos

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Layout**: Full sidebar navigation on larger screens
- **Touch-Friendly**: Optimized touch interactions
- **Adaptive Grids**: Responsive grid layouts for different screen sizes

## 🎨 Customization

### Colors
The app uses Instagram's authentic color palette:
- Primary Blue: `#0095f6`
- Error Red: `#ed4956`
- Text Colors: Various shades of gray
- Background: Clean white and light gray

### Animations
Custom animations include:
- **Fade In**: Smooth opacity transitions
- **Slide Up**: Content slides up from below
- **Scale In**: Elements scale in with spring physics
- **Heart Beat**: Special animation for like interactions

## 🔧 Development

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update routing in `App.tsx`
4. Add new context providers if needed

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color scheme
- Maintain consistent spacing and typography
- Ensure responsive design principles

### Animation Guidelines
- Use Framer Motion for all animations
- Keep animations subtle and purposeful
- Maintain consistent timing (300ms for most transitions)
- Use spring physics for interactive elements

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Instagram for the design inspiration
- Unsplash for the beautiful sample images
- The React and Tailwind CSS communities
- Framer Motion for amazing animations

---

**Note**: This is a demo application created for educational purposes. It does not include actual backend functionality or real user authentication.
