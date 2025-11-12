const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.get('/', guideController.getAllGuides);
router.get('/:id', guideController.getGuideById);
router.post('/', guideController.createGuide);

module.exports = router;
