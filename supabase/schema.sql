-- Create responses table for storing boundary coaching sessions
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario TEXT NOT NULL,
  quick_take TEXT,

  -- Boundary responses
  soft_use_when TEXT,
  soft_script TEXT,
  soft_why_works TEXT,

  clear_use_when TEXT,
  clear_script TEXT,
  clear_why_works TEXT,

  wall_use_when TEXT,
  wall_script TEXT,
  wall_why_works TEXT,

  -- Image data
  image_prompt_1 TEXT,
  image_prompt_2 TEXT,
  image_prompt_3 TEXT,
  image_url_1 TEXT,
  image_url_2 TEXT,
  image_url_3 TEXT,

  reformed_doormat_note TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_responses_updated_at
  BEFORE UPDATE ON responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to see only their own responses
CREATE POLICY "Users can view their own responses" ON responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own responses" ON responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own responses" ON responses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own responses" ON responses
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_responses_user_id ON responses(user_id);
CREATE INDEX idx_responses_created_at ON responses(created_at DESC);