
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

async function check() {
  // Try to select from one of the new tables
  const { data, error } = await supabase.from('businesses').select('*').limit(1);
  
  if (error) {
    // If error contains "relation \"public.businesses\" does not exist", then tables are not made.
    console.log('Error:', error.message);
    if (error.message.includes('relation "public.businesses" does not exist') || error.code === '42P01') {
      console.log('Result: NO');
    } else {
      console.log('Result: ERROR (but table might exist)');
    }
  } else {
    console.log('Result: YES');
  }
}

check();
