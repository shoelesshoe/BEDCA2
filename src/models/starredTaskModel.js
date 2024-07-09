const pool = require('../services/db');

module.exports.existsStarredTask = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM StarredTask
        WHERE starred_id = ?;
    `;

    const VALUES = [data.starred_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertStarredTask = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO StarredTask (user_id, task_id)
        VALUES (?, ?);

        SELECT * FROM StarredTask
        WHERE starred_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.user_id, data.task_id];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllStarredTasks = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT StarredTask.starred_id, Task.task_id, Task.title, Task.description, Task.points
        FROM Task
        INNER JOIN StarredTask ON Task.task_id = StarredTask.task_id
        INNER JOIN User ON User.user_id = StarredTask.user_id
        WHERE StarredTask.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectStarredTask = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Task.task_id, Task.title, Task.description, Task.points
        FROM Task
        INNER JOIN StarredTask ON Task.task_id = StarredTask.task_id
        INNER JOIN User ON User.user_id = StarredTask.user_id
        WHERE StarredTask.user_id = ? AND StarredTask.task_id = ?;
    `;

    const VALUES = [data.user_id, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteStarredTask = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM StarredTask
        WHERE user_id = ? AND starred_id = ?;

        ALTER TABLE StarredTask AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id, data.starred_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}