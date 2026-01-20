
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Construct connection string
// PROJECT_ID from env or manually set
const PROJECT_ID = 'ovuzthykwubxlbehzwlr';
const rawPassword = process.argv[2]; // Passed as argument

if (!rawPassword) {
  console.error('Please provide database password as argument');
  process.exit(1);
}

// URL Encode the password to handle special characters like '@'
const encodedPassword = encodeURIComponent(rawPassword);

const connectionString = `postgres://postgres.ovuzthykwubxlbehzwlr:${encodedPassword}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

console.log(`Connecting to database... (Host: db.${PROJECT_ID}.supabase.co)`);

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    await client.connect();
    console.log('Connected successfully.');

    const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running schema migration...');
    await client.query(sql);
    
    console.log('Schema migration completed successfully!');
    
    // Verify tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Current tables in public schema:');
    res.rows.forEach(r => console.log(` - ${r.table_name}`));

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

runMigration();
