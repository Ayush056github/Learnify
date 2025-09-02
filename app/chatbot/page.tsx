'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  Send,
  Bot,
  MessageCircle,
  Trash2,
  Download,
  Copy,
  Check
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatbotPage() {
  const { theme, toggleTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    setIsClient(true)
    const savedMessages = localStorage.getItem('chatbotMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages, (key, value) => {
        if (key === 'timestamp') return new Date(value)
        return value
      }))
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: "Hello! I'm your AI Study Assistant. I can help you with:\n\n• Explaining complex concepts\n• Creating study plans\n• Answering questions about your materials\n• Providing study tips and techniques\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save messages to localStorage
  useEffect(() => {
    if (isClient && messages.length > 0) {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages))
    }
  }, [messages, isClient])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Study-related responses
    if (lowerMessage.includes('study plan') || lowerMessage.includes('schedule')) {
      return "I'd be happy to help you create a study plan! Here are some key principles:\n\n• **Spaced Repetition**: Review material at increasing intervals\n• **Active Recall**: Test yourself instead of just re-reading\n• **Pomodoro Technique**: 25-minute focused study sessions\n• **Mix Subjects**: Alternate between different topics\n\nWhat subject or topic would you like to focus on?"
    }
    
    if (lowerMessage.includes('flashcard') || lowerMessage.includes('memorize')) {
      return "Flashcards are excellent for memorization! Here are some tips:\n\n• **Keep it simple**: One concept per card\n• **Use images**: Visual memory is powerful\n• **Review regularly**: Daily practice is key\n• **Test both directions**: Question to answer and vice versa\n\nYou can create flashcards in the Flashcards section of this app!"
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('procrastination')) {
      return "Staying motivated can be challenging! Try these strategies:\n\n• **Set small goals**: Break large tasks into manageable chunks\n• **Reward yourself**: Celebrate small wins\n• **Study with others**: Join study groups or find study partners\n• **Track progress**: Use the analytics feature to see your improvement\n• **Change environment**: Sometimes a new location helps\n\nRemember, consistency beats perfection!"
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
      return "Preparing for exams? Here's a proven strategy:\n\n**2 weeks before:**\n• Create a study schedule\n• Gather all materials\n• Start active recall practice\n\n**1 week before:**\n• Increase practice frequency\n• Focus on weak areas\n• Get enough sleep\n\n**Day before:**\n• Light review only\n• Prepare materials for exam day\n• Relax and rest well\n\nWhat specific subject are you preparing for?"
    }
    
    if (lowerMessage.includes('note') || lowerMessage.includes('taking notes')) {
      return "Effective note-taking is crucial! Try these methods:\n\n• **Cornell Method**: Divide page into notes, cues, and summary\n• **Mind Maps**: Visual representation of information\n• **Outline Method**: Hierarchical structure with main points and details\n• **Charting Method**: Tables for comparing information\n\nThe key is to be active while taking notes - don't just copy, process and summarize!"
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! Could you provide more details so I can give you a more specific answer?",
      "I'd be happy to help! Can you tell me more about what you're studying or what specific area you need assistance with?",
      "Great question! To provide the best guidance, could you share more context about your current study situation?",
      "I'm here to help with your studies! What particular challenge or topic would you like to explore together?",
      "Thanks for reaching out! Let me know what subject or study technique you'd like to discuss, and I'll provide tailored advice."
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(inputMessage.trim()),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // 1-3 seconds delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    if (confirm('Are you sure you want to clear all messages? This action cannot be undone.')) {
      setMessages([])
      localStorage.removeItem('chatbotMessages')
    }
  }

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">AI Study Assistant</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportChat}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Export Chat"
              title="Export Chat"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={clearChat}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Clear Chat"
              title="Clear Chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
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

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary-600 ml-3' 
                    : 'bg-gray-600 dark:bg-gray-700 mr-3'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={`text-xs ${
                      message.sender === 'user' 
                        ? 'text-primary-200' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {message.sender === 'bot' && (
                      <button
                        onClick={() => copyMessage(message.content, message.id)}
                        className="ml-2 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about studying..."
                disabled={isTyping}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • This is a simulated AI assistant for demonstration
          </p>
        </div>
      </div>
    </div>
  )
}
