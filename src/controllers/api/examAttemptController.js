

const examAttemptService = require('../../services/examAttemptService');

const postStartExamAttempt = async (req, res) => {
    try {
        const { examId } = req.params;
        const studentId = req.session.user.id;
        const result = await examAttemptService.startExamAttempt({ examId, studentId });
        return res.status(200).json({
            EC: 0,
            data: result
        })

    } catch (error) {
        console.log(">>>>>", error);
        return res.status(500).json({
            EC: 1,
            data: error.message
        })

    }
}

// const getDetailExamAttempt = async (req, res) => {
//     const { examAttemptId } = req.params;
//     let data = await examAttemptService.getDetailExamAttemptService(examAttemptId);
//     return res.status(200).json({
//         EC: 0,
//         data: data
//     })
// }

const patchAnswerForQuestion = async (req, res) => {
    try {
        console.log(">>>>>> chạy vào đây");
        const { examAttemptId, questionId } = req.params;
        const studentId = req.session.user.id;
        const { selectedAnswer } = req.body;
        let data = await examAttemptService.patchAnswerForQuestionService({ examAttemptId, questionId, selectedAnswer, studentId });
        return res.status(200).json({
            EC: 0,
            data: data
        })


    } catch (error) {
        console.log(">>>>", error);
    }

}

const postSubmitExamAttempt = async (req, res) => {
    try {
        const { examAttemptId } = req.params;
        const studentId = req.session.user.id;
        let data = await examAttemptService.submitExamAttempt({ examAttemptId, studentId });
        return res.status(200).json({
            EC: 0,
            data: data
        })

    } catch (error) {
        console.log(">>>>", error);
    }
}

// const examAttemptService = require("../../services/examAttemptService");

const getMyExamAttemptsByExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const studentId = req.session.user.id;

        const data = await examAttemptService.getMyExamAttemptsByExamService({
            examId,
            studentId,
        });

        return res.status(200).json({
            EC: 0,
            data,
        });
    } catch (error) {
        console.log("getMyExamAttemptsByExam error:", error);
        return res.status(500).json({
            EC: -1,
            data: [],
        });
    }
};

const getDetailExamAttempt = async (req, res) => {
    try {
        const { examAttemptId } = req.params;
        const studentId = req.session.user.id;

        const data = await examAttemptService.getDetailExamAttemptForReviewService({
            examAttemptId,
            studentId,
        });

        return res.status(200).json({
            EC: 0,
            data,
        });
    } catch (error) {
        console.log("getDetailExamAttempt error:", error);
        return res.status(500).json({
            EC: -1,
            data: null,
        });
    }
};

const postSaveAttemptNote = async (req, res) => {
    try {
        const { examAttemptId } = req.params;
        const studentId = req.session.user.id;
        const { content, questionId } = req.body;

        const data = await examAttemptService.postSaveAttemptNoteService({
            examAttemptId,
            studentId,
            content,
            questionId,
        });

        return res.status(200).json({
            EC: 0,
            data,
        });
    } catch (error) {
        console.log("postSaveAttemptNote error:", error);
        return res.status(500).json({
            EC: -1,
            EM: error.message,
            data: null,
        });
    }
};

const patchAttemptNote = async (req, res) => {
    try {
        const { examAttemptId, noteId } = req.params;
        const studentId = req.session.user.id;
        const { content } = req.body;

        const data = await examAttemptService.patchAttemptNoteService({
            examAttemptId,
            studentId,
            noteId,
            content,
        });

        return res.status(200).json({
            EC: 0,
            data,
        });
    } catch (error) {
        console.log("patchAttemptNote error:", error);
        return res.status(500).json({
            EC: -1,
            EM: error.message,
            data: null,
        });
    }
};

const deleteAttemptNote = async (req, res) => {
    try {
        const { examAttemptId, noteId } = req.params;
        const studentId = req.session.user.id;

        await examAttemptService.deleteAttemptNoteService({
            examAttemptId,
            studentId,
            noteId,
        });

        return res.status(200).json({
            EC: 0,
            data: true,
        });
    } catch (error) {
        console.log("deleteAttemptNote error:", error);
        return res.status(500).json({
            EC: -1,
            EM: error.message,
            data: false,
        });
    }
};

module.exports = {
    postStartExamAttempt,
    getDetailExamAttempt,
    patchAnswerForQuestion,
    postSubmitExamAttempt,
    getMyExamAttemptsByExam,
    postSaveAttemptNote,
    patchAttemptNote,
    deleteAttemptNote,
};
// module.exports = { postStartExamAttempt, getDetailExamAttempt, patchAnswerForQuestion, postSubmitExamAttempt }