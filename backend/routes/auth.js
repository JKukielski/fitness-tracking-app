import express from 'express';
import { register } from '../controllers/auth.js';

// Create an Express router
const router = express.Router();

//LOGIN
// router.post('/login', login);

// REGISTER Endpoint
// Handles POST requests to the '/register' route by invoking the 'register' function
router.post('/register', register);

// Export the router for use in other parts of the application
export default router;
