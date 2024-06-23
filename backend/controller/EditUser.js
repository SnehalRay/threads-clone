import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const editingUser = async (req, res) => {
    try{
        const id = req.user.id
        const { name , username , email, password, profilePic, bio} = req.body;

        let user = await User.findById(id);
        if (!user){
            return res.status(401).json({message:"User does not exist"});
        }

        if (password){
            //HASH THE PASSWORD ONCE AGAIN
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            user.password = hashPassword || user.password

        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user = await user.save();
        return res.status(201).json({ message: 'User successfully edited', user: user });





    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export default { editingUser};