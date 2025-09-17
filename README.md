# No Machine 🚫🤖

**Reformed Doormat's Boundary Coach**

From chronic apologizer to boundary expert. Get personalized scripts for saying no with confidence—backed by humor that makes it stick.

## Features

- **Three Escalation Levels**: Soft, Medium, and Firm boundary responses tailored to your situation
- **AI-Powered Responses**: Uses Anthropic Claude Sonnet to generate contextual boundary scripts
- **Visual Humor**: FAL.ai Flux Realism generates absurd, workplace-appropriate images to lighten the mood
- **Reformed Doormat Wisdom**: Personal insights from someone who's been there
- **Copy-to-Clipboard**: Easy script copying for real-world use

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **AI APIs**: Anthropic Claude Sonnet, FAL.ai Flux Realism
- **Backend**: Next.js API Routes
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for:
  - [Anthropic](https://console.anthropic.com/)
  - [FAL.ai](https://fal.ai/dashboard)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd no-machine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys in `.env.local`:
   ```env
   # Anthropic Configuration
   ANTHROPIC_API_KEY=your-anthropic-api-key

   # FAL.ai Configuration
   FAL_KEY=your-fal-key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Visit the app** and click "Start Setting Boundaries"
2. **Describe your situation** (e.g., "My boss keeps calling me on weekends")
3. **Get three tailored responses**:
   - **The Soft No**: Relationship-preserving approach
   - **The Clear No**: Professional and direct
   - **The Wall**: Non-negotiable boundary
4. **Copy scripts** directly to your clipboard
5. **Enjoy the humor** - each response comes with an absurd image to lighten the mood

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-responses/     # Anthropic Claude integration
│   │   └── generate-images/        # FAL.ai image generation
│   ├── dashboard/                  # Main app interface
│   ├── layout.tsx
│   └── page.tsx                    # Landing page
├── components/
│   ├── dashboard/
│   │   ├── InputForm.tsx           # Scenario input form
│   │   └── ResponseCard.tsx        # Boundary option display
│   └── ui/                         # Reusable UI components
└── lib/
    ├── anthropic.ts               # Claude API integration
    ├── fal.ts                     # FAL.ai image generation
    ├── types.ts                   # TypeScript definitions
    └── utils/
        └── response-parser.ts     # Parse Claude responses
```

## API Endpoints

- `POST /api/generate-responses` - Generate boundary responses from scenario
- `POST /api/generate-images` - Generate humorous images from prompts

## The Reformed Doormat Prompt

The AI personality is built around a specific system prompt that embodies a "reformed people-pleaser" who:

- Acknowledges the difficulty of setting boundaries
- Provides three escalating response levels
- Includes absurd, scenario-specific visual humor
- Offers personal validation and encouragement
- Keeps scripts under 3 sentences for practical use

## Deployment on Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy**

The app will be live at your Vercel domain!

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Contributing

Contributions welcome! This started as a reformed doormat's side project, so be gentle with feedback. 😄

## License

MIT - Because boundaries should be free.

---

*"No more apologizing to automatic doors"* 🚪