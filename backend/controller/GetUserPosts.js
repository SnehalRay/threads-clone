import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

dotenv.config();

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;  

    console.log(`Received userID: ${id}`);  

    const posts = await Post.find({ user: id }).sort({ createdAt: -1 });

    console.log(`Found posts: ${posts}`);  

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    res.status(500).json({ error: error.message });
  }
}

export default { getUserPosts };
