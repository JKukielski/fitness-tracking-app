import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';

dotenv.config(); // Load environment variables from the .env file
const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON in request bodies
app.use(helmet()); // Helmet middleware for setting various HTTP headers to secure the application
app.use(morgan('common')); // Morgan middleware for logging HTTP requests
app.use(cors()); // CORS middleware to enable Cross-Origin Resource Sharing

// Registering authentication endpoints from the 'authRoutes' module
app.use('/api/auth', authRoutes);

// Basic endpoint for testing in Postman
app.get('/api', (req, res) => res.send('Successful endpoint test'));

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connect to MongoDB using the URI specified in the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    // Handle connection errors and log the error message
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the function to connect to MongoDB
connectToMongoDB();

// Start the Express application and listen on the specified port or default to 6001
app.listen(process.env.PORT || 6001, () => {
  console.log(`Running on port: ${process.env.PORT}`);
});
