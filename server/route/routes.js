// routes.js

import express from 'express';
import { handleAction, handleAction1, upload} from '../controller/controller.js';
import verifyToken from '../Middlewear/Auth.js';

const router = express.Router();

// Protected route using the verifyToken middleware
router.get('/Projects', verifyToken);

router.post('/signup', upload.single('file'), handleAction);
router.post('/login', handleAction1);

export default router;
