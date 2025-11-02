// app/features/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturesPage() {
  const features = [
    {
      category: '💼 Career System',
      icon: '👨‍💼',
      items: [
        { name: 'Entry Level Jobs', desc: 'Start your career with basic positions' },
        { name: 'Skilled Trades', desc: 'Learn specialized skills and earn more' },
        { name: 'Professional Careers', desc: 'Become a doctor, lawyer, or engineer' },
        { name: 'Executive Positions', desc: 'Reach CEO level and lead companies' },
        { name: 'Promotions', desc: 'Climb the corporate ladder' },
        { name: 'Salary Increases', desc: 'Earn more as you gain experience' },
      ],
    },
    {
      category: '🔫 Criminal Activities',
      icon: '😈',
      items: [
        { name: 'Petty Crimes', desc: 'Pickpocketing, shoplifting, basic theft' },
        { name: 'Vehicle Theft', desc: 'Steal and sell cars for profit' },
        { name: 'Burglary', desc: 'Break into homes and businesses' },
        { name: 'Armed Robbery', desc: 'High-risk, high-reward heists' },
        { name: 'Drug Operations', desc: 'Manufacture and distribute narcotics' },
        { name: 'Organized Crime', desc: 'Plan and execute major heists' },
      ],
    },
    {
      category: '👊 Gang System',
      icon: '🏴',
      items: [
        { name: 'Create Gang', desc: 'Start your own criminal organization' },
        { name: 'Recruit Members', desc: 'Build your crew and assign roles' },
        { name: 'Territory Control', desc: 'Capture and defend districts' },
        { name: 'Gang Wars', desc: 'Fight rival gangs for dominance' },
        { name: 'Gang Vault', desc: 'Shared resources and equipment' },
        { name: 'Organized Heists', desc: 'Coordinate complex operations' },
      ],
    },
    {
      category: '🏢 Business Empire',
      icon: '🏪',
      items: [
        { name: '50+ Business Types', desc: 'From restaurants to tech companies' },
        { name: 'Business Management', desc: 'Hire employees and set prices' },
        { name: 'Upgrades', desc: 'Improve equipment and facilities' },
        { name: 'Market Competition', desc: 'Compete with other players' },
        { name: 'Money Laundering', desc: 'Legitimize illegal earnings' },
        { name: 'Franchising', desc: 'Expand to multiple locations' },
      ],
    },
    {
      category: '📊 Economy & Finance',
      icon: '💰',
      items: [
        { name: 'Stock Market', desc: 'Trade company shares in real-time' },
        { name: 'Cryptocurrency', desc: 'Invest in digital currencies' },
        { name: 'Real Estate', desc: 'Buy properties and collect rent' },
        { name: 'Banking System', desc: 'Save money and earn interest' },
        { name: 'Taxes', desc: 'Pay taxes on legal income (or evade them)' },
        { name: 'Money Transfers', desc: 'Send money to other players' },
      ],
    },
    {
      category: '🎯 Character Development',
      icon: '⭐',
      items: [
        { name: 'Leveling System', desc: 'Gain experience and level up' },
        { name: 'Skill Training', desc: 'Improve strength, intelligence, charisma' },
        { name: 'Gym Training', desc: 'Build physical attributes' },
        { name: 'Education', desc: 'Study to unlock better careers' },
        { name: 'Reputation', desc: 'Build respect in your community' },
        { name: 'Achievements', desc: 'Unlock special rewards' },
      ],
    },
    {
      category: '🌍 Global Travel',
      icon: '✈️',
      items: [
        { name: 'Multiple Cities', desc: 'Travel between 15+ major cities' },
        { name: 'Country Travel', desc: 'Unlock international operations' },
        { name: 'City Bonuses', desc: 'Each city has unique advantages' },
        { name: 'Travel Requirements', desc: 'Need vehicles for some destinations' },
        { name: 'Time Zones', desc: 'Experience different game dynamics' },
        { name: 'Migration', desc: 'Relocate permanently to new cities' },
      ],
    },
    {
      category: '⚔️ Combat & PvP',
      icon: '🗡️',
      items: [
        { name: 'Player Attacks', desc: 'Attack other players to steal cash' },
        { name: 'Defense System', desc: 'Protect yourself with armor and weapons' },
        { name: 'Bounty System', desc: 'Place or collect bounties' },
        { name: 'Hospital Recovery', desc: 'Recover from injuries over time' },
        { name: 'Combat Stats', desc: 'Track your wins and losses' },
        { name: 'Revenge Attacks', desc: 'Get payback on your attackers' },
      ],
    },
    {
      category: '🎒 Inventory & Items',
      icon: '🎁',
      items: [
        { name: 'Weapons', desc: 'Pistols, rifles, explosives and more' },
        { name: 'Vehicles', desc: 'Cars, motorcycles, boats, planes' },
        { name: 'Properties', desc: 'Apartments, houses, mansions' },
        { name: 'Tools', desc: 'Lockpicks, hacking devices, masks' },
        { name: 'Consumables', desc: 'Energy drinks, first aid, food' },
        { name: 'Equipment', desc: 'Body armor, night vision, laptops' },
      ],
    },
    {
      category: '💬 Social Features',
      icon: '👥',
      items: [
        { name: 'Global Chat', desc: 'Talk with all players in real-time' },
        { name: 'Private Messages', desc: 'Send DMs to other players' },
        { name: 'Friend System', desc: 'Add friends and track their progress' },
        { name: 'Player Profiles', desc: 'View detailed player information' },
        { name: 'Leaderboards', desc: 'Compete for top rankings' },
        { name: 'Activity Feed', desc: 'See what other players are doing' },
      ],
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
            Complete Feature List
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            Everything you need to build your empire, your way. Over 100+ features and counting.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="ls-section hover:border-[#3b82f6] transition-all">
              <div className="ls-section-header flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <span>{feature.category}</span>
              </div>
              <div className="ls-section-content">
                <div className="space-y-3">
                  {feature.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#2a2a2a] last:border-0">
                      <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white mb-1">{item.name}</p>
                        <p className="text-xs text-[#888]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/register">
            <button className="ls-btn ls-btn-primary text-lg px-12 py-4 shadow-lg shadow-[#3b82f6]/20">
              🚀 Try All Features Now
            </button>
          </Link>
          <p className="mt-4 text-sm text-[#666]">100% Free • No Credit Card Required</p>
        </div>
      </section>
    </div>
  )
}