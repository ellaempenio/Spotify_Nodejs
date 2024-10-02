const express = require('express');
const router = express.Router();
const eve = require('../controller/evecontroller'); 


router.get('/', eve.index);


router.get('/add', eve.uploadPage);


router.post('/upload', eve.uploadFile);

module.exports = router;