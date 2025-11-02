// app/about/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d0d0d0]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0f0f0f]/90 border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/images/logo.png" alt="Life Empire" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                  LIFE EMPIRE
                </h1>
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/login">
                <button className="ls-btn text-sm sm:text-base px-3 sm:px-4 py-2">Login</button>
              </Link>
              <Link href="/register">
                <button className="ls-btn ls-btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#333] bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            About Life Empire
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            The most immersive multiplayer life simulation game where your choices define your destiny.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* What is Life Empire */}
        <div className="ls-section">
          <div className="ls-section-header">🎮 What is Life Empire?</div>
          <div className="ls-section-content space-y-4 text-[#d0d0d0]">
            <p>
              Life Empire is a browser-based multiplayer life simulation RPG that gives you complete freedom
              to live your virtual life however you choose. Whether you want to become a successful CEO,
              a notorious crime lord, or anything in between - the choice is yours.
            </p>
            <p>
              Starting with nothing but ambition, you'll navigate through a complex world filled with
              opportunities, challenges, and real players. Build relationships, accumulate wealth, gain
              power, and leave your mark on the game world.
            </p>
          </div>
        </div>

        {/* Core Philosophy */}
        <div className="ls-section">
          <div className="ls-section-header">💡 Our Philosophy</div>
          <div className="ls-section-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#3b82f6]">🎯 Total Freedom</h3>
                <p className="text-sm text-[#888]">
                  No forced paths. Choose your career, lifestyle, and moral compass. Switch directions
                  anytime you want.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#3b82f6]">⚖️ Consequences Matter</h3>
                <p className="text-sm text-[#888]">
                  Every decision has weight. Your actions affect your reputation, relationships, and
                  opportunities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#3b82f6]">🤝 Real Multiplayer</h3>
                <p className="text-sm text-[#888]">
                  Interact with thousands of real players. Form alliances, compete for dominance, or
                  build business partnerships.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#3b82f6]">🎲 No Pay-to-Win</h3>
                <p className="text-sm text-[#888]">
                  100% free to play. Success comes from strategy, time investment, and smart decisions
                  - not your wallet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div className="ls-section">
          <div className="ls-section-header">✨ What Makes Us Different</div>
          <div className="ls-section-content">
            <ul className="space-y-3 text-[#d0d0d0]">
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Deep Career System:</strong> Over 20 legitimate careers
                  with real progression paths, promotions, and skill requirements.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Criminal Underworld:</strong> Commit crimes, form gangs,
                  control territories, and build a criminal empire.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Business Management:</strong> Own and operate 50+
                  different business types. Hire employees, upgrade facilities, compete for market share.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Global Economy:</strong> Trade stocks, invest in crypto,
                  buy real estate, and manage your wealth across multiple cities.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Gang Warfare:</strong> Form or join gangs, fight for
                  territory control, organize heists, and dominate the underworld.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] mt-1">▸</span>
                <div>
                  <strong className="text-white">Character Development:</strong> Level up your character,
                  train skills, improve attributes, and customize your appearance.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Development Team */}
        <div className="ls-section">
          <div className="ls-section-header">👥 Our Team</div>
          <div className="ls-section-content text-[#d0d0d0] space-y-4">
            <p>
              Life Empire is developed by a passionate team of indie game developers who believe in
              creating rich, player-driven experiences. We're committed to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-center gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Regular content updates and new features</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Active community engagement</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Fair gameplay and balanced mechanics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#3b82f6]">✓</span>
                <span>Transparent development process</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/register">
            <button className="ls-btn ls-btn-primary text-lg px-12 py-4 shadow-lg shadow-[#3b82f6]/20">
              🚀 Start Your Journey
            </button>
          </Link>
          <p className="mt-4 text-sm text-[#666]">Join thousands of players building their empires</p>
        </div>
      </section>
    </div>
  )
}