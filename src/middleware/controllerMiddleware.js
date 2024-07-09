const model = require('../middleware/modelMiddleware');

module.exports.checkUserExists = (req, res, next) => {
    if (res.locals.user_id == undefined) {
        res.status(400).json({
            error: "user_id is undefined"
        });
        return;
    }

    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                error: `user_id ${res.locals.user_id} does not exist`
            });
        } else {
            next();
        }
    }

    model.existsUser(data, callback);
}

module.exports.checkUserExistsByParams = (req, res, next) => {
    if (req.params.user_id == undefined) {
        res.status(400).json({
            error: "user_id is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkUserExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                error: `user_id ${req.params.user_id} does not exist`
            });
        } else {
            res.locals.user_id = req.params.user_id;
            next();
        }
    }

    model.existsUser(data, callback);
}

module.exports.checkTaskExists = (req, res, next) => {
    if (req.params.task_id == undefined) {
        res.status(400).json({
            error: "task_id is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error('Error in checkTaskExists: ', error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                error: `task_id ${req.params.task_id} does not exist`
            });
        } else {
            res.locals.task_id = req.params.task_id;
            next();
        }
    }

    model.existsTask(data, callback);
}