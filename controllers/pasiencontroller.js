const Pasien = require('../models/pasienmodels');

// Create a new Pasien
const createPasien = async (req, res) => {
  try {
    const {nama, tempat_lahir, tgl_lahir, alamat, gol_darah } = req.body;
    console.log(req.body)
    const pasien = new Pasien({nama, tempat_lahir, tgl_lahir, alamat, gol_darah });
    const savedPasien = await pasien.save().then(data =>     console.log(data)).catch(data =>     console.log(data))
    res.status(201).json(savedPasien);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new Pasien' });
  }
};

// Get all Pasien
const getAllPasien = async (req, res) => {
  try {
    const pasien = await Pasien.find();
    res.json(pasien);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Pasien' });
  }
};

// Get a single Pasien by ID
const getPasienById = async (req, res) => {
  try {
    const pasien = await Pasien.findById(req.params._id);
    if (!pasien) {
      return res.status(404).json({ error: 'Pasien not found' });
    }
    res.json(pasien);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Pasien' });
  }
};

// Update a Pasien
const updatePasien = async (req, res) => {
  try {
    const { nama, tempat_lahir, tgl_lahir, alamat, gol_darah } = req.body;
    const pasien = await Pasien.findByIdAndUpdate(
      req.params._id,
      { nama, tempat_lahir, tgl_lahir, alamat, gol_darah },
      { new: true }
    );
    if (!pasien) {
      return res.status(404).json({ error: 'Pasien not found' });
    }
    res.json(pasien);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Pasien' });
  }
};

// Delete a Pasien
const deletePasien = async (req, res) => {
  try {
    const pasien = await Pasien.findByIdAndRemove(req.params._id);
    if (!pasien) {
      return res.status(404).json({ error: 'Pasien not found' });
    }
    res.json({ message: 'Pasien deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Pasien' });
  }
};

module.exports = {
  createPasien,
  getAllPasien,
  getPasienById,
  updatePasien,
  deletePasien
};
