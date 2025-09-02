'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Lightbulb,
  Bell
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Quiz {
  id: string
  title: string
  type: 'manual' | 'ai'
  subject: string
  createdDate: string
  questionCount: number
}

export default function QuizzesPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Initialize with default data first
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'AI Quiz for Steps of File Management',
      type: 'ai',
      subject: 'Computer Science',
      createdDate: '22/06/2025',
      questionCount: 5
    },
    {
      id: '2',
      title: 'AI Quiz for Computer Studies',
      type: 'manual',
      subject: 'Computer Science',
      createdDate: '22/06/2025',
      questionCount: 5
    }
  ])
  
  const [isClient, setIsClient] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAIGenerateModal, setShowAIGenerateModal] = useState(false)
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    subject: '',
    type: 'manual' as 'manual' | 'ai'
  })

  // Load from localStorage after component mounts
  useEffect(() => {
    setIsClient(true)
    const savedQuizzes = localStorage.getItem('quizzes')
    if (savedQuizzes) {
      setQuizzes(JSON.parse(savedQuizzes))
    }
  }, [])

  // Save quizzes to localStorage whenever they change (only after client-side hydration)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('quizzes', JSON.stringify(quizzes))
    }
  }, [quizzes, isClient])

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault()
    if (newQuiz.title && newQuiz.subject) {
      const quiz: Quiz = {
        id: Date.now().toString(),
        title: newQuiz.title,
        type: newQuiz.type,
        subject: newQuiz.subject,
        createdDate: new Date().toLocaleDateString('en-GB'),
        questionCount: 0
      }
      setQuizzes([...quizzes, quiz])
      setNewQuiz({ title: '', subject: '', type: 'manual' })
      setShowCreateModal(false)
    }
  }

  const handleAIGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const topic = formData.get('topic') as string
    const subject = formData.get('subject') as string
    
    if (topic && subject) {
      const quiz: Quiz = {
        id: Date.now().toString(),
        title: `AI Quiz for ${topic}`,
        type: 'ai',
        subject: subject,
        createdDate: new Date().toLocaleDateString('en-GB'),
        questionCount: 5
      }
      setQuizzes([...quizzes, quiz])
      setShowAIGenerateModal(false)
      alert(`AI Quiz generated for ${topic}!\n\nThis would create 5 questions based on your study materials.`)
    }
  }

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id))
  }

  const handleStartQuiz = (quiz: Quiz) => {
    alert(`Starting quiz: ${quiz.title}\n\nThis would open the quiz interface with ${quiz.questionCount} questions.`)
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
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Quizzes</h1>
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
              Quizzes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage quizzes to test your knowledge.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAIGenerateModal(true)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              AI Generate
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Quiz
            </button>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative hover:shadow-md transition-shadow duration-200"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteQuiz(quiz.id)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="Delete quiz"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Quiz Icon */}
              <div className="mb-4">
                <Lightbulb className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              {/* Quiz Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {quiz.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.type === 'ai' ? 'AI Generated' : 'Manual Quiz'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Created {quiz.createdDate}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {quiz.questionCount} questions
                </p>
              </div>

              {/* Start Quiz Button */}
              <button
                onClick={() => handleStartQuiz(quiz)}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No quizzes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first quiz to test your knowledge.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowAIGenerateModal(true)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                AI Generate
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Create Manual Quiz
            </h2>
            
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  id="quizTitle"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter quiz title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="quizSubject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="quizSubject"
                  value={newQuiz.subject}
                  onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
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
                  Create Quiz
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
              AI Generate Quiz
            </h2>
            
            <form onSubmit={handleAIGenerate} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter topic (e.g., File Management)"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
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
                  Generate Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
