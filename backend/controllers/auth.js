import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registration controller function
export const register = async (req, res) => {
  try {
    // Extract user details (email, username, password) from the request body
    const { email, name, username, gender, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ errors: { email: 'User with provided email already exists' } });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ errors: { username: 'Username already exists' } });
    }
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      email,
      name,
      username,
      gender,
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

//Login controller function
export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find a user with the specified email in the MongoDB database
    const user = await User.findOne({ email: email });

    // If no user is found, respond with a 401 Unauthorized status and a message
    if (!user) {
      return res
        .status(400)
        .json({ errors: { email: 'Please enter a valid email address' } });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, respond with a 401 Unauthorized status and a message
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ errors: { password: 'Incorrect password. Please try again' } });
    }

    // Create a JWT token with the user's ID and the specified secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the 'password' field from the user object before sending the response
    delete user.password;

    res.status(200).send({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
