-- Quick script to make yourself admin
-- Replace 'YOUR_EMAIL_HERE' with your actual email

-- Option 1: Set specific user as ADMIN by email
UPDATE users
SET role = 'ADMIN'
WHERE email = 'YOUR_EMAIL_HERE';

-- Option 2: Set ALL users as ADMIN (for testing only!)
-- UPDATE users SET role = 'ADMIN';

-- Option 3: Make first user ADMIN
-- UPDATE users SET role = 'ADMIN' WHERE id = (SELECT id FROM users ORDER BY "createdAt" LIMIT 1);

-- Verify the change
SELECT id, email, role, banned FROM users WHERE role = 'ADMIN';
