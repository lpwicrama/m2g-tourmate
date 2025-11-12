const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

router.post('/find-along-actual-route', routeController.findLocationsAlongActualRoute);
router.post('/find-multi-point-route', routeController.findLocationsAlongMultiPointRoute);
router.get('/nearby', routeController.getNearbyLocations);

module.exports = router;
