const express = require("express");
const routerAPI = express.Router();

const userController = require('../../controllers/api/userApiController');
const termController = require('../../controllers/api/termApiController');
const courseController = require('../../controllers/api/courseApiController')
const { requireRole } = require('../../middleware/authMiddlewareApi');

// Add middleware
routerAPI.use(requireRole("ADMIN"));

// Manager User
routerAPI.post('/user', userController.postCreateUser);
routerAPI.get('/users', userController.getAllUsers);
routerAPI.get('/user/:id', userController.getDetailUser);
routerAPI.put('/user/:id', userController.putUpdateUser);
routerAPI.delete('/user/:id', userController.deleteUser);

// Manager term
routerAPI.post('/term', termController.postCreateTerm);
routerAPI.get('/terms', termController.getAllTerms);
routerAPI.put('/term/:id', termController.putUpdateTerm);
routerAPI.delete('/term/:id', termController.deleteTerm);

// Manager course
routerAPI.post('/term/:termId/course', courseController.postCreateCourse);



module.exports = routerAPI;