// app/rules/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function RulesPage() {
  const rules = [
    {
      category: '🚫 Prohibited Actions',
      rules: [
        { title: 'Multi-Accounting', desc: 'One account per person. Using multiple accounts to gain unfair advantage will result in permanent ban.' },
        { title: 'Bot Usage', desc: 'No automated scripts, bots, or macros. All actions must be performed manually by a human player.' },
        { title: 'Real Money Trading', desc: 'Buying or selling game currency, items, or accounts for real money is strictly forbidden.' },
        { title: 'Account Sharing', desc: 'Sharing your account credentials with others is prohibited and may result in account suspension.' },
        { title: 'Exploiting Bugs', desc: 'Deliberately exploiting game bugs or glitches for personal gain will result in permanent ban.' },
      ]
    },
    {
      category: '💬 Community Guidelines',
      rules: [
        { title: 'Respectful Communication', desc: 'Treat all players with respect. Harassment, hate speech, or discriminatory language is not tolerated.' },
        { title: 'No Spam', desc: 'Don\'t spam chat channels, messages, or game systems. Quality over quantity.' },
        { title: 'English Language', desc: 'Use English in global chat. Private messages can use any language.' },
        { title: 'No Advertising', desc: 'Don\'t advertise other games, websites, or services without permission.' },
        { title: 'No Impersonation', desc: 'Don\'t pretend to be staff members or other players.' },
      ]
    },
    {
      category: '⚖️ Fair Play',
      rules: [
        { title: 'No Collusion', desc: 'Don\'t coordinate with alt accounts or arrange unfair advantages with other players.' },
        { title: 'Play the Game', desc: 'Participate actively. Inactive accounts may be removed.' },
        { title: 'Report Bugs', desc: 'If you find a bug, report it immediately to staff. Don\'t exploit or share it.' },
        { title: 'No Griefing', desc: 'While PvP is allowed, excessive griefing or targeted harassment is not.' },
        { title: 'Follow Staff Instructions', desc: 'If a staff member asks you to do something, comply promptly.' },
      ]
    },
    {
      category: '💰 Payment & Refunds',
      rules: [
        { title: 'No Refunds', desc: 'All purchases are final. Make sure you understand what you\'re buying.' },
        { title: 'Chargebacks', desc: 'Initiating chargebacks will result in immediate permanent ban.' },
        { title: 'Optional Purchases', desc: 'The game is 100% free to play. All purchases are optional cosmetics or convenience.' },
      ]
    },
    {
      category: '🔒 Account Security',
      rules: [
        { title: 'Your Responsibility', desc: 'You are responsible for keeping your account secure. Use a strong, unique password.' },
        { title: 'Compromised Accounts', desc: 'If your account is compromised, contact staff immediately.' },
        { title: 'No Password Sharing', desc: 'Never share your password with anyone, including people claiming to be staff.' },
      ]
    },
  ]

  const penalties = [
    { severity: 'Minor Violation', action: 'Warning', duration: '-', examples: 'Minor chat violations, accidental rule breaks' },
    { severity: 'Moderate Violation', action: 'Temporary Ban', duration: '1-7 days', examples: 'Repeated chat violations, minor exploits' },
    { severity: 'Serious Violation', action: 'Extended Ban', duration: '7-30 days', examples: 'Account sharing, griefing, harassment' },
    { severity: 'Severe Violation', action: 'Permanent Ban', duration: 'Permanent', examples: 'Multi-accounting, botting, RMT, major exploits' },
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
            Game Rules
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            Read carefully. Ignorance of the rules is not an excuse.
          </p>
        </div>
      </section>

      {/* Rules Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Important Notice */}
        <div className="ls-section border-2 border-[#d9534f]">
          <div className="ls-section-content bg-[#d9534f]/10">
            <div className="flex items-start gap-4">
              <span className="text-4xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-[#d9534f] mb-2">IMPORTANT</h3>
                <p className="text-sm text-[#d0d0d0]">
                  By creating an account and playing Life Empire, you agree to follow all rules listed below.
                  Rule violations will result in penalties ranging from warnings to permanent bans.
                  Staff decisions are final.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rule Categories */}
        {rules.map((category, index) => (
          <div key={index} className="ls-section">
            <div className="ls-section-header">{category.category}</div>
            <div className="ls-section-content space-y-4">
              {category.rules.map((rule, i) => (
                <div key={i} className="pb-4 border-b border-[#2a2a2a] last:border-0">
                  <h3 className="text-base font-bold text-white mb-2">{rule.title}</h3>
                  <p className="text-sm text-[#888]">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Penalty System */}
        <div className="ls-section">
          <div className="ls-section-header">⚖️ Penalty System</div>
          <div className="ls-section-content">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="text-left py-3 px-4 text-[#888] font-semibold">Severity</th>
                    <th className="text-left py-3 px-4 text-[#888] font-semibold">Action</th>
                    <th className="text-left py-3 px-4 text-[#888] font-semibold">Duration</th>
                    <th className="text-left py-3 px-4 text-[#888] font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {penalties.map((penalty, index) => (
                    <tr key={index} className="border-b border-[#2a2a2a]">
                      <td className="py-3 px-4 text-white">{penalty.severity}</td>
                      <td className="py-3 px-4 text-[#3b82f6]">{penalty.action}</td>
                      <td className="py-3 px-4 text-[#888]">{penalty.duration}</td>
                      <td className="py-3 px-4 text-[#888] text-xs">{penalty.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reporting */}
        <div className="ls-section border-2 border-[#3b82f6]">
          <div className="ls-section-header text-[#3b82f6]">📢 Report Rule Violations</div>
          <div className="ls-section-content">
            <p className="text-sm text-[#d0d0d0] mb-4">
              If you witness rule violations, report them to staff immediately. Include:
            </p>
            <ul className="space-y-2 text-sm text-[#888] ml-6">
              <li>• Player username(s) involved</li>
              <li>• Date and time of the violation</li>
              <li>• Detailed description of what happened</li>
              <li>• Screenshots or evidence (if applicable)</li>
            </ul>
            <div className="mt-4">
              <Link href="/contact">
                <button className="ls-btn ls-btn-primary text-sm px-6 py-2">
                  Report Violation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Final Notice */}
        <div className="text-center text-sm text-[#666]">
          <p>Last updated: January 2025</p>
          <p className="mt-2">
            These rules may be updated at any time. It is your responsibility to stay informed.
          </p>
        </div>
      </section>
    </div>
  )
}