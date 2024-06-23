import bcrypt from 'bcrypt';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Post from "../models/postModel.js"

dotenv.config();

export const createPost = async (req,res) => {
    try{

        const { text, img} = req.body;
        const userId = req.user.id

        //CREATE A NEW POST
        const newPost = new Post({
            user: userId,
            text: text,
            img: img,
        })

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });


    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export default { createPost };