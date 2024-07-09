const pool = require('../services/db');

module.exports.existsEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT email FROM User
        WHERE email = ?;
    `;

    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.existsUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT username FROM User
        WHERE username = ?;
    `;

    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkUserExist = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
    `;

    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateLastLogin = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET last_login = CURRENT_TIMESTAMP
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertUser = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO User (username, email, password)
        VALUES (?, ?, ?);

        SELECT user_id, username, email FROM User
        WHERE user_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.username, data.email, data.hash];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectAllUsers = (callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, username, email, created_on, last_login FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectUserNetPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT net_points FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserWithTotalPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT User.user_id, User.username, User.email, User.created_on, User.last_login, SUM(Task.points) AS total_points, User.net_points, User.streak
        FROM User
        INNER JOIN TaskProgress ON User.user_id = TaskProgress.user_id
        INNER JOIN Task ON TaskProgress.task_id = Task.task_id
        WHERE User.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, username, email, net_points, created_on, last_login, streak FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.associatedEmail = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT email FROM User
        WHERE user_id != ? AND email = ?;  /* selects if email exists in other users already */
    `;

    const VALUES = [data.user_id, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.associatedUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT username FROM User
        WHERE user_id != ? AND username = ?;  /* selects if username exists in other users already */
    `;

    const VALUES = [data.user_id, data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUser = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;

        SELECT user_id, username, email FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.username, data.email, data.user_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteUser = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;

        DELETE FROM TaskProgress
        WHERE user_id = ?;

        ALTER TABLE TaskProgress AUTO_INCREMENT = 1;

        DELETE FROM StarredTask
        WHERE user_id = ?;

        ALTER TABLE StarredTask AUTO_INCREMENT = 1;

        DELETE FROM Item
        WHERE owner_id = ?;

        ALTER TABLE Item AUTO_INCREMENT = 1;

        DELETE FROM Plant
        WHERE owner_id = ?;

        ALTER TABLE Plant AUTO_INCREMENT = 1;

        DELETE FROM Messages
        WHERE user_id = ?;

        ALTER TABLE Messages AUTO_INCREMENT = 1;
    `;

    const VALUES = [data.user_id, data.user_id, data.user_id, data.user_id, data.user_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
