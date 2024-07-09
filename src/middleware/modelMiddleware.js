const pool = require('../services/db');

module.exports.existsUser = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.existsTask = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT task_id FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}