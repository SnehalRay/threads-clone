import bcrypt from 'bcrypt';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Post from "../models/postModel.js"
import cloudinary from 'cloudinary';

dotenv.config();

export const createPost = async (req,res) => {
    try{

        let { text, img} = req.body;
        const userId = req.user.id;

        if (img && img.startsWith('data:image/') ){
            const uploadedResponse = await cloudinary.uploader.upload(img, {
                upload_preset: 'ml_default', // Add your upload preset here
              });
            img = uploadedResponse.secure_url;
            console.log("Retreived the uploaded response url")
        }



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