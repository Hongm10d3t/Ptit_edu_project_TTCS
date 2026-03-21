

const { uploadSingleFile } = require('../../services/fileService');
const uploadFile = async (req, res) => {
    const fileObject = req.files.file;
    const file = await uploadSingleFile(fileObject);
    return res.status(200).json({
        data: file
    })

}

module.exports = { uploadFile }