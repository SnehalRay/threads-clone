import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(401).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, username, password: hashPassword });
    await newUser.save();

    if (newUser) {
      generateToken({ id: newUser._id, username: newUser.username, email: newUser.email }, res);
      return res.status(201).json({ 
        _id: newUser._id,
        email:newUser.email,
        username: newUser.username,
        name: newUser.name,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//loggingUser

export const loggingUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({ error: "User does not exist" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password incorrect" });
    }

    // Generate token
    generateToken({ id: existingUser._id, username: existingUser.username, email: existingUser.email }, res);
    return res.status(201).json({ 
      _id: existingUser._id,
      email:existingUser.email,
      username: existingUser.username,
      name: existingUser.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Signing Out

export const signingOut = async (req, res) => {
    try {
      // Clear the JWT cookie
      res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 0
      });
  
      res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export default { signupUser, loggingUser, signingOut };
