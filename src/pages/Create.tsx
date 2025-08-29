import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Image, 
  Video, 
  X, 
  Smile, 
  MapPin, 
  Users, 
  Globe,
  ArrowLeft,
  Check
} from 'lucide-react'

export default function Create() {
  const [step, setStep] = useState<'upload' | 'edit' | 'share'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [audience, setAudience] = useState<'followers' | 'public'>('followers')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setStep('edit')
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setStep('edit')
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleShare = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Reset form
    setStep('upload')
    setSelectedFile(null)
    setPreviewUrl('')
    setCaption('')
    setLocation('')
  }

  const goBack = () => {
    if (step === 'edit') {
      setStep('upload')
      setSelectedFile(null)
      setPreviewUrl('')
    } else if (step === 'share') {
      setStep('edit')
    }
  }

  if (step === 'upload') {
    return (
      <div className="max-w-2xl mx-auto pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Create New Post</h1>
            <p className="text-gray-600">Share photos and videos with your followers</p>
          </div>

          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <Image size={48} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Photo</span>
                </div>
                <div className="text-center">
                  <Video size={48} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Video</span>
                </div>
              </div>
              
              <p className="text-lg font-medium text-gray-900">
                Drag photos and videos here
              </p>
              <p className="text-gray-600">
                or click to select files
              </p>
            </div>
          </div>

          {/* Upload Tips */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Supported formats: JPG, PNG, MP4, MOV</p>
            <p>Maximum file size: 100MB</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (step === 'edit') {
    return (
      <div className="max-w-4xl mx-auto pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={goBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold">Edit Post</h1>
            <button
              onClick={() => setStep('share')}
              className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
            >
              Next
            </button>
          </div>

          <div className="flex">
            {/* Preview */}
            <div className="flex-1 bg-black flex items-center justify-center">
              {selectedFile?.type.startsWith('image/') ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  className="max-w-full max-h-96"
                />
              )}
            </div>

            {/* Edit Options */}
            <div className="w-80 border-l border-gray-200 p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Add location"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="followers"
                        checked={audience === 'followers'}
                        onChange={(e) => setAudience(e.target.value as 'followers' | 'public')}
                        className="text-blue-500"
                      />
                      <Users size={16} />
                      <span className="text-sm">Followers</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="public"
                        checked={audience === 'public'}
                        onChange={(e) => setAudience(e.target.value as 'followers' | 'public')}
                        className="text-blue-500"
                      />
                      <Globe size={16} />
                      <span className="text-sm">Public</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (step === 'share') {
    return (
      <div className="max-w-2xl mx-auto pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 rounded-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Share Your Post</h1>
            <p className="text-gray-600">Review your post before sharing</p>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-sm">demo_user</span>
                  <div className="text-xs text-gray-500">
                    {audience === 'followers' ? 'Followers' : 'Public'}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden mb-3">
                {selectedFile?.type.startsWith('image/') ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>
              
              {caption && (
                <p className="text-sm text-gray-900">{caption}</p>
              )}
              
              {location && (
                <p className="text-xs text-gray-500 mt-2">📍 {location}</p>
              )}
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300 transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sharing...</span>
              </>
            ) : (
              <>
                <Check size={20} />
                <span>Share Post</span>
              </>
            )}
          </button>

          {/* Back Button */}
          <button
            onClick={goBack}
            className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back to Edit
          </button>
        </motion.div>
      </div>
    )
  }

  return null
}