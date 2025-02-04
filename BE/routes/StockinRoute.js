const express = require('express');
const { getStockin, createStockin } = require('../controllers/StockinController');

const router = express.Router();

router.get('/stockin', getStockin);
router.post('/stockin', createStockin);

module.exports = router;
