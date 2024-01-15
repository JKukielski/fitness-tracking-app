import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Registration controller function
export const register = async (req, res) => {
  try {
    // Extract user details (email, username, password) from the request body
    const { email, username, password } = req.body;

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the new user to the MongoDB database
    const savedUser = await newUser.save();
    // Respond with a JSON object containing the saved user information
    res.status(200).json(savedUser);
  } catch (err) {
    // Handle errors and respond with a 500 Internal Server Error along with an error message
    res.status(500).json({ error: err.message });
  }
};
