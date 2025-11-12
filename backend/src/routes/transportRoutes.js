const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

router.get('/', transportController.getAllTransports);
router.get('/:id', transportController.getTransportById);
router.post('/', transportController.createTransport);

module.exports = router;
