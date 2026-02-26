
const { createTermService, getAllTermsService, updateTermService, deleteTermService } = require('../../services/termService');

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
    }
}