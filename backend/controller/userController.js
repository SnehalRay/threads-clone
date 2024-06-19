import express from 'express';
import bcrypt, { genSalt } from 'bcrypt';
import User from '../models/userModel.js'

export const signupUser = async (req,res)=> {
    try{

        const {name, email, username, password} = req.body;
        const existingUser = await User.findOne({$or:[{email},{username}]});

        if (existingUser){
            return res.status(500).json({error:'User already exists'})
        }

        //if user does not exist, we add it

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, username, password: hashPassword});
        await newUser.save()

        res.status(201).json({message:'User successfully created: ',user:newUser});

   }
   catch (error){
    res.status(500).json({message: error.message})
   }
}

export default {signupUser};