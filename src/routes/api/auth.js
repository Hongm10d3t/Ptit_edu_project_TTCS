const express = require("express");
const routerAPI = express.Router();
const authApiController = require('../../controllers/api/authApiController');

routerAPI.post("/", authApiController.loginApi);
routerAPI.post("/", authApiController.logoutApi);

module.exports = routerAPI;