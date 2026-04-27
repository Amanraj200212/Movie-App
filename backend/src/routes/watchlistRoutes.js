import express from 'express';
import { 
  addToWatchlist,
  getWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { validateWatchlistSchema } from '../validators/watchlistValidators.js';

const router = express.Router();

//use authmiddlware to check user is authenticated with jwt token or not for accesss watclist routes
router.use(authMiddleware);

router.post("/",validateRequest(validateWatchlistSchema) , addToWatchlist);
router.get("/", getWatchlist);
router.put("/:id", updateWatchlistItem);
router.delete("/:id", removeFromWatchlist);


export default router;