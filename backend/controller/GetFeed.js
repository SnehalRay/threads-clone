import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

dotenv.config();

// GET POSTS FROM PEOPLE YOU FOLLOW
// GET POSTS FROM THE ONES YOU POST

export const getFeed = async (req, res) => {
  try {
    console.log("Request User:", req.user); 

    const myUserId = req.user.id;
    console.log("Authenticated user ID:", myUserId); 

    // Retrieve the current user from the database to get the list of users they follow
    const currentUser = await User.findById(myUserId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Combine the user's ID with the list of followed user IDs
    const usersToShowPostsOf = [myUserId, ...currentUser.following];

    // Query the Post collection to find posts by these users
    const posts = await Post.find({ user: { $in: usersToShowPostsOf } }).sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    console.log("Error in getFeed:", error);
    res.status(500).json({ message: error.message });
  }
};

export default { getFeed };
