-- ========================================
-- COMPLETE DATABASE SYNCHRONIZATION
-- ========================================
-- This script adds ALL missing columns from Prisma schema to the database
-- Run this in Supabase SQL Editor to fix character creation errors

-- Step 1: Create UserRole enum (if not exists)
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('USER', 'VIP', 'MODERATOR', 'ADMIN', 'OWNER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- If UserRole already exists, add OWNER value to it
DO $$ BEGIN
    ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'OWNER';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add missing columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS role "UserRole" DEFAULT 'USER',
ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "bannedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "bannedBy" TEXT,
ADD COLUMN IF NOT EXISTS "banReason" TEXT;

-- Step 3: Add missing physical stats and gender columns to characters table
ALTER TABLE characters
ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male',
ADD COLUMN IF NOT EXISTS endurance INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS speed INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS agility INTEGER DEFAULT 10;

-- Step 4: Verify characters table has all required columns
-- If any of these are missing, add them:
ALTER TABLE characters
ADD COLUMN IF NOT EXISTS health INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS "maxHealth" INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS energy INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS "maxEnergy" INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS strength INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS intelligence INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS charisma INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS stamina INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS shooting INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS driving INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS stealth INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS lockpicking INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS hacking INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS management INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS negotiation INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS accounting INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS marketing INTEGER DEFAULT 0;

-- Step 5: Create indexes for performance (if not exists)
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);
CREATE INDEX IF NOT EXISTS users_banned_idx ON users(banned);

-- Step 6: Set existing users to USER role if they don't have one
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Step 7: Set your specific user to OWNER (highest role - developer access)
-- IMPORTANT: Replace 'przemo1@gmail.com' with your actual email!
UPDATE users
SET role = 'OWNER'
WHERE email = 'przemo1@gmail.com';

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if all columns exist in users table
SELECT
    column_name,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
  AND column_name IN ('role', 'banned', 'bannedAt', 'bannedBy', 'banReason')
ORDER BY column_name;

-- Check if physical stats columns exist in characters table
SELECT
    column_name,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'characters'
  AND column_name IN ('endurance', 'speed', 'agility', 'strength', 'stamina')
ORDER BY column_name;

-- Check your admin status
SELECT id, email, role, banned
FROM users
WHERE email = 'przemo1@gmail.com';

-- Check UserRole enum values
SELECT enumlabel
FROM pg_enum
JOIN pg_type ON pg_enum.enumtypid = pg_type.oid
WHERE pg_type.typname = 'UserRole'
ORDER BY enumlabel;

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
-- If you see results above with no errors, the migration succeeded!
-- Next steps:
-- 1. Restart your development server (npm run dev)
-- 2. Refresh the browser (F5)
-- 3. Try creating a character
-- 4. Check if admin button appears in TopBar
