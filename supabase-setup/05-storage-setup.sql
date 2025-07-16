-- Create storage bucket for team images
INSERT INTO storage.buckets (id, name, public) VALUES ('team-images', 'team-images', true);

-- Create storage policies
CREATE POLICY "Public team images are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'team-images');

CREATE POLICY "Authenticated users can upload team images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'team-images' AND auth.role() = 'authenticated');

CREATE POLICY "Service role can manage team images" ON storage.objects
  FOR ALL USING (bucket_id = 'team-images' AND auth.role() = 'service_role');
