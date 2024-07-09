const express = require('express');
const router = express.Router();

const controllerMiddleware = require('../middleware/controllerMiddleware');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/', userController.getAllUsers);
router.get('/current_user', jwtMiddleware.verifyToken, userController.checkUserExists, userController.getUserByIdWithTotalPoints, userController.getUserByIdWithoutTotalPoints);
router.get('/:user_id', controllerMiddleware.checkUserExistsByParams, userController.getUserByIdWithTotalPoints, userController.getUserByIdWithoutTotalPoints);
router.get('/points/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, userController.getUserNetPoints);
router.get('/points/:user_id', controllerMiddleware.checkUserExistsByParams, userController.getUserNetPoints);
router.put('/:user_id', jwtMiddleware.verifyToken, userController.checkEmailAssociation, userController.checkUsernameAssociation, userController.updateUserById);
router.delete('/:user_id', jwtMiddleware.verifyToken, userController.deleteUserById);

module.exports = router;
