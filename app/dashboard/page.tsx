'use client'

import { useState } from 'react'
import { 
  Upload,
  MessageSquare,
  Zap,
  Bell,
  Moon,
  Sun,
  ArrowRight,
  Award,
  Target,
  FileText,
  CheckSquare,
  BarChart3
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import DashboardNav from '../../components/DashboardNav'

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Navigate to specific pages
    if (tab === 'subjects') {
      window.location.href = '/subjects'
    } else if (tab === 'materials') {
      window.location.href = '/materials'
    } else if (tab === 'flashcards') {
      window.location.href = '/flashcards'
    } else if (tab === 'chatbot') {
      window.location.href = '/chatbot'
    } else if (tab === 'quizzes') {
      window.location.href = '/quizzes'
    } else if (tab === 'planner') {
      window.location.href = '/planner'
    } else if (tab === 'tags') {
      window.location.href = '/tags'
    } else if (tab === 'analytics') {
      window.location.href = '/analytics'
    } else if (tab === 'chat') {
      window.location.href = '/chat'
    }
  }



  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Add new study materials',
      icon: Upload,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Chat with Documents',
      description: 'Ask questions about your materials',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Generate Flashcards',
      description: 'Create flashcards from content',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Start Focus Session',
      description: 'Begin a focused study session',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Create Quiz',
      description: 'Generate practice questions',
      icon: CheckSquare,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    {
      title: 'View Analytics',
      description: 'Check your study progress',
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Learnify</h1>
          </div>

          {/* Page Title */}
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dashboard</h2>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <DashboardNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Greeting Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Good morning, user1! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Ready to continue your learning journey? You have 4 new assignments due this week.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">2 days</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Documents</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Flashcards</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">20</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Points</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">3850</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${action.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{action.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Uploaded "Machine Learning Notes.pdf"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Generated 15 flashcards from "Physics Chapter 3"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Asked 3 questions about "Chemistry Basics"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
