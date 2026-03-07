CREATE TABLE IF NOT EXISTS research_case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  category VARCHAR(255),
  client_name VARCHAR(255),
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE IF EXISTS research_case_studies DISABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_research_case_studies_published ON research_case_studies(is_published);
CREATE INDEX IF NOT EXISTS idx_research_case_studies_sort_order ON research_case_studies(sort_order);