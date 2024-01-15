import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
