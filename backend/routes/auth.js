import express from 'express';
import { register, login } from '../controllers/auth.js';

// Create an Express router
const router = express.Router();

// LOGIN Endpoint
// Handles POST requests to the '/login' route by invoking the 'login' function
router.post('/login', login);

// REGISTER Endpoint
// Handles POST requests to the '/register' route by invoking the 'register' function
router.post('/register', register);

// Export the router for use in other parts of the application
export default router;
