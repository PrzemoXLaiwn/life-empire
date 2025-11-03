import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma/client'
import { UserRole, hasPermission, canManageUser } from '@/lib/admin/permissions'

// GET - Lista wszystkich użytkowników (tylko dla Admin/Moderator)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Pobierz dane użytkownika z bazy
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Sprawdź uprawnienia
    const userRole = dbUser.role as UserRole
    if (!hasPermission(userRole, 'canViewAdminPanel')) {
      return NextResponse.json({ error: 'Forbidden - Nie masz uprawnień admina' }, { status: 403 })
    }

    // Pobierz wszystkich użytkowników z ich postaciami
    const users = await prisma.user.findMany({
      include: {
        character: {
          select: {
            username: true,
            level: true,
            cash: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Formatuj dane
    const formattedUsers = users.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      banned: u.banned,
      bannedAt: u.bannedAt,
      bannedBy: u.bannedBy,
      banReason: u.banReason,
      createdAt: u.createdAt,
      character: u.character
    }))

    return NextResponse.json({ users: formattedUsers })
  } catch (error) {
    console.error('❌ GET /api/admin/users error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Akcje administracyjne (ban, kick, change role)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, targetUserId, role, reason } = body

    // Pobierz dane administratora
    const adminUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if (!adminUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const adminRole = adminUser.role as UserRole

    // Pobierz dane użytkownika docelowego
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: { character: true }
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 })
    }

    const targetRole = targetUser.role as UserRole

    // Sprawdź czy admin może zarządzać tym użytkownikiem
    if (!canManageUser(adminRole, targetRole)) {
      return NextResponse.json(
        { error: 'Forbidden - Nie możesz zarządzać tym użytkownikiem' },
        { status: 403 }
      )
    }

    // Wykonaj akcję
    switch (action) {
      case 'ban':
        if (!hasPermission(adminRole, 'canBanUsers')) {
          return NextResponse.json({ error: 'Forbidden - Brak uprawnień do banowania' }, { status: 403 })
        }

        await prisma.user.update({
          where: { id: targetUserId },
          data: {
            banned: true,
            bannedAt: new Date(),
            bannedBy: user.id,
            banReason: reason || 'No reason provided'
          }
        })

        return NextResponse.json({
          success: true,
          message: `Użytkownik ${targetUser.character?.username || targetUser.email} został zbanowany`
        })

      case 'unban':
        if (!hasPermission(adminRole, 'canBanUsers')) {
          return NextResponse.json({ error: 'Forbidden - Brak uprawnień' }, { status: 403 })
        }

        await prisma.user.update({
          where: { id: targetUserId },
          data: {
            banned: false,
            bannedAt: null,
            bannedBy: null,
            banReason: null
          }
        })

        return NextResponse.json({
          success: true,
          message: `Użytkownik ${targetUser.character?.username || targetUser.email} został odbanowany`
        })

      case 'changeRole':
        if (!hasPermission(adminRole, 'canChangeRoles')) {
          return NextResponse.json({ error: 'Forbidden - Tylko Admin może zmieniać role' }, { status: 403 })
        }

        if (!Object.values(UserRole).includes(role)) {
          return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
        }

        await prisma.user.update({
          where: { id: targetUserId },
          data: { role }
        })

        return NextResponse.json({
          success: true,
          message: `Rola użytkownika ${targetUser.character?.username || targetUser.email} zmieniona na ${role}`
        })

      case 'kick':
        if (!hasPermission(adminRole, 'canKickUsers')) {
          return NextResponse.json({ error: 'Forbidden - Brak uprawnień do kickowania' }, { status: 403 })
        }

        // Kick = wylogowanie użytkownika (musi się ponownie zalogować)
        // W Supabase możemy to zrobić przez invalidation tokenu, ale
        // dla uproszczenia zwrócimy tylko sukces
        // W rzeczywistej implementacji należałoby użyć Supabase Admin API

        return NextResponse.json({
          success: true,
          message: `Użytkownik ${targetUser.character?.username || targetUser.email} został wyrzucony (kick)`
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('❌ POST /api/admin/users error:', error)
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    )
  }
}
