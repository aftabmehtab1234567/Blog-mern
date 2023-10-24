// Import required modules
import express from 'express';
import { handleAction, handleAction1, upload } from '../controller/controller.js';
import verifyToken from '../Middlewear/Auth.js'; // Import the verifyToken middleware

const router = express.Router();

// Protected route using the verifyToken middleware
router.get('/protected', verifyToken, (req, res) => {
  const userId = req.userId;
  // Your protected route logic here
});

router.post('/signup', upload.single('file'), handleAction);
router.post('/login', handleAction1);

export default router;
