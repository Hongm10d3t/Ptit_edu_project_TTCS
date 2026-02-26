const express = require("express");
const router = express.Router();
const adminController = require("../controllers/web/adminController");

router.get("/admin", adminController.getAdminPage);
router.get("/edit", adminController.getEditPage)

module.exports = router;