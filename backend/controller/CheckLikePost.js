import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Post from '../models/postModel.js';

dotenv.config();

export const checkLikePost = async(req,res) => {
    try{
        const postId = req.params.id;
        const myUserId = req.user.id;

        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message: "Invalid post ID"})
        }

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post does not exist"})
        }

        const isLike = post.likesPeople.includes(myUserId);
        res.status(200).json({isLike: isLike, likeCount: post.likesPeople.length})

    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}