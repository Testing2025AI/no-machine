# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**No Machine** is a Next.js web application that helps users generate boundary-setting responses with AI. It uses:
- Anthropic Claude Sonnet for generating contextual boundary scripts
- FAL.ai Flux Realism for creating humorous accompanying images
- A "Reformed Doormat" AI personality that provides three escalating response levels (Soft, Medium, Firm)

## Development Commands

```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Architecture

### Core Workflow
1. User inputs boundary scenario in dashboard
2. `/api/generate-responses` calls Anthropic Claude with custom system prompt
3. Response parser extracts structured data (3 boundaries + image prompts)
4. `/api/generate-images` generates 3 humorous images via FAL.ai
5. UI displays all responses with copy-to-clipboard functionality

### Key Files & Patterns
- **System Prompt**: `src/lib/anthropic.ts` - Contains the full "Reformed Doormat" persona
- **Response Parser**: `src/lib/utils/response-parser.ts` - Parses structured Claude responses
- **API Routes**: Follow Next.js 15 App Router pattern in `src/app/api/`
- **Components**: Use shadcn/ui style patterns with Tailwind CSS
- **Types**: Centralized in `src/lib/types.ts` for consistency

### Environment Variables Required
```env
ANTHROPIC_API_KEY=          # From console.anthropic.com
FAL_KEY=                    # From fal.ai/dashboard
NEXT_PUBLIC_APP_URL=        # For deployment
```

## Technical Decisions

- **No Authentication**: Simplified MVP - add Supabase auth later if needed
- **Client-Side State**: Using React state instead of external state management
- **API Design**: Separate endpoints for text/image generation for better UX
- **Error Handling**: Graceful degradation - text works without images
- **TypeScript**: Strict typing for AI response parsing reliability

## Development Notes

- The Anthropic system prompt is the core of the app - treat it as sacred
- FAL.ai can be slow; always show loading states
- Response parsing is fragile - test thoroughly when changing prompts
- Images are optional - app should work even if image generation fails