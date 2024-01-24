import mongoose from 'mongoose';

// Define a schema for the 'User' model
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    weight: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  // Additional options for the schema, including timestamps for automatic creation of 'createdAt' and 'updatedAt'
  { timestamps: true }
);

// Create a mongoose model named 'User' based on the defined schema
const User = mongoose.model('User', UserSchema);

// Export the 'User' model for use in other parts of the application
export default User;
