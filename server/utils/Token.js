import jwt from 'jsonwebtoken'
import UserModel from '../modal/user.js';

export const userFromToken= async (req, res) => {
    try {
        const {Authorization} = req.Header;
        const token=authorization.split(' ')[1]
        
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decoded = jwt.verify(token,SECRET_KEY);
  
      // Find the user data based on the decoded token (e.g., user ID)
      const user = await UserModel.findById(decoded.id);
  
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
    // Create a new user object without the password
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    delete userWithoutPassword.verificationCode

      res.status(200).json({ user:userWithoutPassword });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };