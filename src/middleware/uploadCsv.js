const multer = require("multer");

const uploadCsv = multer({
    storage: multer.memoryStorage(),
});

module.exports = uploadCsv;