import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';

dotenv.config();

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const myUserId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    const isLike = post.likesPeople.includes(myUserId);

    if (!isLike){
      //AKA I AM LIKING IT SO I WILL UNLIKE
      post.likesPeople.push(myUserId);
      post.likes -= 1
    }
    else{
      post.likesPeople = post.likesPeople.filter(id => id.toString() !== myUserId);
      post.likes += 1

    }

    await post.save();

    // res.status(200).json({ message: `Successfully ${isLike ? 'unliked' : 'liked'} the post`, post, myUserId });
    res.status(200).json({ message: `Successfully ${isLike ? 'unliked' : 'liked'} the post`, post });




    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { likePost };
