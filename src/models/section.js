const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        // termId: { type: mongoose.Schema.Types.ObjectId, ref: "Term", required: true },
        // courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        sectionCode: { type: String, required: true, trim: true }, // INT2215-01
        termId: { type: String },
        courseId: { type: String },
        teacherId: { type: String },

        // teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        // lịch học đơn giản (MVP)
        // schedule: [
        //     {
        //         dayOfWeek: { type: Number, min: 2, max: 8 }, // 2..8 (T2..CN) tuỳ bạn quy ước
        //         startTime: { type: String }, // "08:00"
        //         endTime: { type: String },   // "09:40"
        //         location: { type: String, default: "" },
        //     },
        // ],
        status: { type: String }
        // status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" },
    },
    { timestamps: true }
);

// sectionSchema.index({ termId: 1, courseId: 1, sectionCode: 1 }, { unique: true });
// sectionSchema.index({ teacherId: 1 });

module.exports = mongoose.model("Section", sectionSchema);