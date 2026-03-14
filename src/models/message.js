const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            default: "",
            trim: true,
        },
        type: {
            type: String,
            enum: ["text", "file"],
            default: "text",
        },
        fileUrl: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.index({ courseId: 1, createdAt: 1 });
messageSchema.index({ senderId: 1, createdAt: -1 });

module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);