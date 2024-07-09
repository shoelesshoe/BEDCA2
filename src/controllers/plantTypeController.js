const model = require('../models/plantTypeModel');

module.exports.getAllPlantTypes = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.log('Error in getAllPlantTypes: ', error)
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectPlantTypes(callback);
}