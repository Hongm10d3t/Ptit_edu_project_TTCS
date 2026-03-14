const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        termId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Term",
            required: true,
        },

        code: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },

        teacherIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        studentIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

courseSchema.index({ termId: 1, code: 1 }, { unique: true });
courseSchema.index({ termId: 1 });
courseSchema.index({ teacherIds: 1 });
courseSchema.index({ studentIds: 1 });
courseSchema.index({ status: 1 });

module.exports = mongoose.models.Course || mongoose.model("Course", courseSchema);