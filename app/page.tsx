import Link from 'next/link'

export default function LandingPage() {
  const stats = [
    { label: 'Active Players', value: '1,234' },
    { label: 'Money Stolen', value: '$50M+' },
    { label: 'Crimes Committed', value: '10K+' },
    { label: 'Active Gangs', value: '127' }
  ]

  const features = [
    {
      icon: '💰',
      title: 'Build Your Empire',
      description: 'Start from nothing. Rob, steal, and work your way to the top. Buy businesses, properties, and become the richest criminal in the city.'
    },
    {
      icon: '🔫',
      title: 'Commit Crimes',
      description: 'From pickpocketing to bank heists. The bigger the risk, the bigger the reward. Build your reputation in the underworld.'
    },
    {
      icon: '👥',
      title: 'Form a Gang',
      description: 'Join or create a gang. Fight for territory, organize heists, and dominate the city with your crew.'
    },
    {
      icon: '🌍',
      title: 'Expand Globally',
      description: 'Start in one city, expand to others. Unlock international operations, smuggling routes, and global domination.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#d0d0d0]">
      {/* Header */}
      <header className="border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#fff] uppercase tracking-wider">
              LIFE EMPIRE
            </h1>
            <p className="text-[10px] text-[#888] uppercase tracking-wider">
              Build Your Criminal Empire
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="ls-btn">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="ls-btn ls-btn-primary">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-[#fff] mb-4 uppercase tracking-wider">
            Welcome to Life Empire
          </h2>
          <p className="text-lg text-[#888] mb-8 max-w-2xl mx-auto">
            A text-based online RPG set in a dark, gritty underworld. Build your character, commit crimes, 
            join gangs, and rise to the top of the criminal hierarchy.
          </p>
          <Link href="/register">
            <button className="ls-btn ls-btn-primary text-base px-8 py-3">
              JOIN NOW - IT'S FREE
            </button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="ls-section">
                <div className="ls-section-content text-center">
                  <p className="text-3xl font-bold text-[#5cb85c] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#888] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-bold text-[#fff] mb-8 text-center uppercase tracking-wider">
            Game Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="ls-section">
                <div className="ls-section-content">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#fff] mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-[#888]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-[#fff] mb-4 uppercase tracking-wider">
            Ready to Start?
          </h3>
          <p className="text-lg text-[#888] mb-8">
            Join thousands of players. Build your empire. Become a legend.
          </p>
          <Link href="/register">
            <button className="ls-btn ls-btn-primary text-base px-8 py-3">
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-[#666]">
            © 2025 Life Empire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}