import express from 'express';
import cors from 'cors';
import router from './route/routes.js'; // Correct the import path
import { connectToDatabase } from './database/dbs.js';
import { fileURLToPath } from 'url'; 
import {upload} from './controller/controller.js'
import path from 'path';
import { userFromToken } from './utils/Token.js';
// import bodyParser from 'body-parser';

const app = express();

// Use the router for routing
app.use('/token-data', userFromToken);
connectToDatabase(); // Use the imported function to establish the database connection
const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); // Get the current module's directory name


const Port = 8000;
app.use('/public/upload', express.static(path.join(__dirname, 'public', 'upload')));
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }))

// Use the router for routing
app.use('/', router);

app.listen(Port, () => console.log(`Server running successfully on Port ${Port}`));
