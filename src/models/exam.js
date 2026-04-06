const mongoose = require("mongoose");

const examOptionSchema = new mongoose.Schema(
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

const examQuestionSchema = new mongoose.Schema(
    {
        bankQuestionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [examOptionSchema],
            default: [],
        },
        correctAnswer: {
            type: String,
            enum: ["A", "B", "C", "D"],
            required: true,
        },
        explanation: {
            type: String,
            default: "",
            trim: true,
        },
        level: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
    },
    { _id: true }
);

const examSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        bankId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionBank",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },

        questionCount: {
            type: Number,
            required: true,
            min: 1,
        },
        questions: {
            type: [examQuestionSchema],
            default: [],
        },
        durationMinutes: {
            type: Number,
            required: true,
            min: 1,
        },

        startAt: {
            type: Date,
            required: true,
        },
        endAt: {
            type: Date,
            required: true,
        },

        shuffleQuestions: {
            type: Boolean,
            default: true,
        },
        shuffleOptions: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["draft", "published", "closed"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

examSchema.index({ courseId: 1, startAt: 1 });
examSchema.index({ bankId: 1 });
examSchema.index({ createdBy: 1 });
examSchema.index({ status: 1 });

module.exports = mongoose.models.Exam || mongoose.model("Exam", examSchema);