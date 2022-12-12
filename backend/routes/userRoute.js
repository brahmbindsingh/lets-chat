const express = require('express');
const { createUser, loginUser, logout, getUserDetails, getAllUsers } = require('../controllers/userController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.route('/signup').post( createUser );
router.route('/login').post( loginUser );
router.route('/logout').get( logout );
router.route('/me').get( isAuthenticated, getUserDetails );
router.route('/users').get( isAuthenticated, getAllUsers );


module.exports = router;