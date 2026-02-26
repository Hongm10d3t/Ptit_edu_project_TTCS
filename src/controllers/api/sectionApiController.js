
const { createSectionService, getAllSectionsService } = require('../../services/sectionService');
module.exports = {
    postCreateSection: async (req, res) => {
        let section = await createSectionService(req.body);
        return res.status(200).json({
            data: section
        })
    },
    getAllSections: async (req, res) => {
        let sections = await getAllSectionsService();
        return res.status(200).json({
            data: sections
        })
    }
}