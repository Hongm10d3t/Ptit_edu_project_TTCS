const mongoose = require("mongoose");

const attemptOptionSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const attemptQuestionSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [attemptOptionSchema],
            default: [],
        },
        correctAnswer: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true,
        },
        selectedAnswer: {
            type: String,
            enum: ["A", "B", "C", "D", null],
            default: null,
        },
        isCorrect: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true }
);

const examAttemptSchema = new mongoose.Schema(
    {
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },
        submittedAt: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: ["in_progress", "submitted"],
            default: "in_progress",
        },

        questions: {
            type: [attemptQuestionSchema],
            default: [],
        },

        score: {
            type: Number,
            default: 0,
            min: 0,
        },

        notes: {
            type: [noteSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

examAttemptSchema.index({ examId: 1, studentId: 1 });
examAttemptSchema.index({ studentId: 1, createdAt: -1 });
examAttemptSchema.index({ courseId: 1 });

module.exports =
    mongoose.models.ExamAttempt ||
    mongoose.model("ExamAttempt", examAttemptSchema);