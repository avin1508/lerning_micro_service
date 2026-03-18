const express = require('express');
const authController = require('../controller/authController');
const authCheck = require('../middleware/authenticateUser');

const authRoutes = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.get('/me', authCheck, authController.getMe);

module.exports = authRoutes;