const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "" },

        type: { type: String, enum: ["FILE_UPLOAD", "TEXT", "LINK"], default: "FILE_UPLOAD" },
        maxScore: { type: Number, default: 10, min: 0 },
        dueDate: { type: Date, default: null },

        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        isPublished: { type: Boolean, default: true },
    },
    { timestamps: true }
);

assignmentSchema.index({ sectionId: 1, dueDate: 1 });

module.exports = mongoose.model("Assignment", assignmentSchema);