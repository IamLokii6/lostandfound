const mongoose = require('mongoose');

// Define the LostItem schema
const LostItemSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  itemName: { type: String, required: true },
  dateLost: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // Added category field
  image: { type: String }, // File path of the image
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who posted the item
});

// Create and export the model
const LostItem = mongoose.model('LostItem', LostItemSchema, 'LostItems');
module.exports = LostItem;
