const pool = require('../services/db');

module.exports.selectStore = (callback) => {
    const SQLSTATEMENT = `
        SELECT storeitem_id, name, details, cost FROM StoreItem;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectStoreItemCost = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT cost, name FROM StoreItem
        WHERE storeitem_id = ?;
    `;

    const VALUES = [data.store_item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertItem = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Item (owner_id, item_type_id)
        VALUES (?, ?);

        SELECT ItemType.name, ItemType.ability, Item.acquired_on, Item.used_on FROM Item
        INNER JOIN ItemType ON Item.item_type_id = ItemType.type_id
        WHERE Item.item_id = LAST_INSERT_ID();
    `;

    const VALUES = [data.user_id, data.store_item_id];  // we use store_item_id as item_type_id as they are the same
                                                        // eg. store_item_id 1 is item_type_id 1 as Items in the store will always be first then seedpackets

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectRandomPlant = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT type_id FROM PlantType
        WHERE rarity = ?
        ORDER BY RAND()
        LIMIT 1;
    `;

    const VALUES = [data.rarity];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkPlantExists = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Plant
        WHERE plant_type_id = ? AND owner_id = ?;
    `;

    const VALUES = [data.plant_type_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertPlant = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Plant (owner_id, plant_type_id)
        VALUES (?, ?);
    `;

    const VALUES = [data.user_id, data.plant_type_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatePlant = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Plant
        SET level = level + 1
        WHERE owner_id = ? AND plant_type_id = ?;
        
        SELECT plant_id AS insertId FROM Plant
        WHERE owner_id = ? AND plant_type_id = ?;
    `;

    const VALUES = [data.user_id, data.plant_type_id, data.user_id, data.plant_type_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectPlantDetails = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT Plant.plant_type_id, PlantType.name, PlantType.rarity, Plant.planted_on, Plant.level FROM Plant
        INNER JOIN PlantType ON Plant.plant_type_id = PlantType.type_id
        WHERE plant_id = ?;
    `;

    const VALUES = [data.last_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatePointsSpent = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET net_points = net_points - ?
        WHERE user_id = ?;
    `;

    const VALUES = [data.points_spent, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}