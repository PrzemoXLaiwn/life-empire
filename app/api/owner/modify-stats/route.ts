import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// POST - Owner can modify their own character stats
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is OWNER
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true }
    })

    if (!dbUser || dbUser.role !== 'OWNER') {
      return NextResponse.json({ error: 'Access denied. OWNER role required.' }, { status: 403 })
    }

    const body = await request.json()

    // Owner can modify ANY stat - no restrictions!
    const allowedUpdates: any = {}

    // Financial
    if (body.hasOwnProperty('cash')) allowedUpdates.cash = parseInt(body.cash)
    if (body.hasOwnProperty('dirtyCash')) allowedUpdates.dirtyCash = parseInt(body.dirtyCash)
    if (body.hasOwnProperty('bankBalance')) allowedUpdates.bankBalance = parseInt(body.bankBalance)

    // Level & XP
    if (body.hasOwnProperty('level')) allowedUpdates.level = parseInt(body.level)
    if (body.hasOwnProperty('experience')) allowedUpdates.experience = parseInt(body.experience)
    if (body.hasOwnProperty('reputation')) allowedUpdates.reputation = parseInt(body.reputation)

    // Health & Energy
    if (body.hasOwnProperty('health')) allowedUpdates.health = parseInt(body.health)
    if (body.hasOwnProperty('maxHealth')) allowedUpdates.maxHealth = parseInt(body.maxHealth)
    if (body.hasOwnProperty('energy')) allowedUpdates.energy = parseInt(body.energy)
    if (body.hasOwnProperty('maxEnergy')) allowedUpdates.maxEnergy = parseInt(body.maxEnergy)

    // Attributes
    if (body.hasOwnProperty('strength')) allowedUpdates.strength = parseInt(body.strength)
    if (body.hasOwnProperty('intelligence')) allowedUpdates.intelligence = parseInt(body.intelligence)
    if (body.hasOwnProperty('charisma')) allowedUpdates.charisma = parseInt(body.charisma)
    if (body.hasOwnProperty('stamina')) allowedUpdates.stamina = parseInt(body.stamina)

    // Physical Stats (Gym)
    if (body.hasOwnProperty('endurance')) allowedUpdates.endurance = parseInt(body.endurance)
    if (body.hasOwnProperty('speed')) allowedUpdates.speed = parseInt(body.speed)
    if (body.hasOwnProperty('agility')) allowedUpdates.agility = parseInt(body.agility)

    // Criminal Skills
    if (body.hasOwnProperty('shooting')) allowedUpdates.shooting = parseInt(body.shooting)
    if (body.hasOwnProperty('driving')) allowedUpdates.driving = parseInt(body.driving)
    if (body.hasOwnProperty('stealth')) allowedUpdates.stealth = parseInt(body.stealth)
    if (body.hasOwnProperty('lockpicking')) allowedUpdates.lockpicking = parseInt(body.lockpicking)
    if (body.hasOwnProperty('hacking')) allowedUpdates.hacking = parseInt(body.hacking)

    // Business Skills
    if (body.hasOwnProperty('management')) allowedUpdates.management = parseInt(body.management)
    if (body.hasOwnProperty('negotiation')) allowedUpdates.negotiation = parseInt(body.negotiation)
    if (body.hasOwnProperty('accounting')) allowedUpdates.accounting = parseInt(body.accounting)
    if (body.hasOwnProperty('marketing')) allowedUpdates.marketing = parseInt(body.marketing)

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    const character = await prisma.character.update({
      where: { userId: user.id },
      data: allowedUpdates,
      include: { city: true }
    })

    console.log('✅ OWNER modified stats:', Object.keys(allowedUpdates))

    return NextResponse.json({
      success: true,
      character,
      modified: Object.keys(allowedUpdates)
    })
  } catch (error) {
    console.error('❌ POST /api/owner/modify-stats error:', error)
    return NextResponse.json(
      { error: 'Failed to modify stats' },
      { status: 500 }
    )
  }
}
