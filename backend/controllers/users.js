import express from 'express';
import User from '../models/User.js';

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateOfBirth, weight, height } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { dateOfBirth, weight, height } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
