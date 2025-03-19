const express = require('express');
const router = express.Router();
const { EmailSend , EmailSendBlast } = require('../controllers/EmailControllers');

router.post('/send-email', EmailSend);
router.post('/send-blast' ,EmailSendBlast)

module.exports = router;