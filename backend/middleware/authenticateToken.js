import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt; // Assuming the token is stored in cookies
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.CODE);
    req.user = verified; //USER INFO INTO THE USER
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticateToken;
