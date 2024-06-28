import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

export const editingUser = async (req, res) => {
  try {
    const id = req.user.id;
    let { name, username, email, password, profilePic, bio } = req.body;

    let user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    if (password) {
      // Hash the password once again
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword || user.password;
    }

    if (profilePic && profilePic.startsWith('data:image/')) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
        upload_preset: 'ml_default', // Add your upload preset here
      });
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;

    user = await user.save();
    return res.status(201).json({ message: 'User successfully edited', user: user });

  } catch (error) {
    console.error("Editing user error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default { editingUser };
