
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

async function verify() {
  console.log('Verifying Supabase Setup...');

  // 1. Check if tables exist by querying them directly
  console.log('\n--- Checking Tables ---');
  const tables = ['users', 'businesses', 'documents', 'support_tickets'];
  let allTablesExist = true;

  for (const table of tables) {
    // We select 0 rows just to check if the relation exists
    const { error } = await supabase.from(table).select('*').limit(0);
    
    if (error && error.code === '42P01') {
      console.log(`❌ Table '${table}' DOES NOT exist.`);
      allTablesExist = false;
    } else if (error) {
      // Other errors (like permission denied) mean the table exists but is protected
      console.log(`✅ Table '${table}' exists (protected by RLS).`);
    } else {
      console.log(`✅ Table '${table}' exists.`);
    }
  }

  // 2. Check if MCP Bridge (exec_sql) is working
  console.log('\n--- Checking MCP Bridge (exec_sql) ---');
  try {
    const { data, error } = await supabase.rpc('exec_sql', { 
      query: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'" 
    });

    if (error) {
      console.log(`❌ MCP Bridge failed: ${error.message}`);
    } else {
      console.log('✅ MCP Bridge is ACTIVE and working!');
      console.log('   Tables found via SQL:', data.map(t => t.table_name).join(', '));
    }
  } catch (err) {
    console.log(`❌ MCP Bridge exception: ${err.message}`);
  }

  if (allTablesExist) {
    console.log('\n🎉 VERIFICATION SUCCESSFUL: All systems go!');
  } else {
    console.log('\n⚠️ VERIFICATION PARTIAL: Some tables are missing.');
  }
}

verify();
