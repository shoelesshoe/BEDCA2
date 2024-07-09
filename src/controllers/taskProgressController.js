const model = require('../models/taskProgressModel');

module.exports.createNewTaskProgress = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).json({
            error: "notes is undefined"
        });
        return;  // end function
    }

    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.task_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in createNewTaskProgress: ', error);
            res.status(500).json(error);
        } else {
            res.locals.taskProgress = true;
            res.locals.taskProgressResults = results[1][0];  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
            next();
        }
    }

    model.insertTaskProgress(data, callback);
}

module.exports.updateUserNetPoints = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        task_id: res.locals.taskProgressResults.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateUserNetPoints: ', error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.updateUserNetPoints(data, callback);
}

module.exports.getAllCompletedTasks = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getAllCompletedTasks: ', error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllCompletedTasks(data, callback);
}

module.exports.getTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in getTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {  // progress_id does not exist
            res.status(404).json({
                error: `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(200).json(results[0]);
        }
    }

    model.selectTaskProgress(data, callback);
}

module.exports.updateTaskProgressById = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).json({
            error: "notes is undefined"
        });
        return;  // end function
    }

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in updateTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // taskprogress was not updated
            res.status(404).json({
                error: `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);  // results[1] shows the result of the 2nd SQL command in model.insertUser() (SELECT...)
        }
    }

    model.updateTaskProgress(data, callback);
}

module.exports.deleteTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in deleteTaskProgressById: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {  // taskprogress was not deleted
            res.status(404).json({
                error: `progress_id ${data.progress_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteTaskProgress(data, callback);
}
