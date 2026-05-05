# Interview Vault — Supabase Setup

This guide gets the Interview Vault auth and database working end-to-end.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**, pick a name (e.g. `portfolio-vault`) and set a database password
3. Wait ~2 min for provisioning

---

## 2. Get your API keys

In your Supabase project dashboard:

1. Go to **Settings → API**
2. Copy:
   - **Project URL** → `https://xxxx.supabase.co`
   - **anon / public key** → long JWT string

---

## 3. Set up environment variables

Create a `.env.local` file at the root of this project (it's gitignored):

```bash
cp .env.example .env.local
```

Then fill in your values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Restart the dev server after creating the file.

---

## 4. Enable Email Auth

In your Supabase project:

1. Go to **Authentication → Providers**
2. Make sure **Email** is enabled
3. (Optional) Disable email confirmation for development: **Authentication → Email Templates → Confirm signup** → toggle off "Enable email confirmations"

---

## 5. Create database tables (optional)

Currently the vault uses mock data. To store real notes in Supabase, run this SQL in **SQL Editor**:

```sql
-- Interview notes
create table interview_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  company text not null,
  role text not null,
  round text not null,
  date text,
  questions text[],
  notes text,
  result text check (result in ('pending', 'passed', 'rejected')) default 'pending',
  created_at timestamptz default now()
);

-- Networking notes
create table networking_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  company text not null,
  date text,
  context text,
  takeaways text,
  follow_up text,
  created_at timestamptz default now()
);

-- Company prep notes
create table company_prep (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  company text not null,
  role text not null,
  stage text check (stage in ('researching', 'applied', 'interviewing', 'offer', 'rejected')) default 'researching',
  notes text,
  resources text[],
  created_at timestamptz default now()
);

-- Enable Row Level Security (users can only see their own rows)
alter table interview_notes enable row level security;
alter table networking_notes enable row level security;
alter table company_prep enable row level security;

create policy "Own notes only" on interview_notes
  for all using (auth.uid() = user_id);

create policy "Own notes only" on networking_notes
  for all using (auth.uid() = user_id);

create policy "Own notes only" on company_prep
  for all using (auth.uid() = user_id);
```

---

## 6. Wire up Supabase queries in InterviewVault.tsx

Replace the mock arrays with real Supabase calls:

```ts
import { supabase } from '../lib/supabase';

// Fetch interview notes for the current user
const { data, error } = await supabase
  .from('interview_notes')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 7. Netlify environment variables

When deploying to Netlify, add the env vars in:

**Site Settings → Environment variables → Add variable**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do **not** add secrets to `netlify.toml`.
