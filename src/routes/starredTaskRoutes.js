const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middleware/jwtMiddleware');
const starredTaskController = require('../controllers/starredTaskController');
const controllerMiddleware = require('../middleware/controllerMiddleware');

router.post('/current_user/:task_id', jwtMiddleware.verifyToken, controllerMiddleware.checkTaskExists, controllerMiddleware.checkUserExists, starredTaskController.checkTaskStarred, starredTaskController.addNewStarredTask);
router.get('/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, starredTaskController.getAllStarredTasks);
router.get('/:user_id', controllerMiddleware.checkUserExistsByParams, starredTaskController.getAllStarredTasks);
router.get('/:user_id/:task_id', controllerMiddleware.checkUserExistsByParams, controllerMiddleware.checkTaskExists, starredTaskController.getStarredTask);
router.delete('/current_user/:starred_id/', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, starredTaskController.checkStarredTaskExists, starredTaskController.deleteStarredTask);

module.exports = router;
