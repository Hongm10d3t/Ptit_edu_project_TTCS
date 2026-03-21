
const Term = require('../models/term');
const Course = require('../models/course');

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
    },
    getMyTermsService: async (userId, role) => {
        try {
            let termIds = {};
            if (role === "TEACHER") {
                termIds = await Course.distinct("termId", {
                    teacherIds: userId,
                    status: "active",
                });
            }
            else if (role === "STUDENT") {
                termIds = await Course.distinct("termId", {
                    studentIds: userId,
                    status: "active"
                });
            }
            else {
                throw new Error("Role không hợp lệ");
            }
            const terms = await Term.find({
                _id: { $in: termIds }
            })
            return terms;
        } catch (error) {
            console.log(">>>>", error);
        }

    },
}