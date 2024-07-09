const model = require('../models/starredTaskModel');

module.exports.checkStarredTaskExists = (req, res, next) => {
    if (req.params.starred_id == undefined) {
        res.status(400).json({
            error: "starred_id is undefined"
        });
        return;
    }

    const data = {
        starred_id: req.params.starred_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkTaskExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                error: `task_id ${req.params.starred_id} does not exist`
            });
        } else {
            res.locals.starred_id = req.params.starred_id;
            next();
        }
    }

    model.existsStarredTask(data, callback);
}

module.exports.checkTaskStarred = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkStarredTaskExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            next();
        } else {
            res.status(409).json({
                error: `user_id ${req.params.user_id} already has starred task_id ${req.params.task_id}`
            });
        }
    }

    model.selectStarredTask(data, callback);
}

module.exports.addNewStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in addNewStarredTask: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1][0]);
        }
    }

    model.insertStarredTask(data, callback);
}

module.exports.getAllStarredTasks = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllStarredTasks: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllStarredTasks(data, callback);
}

module.exports.getStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getStarredTask: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectStarredTask(data, callback);
}

module.exports.deleteStarredTask = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        starred_id: res.locals.starred_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteStarredTask: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: `No starred_id ${res.locals.starred_id} for user_id ${res.locals.user_id}`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteStarredTask(data, callback);
}