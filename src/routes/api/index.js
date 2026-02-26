const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/terms", require("./term"));
router.use("/sections", require("./section"));
module.exports = router;