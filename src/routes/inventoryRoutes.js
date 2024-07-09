const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middleware/jwtMiddleware');
const controllerMiddleware = require('../middleware/controllerMiddleware');
const inventoryController = require('../controllers/inventoryController');

router.get('/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, inventoryController.getAllOwnedItems, inventoryController.getAllOwnedPlants, inventoryController.showInventory);
router.get('/:user_id', controllerMiddleware.checkUserExistsByParams, inventoryController.getAllOwnedItems, inventoryController.getAllOwnedPlants, inventoryController.showInventory);
router.put('/items/:item_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, inventoryController.useItem);
router.delete('/items/:item_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, inventoryController.deleteItem);
router.delete('/plants/:plant_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, inventoryController.deletePlant);

module.exports = router;
