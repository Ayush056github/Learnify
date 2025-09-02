'use client'

import { useState } from 'react'
import { 
  Home, 
  GraduationCap, 
  FileText, 
  Target, 
  Users, 
  CheckSquare, 
  BarChart3, 
  BookOpen, 
  Calendar, 
  Tag,
  MessageSquare,
  LogOut
} from 'lucide-react'

interface DashboardNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'subjects', label: 'Subjects', icon: GraduationCap },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'focus', label: 'Focus Sessions', icon: Target },
    { id: 'groups', label: 'Study Groups', icon: Users },
    { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'planner', label: 'Planner', icon: Calendar },
    { id: 'tags', label: 'Tags Management', icon: Tag },
  ]

  const handleLogout = () => {
    // In a real app, you would clear the auth token and redirect
    window.location.href = '/'
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
        
        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
