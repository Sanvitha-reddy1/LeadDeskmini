const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const supabase = require('../config/supabase');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'supersecretjwtkeychangeinproduction123!';

// Password helper function
const verifyPassword = (password, storedPassword) => {
  try {
    const [salt, originalHash] = storedPassword.split(':');
    if (!salt || !originalHash) return false;
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
};

// Fallback mock database admin (for local dev when Supabase is not configured)
const fallbackAdminUsername = process.env.ADMIN_USERNAME || 'admin';
const fallbackAdminPassword = process.env.ADMIN_PASSWORD || 'LeadDeskAdmin2026!';
const fallbackSalt = 'f83a54b3d6214fa39f8ed98c257d0001';
const fallbackHash = crypto.pbkdf2Sync(fallbackAdminPassword, fallbackSalt, 1000, 64, 'sha512').toString('hex');
const fallbackHashedPassword = `${fallbackSalt}:${fallbackHash}`;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    let user = null;

    if (supabase) {
      // Query users table from Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username.trim())
        .maybeSingle(); // maybeSingle doesn't throw if no rows found

      if (error) {
        console.error('Supabase query error during login:', error);
        return res.status(500).json({ error: 'Database error during authentication.' });
      }

      user = data;
    }

    // Authentication check
    if (user) {
      // Verify using stored PBKDF2 hash
      const isValid = verifyPassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      const token = jwt.sign(
        { username: user.username, role: 'admin' },
        jwtSecret,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        admin: { username: user.username }
      });
    } else {
      // If no user found in Supabase OR running in mock fallback mode, check against environmental fallback admin
      if (username.trim() === fallbackAdminUsername) {
        const isValid = verifyPassword(password, fallbackHashedPassword);
        if (!isValid) {
          return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign(
          { username: fallbackAdminUsername, role: 'admin' },
          jwtSecret,
          { expiresIn: '24h' }
        );

        return res.status(200).json({
          message: 'Login successful (Local/Fallback Mode)',
          token,
          admin: { username: fallbackAdminUsername }
        });
      }
    }

    return res.status(401).json({ error: 'Invalid username or password.' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
};
