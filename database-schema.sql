-- Create leads table for email signups
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  source text, -- where they came from (landing page, etc)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create click_events table for tracking user interactions
CREATE TABLE click_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL, -- 'signup_click', 'cta_click', 'feature_click', etc
  event_data jsonb, -- flexible data storage for event details
  user_agent text,
  ip_address inet,
  referrer text,
  page_url text,
  session_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
CREATE POLICY "Enable read access for all users" ON leads FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON leads FOR INSERT WITH CHECK (true);

-- Create policies for click_events table  
CREATE POLICY "Enable read access for all users" ON click_events FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON click_events FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for leads table
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_click_events_type ON click_events(event_type);
CREATE INDEX idx_click_events_created_at ON click_events(created_at);