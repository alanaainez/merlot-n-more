import express from 'express';
import axios from 'axios';
import { authenticateToken } from '../../services/auth.js';
import User from '../../models/User.js';

const router = express.Router();
const SPOONACULAR_API_KEY = process.env.VITE_SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/food/wine';

// GET /api/wines/search
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recommendation`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        wine: query,
        number: 12
      }
    });
    res.json(response.data.recommendedWines);
  } catch (err) {
    console.error('Error fetching from Spoonacular:', err);
    res.status(500).json({ message: 'Error fetching wines' });
  }
});

// GET /api/wines/type/:type
router.get('/type/:type', async (req, res) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/recommendation`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        wine: req.params.type,
        number: 12
      }
    });
    res.json(response.data.recommendedWines);
  } catch (err) {
    console.error('Error fetching from Spoonacular:', err);
    res.status(500).json({ message: 'Error fetching wines' });
  }
});

// GET /api/wines/favorites
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user.savedWines });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// POST /api/wines/favorites
router.post('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { savedWines: req.body } },
      { new: true }
    );
    res.json({ data: user.savedWines });
  } catch (err) {
    res.status(500).json({ message: 'Error saving wine' });
  }
});

// DELETE /api/wines/favorites/:id
router.delete('/favorites/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedWines: { wineId: req.params.id } } },
      { new: true }
    );
    res.json({ data: user.savedWines });
  } catch (err) {
    res.status(500).json({ message: 'Error removing wine' });
  }
});

export default router;
