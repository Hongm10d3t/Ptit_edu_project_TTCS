const express = require("express");
const router = express.Router();

router.use('/', require('./auth'));
router.use('/', require('./admin'));

module.exports = router;