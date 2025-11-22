-- Migration: Add CV/Interview System Fields
-- Date: 2025-01-06
-- Description: Adds fields for CV builder, interview system, probation tracking, and bad references

-- Add new fields to Character table
ALTER TABLE "characters" 
ADD COLUMN IF NOT EXISTS "on_probation" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "probation_days_left" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "probation_performance_required" INTEGER DEFAULT 75,
ADD COLUMN IF NOT EXISTS "lied_on_resume" BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS "bad_reference_until" TIMESTAMP;

-- Create ApplicationStatus enum
DO $$ BEGIN
    CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'INTERVIEW_SCHEDULED', 'INTERVIEW_COMPLETED', 'ACCEPTED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create JobApplication table
CREATE TABLE IF NOT EXISTS "job_applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "character_id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    
    -- CV Data
    "cv_data" JSONB NOT NULL DEFAULT '{}',
    
    -- Application Status
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "suspicion_level" INTEGER NOT NULL DEFAULT 0,
    
    -- Interview
    "interview_scheduled" BOOLEAN NOT NULL DEFAULT false,
    "interview_score" INTEGER,
    "interview_answers" JSONB,
    
    -- Result
    "offered_position" TEXT,
    "offered_salary" BIGINT,
    
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "job_applications_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE,
    CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE
);

-- Create indexes for JobApplication
CREATE INDEX IF NOT EXISTS "job_applications_character_id_idx" ON "job_applications"("character_id");
CREATE INDEX IF NOT EXISTS "job_applications_job_id_idx" ON "job_applications"("job_id");
CREATE INDEX IF NOT EXISTS "job_applications_status_idx" ON "job_applications"("status");

-- Add comment
COMMENT ON TABLE "job_applications" IS 'Stores job applications with CV data, interview results, and probation tracking';
