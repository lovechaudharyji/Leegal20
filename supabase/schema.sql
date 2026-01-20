-- Enable the execution of dynamic SQL (Required for MCP 'execute_sql' tool)
-- WARNING: This function allows executing arbitrary SQL. Use with caution.
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  EXECUTE 'SELECT json_agg(t) FROM (' || query || ') t' INTO result;
  RETURN result;
END;
$$;

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  state TEXT,
  formation_date DATE,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'Suspended', 'Dissolved')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for businesses
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Policies for businesses
CREATE POLICY "Users can view their own businesses" 
  ON public.businesses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own businesses" 
  ON public.businesses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own businesses" 
  ON public.businesses FOR UPDATE 
  USING (auth.uid() = user_id);

-- Documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Formation Documents', 'EIN Documents', 'Banking Documents', 'Compliance Documents', 'Other')),
  file_url TEXT,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Missing', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Policies for documents
CREATE POLICY "Users can view their own documents" 
  ON public.documents FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" 
  ON public.documents FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Support Tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for support_tickets
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for support_tickets
CREATE POLICY "Users can view their own tickets" 
  ON public.support_tickets FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets" 
  ON public.support_tickets FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Trigger to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
