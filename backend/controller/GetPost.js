import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';

dotenv.config();

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getPost };
