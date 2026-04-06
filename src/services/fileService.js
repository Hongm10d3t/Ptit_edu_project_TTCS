
const path = require("path");

const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, '../public/file/document')

    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (err) {
        console.log("check error:", err)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }
}

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, '../public/images/upload');
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            let extName = path.extname(filesArr[i].name);
            let baseName = path.basename(filesArr[i].name, extName);

            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }
        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadSingleFile, uploadMultipleFiles
}