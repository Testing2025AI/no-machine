'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface InputFormProps {
  onSubmit: (scenario: string) => void
  isLoading?: boolean
}

export function InputForm({ onSubmit, isLoading = false }: InputFormProps) {
  const [scenario, setScenario] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (scenario.trim()) {
      onSubmit(scenario.trim())
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          What boundary do you need help setting?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Describe your situation... (e.g., 'My boss keeps calling me on weekends' or 'My friend always asks me to cover their shifts')"
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {scenario.length}/500
            </div>
          </div>

          <Button
            type="submit"
            disabled={!scenario.trim() || isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Your Boundaries...
              </div>
            ) : (
              'Generate My Boundaries'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}