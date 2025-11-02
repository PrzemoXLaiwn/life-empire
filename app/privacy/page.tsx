// app/privacy/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function PrivacyPage() {
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
            <Link href="/">
              <button className="ls-btn text-sm px-4 py-2">← Back</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-sm text-[#666] mb-12">Last Updated: January 2025</p>

        <div className="space-y-8 text-[#d0d0d0]">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold text-[#3b82f6] mb-2">Account Information</h3>
                <p>When you register, we collect your email address and username. This information is required to create and manage your account.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#3b82f6] mb-2">Gameplay Data</h3>
                <p>We collect and store data about your in-game activities, including character stats, transactions, interactions with other players, and progress.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#3b82f6] mb-2">Technical Information</h3>
                <p>We automatically collect IP addresses, browser type, device information, and access times for security and analytics purposes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>To provide and maintain the game service</li>
              <li>To process your transactions and manage your account</li>
              <li>To communicate with you about the game, updates, and support</li>
              <li>To prevent fraud, cheating, and enforce our terms of service</li>
              <li>To improve the game experience and develop new features</li>
              <li>To display your username and game statistics to other players</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
            <p className="text-sm mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information only in these cases:</p>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li><strong>Public Profile:</strong> Your username, level, and public stats are visible to other players</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Service Providers:</strong> With trusted third parties who help us operate the game (hosting, analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-sm">We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking</h2>
            <p className="text-sm">We use cookies and similar technologies to maintain your session, remember your preferences, and analyze site usage. You can control cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="text-sm mb-2">You have the right to:</p>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>Access your personal data</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your game data</li>
            </ul>
            <p className="text-sm mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@lifeempire.game" className="text-[#3b82f6] hover:underline">
                privacy@lifeempire.game
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
            <p className="text-sm">Life Empire is not intended for users under 13 years of age. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
            <p className="text-sm">We may update this privacy policy from time to time. We will notify you of significant changes by email or through an in-game announcement. Continued use of the game constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
            <p className="text-sm">
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@lifeempire.game" className="text-[#3b82f6] hover:underline">
                privacy@lifeempire.game
              </a>
            </p>
          </section>

          <div className="pt-8 border-t border-[#333]">
            <p className="text-xs text-[#666]">
              Life Empire © 2025. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}