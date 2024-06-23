import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';

dotenv.config();

export const replyPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const myUserId = req.user.id;
    const { reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    // Add the reply to the post
    post.replies.push({
      userId: myUserId,
      reply: reply,
      likes: 0
    });

    await post.save();

    // Create a new post with the reply content
    const newPost = new Post({
      user: myUserId,
      text: reply,
      img: null 
    });

    await newPost.save();

    res.status(200).json({ message: "Reply added successfully and new post created", post, newPost });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { replyPost };
