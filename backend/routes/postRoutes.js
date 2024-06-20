import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createPost } from '../controller/CreatePost.js';

const postRouter = express.Router();

postRouter.post("/create",authenticateToken, createPost);

export default postRouter;