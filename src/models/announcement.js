const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        target: {
            type: String,
            enum: ["student", "teacher", "all"],
            default: "student",
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

announcementSchema.index({ createdAt: -1 });
announcementSchema.index({ createdBy: 1 });
announcementSchema.index({ target: 1 });

module.exports =
    mongoose.models.Announcement ||
    mongoose.model("Announcement", announcementSchema);