const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        submittedAt: { type: Date, default: Date.now },
        status: { type: String, enum: ["SUBMITTED", "RESUBMITTED"], default: "SUBMITTED" },

        // Nội dung nộp
        contentText: { type: String, default: "" },
        linkUrl: { type: String, default: null },
        fileUrl: { type: String, default: null },
        storageKey: { type: String, default: null },

        // Chấm điểm
        score: { type: Number, default: null, min: 0 },
        feedback: { type: String, default: "" },
        gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        gradedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

// Mỗi SV thường chỉ có 1 “bài nộp mới nhất” cho 1 assignment
// Nếu bạn muốn cho nhiều lần, bỏ unique và quản bằng attempt/version.
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model("Submission", submissionSchema);