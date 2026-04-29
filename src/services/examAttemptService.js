


const mongoose = require("mongoose");
const Course = require("../models/course");
const Exam = require("../models/exam");
const ExamAttempt = require("../models/examAttempt");

// gán câu hỏi từ exam sang examAttempt
function buildAttemptQuestionsFromExam(examQuestions) {
    return examQuestions.map((question) => ({
        questionId: question._id,
        content: question.content,
        options: question.options.map((option) => ({
            key: option.key,
            text: option.text,
        })),
        correctAnswer: question.correctAnswer,
        selectedAnswer: null,
        isCorrect: false,
    }));
}

// format từ exam sang lại examAttempt, tránh truyền lên 1 số trường không cần thiết
function formatAttemptForDoing(attempt, exam) {
    return {
        _id: attempt._id,
        examId: attempt.examId,
        courseId: attempt.courseId,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        status: attempt.status,
        exam: {
            _id: exam._id,
            title: exam.title,
            description: exam.description,
            durationMinutes: exam.durationMinutes,
            startAt: exam.startAt,
            endAt: exam.endAt,
        },
        questions: attempt.questions.map((question) => ({
            questionId: question.questionId,
            content: question.content,
            options: question.options.map((option) => ({
                key: option.key,
                text: option.text,
            })),
            selectedAnswer: question.selectedAnswer,
        })),
    };
}
// tạo 1 exam attempt từ exam: truyền vào examId, studentId
const startExamAttempt = async ({ examId, studentId }) => {
    // tạo thêm 1 số cái validate nếu muốn
    // tạm thời bỏ qua cho đỡ phức tạp
    const exam = await Exam.findById(examId);
    const attemptQuestions = buildAttemptQuestionsFromExam(exam.questions);
    const attempt = await ExamAttempt.create({
        examId: exam._id,
        courseId: exam.courseId,
        studentId,
        startedAt: new Date(),
        submittedAt: null,
        status: "in_progress",
        questions: attemptQuestions,
        score: 0,
        notes: [],
    });
    return formatAttemptForDoing(attempt, exam);

    //     return {
    //         EC: 0,
    //         EM: "Bắt đầu làm bài thành công",
    //         DT: formatAttemptForDoing(attempt, exam),
    //         status: 201,
    //     };
}

const getDetailExamAttemptService = async (examAttemptId) => {
    try {
        console.log(">>>>>", examAttemptId);
        let data = await ExamAttempt.findById(examAttemptId);
        return data;
    } catch (error) {
        console.log(">>>>>", error);
    }
}

const patchAnswerForQuestionService = async ({ examAttemptId, questionId, selectedAnswer, studentId }) => {
    const realAnswer = selectedAnswer === null ? null : String(selectedAnswer).toUpperCase();
    const examAttempt = await ExamAttempt.findById(examAttemptId);
    const question = examAttempt.questions.find(
        (q) => String(q.questionId) === String(questionId)
    );
    question.selectedAnswer = realAnswer;
    await examAttempt.save();
    return examAttempt;

}

// truyền vào attemptId, studentId
const submitExamAttempt = async ({ examAttemptId, studentId }) => {
    try {
        const attempt = await ExamAttempt.findById(examAttemptId);
        let correctCount = 0;
        attempt.questions.forEach((question) => {
            if (question.selectedAnswer && question.selectedAnswer == question.correctAnswer) {
                question.isCorrect = true;
                correctCount++
            } else {
                question.isCorrect = false;
            }
        });
        const totalQuestions = attempt.questions.length;
        const rawScore = totalQuestions > 0 ? (correctCount / totalQuestions) * 10 : 0;
        const finalScore = Math.round(rawScore * 100) / 100;

        attempt.score = finalScore;
        attempt.submittedAt = new Date();
        attempt.status = "submitted";
        await attempt.save();
        return attempt;
    } catch (error) {
        console.log(">>>>>", error);
    }
}

