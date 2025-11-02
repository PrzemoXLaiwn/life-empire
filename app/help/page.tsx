// app/help/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function HelpCenterPage() {
  const faqs = [
    {
      category: '🎮 Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Register" button in the top right corner, enter your email and create a password. Choose your starting city and you\'re ready to play!'
        },
        {
          q: 'Is Life Empire free to play?',
          a: 'Yes! Life Empire is 100% free to play. All premium features are optional cosmetics or convenience items that don\'t affect gameplay balance.'
        },
        {
          q: 'What happens if I forget my password?',
          a: 'Click "Forgot Password" on the login page. You\'ll receive a password reset email within a few minutes.'
        },
        {
          q: 'Can I change my username?',
          a: 'Usernames are permanent and cannot be changed. Choose carefully when creating your account!'
        },
      ]
    },
    {
      category: '💰 Money & Economy',
      questions: [
        {
          q: 'What\'s the difference between cash and dirty cash?',
          a: 'Cash is clean money earned from legal jobs. Dirty cash comes from crimes and needs to be laundered through businesses before it can be safely deposited in the bank.'
        },
        {
          q: 'How do I make money fast?',
          a: 'Start with entry-level jobs for steady income. As you level up, commit crimes for bigger payouts. Eventually, invest in businesses for passive income.'
        },
        {
          q: 'Can other players steal my money?',
          a: 'Players can steal cash you\'re carrying, but money in the bank is safe. Always deposit your clean money!'
        },
        {
          q: 'What are taxes?',
          a: 'You pay taxes on legal income from jobs and businesses. Tax rate varies by city. Criminal income isn\'t taxed, but it\'s risky!'
        },
      ]
    },
    {
      category: '⚡ Energy & Resources',
      questions: [
        {
          q: 'How does energy regeneration work?',
          a: 'Energy regenerates at 1 point every 3 minutes, up to your maximum (base 100 + bonuses). Energy is used for jobs, training, and most activities.'
        },
        {
          q: 'What is nerve?',
          a: 'Nerve is used for committing crimes. It regenerates slower than energy (1 every 5 minutes). Your max nerve increases as you level up.'
        },
        {
          q: 'How do I increase my max energy?',
          a: 'Max energy increases when you level up (+5 per level) and from certain properties/items.'
        },
        {
          q: 'Can I buy energy refills?',
          a: 'No. Energy management is part of the game strategy. Plan your actions wisely!'
        },
      ]
    },
    {
      category: '👊 Combat & PvP',
      questions: [
        {
          q: 'How do I attack other players?',
          a: 'Go to Combat page, search for players, and click Attack. Success depends on your stats vs theirs. Winners steal cash and gain reputation.'
        },
        {
          q: 'What happens if I die?',
          a: 'You lose 50% of your cash, respawn with 50% health, and go to hospital for recovery time. Your death count increases.'
        },
        {
          q: 'How do I protect myself?',
          a: 'Train your stats at the gym, buy better weapons and armor, join a strong gang, and don\'t carry too much cash.'
        },
        {
          q: 'Can I revenge attack someone?',
          a: 'Yes! Your combat history shows who attacked you. You can attack them back anytime.'
        },
      ]
    },
    {
      category: '🏢 Businesses',
      questions: [
        {
          q: 'How do businesses work?',
          a: 'Buy a business, it generates passive income every hour. Upgrade it for better returns. Higher-tier businesses cost more but earn more.'
        },
        {
          q: 'What is money laundering?',
          a: 'Businesses can convert dirty cash to clean cash at a rate (usually 70-80%). This makes criminal earnings safe to bank.'
        },
        {
          q: 'Can I own multiple businesses?',
          a: 'Yes! You can own as many businesses as you can afford. Diversify your portfolio.'
        },
        {
          q: 'Do businesses require management?',
          a: 'Minimal management. Just collect profits and upgrade when you can. Employees are optional and automatic.'
        },
      ]
    },
    {
      category: '👥 Gangs',
      questions: [
        {
          q: 'How do I join a gang?',
          a: 'Visit the Gang page, browse active gangs, and apply. Gang leaders will review applications.'
        },
        {
          q: 'Should I create my own gang?',
          a: 'Only if you\'re experienced. Creating a gang costs $100,000 and requires leadership. New players should join existing gangs first.'
        },
        {
          q: 'What are the benefits of being in a gang?',
          a: 'Protection from attacks, access to gang vault, shared resources, organized crimes, territory income, and social community.'
        },
        {
          q: 'Can I leave a gang?',
          a: 'Yes, you can leave anytime. However, there\'s a 24-hour cooldown before you can join another gang.'
        },
      ]
    },
    {
      category: '🌍 Travel & Cities',
      questions: [
        {
          q: 'How do I travel to other cities?',
          a: 'Visit the Travel page, select a destination, pay the travel cost and energy. Some cities require vehicles or higher levels.'
        },
        {
          q: 'What are city bonuses?',
          a: 'Each city has unique bonuses: crime success rate, business costs, training effectiveness, income multipliers, etc.'
        },
        {
          q: 'Can I own property in multiple cities?',
          a: 'Yes! You can own businesses and properties in any city you\'ve visited.'
        },
        {
          q: 'Is there a best city?',
          a: 'No "best" city. It depends on your playstyle. Criminal players prefer cities with crime bonuses, businessmen prefer low-tax cities.'
        },
      ]
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
            Help Center
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to frequently asked questions
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
            <Link href="/contact">
              <button className="ls-btn text-sm px-6 py-2">
                📧 Contact Support
              </button>
            </Link>
            <Link href="/guide">
              <button className="ls-btn text-sm px-6 py-2">
                📖 Game Guide
              </button>
            </Link>
            <Link href="/rules">
              <button className="ls-btn text-sm px-6 py-2">
                📋 Rules
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {faqs.map((category, index) => (
          <div key={index} className="ls-section">
            <div className="ls-section-header">{category.category}</div>
            <div className="ls-section-content space-y-6">
              {category.questions.map((item, i) => (
                <div key={i} className="space-y-2 pb-6 border-b border-[#2a2a2a] last:border-0">
                  <h3 className="text-base font-bold text-[#3b82f6]">Q: {item.q}</h3>
                  <p className="text-sm text-[#d0d0d0] leading-relaxed pl-4">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still Need Help */}
        <div className="ls-section border-2 border-[#3b82f6]">
          <div className="ls-section-content text-center py-8">
            <h3 className="text-xl font-bold text-white mb-4">Still Need Help?</h3>
            <p className="text-sm text-[#888] mb-6">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <Link href="/contact">
              <button className="ls-btn ls-btn-primary px-8 py-3">
                📧 Contact Support
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}