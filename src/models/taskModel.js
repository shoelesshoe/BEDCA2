const pool = require('../services/db');

module.exports.insertTask = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Task (owner_id, title, description, points)
        VALUES (?, ?, ?, ?);

        SELECT * FROM Task
        WHERE task_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.user_id, data.title, data.description, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllTasks = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectTask = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Task.task_id, Task.owner_id, Task.title, Task.description, Task.points, User.username
        FROM Task
        INNER JOIN User ON Task.owner_id = User.user_id
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectTotalStars = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT COUNT(starred_id) AS total_stars FROM StarredTask
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectTotalCompletions = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT COUNT(progress_id) AS total_completions FROM TaskProgress
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTask = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ? AND owner_id = ?;

        SELECT * FROM Task
        WHERE task_id = ? AND owner_id = ?;
    `;

    const VALUES = [data.title, data.description, data.points, data.task_id, data.user_id, data.task_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteTask = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Task
        WHERE task_id = ? AND owner_id = ?;

        DELETE FROM TaskProgress
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id, data.user_id, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
