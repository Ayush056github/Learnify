'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Moon,
  Sun,
  User,
  RotateCcw,
  BookOpen,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface Flashcard {
  id: string
  question: string
  answer: string
  subject: string
  topic: string
}

interface FlashcardSet {
  id: string
  title: string
  subject: string
  topic: string
  cards: Flashcard[]
  totalCards: number
}

export default function FlashcardsPage() {
  const { theme, toggleTheme } = useTheme()
  
  // Initialize with default data first
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([
    {
      id: '1',
      title: 'Steps of File Management',
      subject: 'Computer Science',
      topic: 'File Management',
      totalCards: 10,
      cards: [
        {
          id: '1',
          question: 'A user needs to organize their downloads by creating separate folders for images, documents, and videos. What file management actions would they need to perform?',
          answer: 'The user would need to: 1) Create new folders named "Images", "Documents", and "Videos" 2) Select and move image files to the Images folder 3) Select and move document files to the Documents folder 4) Select and move video files to the Videos folder',
          subject: 'Computer Science',
          topic: 'File Management'
        },
        {
          id: '2',
          question: 'What is the purpose of file compression?',
          answer: 'File compression reduces the size of files to save storage space and make them easier to transfer over networks or email.',
          subject: 'Computer Science',
          topic: 'File Management'
        },
        {
          id: '3',
          question: 'How do you create a backup of important files?',
          answer: 'To create a backup: 1) Select the files you want to backup 2) Copy them to an external storage device or cloud service 3) Verify the backup was successful 4) Store the backup in a safe location',
          subject: 'Computer Science',
          topic: 'File Management'
        }
      ]
    }
  ])
  
  const [isClient, setIsClient] = useState(false)

  const [currentSet, setCurrentSet] = useState<FlashcardSet | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [isStudying, setIsStudying] = useState(false)

  // Load from localStorage after component mounts
  useEffect(() => {
    setIsClient(true)
    const savedSets = localStorage.getItem('flashcardSets')
    if (savedSets) {
      setFlashcardSets(JSON.parse(savedSets))
    }
  }, [])

  // Save flashcard sets to localStorage whenever they change (only after client-side hydration)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets))
    }
  }, [flashcardSets, isClient])

  const startStudying = (set: FlashcardSet) => {
    setCurrentSet(set)
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
    setIsStudying(true)
  }

  const resetStudySession = () => {
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
  }

  const markAsCorrect = () => {
    setCorrectAnswers(prev => prev + 1)
    nextCard()
  }

  const markAsIncorrect = () => {
    setIncorrectAnswers(prev => prev + 1)
    nextCard()
  }

  const nextCard = () => {
    if (currentSet && currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      // Study session complete
      alert(`Study session complete!\n\nResults:\n- Correct: ${correctAnswers + 1}\n- Incorrect: ${incorrectAnswers}\n- Accuracy: ${Math.round(((correctAnswers + 1) / (correctAnswers + incorrectAnswers + 1)) * 100)}%`)
      setIsStudying(false)
      setCurrentSet(null)
    }
  }

  const getProgressPercentage = () => {
    if (!currentSet) return 0
    return Math.round(((currentCardIndex + 1) / currentSet.cards.length) * 100)
  }

  const getAccuracyPercentage = () => {
    const total = correctAnswers + incorrectAnswers
    if (total === 0) return 0
    return Math.round((correctAnswers / total) * 100)
  }

  if (isStudying && currentSet) {
    const currentCard = currentSet.cards[currentCardIndex]
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Top Navigation Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsStudying(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Back to Flashcards"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Study Flashcards</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={resetStudySession}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="Reset Session"
              >
                <RotateCcw className="w-5 h-5" />
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

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Study Flashcards
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentSet.title} • {currentSet.subject}
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Progress</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Card {currentCardIndex + 1} of {currentSet.cards.length}
            </p>
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>{getProgressPercentage()}% complete</span>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {correctAnswers} Correct
              </span>
              <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                {incorrectAnswers} Incorrect
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {getAccuracyPercentage()}% Accuracy
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Question</h2>
            <p className="text-xl text-gray-900 dark:text-gray-100 mb-8 leading-relaxed">
              {currentCard.question}
            </p>
            
            {showAnswer && (
              <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Answer</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentCard.answer}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-gray-900 dark:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Show Answer
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={markAsIncorrect}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Incorrect
                  </button>
                  <button
                    onClick={markAsCorrect}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Correct
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <h1 className="text-sm font-bold text-gray-700 dark:text-gray-300">Flashcards</h1>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Study Flashcards
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and study flashcards to improve your memory.
            </p>
          </div>
        </div>

        {/* Flashcard Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSets.map((set) => (
            <div
              key={set.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">
                <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {set.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  {set.subject}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {set.totalCards} cards
                </p>
              </div>

              <button
                onClick={() => startStudying(set)}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Start Studying
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {flashcardSets.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No flashcard sets yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first flashcard set to start studying.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
