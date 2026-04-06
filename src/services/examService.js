const mongoose = require("mongoose");
const Exam = require("../models/exam");
const QuestionBank = require("../models/questionBank");

const createRandomExam = async ({
    courseId,
    bankId,
    createdBy,
    title,
    description,
    questionCount,
    durationMinutes,
    startAt,
    endAt,
}) => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return {
            EC: 1,
            EM: "courseId không hợp lệ",
            DT: null,
            status: 400,
        };
    }

    if (!mongoose.Types.ObjectId.isValid(bankId)) {
        return {
            EC: 1,
            EM: "bankId không hợp lệ",
            DT: null,
            status: 400,
        };
    }

    const questionBank = await QuestionBank.findById(bankId);

    if (!questionBank) {
        return {
            EC: 1,
            EM: "Không tìm thấy ngân hàng đề",
            DT: null,
            status: 404,
        };
    }

    if (String(questionBank.courseId) !== String(courseId)) {
        return {
            EC: 1,
            EM: "Ngân hàng đề không thuộc môn học này",
            DT: null,
            status: 400,
        };
    }

    if (questionBank.questions.length < questionCount) {
        return {
            EC: 1,
            EM: "Số câu hỏi trong ngân hàng không đủ",
            DT: {
                totalQuestionsInBank: questionBank.questions.length,
                requestedQuestionCount: questionCount,
            },
            status: 400,
        };
    }

    const randomQuestions = [...questionBank.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, questionCount);

    const examQuestions = randomQuestions.map((question) => ({
        bankQuestionId: question._id,
        content: question.content,
        options: question.options.map((option) => ({
            key: option.key,
            text: option.text,
        })),
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        level: question.level,
    }));

    const newExam = await Exam.create({
        courseId,
        bankId,
        createdBy,
        title,
        description,
        questionCount,
        durationMinutes,
        startAt,
        endAt,
        status: "draft",
        questions: examQuestions,
    });

    return {
        EC: 0,
        EM: "Tạo đề thi thành công",
        DT: newExam,
        status: 201,
    };
};

const getAllExamMyCourseService = async (courseId) => {
    try {
        let data = Exam.find({ courseId: courseId });
        return data;
    } catch (error) {
        console.log(">>>>", error);
    }
}

const getDetailExamService = async (examId) => {
    try {
        console.log(">>>>>>", examId);
        let data = Exam.findById(examId);
        return data;
    } catch (error) {
        console.log(">>>>", error);
    }
}
const deleteExamService = async (examId) => {
    try {
        let data = Exam.findByIdAndDelete(examId);
        return data;

    } catch (error) {
        console.log(">>>>>", error);
    }
}
module.exports = {
    createRandomExam, getAllExamMyCourseService, getDetailExamService, deleteExamService
};