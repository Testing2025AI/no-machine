import * as fal from '@fal-ai/serverless-client'

// Configure the FAL client
fal.config({
  credentials: process.env.FAL_KEY,
})

export interface ImageGenerationResult {
  images: {
    url: string
    width: number
    height: number
    content_type: string
  }[]
}

export async function generateImage(prompt: string): Promise<string | null> {
  try {
    const result = await fal.run('fal-ai/flux-realism', {
      input: {
        prompt,
        image_size: 'square_hd', // 1024x1024
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
      },
    }) as ImageGenerationResult

    return result.images[0]?.url || null
  } catch (error) {
    console.error('Error generating image:', error)
    return null
  }
}

export async function generateImages(prompts: string[]): Promise<(string | null)[]> {
  try {
    // Generate images in parallel
    const imagePromises = prompts.map(prompt => generateImage(prompt))
    return await Promise.all(imagePromises)
  } catch (error) {
    console.error('Error generating multiple images:', error)
    return prompts.map(() => null)
  }
}