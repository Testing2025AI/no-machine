import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              No Machine
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              Reformed Doormat's Boundary Coach
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From chronic apologizer to boundary expert. Get personalized scripts
              for saying no with confidence—backed by humor that makes it stick.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Three Boundary Levels</h3>
              <p className="text-gray-600">
                Soft, Medium, and Firm responses tailored to your situation
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😄</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Humor That Heals</h3>
              <p className="text-gray-600">
                Absurd visuals that dissolve anxiety and make boundaries lighter
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reformed Doormat Wisdom</h3>
              <p className="text-gray-600">
                Personal insights from someone who's been there
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-lg shadow-lg"
            >
              Start Setting Boundaries
              <span className="ml-2">→</span>
            </Link>
            <p className="text-sm text-gray-500">
              No more apologizing to automatic doors
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
