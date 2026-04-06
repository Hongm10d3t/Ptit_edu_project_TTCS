const express = require("express");
const routerAPI = express.Router();

const termApiController = require('../../controllers/api/termApiController');
const courseApiController = require('../../controllers/api/courseApiController');
const userApiController = require('../../controllers/api/userApiController');
const materialApiController = require('../../controllers/api/materialApiController');
const questionBankController = require('../../controllers/api/questionbankController');
const examController = require('../../controllers/api/examApiController');
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
routerAPI.get('/question-bank/:questionBankId/questionList', questionBankController.getListQuestions);
// tạo 1 đề thi
routerAPI.post("/exam/random", examController.postCreateRandomExam);
// lấy ra đề thi của 1 theo lớp học
routerAPI.get('/exams/:courseId', examController.getAllExamMyCourse);
// lấy ra chi tiết 1 đề thi
routerAPI.get('/exam/:examId', examController.getDetailExam);
// xóa 1 đề thi
routerAPI.delete('/exam/:examId', examController.deleteExam);



module.exports = routerAPI;