
const Section = require('../models/section');
module.exports = {
    createSectionService: async (data) => {
        try {
            let result = await Section.create(data);
            return result;

        } catch (error) {
            console.log(">>>", error);
        }
    },
    getAllSectionsService: async () => {
        try {
            return await Section.find({});

        } catch (error) {
            console.log(">>>>", error);
        }
    }
}