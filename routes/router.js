const express = require('express');
const router = express.Router();
const eve = require('../controller/evecontroller'); // Path to your controller

// Route to display homepage with MP3 files
router.get('/', eve.index);

// Route to display upload form
router.get('/add', eve.uploadPage);

// Route to handle MP3 file upload
router.post('/upload', eve.uploadFile);

module.exports = router;