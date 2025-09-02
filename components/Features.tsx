'use client'

import { Upload, MessageSquare, Brain, FileText, Search, Zap } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Smart Document Upload',
    description: 'Upload any document format - PDFs, images, Word docs. Our AI automatically processes and extracts text with advanced OCR technology.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Get intelligent insights, summaries, and key points extracted from your study materials automatically.'
  },
  {
    icon: MessageSquare,
    title: 'Chat with Documents',
    description: 'Ask questions about your study materials and get instant, accurate answers powered by AI understanding.'
  },
  {
    icon: FileText,
    title: 'Smart Note Organization',
    description: 'Automatically categorize, tag, and organize your notes for easy retrieval and study planning.'
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find specific information across all your documents instantly with semantic search capabilities.'
  },
  {
    icon: Zap,
    title: 'Study Recommendations',
    description: 'Get personalized study suggestions and practice questions based on your learning progress.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Powerful Features for{' '}
            <span className="gradient-text">Effective Learning</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to transform your study experience and make learning more efficient than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-primary-500 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
