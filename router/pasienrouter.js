const express = require('express');
const pasienController = require('../controllers/pasiencontroller');
const { authenticateToken } = require('../middelware')
const router = express.Router();

// Create a new Pasien
router.post('/pasien', authenticateToken, pasienController.createPasien);

// Get all Pasien
router.get('/pasien', pasienController.getAllPasien);

// Get a single Pasien by ID
router.get('/pasien/:_id', authenticateToken, pasienController.getPasienById);

// Update a Pasien
router.put('/pasien/:_id', authenticateToken, pasienController.updatePasien);

// Delete a Pasien
router.delete('/pasien/:_id', authenticateToken, pasienController.deletePasien);

module.exports = router;