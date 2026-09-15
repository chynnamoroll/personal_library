const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/', (req, res) => authorController.list(req, res));

module.exports = router;
