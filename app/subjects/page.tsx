'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen,
  Plus,
  Trash2,
  ArrowRight,
  Moon,
  Sun,
  User,
  ArrowLeft
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Subject {
  id: string
  name: string
  code: string
  createdDate: string
}

export default function SubjectsPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Initialize with default data first
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Computer Science',
      code: 'cs601',
      createdDate: '22/06/2025'
    },
    {
      id: '2',
      name: 'Mathematics',
      code: 'bsc602',
      createdDate: '22/06/2025'
    },
    {
      id: '3',
      name: 'hrdob',
      code: 'hr123',
      createdDate: '22/06/2025'
    }
  ])
  
  const [isClient, setIsClient] = useState(false)
  
  // Load from localStorage after component mounts
  useEffect(() => {
    setIsClient(true)
    const savedSubjects = localStorage.getItem('subjects')
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects))
    }
  }, [])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: ''
  })

  // Save subjects to localStorage whenever they change (only after client-side hydration)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('subjects', JSON.stringify(subjects))
    }
  }, [subjects, isClient])

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSubject.name && newSubject.code) {
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.name,
        code: newSubject.code,
        createdDate: new Date().toLocaleDateString('en-GB')
      }
      setSubjects([...subjects, subject])
      setNewSubject({ name: '', code: '' })
      setShowAddModal(false)
    }
  }

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
  }

  const handleViewMaterials = (subject: Subject) => {
    // Store the selected subject in localStorage for the materials page
    localStorage.setItem('selectedSubject', JSON.stringify(subject))
    // Show a simple alert for now (you can create a materials page later)
    alert(`Viewing materials for ${subject.name}\n\nThis would open the materials page for this subject.\n\nFor now, you can:\n- Add documents\n- Create notes\n- Generate flashcards\n- Take quizzes`)
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
             <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Subjects</h1>
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
              Subjects
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your academic subjects and organize your materials.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Subject
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteSubject(subject.id)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Delete subject"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Subject Icon */}
              <div className="mb-4">
                <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Subject Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Code: {subject.code}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Created: {subject.createdDate}
                </p>
              </div>

              {/* View Materials Button */}
              <button
                onClick={() => handleViewMaterials(subject)}
                className="w-full bg-gray-900 dark:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                View Materials
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No subjects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by adding your first subject.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Subject
            </button>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Add New Subject
            </h2>
            
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter subject name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject Code
                </label>
                <input
                  type="text"
                  id="subjectCode"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter subject code"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
