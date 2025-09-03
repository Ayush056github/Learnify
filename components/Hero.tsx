'use client'

import { Sparkles, Check, ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* AI-Powered Study Revolution Pill */}
        <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Study Revolution
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Supercharge Your Learning{' '}
          <span className="gradient-text">with Artificial Intelligence</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload your documents, extract text with OCR, chat with your study materials, and organize notes like never before. Let AI be your personal study assistant.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="/signup" className="btn-primary flex items-center gap-2">
            Start Learning Now
            <ArrowRight className="w-5 h-5" />
          </a>
          <button className="btn-secondary flex items-center gap-2">
            <Play className="w-5 h-5" />
            <a href='https://youtu.be/Dmkqf-9ekms'>Watch Demo</a>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            No Credit Card Required
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            Free Forever Plan
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            10,000+ Students
          </div>
        </div>
      </div>
    </section>
  )
}
