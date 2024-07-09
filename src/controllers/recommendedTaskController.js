const model = require('../models/recommendedTaskModel');

module.exports.getAllRecommendedTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllRecommendedTasks: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllRecommendedTasks(callback);
}