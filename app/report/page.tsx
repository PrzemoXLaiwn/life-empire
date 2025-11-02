// app/report/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ReportViolationPage() {
  const [formData, setFormData] = useState({
    targetUsername: '',
    violationType: '',
    description: '',
    evidence: '',
    incidentDate: new Date().toISOString().slice(0, 16)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string, details?: string[] } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          incidentDate: new Date(formData.incidentDate).toISOString()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitMessage({
          type: 'error',
          text: data.message || 'Failed to submit report',
          details: data.details || []
        })
        return
      }

      setSubmitMessage({
        type: 'success',
        text: data.message || 'Your report has been submitted. Our moderation team will review it within 24-48 hours.'
      })
      setFormData({
        targetUsername: '',
        violationType: '',
        description: '',
        evidence: '',
        incidentDate: new Date().toISOString().slice(0, 16)
      })
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Failed to submit report. Please try again later.'
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
            <Link href="/rules">
              <button className="ls-btn text-sm px-4 py-2">← Back to Rules</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#333] bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="text-5xl mb-6">⚠️</div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            Report Rule Violation
          </h2>
          <p className="text-lg text-[#888] max-w-3xl mx-auto leading-relaxed">
            Help us maintain a fair and respectful gaming environment
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Important Notice */}
        <div className="ls-section border-2 border-[#f0ad4e] mb-8">
          <div className="ls-section-content bg-[#f0ad4e]/10">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-[#f0ad4e] mb-2">Important Information</h3>
                <ul className="space-y-2 text-sm text-[#d0d0d0]">
                  <li>• You must be logged in to submit a report</li>
                  <li>• You can submit up to 3 reports per hour</li>
                  <li>• False reports may result in penalties to your account</li>
                  <li>• Provide as much detail and evidence as possible</li>
                  <li>• Screenshots and timestamps are extremely helpful</li>
                  <li>• Reports are reviewed within 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Report Form */}
        <div className="ls-section">
          <div className="ls-section-header">Submit Report</div>
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
              {/* Validation Errors */}
              {submitMessage?.details && submitMessage.details.length > 0 && (
                <div className="p-4 bg-[#d9534f]/10 border border-[#d9534f] rounded">
                  <p className="text-sm font-bold text-[#d9534f] mb-2">Validation Errors:</p>
                  <ul className="space-y-1">
                    {submitMessage.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-[#d9534f]">• {detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Violation Type */}
              <div>
                <label className="block text-sm text-[#888] mb-2">Violation Type *</label>
                <select
                  name="violationType"
                  value={formData.violationType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                >
                  <option value="">Select violation type</option>
                  <option value="CHEATING">Cheating / Using Hacks</option>
                  <option value="EXPLOITING">Bug Exploiting</option>
                  <option value="HARASSMENT">Harassment</option>
                  <option value="SPAM">Spam</option>
                  <option value="INAPPROPRIATE_CONTENT">Inappropriate Content</option>
                  <option value="ACCOUNT_SHARING">Account Sharing</option>
                  <option value="REAL_MONEY_TRADING">Real Money Trading</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Target Username */}
              <div>
                <label className="block text-sm text-[#888] mb-2">Reported Player Username *</label>
                <input
                  type="text"
                  name="targetUsername"
                  value={formData.targetUsername}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="Username of the player you're reporting"
                />
              </div>

              {/* Date/Time */}
              <div>
                <label className="block text-sm text-[#888] mb-2">When did this occur? *</label>
                <input
                  type="datetime-local"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  max={new Date().toISOString().slice(0, 16)}
                  required
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                />
                <p className="text-xs text-[#666] mt-1">Must be within the last 30 days</p>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm text-[#888] mb-2">Detailed Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6] resize-none"
                  placeholder="Provide as much detail as possible:
- What happened?
- Where did it happen?
- Were there witnesses?
- How many times has this occurred?
- Any other relevant information"
                />
              </div>

              {/* Evidence */}
              <div>
                <label className="block text-sm text-[#888] mb-2">Evidence URL (Optional but Recommended)</label>
                <input
                  type="url"
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded text-[#d0d0d0] text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="https://imgur.com/example.png"
                />
                <p className="text-xs text-[#666] mt-2">
                  Provide a link to screenshot or video evidence. Upload to imgur.com, YouTube, etc.
                </p>
              </div>

              {/* Agreement */}
              <div className="p-4 bg-[#1a1a1a] border border-[#333] rounded">
                <p className="text-xs text-[#888]">
                  By submitting this report, you confirm that:
                </p>
                <ul className="text-xs text-[#888] mt-2 space-y-1 ml-4">
                  <li>• The information provided is truthful and accurate</li>
                  <li>• You understand false reports may result in penalties</li>
                  <li>• You will not abuse the report system</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="ls-btn ls-btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 ls-section">
          <div className="ls-section-content">
            <h3 className="text-lg font-bold text-white mb-4">What Happens Next?</h3>
            <ol className="space-y-3 text-sm text-[#d0d0d0]">
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] font-bold">1.</span>
                <span>Your report is logged and assigned a unique ID</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] font-bold">2.</span>
                <span>Our moderation team reviews the report and evidence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] font-bold">3.</span>
                <span>If valid, appropriate action is taken (warning, ban, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#3b82f6] font-bold">4.</span>
                <span>For privacy reasons, you won't be notified of the outcome</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}