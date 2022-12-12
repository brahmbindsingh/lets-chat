const express = require('express');
const { newMessage, getAllMessages } = require('../controllers/messageController');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.route('/new').post( isAuthenticated, newMessage );
router.route('/getAllMessages/:id').get( isAuthenticated, getAllMessages );

module.exports = router;