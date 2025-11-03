-- Migration: Add Admin System
-- Description: Adds role management and ban system to users table
-- Date: 2025-11-03

-- Step 1: Create UserRole enum
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('USER', 'VIP', 'MODERATOR', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS role "UserRole" DEFAULT 'USER',
ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "bannedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "bannedBy" TEXT,
ADD COLUMN IF NOT EXISTS "banReason" TEXT;

-- Step 3: Create index for faster queries
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
CREATE INDEX IF NOT EXISTS users_banned_idx ON users(banned);

-- Step 4: Set existing users to USER role if they don't have one
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Verify the changes
SELECT
    column_name,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name IN ('role', 'banned', 'bannedAt', 'bannedBy', 'banReason');
