const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', (req, res) => categoryController.list(req, res));

module.exports = router;
