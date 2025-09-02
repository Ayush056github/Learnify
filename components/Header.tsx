'use client'

import { Sparkles, Clock } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary-800 dark:text-primary-400">Learnify</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center gap-2">
              Pricing
              <Clock className="w-4 h-4" />
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a href="/signin" className="px-4 py-2 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors duration-200">
              Sign In
            </a>
            <a href="/signup" className="btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
