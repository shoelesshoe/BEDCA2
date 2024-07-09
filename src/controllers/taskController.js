const model = require('../models/taskModel');

module.exports.createTask = (req, res, next) => {
    if (res.locals.user_id == undefined || req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            error: "title, user_id, description and/or points is/are undefined"
        });
        return;  // end function
    }

    const data = {
        user_id: res.locals.user_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createTask: ', error);
            res.status(500).json(error);
        } else {
            res.status(201).json({results: results[1][0], logged_in_user_id: res.locals.user_id});  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
        }
    }

    model.insertTask(data, callback);
}

module.exports.getAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllTasks: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({results: results, logged_in_user_id: res.locals.user_id});
        }
    }

    model.selectAllTasks(callback);
}

module.exports.getTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error getTaskById: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // task does not exist
            res.status(404).json({
                error: `task_id ${data.task_id} does not exist`
            });
        } else {
            res.locals.tasks = results[0];
            next();
        }
    }

    model.selectTask(data, callback);
}

module.exports.getTotalStars = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error getTotalStars: ', error);
            res.status(500).json(error);
        } else {
            res.locals.total_stars = results[0];
            next();
        }
    }

    model.selectTotalStars(data, callback);
}

module.exports.getTotalCompletions = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error getTotalCompletions: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                tasks: res.locals.tasks,
                total_stars: res.locals.total_stars,
                total_completions: results[0]
            });
        }
    }

    model.selectTotalCompletions(data, callback);
}

module.exports.updateTaskById = (req, res, next) => {
    if (res.locals.user_id == undefined || req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            error: "title, user_id, description and/or points is/are undefined"
        });
        return;  // end function
    }

    const data = {
        user_id: res.locals.user_id,
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateTaskById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // task was not updated
            res.status(404).json({
                error: `task_id ${data.task_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    }
    model.updateTask(data, callback);
}

module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteTaskById: ', error);
            res.status(204).json(error);
        } else if (results[0].affectedRows == 0) {  // task was not deleted
            res.status(404).json({
                error: `task_id ${data.task_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteTask(data, callback);
}
