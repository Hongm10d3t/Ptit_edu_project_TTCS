
const Material = require('../models/material');
const uploadMaterialService = async (data) => {
    try {
        let material = Material.create(data);
        return material;

    } catch (error) {
        console.log(">>>>", error);
    }
}

module.exports = { uploadMaterialService }