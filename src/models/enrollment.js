const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
    {
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        status: { type: String, enum: ["ACTIVE", "DROPPED"], default: "ACTIVE" },
        enrolledAt: { type: Date, default: Date.now },

        finalGrade: { type: Number, default: null, min: 0 }, // nếu bạn có điểm tổng kết
        progressSummary: {
            percent: { type: Number, default: 0, min: 0, max: 100 },
            updatedAt: { type: Date, default: null },
        },
    },
    { timestamps: true }
);

enrollmentSchema.index({ sectionId: 1, studentId: 1 }, { unique: true });
enrollmentSchema.index({ studentId: 1 });

module.exports = mongoose.model("Enrollment", enrollmentSchema);