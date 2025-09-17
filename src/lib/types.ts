export interface BoundaryOption {
  type: 'soft' | 'clear' | 'wall'
  title: string
  useWhen: string
  script: string
  whyItWorks: string
}

export interface BoundaryResponse {
  id: string
  quickTake: string
  boundaries: {
    soft: BoundaryOption
    clear: BoundaryOption
    wall: BoundaryOption
  }
  imagePrompts: [string, string, string]
  imageUrls: (string | null)[]
  reformedDoormatNote: string
  scenario: string
  createdAt: string
  userId: string
}

export interface ParsedResponse {
  quickTake: string
  boundaries: {
    soft: BoundaryOption
    clear: BoundaryOption
    wall: BoundaryOption
  }
  imagePrompts: [string, string, string]
  reformedDoormatNote: string
}