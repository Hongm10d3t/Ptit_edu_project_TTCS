
// const path = require("path");
// const Material = require('../models/material');
// const uploadMaterialService = async (data) => {
//     try {
//         let material = Material.create(data);
//         return material;

//     } catch (error) {
//         console.log(">>>>", error);
//     }
// }

// const getAllMaterialService = async (courseId, fileType) => {
//     try {
//         let data = "";
//         // const material = await Material.find({ courseId: courseId });
//         const material = await Material.findOne({ courseId: courseId, type: fileType });
//         if (fileType === "video") {
//             data = material.url;
//             console.log(">>>>>>", data);
//         }
//         else {
//             data = path.resolve(
//                 __dirname,
//                 "../public/file/document",
//                 material.fileName
//             );
//         }
//         return data
//     } catch (error) {
//         console.log(">>>>>", error);
//     }
// }

// const getMaterialCourseService = async (courseId, type) =>{
//     try {
//         let data = [];
//         if(type==='video'){
//             data = await Material.find({courseId: courseId}).select("url");
//         }
//         else{
//             data = await Material.find({courseId: courseId}).select()
//         }
//     } catch (error) {
//         console.log(">>>>>", error);
//     }
// }
const path = require("path");
const Material = require("../models/material");

const uploadMaterialService = async (data) => {
    try {
        const material = await Material.create(data);
        return material;
    } catch (error) {
        console.log("uploadMaterialService error:", error);
        throw error;
    }
};

const getAllMaterialService = async (courseId, fileType) => {
    try {
        const materials = await Material.find({
            courseId: courseId,
            type: fileType,
        }).sort({ createdAt: -1 });

        if (!materials || !materials.length) {
            return [];
        }

        if (fileType === "video") {
            return materials.map((material) => ({
                ...material.toObject(),
                fileUrl: material.url || "",
            }));
        }

        return materials.map((material) => {
            const baseName = path.basename(material.fileName || "");

            return {
                ...material.toObject(),
                fileUrl: baseName ? `/file/document/${baseName}` : "",
            };
        });
    } catch (error) {
        console.log("getAllMaterialService error:", error);
        throw error;
    }
};

module.exports = {
    uploadMaterialService,
    getAllMaterialService,
};


// module.exports = { uploadMaterialService, getAllMaterialService }