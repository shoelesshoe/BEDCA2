const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middleware/jwtMiddleware');
const storeController = require('../controllers/storeController');
const controllerMiddleware = require('../middleware/controllerMiddleware');

router.post('/current_user/:store_item_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, storeController.checkStoreItemId, storeController.getNetPoints, storeController.checkSufficentPoints, storeController.buyItem, storeController.getRandomPlant, storeController.checkPlantExists, storeController.addNewPlant, storeController.updatePlant, storeController.getPlantDetails, storeController.updatePointsSpent);
router.get('/', storeController.getStore);

module.exports = router;
