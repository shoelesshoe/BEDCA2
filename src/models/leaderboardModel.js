const pool = require('../services/db');

module.exports.selectStreakLeaderboard = (callback) => {
    const SQLSTATEMENT = `
        SELECT username, streak, user_id
        FROM User
        ORDER BY streak DESC
        LIMIT 10;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectCompletedTasksLeaderboard = (callback) => {
    const SQLSTATEMENT = `
        SELECT User.username, COUNT(TaskProgress.user_id) AS total_completed_tasks, User.user_id
        FROM TaskProgress
        LEFT JOIN User ON TaskProgress.user_id = User.user_id
        GROUP BY TaskProgress.user_id
        ORDER BY total_completed_tasks DESC
        LIMIT 10;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectPointsLeaderboard = (callback) => {
    const SQLSTATEMENT = `
        SELECT User.username, SUM(Task.points) AS total_points_earned, User.user_id
        FROM TaskProgress
        LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
        LEFT JOIN User ON TaskProgress.user_id = User.user_id
        GROUP BY TaskProgress.user_id
        ORDER BY total_points_earned DESC
        LIMIT 10;
    `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectPlantLevelLeaderboard = (callback) => {
    const SQLSTATEMENT = `
        SELECT User.username, Plant.level AS plant_level, Plant.plant_type_id, PlantType.name AS plant_name, PlantType.rarity AS plant_rarity, User.user_id
        FROM Plant
        LEFT JOIN User ON Plant.owner_id = User.user_id
        LEFT JOIN PlantType ON Plant.plant_type_id = PlantType.type_id
        ORDER BY Plant.level DESC
        LIMIT 10;
    `;

    pool.query(SQLSTATEMENT, callback);
}