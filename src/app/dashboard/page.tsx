'use client'

import { useState } from 'react'
import { InputForm } from '@/components/dashboard/InputForm'
import { ResponseCard } from '@/components/dashboard/ResponseCard'
import { Card, CardContent } from '@/components/ui/Card'
import { ParsedResponse } from '@/lib/types'

export default function Dashboard() {
  const [response, setResponse] = useState<ParsedResponse | null>(null)
  const [imageUrls, setImageUrls] = useState<(string | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateResponse = async (scenario: string) => {
    setIsLoading(true)
    setError(null)
    setResponse(null)
    setImageUrls([])

    try {
      // Generate text responses
      const textResponse = await fetch('/api/generate-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario }),
      })

      if (!textResponse.ok) {
        throw new Error('Failed to generate responses')
      }

      const textData = await textResponse.json()
      setResponse(textData.data)
      setIsLoading(false)

      // Generate images in parallel
      setIsImageLoading(true)
      const imageResponse = await fetch('/api/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompts: textData.data.imagePrompts }),
      })

      if (imageResponse.ok) {
        const imageData = await imageResponse.json()
        setImageUrls(imageData.data.imageUrls)
      }
      setIsImageLoading(false)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
      setIsImageLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            No Machine
          </h1>
          <p className="text-lg text-gray-600">
            Reformed Doormat&apos;s Boundary Coach
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-8">
          <InputForm onSubmit={handleGenerateResponse} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-800">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Response Section */}
        {response && (
          <div className="space-y-8">
            {/* Quick Take */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Quick Take
                </h2>
                <p className="text-gray-700">{response.quickTake}</p>
              </CardContent>
            </Card>

            {/* Boundary Options */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Your 3 Boundary Options
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <ResponseCard
                  boundary={response.boundaries.soft}
                  imageUrl={imageUrls[0]}
                  isImageLoading={isImageLoading}
                />
                <ResponseCard
                  boundary={response.boundaries.clear}
                  imageUrl={imageUrls[1]}
                  isImageLoading={isImageLoading}
                />
                <ResponseCard
                  boundary={response.boundaries.wall}
                  imageUrl={imageUrls[2]}
                  isImageLoading={isImageLoading}
                />
              </div>
            </div>

            {/* Reformed Doormat Note */}
            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-indigo-800 mb-3">
                  Reformed Doormat Note
                </h2>
                <p className="text-indigo-700">{response.reformedDoormatNote}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}