const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const starredTaskRoutes = require('./starredTaskRoutes');
const recommendedTaskRoutes = require('./recommendedTaskRoutes');
const streakRoutes = require('./streakRoutes');
const plantTypeRoutes = require('./plantTypeRoutes');
const storeRoutes = require('./storeRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const messageRoutes = require('./messageRoutes');

const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const bcryptMiddleware = require('../middleware/bcryptMiddleware');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/task_progress', taskProgressRoutes);
router.use('/starred_tasks', starredTaskRoutes);
router.use('/recommended_tasks', recommendedTaskRoutes);
router.use('/streak', streakRoutes);
router.use('/plant_types', plantTypeRoutes);
router.use('/store', storeRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/inventory', inventoryRoutes);
router.use("/messages", messageRoutes);

router.post("/register", userController.checkUsernameExists, userController.checkEmailExists, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/login", userController.login, userController.updateLastLogin, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;
