const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the user model with the collection name 'users'
const User = mongoose.model("User", userSchema, 'users');
module.exports = User;
