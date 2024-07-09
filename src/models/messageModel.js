const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
        SELECT User.username, User.user_id, Messages.id, Messages.message_text, Messages.created_at
        FROM Messages
        LEFT JOIN User ON User.user_id = Messages.user_id
        ORDER BY Messages.created_at DESC;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT * FROM Messages
        WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
        INSERT INTO Messages (message_text, user_id)
        VALUES (?, ?);

        SELECT * FROM Messages
        WHERE id = LAST_INSERT_ID();
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
        UPDATE Messages 
        SET message_text = ?, user_id = ?
        WHERE id = ?;

        SELECT * FROM Messages
        WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
        DELETE FROM Messages 
        WHERE id = ?;

        ALTER TABLE Messages AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
