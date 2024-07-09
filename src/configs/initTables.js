const pool = require('../services/db');

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS StarredTask;
DROP TABLE IF EXISTS PlantType;
DROP TABLE IF EXISTS Plant;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS ItemType;
DROP TABLE IF EXISTS StoreItem;
DROP TABLE IF EXISTS Messages;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    net_points INT DEFAULT 0,
    streak INT DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    title TEXT,
    description TEXT,
    points INT
);

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE TABLE StarredTask (
    starred_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL
);

CREATE TABLE PlantType (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    rarity TEXT
);
  
CREATE TABLE Plant (
    plant_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    plant_type_id INT NOT NULL,
    planted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    level INT DEFAULT 1
);
  
CREATE TABLE Item (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    item_type_id INT NOT NULL,
    acquired_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_on TIMESTAMP
);

CREATE TABLE ItemType (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    ability TEXT
);

CREATE TABLE StoreItem (
    storeitem_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    details TEXT,
    cost INT
);

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO PlantType (name, rarity) VALUES
('Doom Shroom', 'Rare'),
('Sunflower', 'Common'),
('Snow Pea', 'Rare'),
('Repeater', 'Rare'),
('Wall Nut', 'Common'),
('Puff Shroom', 'Common'),
('Hypno Shroom', 'Rare'),
('Ice Shroom', 'Rare'),
('Squash', 'Legendary'),
('Kernel Pult', 'Common'),
('Winter Melon', 'Legendary'),
('Gattling Pea', 'Legendary'),
('Star Fruit', 'Common'),
('Potato Mine', 'Common'),
('Cherry Bomb', 'Common');

INSERT INTO ItemType (name, ability) VALUES
('Streak Freezer', 'Freeze your streak for 1 day');

INSERT INTO StoreItem (name, details, cost) VALUES
('Streak Freezer', 'Freeze your streak for the previous day', '100'),
('Seedpacket', 'Obtain a random plant whereby there is a 70% chance of getting a common plant, 25% chance of getting a rare plant and 5% chance of getting a legendary plant', '200');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
});
