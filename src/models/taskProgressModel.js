const pool = require('../services/db');

module.exports.insertTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, notes)
        VALUES (?, ?, ?);

        SELECT * FROM TaskProgress
        WHERE progress_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.user_id, data.task_id, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUserNetPoints = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET net_points = net_points + (SELECT points FROM Task WHERE task_id = ?)
        WHERE user_id = ?;
    `;

    const VALUES = [data.task_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllCompletedTasks = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT TaskProgress.progress_id, Task.task_id, Task.title, Task.description, Task.points, TaskProgress.completion_date, TaskProgress.notes
        FROM TaskProgress
        INNER JOIN Task ON Task.task_id = TaskProgress.task_id
        WHERE TaskProgress.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;

        SELECT * FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
