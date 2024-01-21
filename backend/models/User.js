import mongoose from 'mongoose';

// Define a schema for the 'User' model
const UserSchema = new mongoose.Schema(
  {
    // Email field with type String, required, and unique constraints
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
    // Username field with type String, required, minimum length of 3 characters, and unique constraints
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
    // Password field with type String and required constraints, minimum length of 8 characters
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
