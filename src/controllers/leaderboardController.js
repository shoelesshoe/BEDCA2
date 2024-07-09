const model = require('../models/leaderboardModel');

module.exports.getStreakLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getStreakLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectStreakLeaderboard(callback);
}

module.exports.getCompletedTasksLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getCompletedTasksLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectCompletedTasksLeaderboard(callback);
}

module.exports.getPointsLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getPointsLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectPointsLeaderboard(callback);
}

module.exports.getPlantLevelLeaderboard = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getPlantLevelLeaderboard: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectPlantLevelLeaderboard(callback);
}