
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.log('Missing credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
  console.log('Starting Freemium Migration...');

  const queries = [
    // 1. Add 'plan' to users
    "ALTER TABLE public.users ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free'",
    
    // 2. Add LLC specific fields to businesses
    "ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS ein_status TEXT DEFAULT 'Pending'",
    "ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS compliance_status TEXT DEFAULT 'Good Standing'",
    "ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS registered_agent_name TEXT",
    "ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS annual_report_due TIMESTAMPTZ"
  ];

  for (const query of queries) {
    console.log(`Executing: ${query}`);
    const { error } = await supabase.rpc('exec_sql', { query });
    if (error) {
      console.error(`❌ Error: ${error.message}`);
    } else {
      console.log('✅ Success');
    }
  }

  console.log('\nMigration Complete.');
}

migrate();
