// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { calculateProfit } = require('../controllers/calculateProfit');

// POST /calculate-profit
router.post('/calculate-profit', calculateProfit);

module.exports = router;
