import { ParsedResponse, BoundaryOption } from '../types'

export function parseAnthropicResponse(responseText: string): ParsedResponse {
  // This function parses the structured response from Anthropic

  // Extract sections using regex patterns (using [\s\S] instead of . with s flag)
  const quickTakeMatch = responseText.match(/## Quick Take\s*\n([\s\S]*?)(?=\n## )/)
  const quickTake = quickTakeMatch?.[1]?.trim() || ''

  // Extract boundary options
  const boundariesSection = responseText.match(/## Your 3 Boundary Options([\s\S]*?)(?=Visual Mood Lighteners|Reformed Doormat Note|$)/)?.[1] || ''

  // Parse Soft No
  const softMatch = boundariesSection.match(/### The Soft No \(Relationship Preserving\)([\s\S]*?)(?=### The Clear No|$)/)?.[1]
  const soft = parseBoundaryOption(softMatch || '', 'soft', 'The Soft No (Relationship Preserving)')

  // Parse Clear No
  const clearMatch = boundariesSection.match(/### The Clear No \(Professional & Direct\)([\s\S]*?)(?=### The Wall|$)/)?.[1]
  const clear = parseBoundaryOption(clearMatch || '', 'clear', 'The Clear No (Professional & Direct)')

  // Parse Wall
  const wallMatch = boundariesSection.match(/### The Wall \(Non-Negotiable\)([\s\S]*?)(?=Visual Mood Lighteners|$)/)?.[1]
  const wall = parseBoundaryOption(wallMatch || '', 'wall', 'The Wall (Non-Negotiable)')

  // Extract image prompts
  const imagePrompts = extractImagePrompts(responseText)

  // Extract reformed doormat note
  const doormatNoteMatch = responseText.match(/Reformed Doormat Note\s*\n([\s\S]*)$/)
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
  const useWhenMatch = text.match(/\*\*Use when:\*\*\s*([\s\S]*?)(?=\n\*\*Script:\*\*)/)
  const scriptMatch = text.match(/\*\*Script:\*\*\s*"([\s\S]*?)"(?=\n\*\*Why it works:\*\*)/)
  const whyItWorksMatch = text.match(/\*\*Why it works:\*\*\s*([\s\S]*)$/)

  return {
    type,
    title,
    useWhen: useWhenMatch?.[1]?.trim() || '',
    script: scriptMatch?.[1]?.trim() || '',
    whyItWorks: whyItWorksMatch?.[1]?.trim() || '',
  }
}

function extractImagePrompts(text: string): [string, string, string] {
  const imageSection = text.match(/Visual Mood Lighteners([\s\S]*?)(?=Reformed Doormat Note|$)/)?.[1] || ''

  const prompt1Match = imageSection.match(/### IMAGE_PROMPT_1\s*\n([\s\S]*?)(?=### IMAGE_PROMPT_2|$)/)
  const prompt2Match = imageSection.match(/### IMAGE_PROMPT_2\s*\n([\s\S]*?)(?=### IMAGE_PROMPT_3|$)/)
  const prompt3Match = imageSection.match(/### IMAGE_PROMPT_3\s*\n([\s\S]*)$/)

  return [
    prompt1Match?.[1]?.trim() || '',
    prompt2Match?.[1]?.trim() || '',
    prompt3Match?.[1]?.trim() || '',
  ]
}