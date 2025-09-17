import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ParsedResponse } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { scenario, response, imageUrls } = await request.json() as {
      scenario: string
      response: ParsedResponse
      imageUrls: (string | null)[]
    }

    const supabase = await createClient()

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Insert the response into the database
    const { data, error } = await supabase
      .from('responses')
      .insert({
        user_id: user.id,
        scenario,
        quick_take: response.quickTake,

        // Soft boundary
        soft_use_when: response.boundaries.soft.useWhen,
        soft_script: response.boundaries.soft.script,
        soft_why_works: response.boundaries.soft.whyItWorks,

        // Clear boundary
        clear_use_when: response.boundaries.clear.useWhen,
        clear_script: response.boundaries.clear.script,
        clear_why_works: response.boundaries.clear.whyItWorks,

        // Wall boundary
        wall_use_when: response.boundaries.wall.useWhen,
        wall_script: response.boundaries.wall.script,
        wall_why_works: response.boundaries.wall.whyItWorks,

        // Image data
        image_prompt_1: response.imagePrompts[0],
        image_prompt_2: response.imagePrompts[1],
        image_prompt_3: response.imagePrompts[2],
        image_url_1: imageUrls[0],
        image_url_2: imageUrls[1],
        image_url_3: imageUrls[2],

        reformed_doormat_note: response.reformedDoormatNote,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving response:', error)
      return NextResponse.json(
        { error: 'Failed to save response' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { id: data.id }
    })

  } catch (error) {
    console.error('Error in save-response:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}