import express from 'express';
import { signToken } from '../../services/auth.js';
import User from '../../models/User.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      console.log('Incorrect password for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user.username, user._id);
    res.json({ 
      token,
      user: {
        _id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ username, password });
    const token = signToken(user.username, user._id);
    
    res.json({ 
      token,
      user: {
        _id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

export default router;
