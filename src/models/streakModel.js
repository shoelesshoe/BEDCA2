const pool = require('../services/db');

module.exports.selectUserCompletionDates = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT DISTINCT completion_date FROM TaskProgress
        WHERE user_id = ?
        ORDER BY completion_date;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserFreezeStreaks = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT used_on FROM Item
        WHERE owner_id = ? AND item_type_id = 1 AND used_on IS NOT NULL;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUserStreak = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET streak = ?
        WHERE user_id = ?;

        SELECT user_id, username, streak FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.streak, data.user_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}