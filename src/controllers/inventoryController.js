const model = require('../models/inventoryModel.js');

module.exports.getAllOwnedPlants = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllOwnedPlants: ', error);
            res.status(500).json(error);
        } else {
            res.locals.owned_plants = results;
            next();
        }
    }

    model.selectAllOwnedPlants(data, callback);
}

module.exports.getAllOwnedItems = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllOwnedItems: ', error);
            res.status(500).json(error);
        } else {
            res.locals.owned_items = results;
            next();
        }
    }

    model.selectAllOwnedItems(data, callback);
}

module.exports.showInventory = (req, res, next) => {
    res.status(200).json({
        owned_plants: res.locals.owned_plants,
        owned_items: res.locals.owned_items
    });
}

module.exports.checkItemUsed = (req, res, next) => {
    if (req.params.item_id == undefined) {
        res.status(400).json({
            error: "item_id is undefined"
        });
        return;
    }

    const data = {
        user_id: res.locals.user_id,
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in checkItemUsed: ', error);
            res.status(500).json(error);
        } else if (results[0].used_on != null) {  // used before
            res.status(403).json({
                error: `item_id ${req.params.item_id} has already been used`
            });
        } else {
            res.locals.item_id = req.params.item_id;
            next();
        }
    }

    model.checkItemUsed(data, callback);
}

module.exports.useItem = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in updateItem: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: `item_id ${req.params.item_id} does not exist`
            });
        } else {
            res.status(200).json(results[1][0]);
        }
    }

    model.updateItem(data, callback);

}

module.exports.deleteItem = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in deleteItem: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: `item_id ${req.params.item_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deleteItem(data, callback);
}

module.exports.deletePlant = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        plant_id: req.params.plant_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in deletePlant: ', error);
            res.status(500).json(error);
        } else if (results[0].affectedRows == 0) {
            res.status(404).json({
                error: `plant_id ${req.params.plant_id} does not exist`
            });
        } else {
            res.status(204).send();
        }
    }

    model.deletePlant(data, callback);
}