const express = require('express');
const router = express.Router();

const postRoutes = require('./post.routes');
// Add more route imports here as needed

// All POST routes
router.use('/post', postRoutes);

module.exports = router;
