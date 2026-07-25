const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return !url.includes('your-supabase-project-id');
  } catch (_) {
    return false;
  }
};

if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('=== USING SUPABASE ===');
  } catch (error) {
    console.error('Error initializing Supabase client:', error.message);
  }
} else {
  console.warn(
    // '========================================================================\n' +
    // 'WARNING: Supabase credentials are not configured or are invalid.\n' +
    // 'The backend will run using a local in-memory database for testing.\n' +
    // 'Set valid SUPABASE_URL and SUPABASE_ANON_KEY in backend/.env to use PostgreSQL.\n' +
    // '========================================================================'
   ' === USING LOCAL MOCK MODE ==='
  );
}

module.exports = supabase;
