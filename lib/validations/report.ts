/**
 * Report Validation Schema
 * Comprehensive validation for player reports
 */

import { z } from 'zod'

// Allowed violation types matching Prisma enum
export const ViolationTypes = [
  'CHEATING',
  'EXPLOITING',
  'HARASSMENT',
  'SPAM',
  'INAPPROPRIATE_CONTENT',
  'ACCOUNT_SHARING',
  'REAL_MONEY_TRADING',
  'OTHER'
] as const

export const reportSubmissionSchema = z.object({
  targetUsername: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username contains invalid characters'),

  violationType: z.enum(ViolationTypes, {
    required_error: 'Violation type is required',
    invalid_type_error: 'Invalid violation type selected'
  }),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be at most 2000 characters')
    .trim(),

  evidence: z
    .string()
    .max(500, 'Evidence URL must be at most 500 characters')
    .url('Evidence must be a valid URL')
    .optional()
    .or(z.literal('')),

  incidentDate: z
    .string()
    .datetime('Invalid date format')
    .refine((date) => {
      const incidentDate = new Date(date)
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      // Incident must not be in the future
      if (incidentDate > now) {
        return false
      }

      // Incident must be within last 30 days
      if (incidentDate < thirtyDaysAgo) {
        return false
      }

      return true
    }, 'Incident date must be within the last 30 days and not in the future')
})

export type ReportSubmission = z.infer<typeof reportSubmissionSchema>

// Helper function to format validation errors
export function formatValidationErrors(error: z.ZodError): string[] {
  return error.errors.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
}
