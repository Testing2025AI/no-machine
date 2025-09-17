'use client'

import { useState } from 'react'
// import Image from 'next/image' - using regular img tag to avoid optimization issues
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BoundaryOption } from '@/lib/types'

interface ResponseCardProps {
  boundary: BoundaryOption
  imageUrl?: string | null
  isImageLoading?: boolean
}

export function ResponseCard({ boundary, imageUrl, isImageLoading = false }: ResponseCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(boundary.script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getCardColor = () => {
    switch (boundary.type) {
      case 'soft':
        return 'border-green-200 bg-green-50'
      case 'clear':
        return 'border-yellow-200 bg-yellow-50'
      case 'wall':
        return 'border-red-200 bg-red-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getHeaderColor = () => {
    switch (boundary.type) {
      case 'soft':
        return 'text-green-800 bg-green-100'
      case 'clear':
        return 'text-yellow-800 bg-yellow-100'
      case 'wall':
        return 'text-red-800 bg-red-100'
      default:
        return 'text-gray-800 bg-gray-100'
    }
  }

  return (
    <Card className={`h-full ${getCardColor()}`}>
      <CardHeader className={`rounded-t-lg ${getHeaderColor()}`}>
        <CardTitle className="text-lg">{boundary.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Image */}
        <div className="aspect-square bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {isImageLoading ? (
            <div className="flex flex-col items-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mb-2"></div>
              <span className="text-sm">Generating humor...</span>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Humorous boundary illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <span className="text-4xl mb-2 block">🎨</span>
              <span className="text-sm">Visual mood lightener coming soon!</span>
            </div>
          )}
        </div>

        {/* Use When */}
        <div>
          <h4 className="font-semibold text-black mb-1">Use when:</h4>
          <p className="text-sm text-gray-600">{boundary.useWhen}</p>
        </div>

        {/* Script */}
        <div>
          <h4 className="font-semibold text-black mb-1">Script:</h4>
          <div className="bg-white p-3 rounded border text-sm italic">
            &ldquo;{boundary.script}&rdquo;
          </div>
        </div>

        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full"
        >
          {copied ? '✓ Copied!' : 'Copy Script'}
        </Button>

        {/* Why It Works */}
        <div>
          <h4 className="font-semibold text-black mb-1">Why it works:</h4>
          <p className="text-sm text-gray-600">{boundary.whyItWorks}</p>
        </div>
      </CardContent>
    </Card>
  )
}