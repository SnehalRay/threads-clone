import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token from cookies:", token); // Debugging statement

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.CODE);
    console.log("Verified token:", verified); // Debugging statement
    req.user = verified; // Attach the user information to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Token verification failed:", error); // Debugging statement
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authenticateToken;
