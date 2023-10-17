import express from 'express';
import {handleAction,handleAction1, upload } from '../controller/controller.js'

const router=express.Router();
router.post('/signup',upload.single('file'),handleAction);
router.post('/login',handleAction1)
export default router;
