'use client'

import { Sparkles, Mail, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-400" />
              <h3 className="text-2xl font-bold">Learnify</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your study experience with AI-powered tools. Upload documents, extract insights, and chat with your study materials like never before.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Integrations</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Studeezy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
