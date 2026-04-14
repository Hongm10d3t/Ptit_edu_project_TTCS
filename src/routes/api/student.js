
const express = require("express");
const routerAPI = express.Router();

const termApiController = require('../../controllers/api/termApiController');
const courseApiController = require('../../controllers/api/courseApiController');
const userApiController = require('../../controllers/api/userApiController');
const materialApiController = require('../../controllers/api/materialApiController');
const examController = require('../../controllers/api/examApiController');
const examAttemptController = require('../../controllers/api/examAttemptController');
const { requireRole } = require('../../middleware/authMiddlewareApi');

routerAPI.use(requireRole("STUDENT"));
// lấy ra tất cả kì học được join
routerAPI.get('/terms', termApiController.getAllTerms);
// lấy tất cả lớp học học trong kì học
routerAPI.get('/:termId/courses', courseApiController.getMyCourses);
// lấy thông tin chi tiết của 1 lớp học
routerAPI.get('/term/:courseId', courseApiController.getDetailCourse);
// xem danh sách sinh viên trong lớp mình học
routerAPI.get('/term/:courseId/students', userApiController.getStudentMyCourse);
// xem thông tin giảng viên của lớp học
routerAPI.get('/term/:courseId/teacher', userApiController.getTeacherMyCourse);

// các chức năng khi bấm vào 1 lớp học

// lấy tài liệu
// nếu click vào xem video khóa học thì truyền vào type là video
// nếu click vào xem tài liệu khóa học thì truyền vào type là document
routerAPI.get('/term/course/:courseId/material', materialApiController.getAllMaterial);

// xem danh sách đề thi được giảng viên đăng tải lên lớp học
routerAPI.get('/exams/:courseId', examController.getAllExamMyCourse);
// sinh viên chọn 1 đề thi
// thiết lập examAttempt
routerAPI.post('/exam/:examId/start', examAttemptController.postStartExamAttempt);
// lấy chi tiết bài làm để render ra giao diện
routerAPI.get('/examAttempt/:examAttemptId', examAttemptController.getDetailExamAttempt)
// sinh viên thực hiện chọn đáp án cho 1 câu hỏi
routerAPI.patch(
    "/examAttempt/:examAttemptId/question/:questionId/answer",
    examAttemptController.patchAnswerForQuestion
);
// sinh viên ấn nộp bài ==> thực hiện chấm bài, lưu kết quả
routerAPI.post('/examAttempt/:examAttemptId/submit', examAttemptController.postSubmitExamAttempt);
// lịch sử các lần làm của sinh viên cho 1 đề
routerAPI.get('/exam/:examId/attempts', examAttemptController.getMyExamAttemptsByExam);

// lưu note cho 1 lần làm
routerAPI.post('/examAttempt/:examAttemptId/note', examAttemptController.postSaveAttemptNote);

// sửa note
routerAPI.patch('/examAttempt/:examAttemptId/note/:noteId', examAttemptController.patchAttemptNote);

// xóa note
routerAPI.delete('/examAttempt/:examAttemptId/note/:noteId', examAttemptController.deleteAttemptNote);

module.exports = routerAPI;