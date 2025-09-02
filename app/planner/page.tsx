'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  BookOpen,
  Bell
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface StudyPlan {
  id: string
  title: string
  date: string
  materials: string[]
  materialCount: number
}

export default function PlannerPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Load study plans from localStorage or use default data
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>(() => {
    if (typeof window !== 'undefined') {
      const savedPlans = localStorage.getItem('studyPlans')
      if (savedPlans) {
        return JSON.parse(savedPlans)
      }
    }
    return [
      {
        id: '1',
        title: 'Mid-Term Exam Prep',
        date: 'June 29th, 2025',
        materials: ['Introduction to Algorithms', 'Data Structures Notes'],
        materialCount: 2
      },
      {
        id: '2',
        title: 'Calculus Final Review',
        date: 'July 6th, 2025',
        materials: ['Derivatives Cheat Sheet'],
        materialCount: 1
      }
    ]
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAIGenerateModal, setShowAIGenerateModal] = useState(false)
  const [newPlan, setNewPlan] = useState({
    title: '',
    date: '',
    materials: [] as string[]
  })

  // Save study plans to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('studyPlans', JSON.stringify(studyPlans))
    }
  }, [studyPlans])

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPlan.title && newPlan.date) {
      const plan: StudyPlan = {
        id: Date.now().toString(),
        title: newPlan.title,
        date: newPlan.date,
        materials: newPlan.materials,
        materialCount: newPlan.materials.length
      }
      setStudyPlans([...studyPlans, plan])
      setNewPlan({ title: '', date: '', materials: [] })
      setShowCreateModal(false)
    }
  }

  const handleAIGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const topic = formData.get('topic') as string
    const date = formData.get('date') as string
    
    if (topic && date) {
      const plan: StudyPlan = {
        id: Date.now().toString(),
        title: `${topic} Study Plan`,
        date: date,
        materials: ['AI Generated Material 1', 'AI Generated Material 2'],
        materialCount: 2
      }
      setStudyPlans([...studyPlans, plan])
      setShowAIGenerateModal(false)
      alert(`AI Study Plan generated for ${topic}!\n\nThis would create a structured study plan with recommended materials and timeline.`)
    }
  }

  const handleDeletePlan = (id: string) => {
    setStudyPlans(studyPlans.filter(plan => plan.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
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
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Planner</h1>
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
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
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
              Study Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your study materials and create a structured learning plan.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAIGenerateModal(true)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              AI Generate Plan
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Manual Plan
            </button>
          </div>
        </div>

        {/* Study Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Delete plan"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Plan Icon */}
              <div className="mb-4">
                <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Plan Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.materialCount} materials
                  </span>
                </div>
                <div className="space-y-1">
                  {plan.materials.map((material, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      • {material}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {studyPlans.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No study plans yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first study plan to organize your learning.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowAIGenerateModal(true)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                AI Generate Plan
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Manual Plan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Create Manual Plan
            </h2>
            
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div>
                <label htmlFor="planTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plan Title
                </label>
                <input
                  type="text"
                  id="planTitle"
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter plan title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="planDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  id="planDate"
                  value={newPlan.date}
                  onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Generate Modal */}
      {showAIGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              AI Generate Study Plan
            </h2>
            
            <form onSubmit={handleAIGenerate} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Study Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter study topic (e.g., Calculus Final)"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAIGenerateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
