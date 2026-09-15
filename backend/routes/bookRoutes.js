const express = require('express');
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => bookController.list(req, res));
router.get('/:id', (req, res) => bookController.getById(req, res));
router.post('/', verifyToken, (req, res) => bookController.create(req, res));
router.delete('/:id', verifyToken, (req, res) => bookController.remove(req, res));

module.exports = router;
