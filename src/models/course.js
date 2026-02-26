const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        courseCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        credits: { type: Number, default: 0, min: 0 },
        tags: [{ type: String, trim: true }],
    },
    { timestamps: true }
);

courseSchema.index({ title: "text", courseCode: "text" });

module.exports = mongoose.model("Course", courseSchema);