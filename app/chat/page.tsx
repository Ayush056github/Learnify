'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  Send,
  Bot,
  MessageSquare,
  Trash2,
  Copy,
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
}

export default function ChatbotPage() {
  const { theme, toggleTheme } = useTheme()
  
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ✅ Load chat sessions from localStorage and convert strings back to Date
  useEffect(() => {
    setIsClient(true)
    const savedSessions = localStorage.getItem('chatSessions')
    if (savedSessions) {
      const sessions: ChatSession[] = JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        messages: s.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }))
      setChatSessions(sessions)
      if (sessions.length > 0) {
        setCurrentSession(sessions[0])
      }
    }
  }, [])

  // ✅ Save chat sessions to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions))
    }
  }, [chatSessions, isClient])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date()
    }
    setChatSessions(prev => [newSession, ...prev])
    setCurrentSession(newSession)
  }

  const deleteSession = (sessionId: string) => {
    setChatSessions(prevSessions => {
      const updatedSessions = prevSessions.filter(session => session.id !== sessionId);
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(updatedSessions.length > 0 ? updatedSessions[0] : null);
      }
      return updatedSessions;
    });
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    let sessionToUpdate = currentSession
    
    if (!sessionToUpdate) {
      sessionToUpdate = {
        id: Date.now().toString(),
        title: currentMessage.slice(0, 30) + (currentMessage.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date()
      }
      setChatSessions(prev => [sessionToUpdate!, ...prev])
      setCurrentSession(sessionToUpdate)
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    const updatedSession = {
      ...sessionToUpdate,
      messages: [...sessionToUpdate.messages, userMessage],
      title: sessionToUpdate.messages.length === 0 ? 
        currentMessage.slice(0, 30) + (currentMessage.length > 30 ? '...' : '') : 
        sessionToUpdate.title
    }

    setChatSessions(prev => 
      prev.map(session => 
        session.id === sessionToUpdate!.id ? updatedSession : session
      )
    )
    setCurrentSession(updatedSession)
    setCurrentMessage('')
    setIsLoading(true)

    try {
      const response = await callGeminiAPI(currentMessage)
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      }

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage]
      }

      setChatSessions(prev => 
        prev.map(session => 
          session.id === sessionToUpdate!.id ? finalSession : session
        )
      )
      setCurrentSession(finalSession)
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error connecting to the AI service. Please try again.',
        timestamp: new Date()
      }

      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage]
      }

      setChatSessions(prev => 
        prev.map(session => 
          session.id === sessionToUpdate!.id ? errorSession : session
        )
      )
      setCurrentSession(errorSession)
    } finally {
      setIsLoading(false)
    }
  }

  const callGeminiAPI = async (message: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    const responses = [
      `I'm here to help you with your studies! Based on your question about "${message.slice(0, 20)}...", I can provide detailed explanations and help you understand complex concepts.`,
      `Great question! Let me break this down for you. This topic relates to several key concepts that I can explain in detail.`,
      `I understand you're asking about this topic. Here's what I can tell you: This is an important concept in your studies, and I can help you explore it further.`,
      `That's an excellent question for learning! Let me provide you with a comprehensive answer that will help you understand this better.`,
      `I can definitely help you with that! This is a fundamental concept that connects to many other topics in your studies.`
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearAllChats = () => {
    if (confirm('Are you sure you want to delete all chat sessions? This action cannot be undone.')) {
      setChatSessions([])
      setCurrentSession(null)
      localStorage.removeItem('chatSessions')
    }
  }

  return (
    <div className="flex h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar for Chat Sessions */}
      <aside className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="text-primary-600" />
            <h1 className="text-lg font-bold">My Chats</h1>
          </div>
          <button
            onClick={createNewSession}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setCurrentSession(session)}
              className={`group flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
                currentSession?.id === session.id
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex-1 truncate pr-2">
                <p className="font-semibold text-sm">{session.title}</p>
                <p className={`text-xs truncate ${currentSession?.id === session.id ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'}`}>
                  {session.messages.length > 0 ? session.messages[session.messages.length - 1].content : 'No messages yet'}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className={`p-1 rounded-md transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 ${
                  currentSession?.id === session.id
                    ? 'text-primary-200 hover:bg-primary-700'
                    : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Delete Session"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={clearAllChats}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={16} />
            <span className="font-medium text-sm">Clear All Chats</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        {currentSession ? (
          <>
            <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">{currentSession.title}</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Toggle Theme"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {currentSession.messages.map((message) => (
                <div key={message.id} className={`flex items-start gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Bot size={20} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-2xl p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white rounded-br-lg'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-lg'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    <div className="flex justify-end items-center mt-2 space-x-2">
                      <span className={`text-xs ${message.type === 'user' ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.type === 'ai' && (
                        <button
                          onClick={() => copyMessage(message.content)}
                          className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="Copy message"
                        >
                          <Copy size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0 p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <Bot size={64} className="text-gray-300 dark:text-gray-600" />
            <h2 className="mt-6 text-2xl font-bold">AI Chat</h2>
            <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
              Your intelligent study partner. Select a chat from the sidebar or start a new conversation.
            </p>
            <button
              onClick={createNewSession}
              className="mt-8 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start New Chat
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
