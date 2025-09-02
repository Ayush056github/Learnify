'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  BookOpen,
  Plus,
  Trash2,
  Download,
  ArrowRight,
  Moon,
  Sun,
  User,
  ArrowLeft,
  FileText,
  RefreshCw,
  Upload,
  MessageSquare,
  Send,
  Bot,
  Eye,
  X
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Material {
  id: string
  title: string
  subject: string
  uploadDate: string
  type: 'pdf' | 'doc' | 'note'
  fileSize?: string
  fileName?: string
  content?: string
}

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function MaterialsPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Initialize with default data first
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Steps of File Management',
      subject: 'Computer Science',
      uploadDate: '22/06/2025',
      type: 'pdf',
      fileSize: '36.25 KB',
      fileName: 'Introduction to Algorithms.pdf'
    },
    {
      id: '2',
      title: 'Derivatives Cheat Sheet',
      subject: 'Mathematics',
      uploadDate: '22/06/2025',
      type: 'doc',
      fileSize: '24.1 KB'
    },
    {
      id: '3',
      title: 'Data Structures Notes',
      subject: 'Computer Science',
      uploadDate: '22/06/2025',
      type: 'note',
      fileSize: '12.5 KB'
    }
  ])
  
  const [isClient, setIsClient] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Load from localStorage after component mounts
  useEffect(() => {
    setIsClient(true)
    const savedMaterials = localStorage.getItem('materials')
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials))
    }
  }, [])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    subject: '',
    type: 'pdf' as 'pdf' | 'doc' | 'note'
  })

  // Save materials to localStorage whenever they change (only after client-side hydration)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('materials', JSON.stringify(materials))
    }
  }, [materials, isClient])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const material: Material = {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          subject: newMaterial.subject || 'General',
          uploadDate: new Date().toLocaleDateString('en-GB'),
          type: file.type.includes('pdf') ? 'pdf' : 'doc',
          fileSize: (file.size / 1024).toFixed(2) + ' KB',
          fileName: file.name,
          content: content
        }
        setMaterials([...materials, material])
        setShowUploadModal(false)
        setNewMaterial({ title: '', subject: '', type: 'pdf' })
      }
      reader.readAsText(file)
    }
  }

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDeleteMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id))
  }

  const handleDownloadMaterial = (material: Material) => {
    // Simulate download
    alert(`Downloading ${material.title}...\n\nThis would trigger a download of the ${material.type.toUpperCase()} file.`)
  }

  const handleViewMaterial = (material: Material) => {
    setSelectedMaterial(material)
    setShowViewer(true)
    setChatMessages([])
  }

  const handleChatWithAI = async (message: string) => {
    if (!selectedMaterial || !message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsLoading(true)

    try {
      // Simulate Google Gemini API call (replace with actual API integration)
      const response = await simulateGeminiResponse(message, selectedMaterial)
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      }

      setChatMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const simulateGeminiResponse = async (message: string, material: Material): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple response simulation based on the material and message
    const responses = [
      `Based on "${material.title}", I can help you understand this topic better. What specific aspect would you like to explore?`,
      `From the ${material.subject} material "${material.title}", here's what I found relevant to your question: This document covers key concepts that relate to your query.`,
      `Great question about "${material.title}"! This ${material.type.toUpperCase()} document contains information that can help answer your question.`,
      `I've analyzed the content of "${material.title}" and can provide insights based on the ${material.subject} concepts covered in this material.`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Computer Science': 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      'Mathematics': 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300',
      'Physics': 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300',
      'Chemistry': 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
    }
    return colors[subject as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Materials</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Study Materials
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Upload and manage your study materials.
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Upload Material
          </button>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteMaterial(material.id)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Delete material"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Material Icon */}
              <div className="mb-4">
                <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Material Details */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {material.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {material.subject}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getSubjectColor(material.subject)}`}>
                  {material.subject}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Uploaded {material.uploadDate}
                </p>
                {material.fileSize && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    File Size: {material.fileSize}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadMaterial(material)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleViewMaterial(material)}
                  className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-1"
                >
                  View Materials
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {materials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No materials yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by uploading your first study material.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Upload Your First Material
            </button>
          </div>
        )}
      </div>

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Upload New Material
            </h2>
            
            <form onSubmit={handleUploadMaterial} className="space-y-4">
              <div>
                <label htmlFor="materialSubject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="materialSubject"
                  value={newMaterial.subject}
                  onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose File
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports PDF, DOC, DOCX files
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Material Viewer Modal */}
      {showViewer && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl h-[90vh] flex">
            {/* Header */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedMaterial.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedMaterial.fileName || selectedMaterial.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    AI Chat
                  </button>
                  <button
                    onClick={() => setShowViewer(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
                <button className="px-4 py-3 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
                  Overview
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Extracted Text
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Flashcards
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Quiz
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    File Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">File Type:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedMaterial.type.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">File Size:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedMaterial.fileSize}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Uploaded:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedMaterial.uploadDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">{selectedMaterial.subject}</span>
                    </div>
                  </div>
                </div>

                {/* PDF Viewer Simulation */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Document Preview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedMaterial.fileName || selectedMaterial.title}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-left max-w-2xl mx-auto">
                    <h5 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                      File Management
                    </h5>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Creating a new File/Folder:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                      <li>Go to the desired Location</li>
                      <li>Right-click on empty space</li>
                      <li>Select "New" from context menu</li>
                      <li>Choose file or folder type</li>
                      <li>Enter name and press Enter</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Chat Sidebar */}
            {showChat && (
              <div className="w-96 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary-600" />
                    AI Chat
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ask questions about this document
                  </p>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>Start a conversation about this document!</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleChatWithAI(currentMessage)
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask about this document..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !currentMessage.trim()}
                      className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
