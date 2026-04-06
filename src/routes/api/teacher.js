const express = require("express");
const routerAPI = express.Router();

const termApiController = require('../../controllers/api/termApiController');
const courseApiController = require('../../controllers/api/courseApiController');
const userApiController = require('../../controllers/api/userApiController');
const materialApiController = require('../../controllers/api/materialApiController');
const questionBankController = require('../../controllers/api/questionbankController');
const { requireRole } = require('../../middleware/authMiddlewareApi');
// const uploadCsv = require('../../middleware/uploadCsv');
// Add middleware
routerAPI.use(requireRole("TEACHER"));
// lấy ra các kì học được join
routerAPI.get('/terms', termApiController.getMyTerms);
// lấy ra các lớp học được join
routerAPI.get('/:termId/courses', courseApiController.getMyCourses);
// lấy ra danh sách sinh viên trong lớp học
routerAPI.get('/term/:courseId/students', userApiController.getStudentMyCourse);
// đăng tải tài liệu
routerAPI.post('/term/course/:courseId/material', materialApiController.postMaterialByTeacher);

// Manager Question Bank
// Tạo 1 Question Bank
routerAPI.post('/course/:courseId/questionbank', questionBankController.postCreateQuestionBank);
// Xóa 1 Question Bank
routerAPI.delete('/course/:courseId/questionbank/:questionBankId', questionBankController.deleteQuestionBank);

// lấy question bank theo course
routerAPI.get('/course/:courseId/questionbank', questionBankController.getAllQuestionBank);
// thêm câu hỏi vào ngân hàng câu hỏi bằng file CSV
routerAPI.post('/question-bank/:questionBankId/import-csv', questionBankController.postCsvForQuestionBank);
// lấy danh sách câu hỏi của 1 ngân hàng đề


module.exports = routerAPI;