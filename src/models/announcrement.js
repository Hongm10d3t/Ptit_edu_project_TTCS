const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
    {
        scope: { type: String, enum: ["SYSTEM", "SECTION"], default: "SECTION" },
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", default: null },

        title: { type: String, required: true, trim: true },
        content: { type: String, default: "" },

        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

announcementSchema.index({ scope: 1, createdAt: -1 });
announcementSchema.index({ sectionId: 1, createdAt: -1 });

module.exports = mongoose.model("Announcement", announcementSchema);