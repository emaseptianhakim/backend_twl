const mongoose = require('mongoose');

// Define the Pasien schema
const pasienSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  tempat_lahir: {
    type: String,
    required: true
  },
  tgl_lahir: {
    type: Date,
    required: true
  },
  gol_darah: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  // Add more fields as needed
});

// Create the Pasien model
const Pasien = mongoose.model('Pasien', pasienSchema);

module.exports = Pasien;
