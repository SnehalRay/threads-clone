import express from 'express';
import { signupUser, loggingUser, signingOut } from '../controller/userController.js';

const router = express.Router();

// SIGN UP
router.post("/signup", signupUser);

// LOG IN
router.post("/login", loggingUser);

// SIGNING OUT
router.post("/signout", signingOut);


export default router;
