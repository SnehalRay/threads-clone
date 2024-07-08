import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { json } from 'express';

export const searchUser = async (req,res) => {
    try{
        const { givenusername } = req.params;

        if (!givenusername){
            return res.status(400).json({ error: 'Username parameter is required' });
        }

        const regex = new RegExp(`^${givenusername}`, 'i');

        const users = await User.find({ username: { $regex: regex } })
        .sort({ followers: -1 })
        .limit(5);

        res.status(200).json(users);


    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}