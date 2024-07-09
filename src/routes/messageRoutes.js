const express = require('express');
const router = express.Router();

const controllerMiddleware = require('../middleware/controllerMiddleware');
const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, controller.createMessage);
router.get('/', controller.readAllMessage);
router.get('/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, controller.readAllMessage);
router.get('/user/:user_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExistsByParams, controller.readAllMessage);
router.get('/message/:id', controller.readMessageById);
router.put('/:id', jwtMiddleware.verifyToken, controller.updateMessageById);
router.delete('/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);

module.exports = router;
