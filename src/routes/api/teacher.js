const express = require("express");
const routerAPI = express.Router();

const termApiController = require('../../controllers/api/termApiController');
const courseApiController = require('../../controllers/api/courseApiController');
const userApiController = require('../../controllers/api/userApiController');
const materialApiController = require('../../controllers/api/materialApiController');

routerAPI.get('/terms', termApiController.getMyTerms);
routerAPI.get('/:termId/courses', courseApiController.getMyCourses);
routerAPI.get('/term/:courseId/students', userApiController.getStudentMyCourse);
routerAPI.post('/term/course/:courseId/material', materialApiController.postMaterialByTeacher);


module.exports = routerAPI;