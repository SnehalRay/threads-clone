import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../helper/generateToken.js';

export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, username, password: hashPassword });
    await newUser.save();

    if (newUser) {
      generateToken({ id: newUser._id, username: newUser.username, email: newUser.email }, res);
      return res.status(201).json({ message: 'User successfully created', user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { signupUser };
