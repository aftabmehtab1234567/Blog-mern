// Import required modules
import express from 'express';
import { handleAction, handleAction1, upload} from '../controller/controller.js';
import verifyToken from '../Middlewear/Auth.js'; // Import the verifyToken middleware

const router = express.Router();


// Protected route using the verifyToken middleware
router.get('/Projects', verifyToken);


router.post('/signup', upload.single('file'), handleAction);
router.post('/login', handleAction1);
router.get('/getImage/:image', (req, res) => {
  const imageName = req.params.image;
  const imageUrl = `.public/upload/${imageName}`; // Replace with your logic to fetch the image URL

  // Send the image URL as a response
  res.json({ imageUrl });
});

  
export default router;