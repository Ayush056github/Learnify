'use client'

import { Check, Clock } from 'lucide-react'

const plans = [
  {
    name: 'Free Forever',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI-powered studying',
    features: [
      'Up to 10 documents per month',
      'Basic OCR text extraction',
      'AI chat with documents (50 queries/month)',
      'Basic note organization',
      'Standard support'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Student Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Ideal for active students who need more power',
    features: [
      'Unlimited documents',
      'Advanced OCR with image support',
      'Unlimited AI chat queries',
      'Advanced note organization',
      'Priority support',
      'Study analytics dashboard',
      'Export notes to multiple formats'
    ],
    popular: true,
    cta: 'Start Pro Trial'
  },
  {
    name: 'Academic Plus',
    price: '$19.99',
    period: 'per month',
    description: 'For researchers and academic professionals',
    features: [
      'Everything in Student Pro',
      'Team collaboration features',
      'Advanced research tools',
      'Citation management',
      'Integration with academic databases',
      'Custom AI training',
      'Dedicated account manager'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Simple,{' '}
              <span className="gradient-text">Transparent Pricing</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your study needs. Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 p-8 transition-all duration-200 ${
                plan.popular 
                  ? 'border-primary-500 dark:border-primary-400 shadow-lg scale-105' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {plan.name === 'Free Forever' ? (
                <a href="/signup" className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 inline-block text-center ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}>
                  {plan.cta}
                </a>
              ) : (
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}>
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Need a custom plan? <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  )
}
