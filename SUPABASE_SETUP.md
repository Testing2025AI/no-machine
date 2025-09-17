# Supabase Database Setup

## Quick Setup Instructions

### 1. Access Supabase SQL Editor
1. Go to your Supabase project: https://zyrypbrxqiuwrityeiol.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**

### 2. Create Database Schema
Copy and paste the entire contents of `supabase/schema.sql` into the SQL editor and click **"Run"**.

This will create:
- `responses` table for storing boundary coaching sessions
- Row Level Security (RLS) policies for user data protection
- Indexes for better performance
- Automatic timestamp updates

### 3. Verify Setup
After running the schema:
1. Go to **"Table Editor"** in the left sidebar
2. You should see a new **"responses"** table
3. The table should have all the columns for storing boundary responses and images

### 4. Test Database Connection
Once you run `npm run dev`, the app should connect automatically using your configured environment variables.

## Database Schema Overview

```sql
responses table:
├── id (UUID, Primary Key)
├── user_id (UUID, Foreign Key to auth.users)
├── scenario (TEXT) - User's boundary situation
├── quick_take (TEXT) - Reformed Doormat's insight
├── [soft|clear|wall]_use_when (TEXT) - When to use each boundary
├── [soft|clear|wall]_script (TEXT) - Copy-paste scripts
├── [soft|clear|wall]_why_works (TEXT) - Explanations
├── image_prompt_1/2/3 (TEXT) - FAL.ai prompts
├── image_url_1/2/3 (TEXT) - Generated image URLs
├── reformed_doormat_note (TEXT) - Personal validation
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Row Level Security
- Users can only see/modify their own responses
- Anonymous users cannot access any data
- Automatic user isolation via Supabase Auth

## Ready to Test!
Once the schema is set up, your app will be fully functional with data persistence.