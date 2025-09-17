import { NextRequest, NextResponse } from 'next/server'
import { generateBoundaryResponse } from '@/lib/anthropic'
import { parseAnthropicResponse } from '@/lib/utils/response-parser'

export async function POST(request: NextRequest) {
  try {
    const { scenario } = await request.json()

    if (!scenario || scenario.trim().length === 0) {
      return NextResponse.json(
        { error: 'Scenario is required' },
        { status: 400 }
      )
    }

    // Generate response using Anthropic
    const rawResponse = await generateBoundaryResponse(scenario)

    if (!rawResponse) {
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: 500 }
      )
    }

    // Parse the structured response
    const parsedResponse = parseAnthropicResponse(rawResponse)

    return NextResponse.json({
      success: true,
      data: parsedResponse
    })

  } catch (error) {
    console.error('Error in generate-responses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}