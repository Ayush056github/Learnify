'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  TrendingUp,
  Clock,
  BookOpen,
  Target,
  Award,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface StudySession {
  id: string
  date: string
  duration: number
  subject: string
  type: 'flashcards' | 'quiz' | 'reading' | 'focus'
  score?: number
}

interface WeeklyData {
  day: string
  hours: number
}

interface SubjectData {
  subject: string
  hours: number
  color: string
}

export default function AnalyticsPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Mock data for analytics
  const [studySessions] = useState<StudySession[]>([
    { id: '1', date: '2024-01-15', duration: 120, subject: 'Computer Science', type: 'flashcards', score: 85 },
    { id: '2', date: '2024-01-14', duration: 90, subject: 'Mathematics', type: 'quiz', score: 92 },
    { id: '3', date: '2024-01-13', duration: 150, subject: 'Physics', type: 'reading' },
    { id: '4', date: '2024-01-12', duration: 75, subject: 'Computer Science', type: 'focus' },
    { id: '5', date: '2024-01-11', duration: 105, subject: 'Mathematics', type: 'flashcards', score: 78 },
    { id: '6', date: '2024-01-10', duration: 180, subject: 'Physics', type: 'reading' },
    { id: '7', date: '2024-01-09', duration: 60, subject: 'Computer Science', type: 'quiz', score: 88 }
  ])

  const [weeklyData] = useState<WeeklyData[]>([
    { day: 'Mon', hours: 3 },
    { day: 'Tue', hours: 5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 6 },
    { day: 'Sun', hours: 5 }
  ])

  const [subjectData] = useState<SubjectData[]>([
    { subject: 'Computer Science', hours: 12, color: 'bg-blue-500' },
    { subject: 'Mathematics', hours: 8, color: 'bg-green-500' },
    { subject: 'Physics', hours: 6, color: 'bg-purple-500' },
    { subject: 'Literature', hours: 4, color: 'bg-orange-500' }
  ])

  // Calculate statistics
  const totalStudyHours = studySessions.reduce((total, session) => total + session.duration, 0) / 60
  const averageScore = studySessions
    .filter(session => session.score)
    .reduce((total, session, _, arr) => total + (session.score || 0) / arr.length, 0)
  const studyStreak = 7 // Mock data
  const completedSessions = studySessions.length

  const maxWeeklyHours = Math.max(...weeklyData.map(d => d.hours))
  const maxSubjectHours = Math.max(...subjectData.map(d => d.hours))

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
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Analytics</h1>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your study progress and performance insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Study Hours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalStudyHours.toFixed(1)}h</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{averageScore.toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{studyStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{completedSessions}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Study Hours Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Study Hours</h2>
            </div>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {day.day}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                    <div 
                      className="bg-primary-600 h-6 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                      style={{ width: `${(day.hours / maxWeeklyHours) * 100}%` }}
                    >
                      <span className="text-white text-xs font-medium">{day.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Distribution Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Study Time by Subject</h2>
            </div>
            <div className="space-y-4">
              {subjectData.map((subject) => (
                <div key={subject.subject} className="flex items-center gap-4">
                  <div className={`w-4 h-4 ${subject.color} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {subject.subject}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {subject.hours}h
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(subject.hours / maxSubjectHours) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Performance Trends</h2>
          </div>
          
          {/* Simple line chart representation */}
          <div className="relative h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="absolute inset-4 border-l-2 border-b-2 border-gray-300 dark:border-gray-600">
              {/* Y-axis labels */}
              <div className="absolute -left-8 top-0 text-xs text-gray-500 dark:text-gray-400">100%</div>
              <div className="absolute -left-8 top-1/4 text-xs text-gray-500 dark:text-gray-400">75%</div>
              <div className="absolute -left-8 top-1/2 text-xs text-gray-500 dark:text-gray-400">50%</div>
              <div className="absolute -left-8 top-3/4 text-xs text-gray-500 dark:text-gray-400">25%</div>
              <div className="absolute -left-8 bottom-0 text-xs text-gray-500 dark:text-gray-400">0%</div>
              
              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 text-xs text-gray-500 dark:text-gray-400">Jan 9</div>
              <div className="absolute -bottom-6 left-1/4 text-xs text-gray-500 dark:text-gray-400">Jan 11</div>
              <div className="absolute -bottom-6 left-1/2 text-xs text-gray-500 dark:text-gray-400">Jan 13</div>
              <div className="absolute -bottom-6 left-3/4 text-xs text-gray-500 dark:text-gray-400">Jan 15</div>
              
              {/* Data points */}
              <div className="relative h-full">
                <div className="absolute bottom-[12%] left-[10%] w-3 h-3 bg-primary-600 rounded-full"></div>
                <div className="absolute bottom-[22%] left-[30%] w-3 h-3 bg-primary-600 rounded-full"></div>
                <div className="absolute bottom-[35%] left-[50%] w-3 h-3 bg-primary-600 rounded-full"></div>
                <div className="absolute bottom-[15%] left-[70%] w-3 h-3 bg-primary-600 rounded-full"></div>
                <div className="absolute bottom-[25%] left-[90%] w-3 h-3 bg-primary-600 rounded-full"></div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <polyline
                    points="10%,88% 30%,78% 50%,65% 70%,85% 90%,75%"
                    fill="none"
                    stroke="rgb(59 130 246)"
                    strokeWidth="2"
                    className="stroke-primary-600"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Quiz Performance Over Time
          </p>
        </div>

        {/* Recent Study Sessions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Study Sessions</h2>
          </div>
          <div className="space-y-4">
            {studySessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    {session.type === 'flashcards' && <BookOpen className="w-5 h-5 text-primary-600" />}
                    {session.type === 'quiz' && <Target className="w-5 h-5 text-primary-600" />}
                    {session.type === 'reading' && <BookOpen className="w-5 h-5 text-primary-600" />}
                    {session.type === 'focus' && <Clock className="w-5 h-5 text-primary-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {session.subject} - {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(session.date).toLocaleDateString()} • {session.duration} minutes
                    </p>
                  </div>
                </div>
                {session.score && (
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{session.score}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Study Goals Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Goals</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Study Hours Goal</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">30/40 hours</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Flashcards Reviewed</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">85/100 cards</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quiz Completion</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">6/8 quizzes</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
