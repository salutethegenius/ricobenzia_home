# Supabase CMS Setup Guide

This guide will help you set up Supabase for the CMS functionality.

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `ricobenzia-cms` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"
6. Wait for project to be created (~2 minutes)

## 2. Get API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 3. Create Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_JITSI_DOMAIN=meet.jit.si
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.

## 4. Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Paste the following SQL:

```sql
-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  field TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(section, field)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read all content
CREATE POLICY "Allow authenticated read" ON content
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to insert content
CREATE POLICY "Allow authenticated insert" ON content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update content
CREATE POLICY "Allow authenticated update" ON content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow public read (for website visitors)
CREATE POLICY "Allow public read" ON content
  FOR SELECT
  TO anon
  USING (true);
```

4. Click "Run" to execute the query

## 5. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: `admin@ricobenzia.com` (or your preferred email)
   - Password: (choose a strong password)
4. Click "Create user"
5. **Important**: Note down the email and password - you'll use this to log into the CMS

## 6. Test the Setup

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/login`
3. Log in with the admin credentials you created
4. You should see the CMS dashboard

## 7. Initial Content (Optional)

You can add initial content through the CMS interface, or use SQL:

```sql
-- Example: Add hero section content
INSERT INTO content (section, field, value) VALUES
  ('hero', 'title', '"RICO BENZIA"'),
  ('hero', 'subtitle', '"Where the tail ends is where the adventure begins"'),
  ('hero', 'description', '"Freedom Begins with Self Banking"')
ON CONFLICT (section, field) DO UPDATE SET value = EXCLUDED.value;
```

## 8. Create Messages Table (Contact Form)

Run this SQL in Supabase SQL Editor to enable the contact form:

```sql
-- Create messages table for contact form
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert messages
CREATE POLICY "Allow public insert" ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read messages
CREATE POLICY "Allow authenticated read" ON messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update messages
CREATE POLICY "Allow authenticated update" ON messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

## Troubleshooting

### "Supabase credentials not found" warning
- Make sure `.env` file exists in project root
- Verify environment variable names start with `VITE_`
- Restart the dev server after creating `.env`

### Can't log in
- Verify the user exists in Supabase Authentication
- Check email/password are correct
- Ensure RLS policies are set up correctly

### Content not saving
- Check browser console for errors
- Verify you're logged in as an authenticated user
- Check Supabase logs in dashboard

## Security Notes

- The `anon` key is safe to use in frontend code (it's public)
- RLS policies ensure only authenticated users can modify content
- Public users can only read content
- Never commit `.env` file to git (it's already in `.gitignore`)
