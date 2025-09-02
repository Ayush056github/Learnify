'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Medical Student',
    university: 'Stanford University',
    content: 'Studeezy has completely transformed how I study. The AI helps me understand complex medical texts in minutes, and I can ask questions about any topic instantly.',
    rating: 5,
    avatar: 'SC'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Law Student',
    university: 'Harvard Law',
    content: 'The document organization feature is incredible. I can find any case reference in seconds, and the AI summaries help me grasp key points quickly.',
    rating: 5,
    avatar: 'MR'
  },
  {
    name: 'Emily Watson',
    role: 'Engineering Student',
    university: 'MIT',
    content: 'As an engineering student, I deal with complex formulas and diagrams. Studeezy\'s OCR and AI analysis make studying technical documents so much easier.',
    rating: 5,
    avatar: 'EW'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Loved by{' '}
            <span className="gradient-text">10,000+ Students</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how students across the world are transforming their study experience with Studeezy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative transition-colors duration-200"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-200 dark:text-primary-300">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-primary-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">{testimonial.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
