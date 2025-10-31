import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif'])
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 2MB allowed' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WEBP allowed' },
        { status: 400 }
      )
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ALLOWED_EXTENSIONS.has(fileExt)) {
      return NextResponse.json(
        { error: 'Invalid file extension' },
        { status: 400 }
      )
    }

    // Get current character to check for old avatar
    const currentCharacter = await prisma.character.findUnique({
      where: { userId: user.id },
      select: { customAvatar: true }
    })

    // Delete old custom avatar if exists
    if (currentCharacter?.customAvatar) {
      try {
        // Extract file path from URL
        const oldUrl = new URL(currentCharacter.customAvatar)
        const oldPath = oldUrl.pathname.split('/avatars/').pop()
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath])
        }
      } catch (err) {
        console.warn('Failed to delete old avatar:', err)
        // Continue anyway - not critical
      }
    }

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600'
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    await prisma.character.update({
      where: { userId: user.id },
      data: {
        avatar: 'custom',
        customAvatar: urlData.publicUrl
      }
    })

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      message: 'Avatar uploaded successfully!'
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}