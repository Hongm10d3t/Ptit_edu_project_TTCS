
const { uploadSingleFile } = require('../../services/fileService');
const { uploadMaterialService } = require('../../services/materialService');
const postMaterialByTeacher = async (req, res) => {
    let type = req.body.type;
    let data = {
        courseId: req.params.courseId,
        createdBy: req.session.user.id,
        type: req.body.type,
        description: req.body.description,
        title: req.body.title
    }
    if (type === "video") {
        data[type] = "video";
        data.url = req.body.url;
    } else {
        data[type] = "document";
        const file = await uploadSingleFile(req.files.file);
        data.fileName = file.path;
    }

    let material = await uploadMaterialService(data);
    return res.status(200).json({
        EC: 0,
        data: material
    });

}

module.exports = { postMaterialByTeacher }