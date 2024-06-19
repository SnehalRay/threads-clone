import express from 'express';
import { signupUser, loggingUser, signingOut } from '../controller/SignAndLoginUser.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { followUnfollow } from '../controller/FollowUnFollowUser.js';

const router = express.Router();

// SIGN UP
router.post("/signup", signupUser);

// LOG IN
router.post("/login", loggingUser);

// SIGNING OUT
router.post("/signout", signingOut);

//FOLLOW or UNFOLLOW
router.post("/followunfollow/:id",authenticateToken, followUnfollow);


export default router;
