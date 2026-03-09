const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/terms", require("./term"));
router.use("/sections", require("./section"));
router.use("/login", require('./auth'));
router.use("/logout", require('./auth'));
module.exports = router;