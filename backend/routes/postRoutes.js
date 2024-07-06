import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createPost } from '../controller/CreatePost.js';
import { getPost } from '../controller/GetPost.js';
import { deletePost } from '../controller/DeletePost.js';
import { likePost } from '../controller/LikePost.js';
import { replyPost } from '../controller/ReplyPost.js';
import { getFeed } from '../controller/GetFeed.js'; 
import { getUserPosts } from '../controller/GetUserPosts.js';


const postRouter = express.Router();

// POSTING A POST
postRouter.post("/create", authenticateToken, createPost);

// GETTING FEED
postRouter.get("/feeds",authenticateToken, getFeed); // Define the feed route

//GETTING POSTS OF A USER
postRouter.get("/user/:id", getUserPosts);


// GETTING A POST
postRouter.get("/:id", getPost);

// DELETING A POST
postRouter.delete("/delete/:id", authenticateToken, deletePost);

// LIKING A POST
postRouter.post("/like/:id", authenticateToken, likePost);

// REPLYING TO A POST
postRouter.post("/reply/:id", authenticateToken, replyPost);



export default postRouter;
