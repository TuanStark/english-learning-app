import { Progress } from '@/components/ui/progress'
import { CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface ExamProgressProps {
  currentQuestion: number
  totalQuestions: number
  answers: Record<string, string>
  questions: Array<{ id: string }>
}

export default function ExamProgress({ 
  currentQuestion, 
  totalQuestions, 
  answers, 
  questions 
}: ExamProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100
  const answeredCount = Object.keys(answers).length

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = questions[questionIndex]?.id
    const isAnswered = questionId && answers[questionId]
    const isCurrent = questionIndex === currentQuestion - 1

    if (isCurrent) return 'current'
    if (isAnswered) return 'answered'
    return 'unanswered'
  }

  // Icon mapping for different question states
  // const getQuestionIcon = (status: string) => {
  //   switch (status) {
  //     case 'answered':
  //       return <CheckCircle className="h-4 w-4 text-green-600" />
  //     case 'current':
  //       return <AlertCircle className="h-4 w-4 text-blue-600" />
  //     default:
  //       return <Circle className="h-4 w-4 text-gray-400" />
  //   }
  // }

  const getQuestionClasses = (status: string) => {
    const baseClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-200'
    
    switch (status) {
      case 'answered':
        return `${baseClasses} border-green-500 bg-green-50 text-green-700`
      case 'current':
        return `${baseClasses} border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200`
      default:
        return `${baseClasses} border-gray-300 bg-white text-gray-500 hover:bg-gray-50`
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Tiến độ làm bài</h3>
          <span className="text-sm text-gray-600">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Answer Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">{currentQuestion}</div>
          <div className="text-xs text-blue-600">Câu hiện tại</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
          <div className="text-xs text-green-600">Đã trả lời</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-gray-600">{totalQuestions - answeredCount}</div>
          <div className="text-xs text-gray-600">Chưa trả lời</div>
        </div>
      </div>

      {/* Question Navigator */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Navigator câu hỏi</h4>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const status = getQuestionStatus(index)
            return (
              <button
                key={index}
                className={getQuestionClasses(status)}
                title={`Câu ${index + 1} - ${
                  status === 'answered' ? 'Đã trả lời' : 
                  status === 'current' ? 'Hiện tại' : 'Chưa trả lời'
                }`}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>Đã trả lời</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-3 w-3 text-blue-600" />
            <span>Hiện tại</span>
          </div>
          <div className="flex items-center space-x-1">
            <Circle className="h-3 w-3 text-gray-400" />
            <span>Chưa trả lời</span>
          </div>
        </div>
      </div>
    </div>
  )
}
