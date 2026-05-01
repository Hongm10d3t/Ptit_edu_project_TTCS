

const examService = require("../../services/examService");

const postCreateRandomExam = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const result = await examService.createRandomExam({
            ...req.body,
            createdBy: userId,
        });
        console.log(">>>>>>", req.body);

        return res.status(result.status).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT,
        });
    } catch (error) {
        console.log(">>> postCreateRandomExam error:", error);
        return res.status(500).json({
            EC: 1,
            EM: "Lỗi server",
            DT: error.message,
        });
    }
};

const getAllExamMyCourse = async (req, res) => {
    const { courseId } = req.params;
    let data = await examService.getAllExamMyCourseService(courseId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}
const getDetailExam = async (req, res) => {
    const { examId } = req.params;
    let data = await examService.getDetailExamService(examId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}
const deleteExam = async (req, res) => {
    const { examId } = req.params;
    let data = await examService.deleteExamService(examId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

// const postStartExamAttempt = async (req, res) => {

// }
module.exports = {
    postCreateRandomExam, getAllExamMyCourse, getDetailExam, deleteExam
};