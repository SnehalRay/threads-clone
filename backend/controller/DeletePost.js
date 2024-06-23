import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';

dotenv.config();

export const deletePost = async (req, res) => {
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

    // Check if the user is authorized to delete the post
    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { deletePost };
