
const { createTermService, getAllTermsService, updateTermService, deleteTermService, getMyTermsService } = require('../../services/termService');

module.exports = {
    postCreateTerm: async (req, res) => {
        let term = await createTermService(req.body);
        return res.status(200).json({
            data: term
        })
    },
    getAllTerms: async (req, res) => {
        let terms = await getAllTermsService();
        return res.status(200).json({
            data: terms
        })
    },
    putUpdateTerm: async (req, res) => {
        const id = req.params.id;
        let data = req.body;
        let term = await updateTermService(id, data);

        return res.status(200).json({
            data: term
        })
    },
    deleteTerm: async (req, res) => {
        const id = req.params.id;
        let term = await deleteTermService(id);
        return res.status(200).json({
            data: term
        })
    },
    getMyTerms: async (req, res) => {
        const { id, role } = req.session.user;
        console.log(">>>>>", id, role);
        let terms = await getMyTermsService(id, role);
        return res.status(200).json({
            EC: 0,
            data: terms
        })
    }
}