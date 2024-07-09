const pool = require('../services/db');

module.exports.selectPlantTypes = (callback) => {
    const SQLSTATEMENT = `
        SELECT type_id, name, rarity FROM PlantType;
    `;

    pool.query(SQLSTATEMENT, callback);
}