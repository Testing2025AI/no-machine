import { NextRequest, NextResponse } from 'next/server'
import { generateImages } from '@/lib/fal'

export async function POST(request: NextRequest) {
  try {
    const { prompts } = await request.json()

    if (!prompts || !Array.isArray(prompts) || prompts.length !== 3) {
      return NextResponse.json(
        { error: 'Three image prompts are required' },
        { status: 400 }
      )
    }

    // Generate images using FAL.ai
    const imageUrls = await generateImages(prompts)

    return NextResponse.json({
      success: true,
      data: {
        imageUrls
      }
    })

  } catch (error) {
    console.error('Error in generate-images:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}