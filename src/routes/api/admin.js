const express = require("express");
const routerAPI = express.Router();

const userController = require('../../controllers/api/userApiController');
const termController = require('../../controllers/api/termApiController');
const courseController = require('../../controllers/api/courseApiController');
const announcementController = require("../../controllers/api/announcementApiController");

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
routerAPI.get('/term/:termId/courses', courseController.getAllCourses);
routerAPI.put('/term/:termId/:courseId', courseController.putUpdateCourse);
routerAPI.delete('/term/:termId/:courseId', courseController.deleteCourse);

// Manager announcement
// Chia ra: Những thông báo dành cho giảng viên
// Những thông bá dành cho sinh viên
// Manager announcement
routerAPI.post("/announcement", announcementController.postCreateAnnouncement);
routerAPI.get("/announcements", announcementController.getAllAnnouncements);
routerAPI.get("/announcement/:id", announcementController.getDetailAnnouncement);
routerAPI.put("/announcement/:id", announcementController.putUpdateAnnouncement);
routerAPI.delete("/announcement/:id", announcementController.deleteAnnouncement);


// Add Teacher, Student in course
routerAPI.get('/course/:courseId/members', courseController.getAllMembers);
routerAPI.post('/course/:courseId/teacher', courseController.postAddTeacher);
routerAPI.post('/course/:courseId/student', courseController.postAddStudent);
routerAPI.delete('/course/:courseId/student/:studentId', courseController.deleteStudent);
routerAPI.delete('/course/:courseId/teacher/:teacherId', courseController.deleteTeacher);



module.exports = routerAPI;