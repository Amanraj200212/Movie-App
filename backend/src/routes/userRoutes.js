import express from 'express';
import { 
  createUser, 
  getUserById, 
  getUsers 
} from '../controllers/userController.js';
import { get } from 'mongoose';

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

router.get("/:id", getUserById)

export default router;
