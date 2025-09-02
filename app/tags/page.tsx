'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  Plus,
  Tag,
  Edit2,
  Trash2,
  Search,
  X
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface TagData {
  id: string
  name: string
  color: string
  description: string
  materialCount: number
}

export default function TagsManagementPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Initialize with default data first
  const [tags, setTags] = useState<TagData[]>([
    {
      id: '1',
      name: 'Computer Science',
      color: 'bg-blue-500',
      description: 'Programming, algorithms, and computer systems',
      materialCount: 12
    },
    {
      id: '2',
      name: 'Mathematics',
      color: 'bg-green-500',
      description: 'Calculus, algebra, and mathematical concepts',
      materialCount: 8
    },
    {
      id: '3',
      name: 'Physics',
      color: 'bg-purple-500',
      description: 'Mechanics, thermodynamics, and quantum physics',
      materialCount: 6
    },
    {
      id: '4',
      name: 'Books',
      color: 'bg-orange-500',
      description: 'Literature and reading materials',
      materialCount: 15
    },
    {
      id: '5',
      name: 'Research',
      color: 'bg-red-500',
      description: 'Research papers and academic studies',
      materialCount: 4
    }
  ])
  
  const [isClient, setIsClient] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [editingTag, setEditingTag] = useState<TagData | null>(null)
  const [newTag, setNewTag] = useState({
    name: '',
    color: 'bg-blue-500',
    description: ''
  })

  const colorOptions = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-teal-500',
    'bg-gray-500'
  ]

  // Load from localStorage after component mounts
  useEffect(() => {
    setIsClient(true)
    const savedTags = localStorage.getItem('studyTags')
    if (savedTags) {
      setTags(JSON.parse(savedTags))
    }
  }, [])

  // Save tags to localStorage whenever they change (only after client-side hydration)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('studyTags', JSON.stringify(tags))
    }
  }, [tags, isClient])

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTag = () => {
    if (newTag.name.trim()) {
      const tag: TagData = {
        id: Date.now().toString(),
        name: newTag.name.trim(),
        color: newTag.color,
        description: newTag.description.trim(),
        materialCount: 0
      }
      setTags(prev => [...prev, tag])
      setNewTag({ name: '', color: 'bg-blue-500', description: '' })
      setIsAddingTag(false)
    }
  }

  const handleEditTag = (tag: TagData) => {
    setEditingTag(tag)
    setNewTag({
      name: tag.name,
      color: tag.color,
      description: tag.description
    })
  }

  const handleUpdateTag = () => {
    if (editingTag && newTag.name.trim()) {
      setTags(prev => prev.map(tag => 
        tag.id === editingTag.id 
          ? { ...tag, name: newTag.name.trim(), color: newTag.color, description: newTag.description.trim() }
          : tag
      ))
      setEditingTag(null)
      setNewTag({ name: '', color: 'bg-blue-500', description: '' })
    }
  }

  const handleDeleteTag = (tagId: string) => {
    if (confirm('Are you sure you want to delete this tag? This action cannot be undone.')) {
      setTags(prev => prev.filter(tag => tag.id !== tagId))
    }
  }

  const resetForm = () => {
    setNewTag({ name: '', color: 'bg-blue-500', description: '' })
    setIsAddingTag(false)
    setEditingTag(null)
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
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Tags Management</h1>
          </div>
          <div className="flex items-center space-x-3">
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
              Tags
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage tags to label your study materials
            </p>
          </div>
          <button
            onClick={() => setIsAddingTag(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Tag
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${tag.color} rounded-lg flex items-center justify-center`}>
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTag(tag)}
                    className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="p-1 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {tag.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {tag.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tag.materialCount} materials
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTags.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {searchTerm ? 'No tags found' : 'No tags yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first tag to organize your study materials.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsAddingTag(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Create First Tag
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Tag Modal */}
      {(isAddingTag || editingTag) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingTag ? 'Edit Tag' : 'Add New Tag'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter tag name"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter tag description"
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewTag(prev => ({ ...prev, color }))}
                      className={`w-10 h-10 ${color} rounded-lg border-2 ${
                        newTag.color === color 
                          ? 'border-gray-900 dark:border-gray-100' 
                          : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      } transition-colors duration-200`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={editingTag ? handleUpdateTag : handleAddTag}
                disabled={!newTag.name.trim()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {editingTag ? 'Update Tag' : 'Add Tag'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
