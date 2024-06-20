import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createPost } from '../controller/CreatePost.js';
import { getPost } from '../controller/GetPost.js';

const postRouter = express.Router();


//POSTING A POST

postRouter.post("/create",authenticateToken, createPost);

// GETTING A POST

postRouter.get("/:id",getPost)

export default postRouter;