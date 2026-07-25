const crypto = require('crypto');
const supabase = require('./supabase');
require('dotenv').config();

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

const initializeDatabase = async () => {
  if (!supabase) return;

  try {
    console.log('Verifying users database table status...');
    
    // Check if table exists by selecting 1 row
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      // Table doesn't exist error (typically 42P01 in PG / undefined table relation)
      if (error.code === '42P01' || error.message.includes('does not exist') || error.message.includes('relation')) {
        console.warn(
          '========================================================================\n' +
          'DATABASE WARNING: The "users" table does not exist in your database.\n' +
          'Please execute the schema.sql script in your Supabase SQL editor.\n' +
          '========================================================================'
        );
      } else {
        console.error('Database connection error during initialization:', error.message);
      }
      return;
    }

    // Seed if empty
    if (data && data.length === 0) {
      console.log('No user accounts detected. Seeding default admin...');
      const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'LeadDeskAdmin2026!';
      
      // Let's use the password from env if available, otherwise a default
      const adminPass = process.env.ADMIN_PASSWORD || 'LeadDeskAdmin2026!';
      const hashedPassword = hashPassword(adminPass);

      const { error: seedError } = await supabase
        .from('users')
        .insert([{ username: defaultUsername, password: hashedPassword }]);

      if (seedError) {
        console.error('Error seeding default admin account:', seedError.message);
      } else {
        console.log(`Successfully created default admin user "${defaultUsername}" in database.`);
      }
    } else {
      console.log('Admin users check: OK.');
    }
  } catch (err) {
    console.error('Database initialization failed:', err.message);
  }
};

module.exports = {
  initializeDatabase,
  hashPassword
};
