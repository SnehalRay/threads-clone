import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createPost } from '../controller/CreatePost.js';
import { getPost } from '../controller/GetPost.js';
import { deletePost } from '../controller/DeletePost.js';
import { likePost } from '../controller/LikePost.js';

const postRouter = express.Router();


//POSTING A POST

postRouter.post("/create",authenticateToken, createPost);

// GETTING A POST

postRouter.get("/:id",getPost)

// DELETING A POST

postRouter.delete("/delete/:id",authenticateToken,deletePost)

// LIKING A POST

postRouter.post("/like/:id",authenticateToken,likePost)

export default postRouter;