// const ExamAttempt = require("../models/examAttempt");

const normalizeAttemptQuestion = (question) => {
    const questionDoc =
        question?.questionId && typeof question.questionId === "object"
            ? question.questionId
            : null;

    const correctAnswer =
        question?.correctAnswer || questionDoc?.correctAnswer || null;

    return {
        _id: questionDoc?._id || question?.questionId || question?._id || null,
        questionId: questionDoc?._id || question?.questionId || null,
        content:
            question?.content ||
            questionDoc?.content ||
            questionDoc?.questionText ||
            question?.questionText ||
            "",
        options:
            question?.options ||
            questionDoc?.options ||
            question?.answers ||
            questionDoc?.answers ||
            [],
        correctAnswer,
        selectedAnswer: question?.selectedAnswer || null,
        explanation:
            question?.explanation || questionDoc?.explanation || "",
        level: question?.level || questionDoc?.level || "",
        isCorrect:
            typeof question?.isCorrect === "boolean"
                ? question.isCorrect
                : question?.selectedAnswer === correctAnswer,
    };
};

const normalizeAttemptDetail = (attempt) => {
    if (!attempt) return null;

    const raw = attempt.toObject ? attempt.toObject() : attempt;

    return {
        ...raw,
        questions: Array.isArray(raw.questions)
            ? raw.questions.map(normalizeAttemptQuestion)
            : [],
        notes: Array.isArray(raw.notes) ? raw.notes : [],
    };
};

const getMyExamAttemptsByExamService = async ({ examId, studentId }) => {
    const attempts = await ExamAttempt.find({
        examId,
        studentId,
    })
        .sort({ createdAt: -1, startedAt: -1 })
        .lean();

    return attempts.map((attempt) => {
        const questions = Array.isArray(attempt.questions) ? attempt.questions : [];
        const correctCount = questions.filter((q) => {
            if (typeof q?.isCorrect === "boolean") return q.isCorrect;
            return q?.selectedAnswer === q?.correctAnswer;
        }).length;

        return {
            _id: attempt._id,
            examId: attempt.examId,
            courseId: attempt.courseId,
            startedAt: attempt.startedAt,
            submittedAt: attempt.submittedAt,
            status: attempt.status,
            score: attempt.score || 0,
            totalQuestions: questions.length,
            correctCount,
            createdAt: attempt.createdAt,
            updatedAt: attempt.updatedAt,
        };
    });
};

const getDetailExamAttemptForReviewService = async ({ examAttemptId, studentId }) => {
    const attempt = await ExamAttempt.findOne({
        _id: examAttemptId,
        studentId,
    }).populate("questions.questionId");

    if (!attempt) {
        throw new Error("Không tìm thấy bài làm");
    }

    return attempt;
};

