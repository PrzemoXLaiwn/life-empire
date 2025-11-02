// app/contact/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // TODO: Implement actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitMessage({
        type: 'success',
        text: 'Your message has been sent! We\'ll respond within 24-48 hours.'
      })
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to send message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

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
            Contact Us
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            Have questions? Need support? We're here to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="ls-section">
              <div className="ls-section-content">
                <h3 className="text-lg font-bold text-white mb-4">📧 Support Email</h3>
                <p className="text-sm text-[#888] mb-2">For general inquiries:</p>
                <a href="mailto:support@lifeempire.game" className="text-sm text-[#3b82f6] hover:underline">
                  support@lifeempire.game
                </a>
              </div>
            </div>

            <div className="ls-section">
              <div className="ls-section-content">
                <h3 className="text-lg font-bold text-white mb-4">⏰ Response Time</h3>
                <p className="text-sm text-[#888]">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>

            <div className="ls-section">
              <div className="ls-section-content">
                <h3 className="text-lg font-bold text-white mb-4">🔗 Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/help" className="text-[#3b82f6] hover:underline">
                      Help Center / FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/rules" className="text-[#3b82f6] hover:underline">
                      Game Rules
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide" className="text-[#3b82f6] hover:underline">
                      Game Guide
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="ls-section">
              <div className="ls-section-header">Send us a message</div>
              <div className="ls-section-content">
                {submitMessage && (
                  <div className={`mb-6 p-4 border rounded ${
                    submitMessage.type === 'success' 
                      ? 'bg-[#5cb85c]/10 border-[#5cb85c] text-[#5cb85c]'
                      : 'bg-[#d9534f]/10 border-[#d9534f] text-[#d9534f]'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#888] mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#888] mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#888] mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="account">Account Issue</option>
                      <option value="payment">Payment/Billing</option>
                      <option value="abuse">Report Abuse</option>
                      <option value="suggestion">Feature Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#888] mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                      placeholder="Brief description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#888] mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6] resize-none"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ls-btn ls-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs text-[#666] text-center">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy" className="text-[#3b82f6] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}