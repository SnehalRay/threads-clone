import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const generateToken = (user, res) => {
  const { id, username, email } = user;

  // Create a JWT token
  const token = jwt.sign({ id, username, email }, process.env.CODE, {
    expiresIn: '30d',
  });

  // Set the JWT token in an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    sameSite: 'Strict', 
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token;
};

export default generateToken;
