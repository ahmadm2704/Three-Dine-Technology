-- Enable Row Level Security on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for public content
CREATE POLICY "Public projects are viewable by everyone" ON projects
  FOR SELECT USING (is_public = true);

CREATE POLICY "Public team members are viewable by everyone" ON team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Active services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Active company stats are viewable by everyone" ON company_stats
  FOR SELECT USING (is_active = true);

CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Active testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_active = true);

-- Contact form submissions - anyone can insert
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Newsletter subscriptions - anyone can insert
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Admin access policies (you'll need to implement proper auth checks)
-- For now, we'll allow service role access for admin operations
CREATE POLICY "Service role can manage all data" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage projects" ON projects
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage team members" ON team_members
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage services" ON services
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage company stats" ON company_stats
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage newsletter subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');
