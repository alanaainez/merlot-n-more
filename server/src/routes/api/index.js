import express from 'express';
import authRoutes from './auth-routes.js';
import wineRoutes from './wine-routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/wines', wineRoutes);

export default router;
