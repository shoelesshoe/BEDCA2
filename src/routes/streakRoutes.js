const express = require('express');
const router = express.Router();

const streakController = require('../controllers/streakController');
const controllerMiddleware = require('../middleware/controllerMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.get('/current_user', jwtMiddleware.verifyToken, controllerMiddleware.checkUserExists, streakController.getUserCompletionDates, streakController.getUserFreezeStreaks, streakController.calculateUserStreak, streakController.addUserStreak);
router.get('/:user_id', controllerMiddleware.checkUserExistsByParams, streakController.getUserCompletionDates, streakController.getUserFreezeStreaks, streakController.calculateUserStreak, streakController.addUserStreak);

module.exports = router;
