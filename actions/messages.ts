'use server'

/**
 * Messages Server Actions
 * Handles player-to-player messaging system
 */

import { prisma } from '@/lib/prisma/client'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

/**
 * Get messages for a character (inbox or sent)
 */
export async function getMessages(characterId: string, type: 'inbox' | 'sent' = 'inbox', page: number = 1, limit: number = 20) {
  try {
    const skip = (page - 1) * limit

    const where = type === 'inbox'
      ? { receiverId: characterId }
      : { senderId: characterId }

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        }
      },
      orderBy: { sentAt: 'desc' },
      skip,
      take: limit,
    })

    const total = await prisma.message.count({ where })

    return {
      messages,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return { error: 'Failed to fetch messages' }
  }
}

/**
 * Get a single message by ID and mark as read
 */
export async function getMessage(messageId: string, characterId: string) {
  try {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        }
      }
    })

    if (!message) {
      return { error: 'Message not found' }
    }

    // Check if user has access to this message
    if (message.senderId !== characterId && message.receiverId !== characterId) {
      return { error: 'Unauthorized' }
    }

    // Mark as read if it's an inbox message
    if (message.receiverId === characterId && !message.isRead) {
      await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true }
      })
    }

    return { message: { ...message, isRead: true } }
  } catch (error) {
    console.error('Error fetching message:', error)
    return { error: 'Failed to fetch message' }
  }
}

/**
 * Send a message
 */
export async function sendMessage(fromId: string, toUsername: string, content: string) {
  try {
    // Validate content
    if (!content || content.trim().length === 0) {
      return { error: 'Message content cannot be empty' }
    }

    if (content.length > 500) {
      return { error: 'Message too long (max 500 characters)' }
    }

    // Find recipient by username
    const recipient = await prisma.character.findUnique({
      where: { username: toUsername },
      select: { id: true, username: true }
    })

    if (!recipient) {
      return { error: 'Player not found' }
    }

    if (recipient.id === fromId) {
      return { error: 'You cannot send a message to yourself' }
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        senderId: fromId,
        receiverId: recipient.id,
        content: content.trim(),
      },
      include: {
        sender: {
          select: {
            username: true,
            avatar: true,
            customAvatar: true,
          }
        },
        receiver: {
          select: {
            username: true,
            avatar: true,
            customAvatar: true,
          }
        }
      }
    })

    // Create notification for recipient
    await prisma.notification.create({
      data: {
        characterId: recipient.id,
        type: 'MESSAGE',
        title: 'New Message',
        message: `You received a message from ${message.sender.username}`,
        link: '/dashboard/messages',
      }
    })

    return { message, success: true }
  } catch (error) {
    console.error('Error sending message:', error)
    return { error: 'Failed to send message' }
  }
}

/**
 * Delete a message
 */
export async function deleteMessage(messageId: string, characterId: string) {
  try {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: { senderId: true, receiverId: true }
    })

    if (!message) {
      return { error: 'Message not found' }
    }

    // Only allow deletion if user is sender or receiver
    if (message.senderId !== characterId && message.receiverId !== characterId) {
      return { error: 'Unauthorized' }
    }

    await prisma.message.delete({
      where: { id: messageId }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting message:', error)
    return { error: 'Failed to delete message' }
  }
}

/**
 * Mark all messages as read
 */
export async function markAllAsRead(characterId: string) {
  try {
    await prisma.message.updateMany({
      where: {
        receiverId: characterId,
        isRead: false
      },
      data: { isRead: true }
    })

    return { success: true }
  } catch (error) {
    console.error('Error marking messages as read:', error)
    return { error: 'Failed to mark messages as read' }
  }
}

/**
 * Get unread message count
 */
export async function getUnreadCount(characterId: string) {
  try {
    const count = await prisma.message.count({
      where: {
        receiverId: characterId,
        isRead: false
      }
    })

    return { count }
  } catch (error) {
    console.error('Error getting unread count:', error)
    return { error: 'Failed to get unread count', count: 0 }
  }
}

/**
 * Search messages
 */
export async function searchMessages(characterId: string, query: string, type: 'inbox' | 'sent' = 'inbox') {
  try {
    const where = type === 'inbox'
      ? {
          receiverId: characterId,
          content: { contains: query, mode: 'insensitive' as const }
        }
      : {
          senderId: characterId,
          content: { contains: query, mode: 'insensitive' as const }
        }

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            customAvatar: true,
          }
        }
      },
      orderBy: { sentAt: 'desc' },
      take: 20,
    })

    return { messages }
  } catch (error) {
    console.error('Error searching messages:', error)
    return { error: 'Failed to search messages' }
  }
}
