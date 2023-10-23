import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in a cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const secretKey = 'your_secret_key'; // Replace with your secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token content' });
    }

    // Token is valid and contains a userId
    req.userId = decoded.userId; // You can access this in your route handlers

    // Continue with the next middleware or route handler
    next();
  });
};

export default verifyToken;
