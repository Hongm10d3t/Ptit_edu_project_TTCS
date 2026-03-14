const express = require("express");
const routerAPI = express.Router();
const authApiController = require('../../controllers/api/authApiController');

const { requireLogin } = require('../../middleware/authMiddlewareApi');

routerAPI.post("/login", authApiController.loginApi);
routerAPI.post("/logout", authApiController.logoutApi);
routerAPI.get("/me", requireLogin, authApiController.getMe);

module.exports = routerAPI;