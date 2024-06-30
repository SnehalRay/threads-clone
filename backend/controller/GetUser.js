import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { json } from 'express';

export const getUser = async (req,res) => {
    try{
        const { username } = req.params;
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if (!user){
            return res.status(401).json({message:"Account does not exist"});
        }
        res.status(200).json(user);

        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export default {getUser};
