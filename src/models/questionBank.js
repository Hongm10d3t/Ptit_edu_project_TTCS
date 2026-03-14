const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
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

const questionSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        options: {
            type: [optionSchema],
            validate: {
                validator: function (value) {
                    return value.length >= 2 && value.length <= 4;
                },
                message: "Question must have from 2 to 4 options",
            },
            required: true,
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
    {
        _id: true,
        timestamps: false,
    }
);

const questionBankSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
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

        questions: {
            type: [questionSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

questionBankSchema.index({ courseId: 1, createdAt: -1 });
questionBankSchema.index({ createdBy: 1 });

module.exports =
    mongoose.models.QuestionBank ||
    mongoose.model("QuestionBank", questionBankSchema);