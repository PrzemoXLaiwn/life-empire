// app/guide/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function GuidePage() {
  const sections = [
    {
      title: '🎮 Getting Started',
      steps: [
        {
          title: '1. Create Your Account',
          content: 'Sign up with your email and choose a unique username. This will be your identity in the game world.',
        },
        {
          title: '2. Choose Your Starting City',
          content: 'Each city has different bonuses. Pick wisely based on your planned strategy. You can travel later, but starting location matters.',
        },
        {
          title: '3. Customize Your Character',
          content: 'Select an avatar or upload your own. This represents you across the game.',
        },
      ],
    },
    {
      title: '💰 Making Money',
      steps: [
        {
          title: 'Legal Methods',
          content: 'Get a job, work shifts, get promoted. Legal money is clean and can be deposited in the bank safely. Start with entry-level jobs and work your way up.',
        },
        {
          title: 'Criminal Methods',
          content: 'Commit crimes for quick cash. Higher-tier crimes pay more but have higher risk. Criminal earnings are "dirty money" and need to be laundered.',
        },
        {
          title: 'Business Income',
          content: 'Buy businesses to generate passive income. Upgrade them for better returns. Businesses can also launder dirty money.',
        },
      ],
    },
    {
      title: '⚡ Energy & Resources',
      steps: [
        {
          title: 'Energy System',
          content: 'Most actions cost energy. You have 100 max energy that regenerates 1 point every 3 minutes. Plan your actions wisely!',
        },
        {
          title: 'Nerve System',
          content: 'Crimes cost "nerve" instead of energy. Nerve regenerates slower (1 every 5 minutes). Max nerve increases as you level up.',
        },
        {
          title: 'Health Management',
          content: 'Keep your health above 50%. Low health reduces success rates. Train at the gym to increase max health.',
        },
      ],
    },
    {
      title: '📈 Leveling & Skills',
      steps: [
        {
          title: 'Experience Points',
          content: 'Earn XP from jobs, crimes, and activities. Each level unlocks new opportunities and increases your max energy/nerve.',
        },
        {
          title: 'Training Skills',
          content: 'Visit the gym to train Strength, Defense, Speed, and Dexterity. Higher skills improve combat and crime success.',
        },
        {
          title: 'Attributes',
          content: 'Intelligence, Charisma, and Stamina affect various game mechanics. Improve them through activities and training.',
        },
      ],
    },
    {
      title: '👊 Gang Gameplay',
      steps: [
        {
          title: 'Joining a Gang',
          content: 'Apply to existing gangs or create your own for $100,000. Gangs provide backup, shared resources, and territory control.',
        },
        {
          title: 'Gang Roles',
          content: 'Boss, Underboss, Capo, Soldier, Member. Each rank has different permissions and responsibilities.',
        },
        {
          title: 'Territory Wars',
          content: 'Fight other gangs for district control. Controlled territories generate passive income for your gang.',
        },
      ],
    },
    {
      title: '⚠️ Risks & Consequences',
      steps: [
        {
          title: 'Getting Arrested',
          content: 'Failed crimes can land you in jail. Jail time varies by crime severity. You can\'t play while in jail unless you pay bail.',
        },
        {
          title: 'Combat Deaths',
          content: 'Losing fights can kill you. Death results in lost money (50%) and hospital time. Your death count is public.',
        },
        {
          title: 'Heat Level',
          content: 'Repeated crimes increase police attention. High heat = higher arrest chance. Lay low to reduce heat.',
        },
      ],
    },
  ]

  const tips = [
    {
      icon: '💡',
      title: 'Start Slow',
      tip: 'Don\'t rush into high-risk crimes. Build your skills and resources first.',
    },
    {
      icon: '🏦',
      title: 'Bank Your Money',
      tip: 'Keep most of your clean money in the bank. Players can\'t steal from your bank.',
    },
    {
      icon: '👥',
      title: 'Join a Gang Early',
      tip: 'Gang members help protect you and provide opportunities for bigger scores.',
    },
    {
      icon: '📊',
      title: 'Diversify Income',
      tip: 'Don\'t rely on one income source. Mix jobs, crimes, and businesses.',
    },
    {
      icon: '🎯',
      title: 'Train Regularly',
      tip: 'Spend energy on gym training daily. Higher stats = better success rates.',
    },
    {
      icon: '🌍',
      title: 'Explore Cities',
      tip: 'Different cities have different bonuses. Travel when you reach higher levels.',
    },
  ]

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
            Complete Game Guide
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            Everything you need to know to dominate Life Empire
          </p>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="ls-section">
            <div className="ls-section-header">{section.title}</div>
            <div className="ls-section-content space-y-6">
              {section.steps.map((step, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-bold text-[#3b82f6]">{step.title}</h3>
                  <p className="text-sm text-[#d0d0d0] leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pro Tips */}
        <div className="ls-section border-2 border-[#3b82f6]">
          <div className="ls-section-header text-[#3b82f6]">💎 Pro Tips</div>
          <div className="ls-section-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#1a1a1a] border border-[#333] rounded">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{tip.title}</p>
                    <p className="text-xs text-[#888]">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/register">
            <button className="ls-btn ls-btn-primary text-lg px-12 py-4 shadow-lg shadow-[#3b82f6]/20">
              🚀 Start Playing Now
            </button>
          </Link>
          <p className="mt-4 text-sm text-[#666]">Put this knowledge into action!</p>
        </div>
      </section>
    </div>
  )
}