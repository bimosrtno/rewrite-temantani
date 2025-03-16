const express = require('express');
const router = express.Router();
const { EmailSend } = require('../controllers/EmailControllers');

router.post('/send-email', EmailSend);

module.exports = router;