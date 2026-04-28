import express from "express";
import { 
  login,
  signup,
  logout,

} from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateLoginSchema, validateSigupSchema } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", validateRequest(validateSigupSchema), signup);

router.post("/login", validateRequest(validateLoginSchema), login);

router.post("/logout", logout);

export default router;