// app/terms/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function TermsPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-sm text-[#666] mb-12">Last Updated: January 2025</p>

        <div className="space-y-8 text-[#d0d0d0]">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-sm">
              By creating an account or using Life Empire ("the Game"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Account Registration</h2>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>You must be at least 13 years old to create an account</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>One account per person. Multi-accounting is prohibited</li>
              <li>Account sharing is not allowed</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
            <p className="text-sm mb-4">You agree NOT to:</p>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>Use cheats, exploits, automation software, bots, hacks, or mods</li>
              <li>Exploit bugs or glitches for personal gain</li>
              <li>Harass, threaten, or abuse other players</li>
              <li>Use offensive, discriminatory, or inappropriate language</li>
              <li>Impersonate staff members or other players</li>
              <li>Engage in real money trading (buying/selling game items for real money)</li>
              <li>Spam, advertise, or promote other services</li>
              <li>Attempt to hack, disrupt, or compromise the game's systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Virtual Items and Currency</h2>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>All virtual items, currency, and characters are owned by Life Empire</li>
              <li>You have a limited, non-transferable license to use virtual items</li>
              <li>Virtual items have no real-world value</li>
              <li>We reserve the right to modify, remove, or add virtual items at any time</li>
              <li>Purchases of virtual items are final and non-refundable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="text-sm">
              The Game, including all content, graphics, user interface, code, and trademarks, is owned by Life Empire and protected by copyright and other laws. You may not copy, modify, distribute, or create derivative works without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Termination</h2>
            <p className="text-sm mb-4">We may suspend or terminate your account for:</p>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>Violation of these Terms or our game rules</li>
              <li>Fraudulent or illegal activities</li>
              <li>Extended periods of inactivity (6+ months)</li>
              <li>Any reason at our sole discretion</li>
            </ul>
            <p className="text-sm mt-4">You may delete your account at any time through account settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimers</h2>
            <ul className="space-y-2 text-sm ml-6 list-disc">
              <li>The Game is provided "AS IS" without warranties of any kind</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>We are not responsible for loss of data or account progress</li>
              <li>The Game may be modified or discontinued at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-sm">
              To the maximum extent permitted by law, Life Empire shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from your use of the Game.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Dispute Resolution</h2>
            <p className="text-sm">
              Any disputes arising from these Terms or your use of the Game will be resolved through binding arbitration in accordance with the laws of [Your Jurisdiction]. You waive your right to participate in class-action lawsuits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
            <p className="text-sm">
              We reserve the right to modify these Terms at any time. We will notify you of significant changes through email or in-game notification. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact</h2>
            <p className="text-sm">
              For questions about these Terms, contact us at:{' '}
              <a href="mailto:legal@lifeempire.game" className="text-[#3b82f6] hover:underline">
                legal@lifeempire.game
              </a>
            </p>
          </section>

          <div className="pt-8 border-t border-[#333]">
            <p className="text-xs text-[#666]">
              By playing Life Empire, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-xs text-[#666] mt-4">
              Life Empire © 2025. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}