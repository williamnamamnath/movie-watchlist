const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Route for user registration
router.post('/register', 
    [
body('firstName').notEmpty(),
body('lastName').notEmpty(),
body('email').isEmail(),
body('password').isLength({ min: 4 })
], 
authController.register);


// Route for user login
router.post('/login', 
    [
body('email').isEmail(),
body('password').exists()
], 
authController.login);

// Route to get current authenticated user's info
router.get('/me', auth, authController.me);

module.exports = router;