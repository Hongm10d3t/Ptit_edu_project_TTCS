
// const { uploadSingleFile } = require('../../services/fileService');
// const { uploadMaterialService, getAllMaterialService } = require('../../services/materialService');
// const postMaterialByTeacher = async (req, res) => {
//     let type = req.body.type;
//     let data = {
//         courseId: req.params.courseId,
//         createdBy: req.session.user.id,
//         type: req.body.type,
//         description: req.body.description,
//         title: req.body.title
//     }
//     if (type === "video") {
//         data[type] = "video";
//         data.url = req.body.url;
//     } else {
//         data[type] = "document";
//         const file = await uploadSingleFile(req.files.file);
//         data.fileName = file.path;
//     }

//     let material = await uploadMaterialService(data);
//     return res.status(200).json({
//         EC: 0,
//         data: material
//     });

// }


// const getAllMaterial = async (req, res) => {
//     const { courseId } = req.params;
//     const fileType = req.query.type;
//     console.log(">>>>>", fileType);
//     let data = await getAllMaterialService(courseId, fileType);
//     return res.status(200).json({
//         EC: 0,
//         data: data
//     })

// }

// module.exports = { postMaterialByTeacher, getAllMaterial }
const path = require("path");
const { uploadSingleFile } = require("../../services/fileService");
const {
    uploadMaterialService,
    getAllMaterialService,
} = require("../../services/materialService");

const postMaterialByTeacher = async (req, res) => {
    try {
        let type = req.body.type;
        let data = {
            courseId: req.params.courseId,
            createdBy: req.session.user.id,
            type: req.body.type,
            description: req.body.description,
            title: req.body.title,
        };

        if (type === "video") {
            data.url = req.body.url;
        } else {
            const file = await uploadSingleFile(req.files.file);
            data.fileName = file.filename || path.basename(file.path);
        }

        let material = await uploadMaterialService(data);

        return res.status(200).json({
            EC: 0,
            data: material,
        });
    } catch (error) {
        console.log("postMaterialByTeacher error:", error);
        return res.status(500).json({
            EC: -1,
            data: null,
        });
    }
};

const getAllMaterial = async (req, res) => {
    try {
        const { courseId } = req.params;
        const fileType = req.query.type;

        const data = await getAllMaterialService(courseId, fileType);

        return res.status(200).json({
            EC: 0,
            data: data,
        });
    } catch (error) {
        console.log("getAllMaterial error:", error);
        return res.status(500).json({
            EC: -1,
            data: null,
        });
    }
};

module.exports = { postMaterialByTeacher, getAllMaterial };