const express = require("express");
const router = express.Router();

// router.use("/users", require("./user"));
// router.use("/terms", require("./term"));
router.use("/auth", require('./auth'));
router.use("/admin", require('./admin'));
router.use("/teacher", require('./teacher'));
module.exports = router;