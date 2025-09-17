import { ParsedResponse, BoundaryOption } from '../types'

export function parseAnthropicResponse(responseText: string): ParsedResponse {
  // This function parses the structured response from Anthropic

  // Extract sections using regex patterns
  const quickTakeMatch = responseText.match(/## Quick Take\s*\n(.*?)(?=\n## )/s)
  const quickTake = quickTakeMatch?.[1]?.trim() || ''

  // Extract boundary options
  const boundariesSection = responseText.match(/## Your 3 Boundary Options(.*?)(?=Visual Mood Lighteners|Reformed Doormat Note|$)/s)?.[1] || ''

  // Parse Soft No
  const softMatch = boundariesSection.match(/### The Soft No \(Relationship Preserving\)(.*?)(?=### The Clear No|$)/s)?.[1]
  const soft = parseBoundaryOption(softMatch || '', 'soft', 'The Soft No (Relationship Preserving)')

  // Parse Clear No
  const clearMatch = boundariesSection.match(/### The Clear No \(Professional & Direct\)(.*?)(?=### The Wall|$)/s)?.[1]
  const clear = parseBoundaryOption(clearMatch || '', 'clear', 'The Clear No (Professional & Direct)')

  // Parse Wall
  const wallMatch = boundariesSection.match(/### The Wall \(Non-Negotiable\)(.*?)(?=Visual Mood Lighteners|$)/s)?.[1]
  const wall = parseBoundaryOption(wallMatch || '', 'wall', 'The Wall (Non-Negotiable)')

  // Extract image prompts
  const imagePrompts = extractImagePrompts(responseText)

  // Extract reformed doormat note
  const doormatNoteMatch = responseText.match(/Reformed Doormat Note\s*\n(.*?)$/s)
  const reformedDoormatNote = doormatNoteMatch?.[1]?.trim() || ''

  return {
    quickTake,
    boundaries: {
      soft,
      clear,
      wall,
    },
    imagePrompts,
    reformedDoormatNote,
  }
}

function parseBoundaryOption(text: string, type: 'soft' | 'clear' | 'wall', title: string): BoundaryOption {
  const useWhenMatch = text.match(/\*\*Use when:\*\*\s*(.*?)(?=\n\*\*Script:\*\*)/s)
  const scriptMatch = text.match(/\*\*Script:\*\*\s*"(.*?)"(?=\n\*\*Why it works:\*\*)/s)
  const whyItWorksMatch = text.match(/\*\*Why it works:\*\*\s*(.*?)$/s)

  return {
    type,
    title,
    useWhen: useWhenMatch?.[1]?.trim() || '',
    script: scriptMatch?.[1]?.trim() || '',
    whyItWorks: whyItWorksMatch?.[1]?.trim() || '',
  }
}

function extractImagePrompts(text: string): [string, string, string] {
  const imageSection = text.match(/Visual Mood Lighteners(.*?)(?=Reformed Doormat Note|$)/s)?.[1] || ''

  const prompt1Match = imageSection.match(/### IMAGE_PROMPT_1\s*\n(.*?)(?=### IMAGE_PROMPT_2|$)/s)
  const prompt2Match = imageSection.match(/### IMAGE_PROMPT_2\s*\n(.*?)(?=### IMAGE_PROMPT_3|$)/s)
  const prompt3Match = imageSection.match(/### IMAGE_PROMPT_3\s*\n(.*?)$/s)

  return [
    prompt1Match?.[1]?.trim() || '',
    prompt2Match?.[1]?.trim() || '',
    prompt3Match?.[1]?.trim() || '',
  ]
}