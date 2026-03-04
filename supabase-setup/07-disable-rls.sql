-- ============================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- This disables Row Level Security on all tables
-- so the anon key can perform all operations.
-- ============================================

ALTER TABLE IF EXISTS admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS company_stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS research_papers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS research_partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS research_team DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS research_inquiries DISABLE ROW LEVEL SECURITY;

-- Verify: should show all tables with rls disabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
