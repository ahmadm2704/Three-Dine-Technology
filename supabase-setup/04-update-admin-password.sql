-- Update admin user with proper password hash
-- Replace 'YOUR_GENERATED_HASH_HERE' with the hash from the script above
UPDATE admin_users 
SET password_hash = 'YOUR_GENERATED_HASH_HERE'
WHERE email = 'admin@threedinetech.com';
