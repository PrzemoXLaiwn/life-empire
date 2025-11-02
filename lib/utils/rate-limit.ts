/**
 * Rate Limiting Utilities
 * Redis-based rate limiting for various actions
 */

import redis from '@/lib/redis/client'

export interface RateLimitConfig {
  maxAttempts: number
  windowSeconds: number
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Check if an action is rate limited
 * @param identifier - Unique identifier (userId, email, IP, etc.)
 * @param action - Action type (e.g., 'report', 'login', 'message')
 * @param config - Rate limit configuration
 */
export async function checkRateLimit(
  identifier: string,
  action: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const key = `ratelimit:${action}:${identifier}`

  try {
    // Increment the counter
    const current = await redis.incr(key)

    // Set expiry on first request
    if (current === 1) {
      await redis.expire(key, config.windowSeconds)
    }

    // Get TTL to calculate reset time
    const ttl = await redis.ttl(key)
    const resetAt = Date.now() + (ttl * 1000)

    return {
      allowed: current <= config.maxAttempts,
      remaining: Math.max(0, config.maxAttempts - current),
      resetAt
    }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Fail open - allow the request if Redis is down
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetAt: Date.now() + (config.windowSeconds * 1000)
    }
  }
}

/**
 * Reset rate limit for an identifier
 * Useful for testing or manual intervention
 */
export async function resetRateLimit(identifier: string, action: string): Promise<void> {
  const key = `ratelimit:${action}:${identifier}`
  await redis.del(key)
}

/**
 * Get current rate limit status without incrementing
 */
export async function getRateLimitStatus(
  identifier: string,
  action: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const key = `ratelimit:${action}:${identifier}`

  try {
    const current = await redis.get(key) as number | null
    const ttl = await redis.ttl(key)

    const currentCount = current || 0
    const resetAt = ttl > 0 ? Date.now() + (ttl * 1000) : Date.now() + (config.windowSeconds * 1000)

    return {
      allowed: currentCount < config.maxAttempts,
      remaining: Math.max(0, config.maxAttempts - currentCount),
      resetAt
    }
  } catch (error) {
    console.error('Get rate limit status failed:', error)
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetAt: Date.now() + (config.windowSeconds * 1000)
    }
  }
}

/**
 * Pre-configured rate limits for common actions
 */
export const RATE_LIMITS = {
  REPORT_SUBMISSION: {
    maxAttempts: 3,
    windowSeconds: 3600 // 1 hour
  },
  LOGIN_ATTEMPT: {
    maxAttempts: 5,
    windowSeconds: 900 // 15 minutes
  },
  MESSAGE_SEND: {
    maxAttempts: 20,
    windowSeconds: 60 // 1 minute
  },
  API_GENERAL: {
    maxAttempts: 100,
    windowSeconds: 60 // 1 minute
  }
} as const
