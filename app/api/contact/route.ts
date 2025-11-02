// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(identifier)

  if (!userLimit || now > userLimit.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + 3600000 }) // 1 hour
    return true
  }

  if (userLimit.count >= 5) { // Max 5 submissions per hour
    return false
  }

  userLimit.count++
  return true
}

function sanitizeInput(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, category, message } = body

    // Validation
    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Rate limiting by email
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in an hour.' },
        { status: 429 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      category: sanitizeInput(category),
      message: sanitizeInput(message)
    }

    // Store in database (create ContactMessage model if needed)
    // For now, we'll log to GameEvent as a workaround
    await prisma.gameEvent.create({
      data: {
        type: 'contact',
        message: `Contact form submission from ${sanitizedData.name} (${sanitizedData.email}): ${sanitizedData.subject}`,
        userId: null,
        username: sanitizedData.name,
        avatar: null
      }
    })

    // TODO: Send email notification to admin
    console.log('📧 Contact Form Submission:', sanitizedData)

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}