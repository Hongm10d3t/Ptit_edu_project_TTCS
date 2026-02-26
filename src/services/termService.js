
const Term = require('../models/term');

module.exports = {
    createTermService: async (term) => {
        try {
            let result = await Term.create(term);
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getAllTermsService: async () => {
        try {
            let result = await Term.find({});
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateTermService: async (id, data) => {
        try {
            result = await Term.findByIdAndUpdate(id, data, { returnDocument: "after" });
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteTermService: async (id) => {
        try {
            result = await Term.findByIdAndDelete(id);
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}