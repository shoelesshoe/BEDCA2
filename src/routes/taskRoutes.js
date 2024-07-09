const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/', jwtMiddleware.verifyToken, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/current_user', jwtMiddleware.verifyToken, taskController.getAllTasks);
router.get('/:task_id', taskController.getTaskById, taskController.getTotalStars, taskController.getTotalCompletions);
router.put('/:task_id', jwtMiddleware.verifyToken, taskController.updateTaskById);
router.delete('/:task_id', jwtMiddleware.verifyToken, taskController.deleteTaskById);

module.exports = router;
