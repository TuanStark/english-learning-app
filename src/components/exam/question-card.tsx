'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, BookOpen } from 'lucide-react'
import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  showExplanation?: boolean
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false
}: QuestionCardProps) {
  const [playingAudio, setPlayingAudio] = useState(false)

  const playAudio = () => {
    if (question.audioUrl) {
      setPlayingAudio(true)
      // In a real app, you would implement audio playing logic here
      setTimeout(() => setPlayingAudio(false), 2000) // Mock audio duration
    }
  }

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index) // A, B, C, D
  }

  const getAnswerStatus = (option: string) => {
    if (!showExplanation) return 'default'
    if (option === question.correctAnswer) return 'correct'
    if (option === selectedAnswer && option !== question.correctAnswer) return 'wrong'
    return 'default'
  }

  const getAnswerClasses = (option: string) => {
    const status = getAnswerStatus(option)
    const baseClasses = 'w-full p-4 text-left border rounded-lg transition-all duration-200 hover:bg-gray-50'
    
    if (status === 'correct') {
      return `${baseClasses} border-green-500 bg-green-50 text-green-900`
    }
    if (status === 'wrong') {
      return `${baseClasses} border-red-500 bg-red-50 text-red-900`
    }
    if (selectedAnswer === option && !showExplanation) {
      return `${baseClasses} border-blue-500 bg-blue-50 text-blue-900`
    }
    
    return `${baseClasses} border-gray-300 hover:border-gray-400`
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Câu {questionNumber} / {totalQuestions}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {question.type === 'multiple-choice' ? 'Trắc nghiệm' : 
               question.type === 'fill-blank' ? 'Điền từ' : 'Nghe'}
            </Badge>
            {question.audioUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={playAudio}
                disabled={playingAudio}
                className="flex items-center space-x-1"
              >
                <Volume2 className="h-4 w-4" />
                <span>{playingAudio ? 'Đang phát...' : 'Nghe'}</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Content */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Câu hỏi:</h3>
          <p className="text-gray-800 leading-relaxed">
            {question.content}
          </p>
        </div>

        {/* Answer Options */}
        {question.options && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Chọn đáp án:</h4>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={getAnswerClasses(option)}
                  onClick={() => !showExplanation && onAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${getAnswerStatus(option) === 'correct' ? 'border-green-500 bg-green-500 text-white' :
                        getAnswerStatus(option) === 'wrong' ? 'border-red-500 bg-red-500 text-white' :
                        selectedAnswer === option ? 'border-blue-500 bg-blue-500 text-white' :
                        'border-gray-400 text-gray-600'
                      }
                    `}>
                      {getOptionLabel(index)}
                    </div>
                    <span className="flex-1 text-left">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fill in the blank type */}
        {question.type === 'fill-blank' && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Nhập đáp án:</h4>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập câu trả lời của bạn..."
              value={selectedAnswer || ''}
              onChange={(e) => onAnswerSelect(e.target.value)}
              disabled={showExplanation}
            />
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Giải thích:</h4>
                <p className="text-blue-800 leading-relaxed">
                  {question.explanation}
                </p>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <span className="text-sm font-medium text-blue-900">
                    Đáp án đúng: {question.correctAnswer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
