const express = require('express');
const userController = require('../controllers/usercontroller');


const router = express.Router();

// Create a new 
router.post('/login', userController.loginUser);

// Get all 
router.post('/registrasi', userController.registerUser);


module.exports = router;
