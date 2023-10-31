import express from 'express';
import cors from 'cors';
import router from './route/routes.js'; // Correct the import path
import { connectToDatabase } from './database/dbs.js';
// import bodyParser from 'body-parser';

const app = express();

// Use the router for routing

connectToDatabase(); // Use the imported function to establish the database connection
app.use('/upload', express.static('public'));

const Port = 8000;
app.use(cors());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }))

// Use the router for routing
app.use('/', router);

app.listen(Port, () => console.log(`Server running successfully on Port ${Port}`));
