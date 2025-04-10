import express from 'express';
const router = express.Router();
import {
  createUser,
  getSingleUser,
  saveWine,
  deleteWine,
  login,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authenticateToken, saveWine);

router.route('/login').post(login);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/wines/:wineId').delete(authenticateToken, deleteWine);

export default router;