const postSaveAttemptNoteService = async ({
    examAttemptId,
    studentId,
    content,
    questionId = null,
}) => {
    const attempt = await ExamAttempt.findOne({
        _id: examAttemptId,
        studentId,
    });

    if (!attempt) {
        throw new Error("Không tìm thấy bài làm");
    }

    const newNote = {
        questionId: questionId || null,
        content: String(content || "").trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    if (!newNote.content) {
        throw new Error("Nội dung note không được để trống");
    }

    attempt.notes.push(newNote);
    await attempt.save();

    return attempt.notes[attempt.notes.length - 1];
};

const patchAttemptNoteService = async ({
    examAttemptId,
    studentId,
    noteId,
    content,
}) => {
    const attempt = await ExamAttempt.findOne({
        _id: examAttemptId,
        studentId,
    });

    if (!attempt) {
        throw new Error("Không tìm thấy bài làm");
    }

    const note = attempt.notes.id(noteId);

    if (!note) {
        throw new Error("Không tìm thấy note");
    }

    note.content = String(content || "").trim();
    note.updatedAt = new Date();

    await attempt.save();
    return note;
};

const deleteAttemptNoteService = async ({
    examAttemptId,
    studentId,
    noteId,
}) => {
    const attempt = await ExamAttempt.findOne({
        _id: examAttemptId,
        studentId,
    });

    if (!attempt) {
        throw new Error("Không tìm thấy bài làm");
    }

    const note = attempt.notes.id(noteId);

    if (!note) {
        throw new Error("Không tìm thấy note");
    }

    note.deleteOne();
    await attempt.save();

    return true;
};

// const Course = require("../models/course");
// const ExamAttempt = require("../models/examAttempt");

const countCorrectAnswers = (questions = []) => {
    return questions.filter((q) => {
        if (typeof q?.isCorrect === "boolean") return q.isCorrect;
        return q?.selectedAnswer === q?.correctAnswer;
    }).length;
};

const ensureTeacherOwnsCourse = async (courseId, teacherId) => {
    const course = await Course.findOne({
        _id: courseId,
        teacherIds: teacherId,
    });

    if (!course) {
        throw new Error("Bạn không có quyền xem kết quả học tập của học phần này.");
    }

    return course;
};

const getStudentExamResultsByCourseForTeacherService = async ({
    courseId,
    studentId,
    teacherId,
}) => {
    await ensureTeacherOwnsCourse(courseId, teacherId);

    const attempts = await ExamAttempt.find({
        courseId,
        studentId,
    })
        .populate("examId", "title")
        .sort({ createdAt: -1 })
        .lean();

    const summaryMap = new Map();

    for (const attempt of attempts) {
        if (!attempt.examId?._id) continue;

        const examId = String(attempt.examId._id);
        const correctCount = countCorrectAnswers(attempt.questions || []);
        const totalQuestions = Array.isArray(attempt.questions)
            ? attempt.questions.length
            : 0;

        if (!summaryMap.has(examId)) {
            summaryMap.set(examId, {
                examId: attempt.examId._id,
                title: attempt.examId.title || "Đề thi",
                attemptCount: 0,
                bestScore: attempt.score || 0,
                latestScore: attempt.score || 0,
                latestStatus: attempt.status || "--",
                latestSubmittedAt: attempt.submittedAt || null,
                totalQuestions,
                bestCorrectCount: correctCount,
            });
        }

        const current = summaryMap.get(examId);
        current.attemptCount += 1;

        if ((attempt.score || 0) > current.bestScore) {
            current.bestScore = attempt.score || 0;
            current.bestCorrectCount = correctCount;
        }
    }

    return Array.from(summaryMap.values());
};

const getStudentExamAttemptsByExamForTeacherService = async ({
    courseId,
    studentId,
    examId,
    teacherId,
}) => {
    await ensureTeacherOwnsCourse(courseId, teacherId);

    const attempts = await ExamAttempt.find({
        courseId,
        studentId,
        examId,
    })
        .sort({ createdAt: -1 })
        .lean();

    return attempts.map((attempt, index) => {
        const correctCount = countCorrectAnswers(attempt.questions || []);
        const totalQuestions = Array.isArray(attempt.questions)
            ? attempt.questions.length
            : 0;

        return {
            _id: attempt._id,
            attemptNo: attempts.length - index,
            startedAt: attempt.startedAt,
            submittedAt: attempt.submittedAt,
            status: attempt.status || "--",
            score: attempt.score || 0,
            correctCount,
            totalQuestions,
        };
    });
};



module.exports = {
    startExamAttempt, getDetailExamAttemptService, patchAnswerForQuestionService, submitExamAttempt, getMyExamAttemptsByExamService,
    getDetailExamAttemptForReviewService,
    postSaveAttemptNoteService,
    patchAttemptNoteService,
    deleteAttemptNoteService,
    getStudentExamResultsByCourseForTeacherService,
    getStudentExamAttemptsByExamForTeacherService,
}