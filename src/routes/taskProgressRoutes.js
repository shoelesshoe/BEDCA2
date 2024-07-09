const express = require('express');
const router = express.Router();

const streakController = require('../controllers/streakController');
const taskProgressController = require('../controllers/taskProgressController');
const controllerMiddleware = require('../middleware/controllerMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/current_user/:task_id', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, controllerMiddleware.checkTaskExists, taskProgressController.createNewTaskProgress, taskProgressController.updateUserNetPoints, streakController.getUserCompletionDates, streakController.getUserFreezeStreaks, streakController.calculateUserStreak, streakController.addUserStreak);
router.get('/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, taskProgressController.getAllCompletedTasks);
router.get('/user/:user_id', controllerMiddleware.checkUserExistsByParams, taskProgressController.getAllCompletedTasks);
router.get('/progress/:progress_id', taskProgressController.getTaskProgressById);
router.put('/:progress_id', jwtMiddleware.verifyToken, taskProgressController.updateTaskProgressById);
router.delete('/:progress_id', jwtMiddleware.verifyToken, taskProgressController.deleteTaskProgressById);

module.exports = router;
