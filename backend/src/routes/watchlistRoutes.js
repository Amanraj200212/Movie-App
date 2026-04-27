import express from 'express';
import { 
  addToWatchlist,
  getWatchlist 
} from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//use authmiddlware to check user is authenticated with jwt token or not for accesss watclist routes
router.use(authMiddleware);

router.post("/", addToWatchlist);
router.get("/:userId", getWatchlist);

export default router;