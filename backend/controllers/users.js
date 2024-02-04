import express from 'express';
import User from '../models/User.js';

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dateOfBirth, weight, height, bmi, bmr, targetWeight } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { name, dateOfBirth, weight, height, bmi, bmr, targetWeight } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).send('No user with this id');

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (err) {
    res.status(500).json('Failed');
  }
};
