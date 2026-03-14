const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: ["video", "document"],
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

        url: {
            type: String,
            default: "",
            trim: true,
        },
        fileName: {
            type: String,
            default: "",
            trim: true,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

materialSchema.index({ courseId: 1, createdAt: -1 });
materialSchema.index({ createdBy: 1 });
materialSchema.index({ type: 1 });

module.exports =
    mongoose.models.Material || mongoose.model("Material", materialSchema);