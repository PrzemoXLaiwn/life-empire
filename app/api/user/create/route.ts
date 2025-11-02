import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/client'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, email } = body

    // Verify the userId matches authenticated user
    if (userId !== user.id) {
      return NextResponse.json({ error: 'User ID mismatch' }, { status: 403 })
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (existing) {
      return NextResponse.json({ success: true, user: existing })
    }

    // Create user record in Prisma
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email: email
      }
    })

    console.log('✅ User created in database:', newUser.id)

    return NextResponse.json({ success: true, user: newUser })
  } catch (error: any) {
    console.error('❌ Error creating user:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create user' 
    }, { status: 500 })
  }
}