const mongoose = require('mongoose');

// Define the Pasien schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

// Create the Pasien model
const user = mongoose.model('user', userSchema);

module.exports = user;
