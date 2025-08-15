'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import { formatTime } from '@/lib/utils'

interface ExamTimerProps {
  duration: number // in minutes
  onTimeUp: () => void
  isPaused?: boolean
}

export default function ExamTimer({ duration, onTimeUp, isPaused = false }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // convert to seconds
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        
        // Show warning when 5 minutes left
        if (prev <= 300 && !isWarning) {
          setIsWarning(true)
        }
        
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, onTimeUp, isWarning])

  const percentage = (timeLeft / (duration * 60)) * 100

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
      isWarning ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
    }`}>
      {isWarning ? (
        <AlertTriangle className="h-5 w-5 text-red-600" />
      ) : (
        <Clock className="h-5 w-5 text-blue-600" />
      )}
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-medium ${
            isWarning ? 'text-red-900' : 'text-blue-900'
          }`}>
            Thời gian còn lại
          </span>
          <span className={`text-lg font-bold ${
            isWarning ? 'text-red-700' : 'text-blue-700'
          }`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              isWarning ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
