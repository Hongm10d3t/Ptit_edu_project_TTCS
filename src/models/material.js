const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
    {
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
        title: { type: String, required: true, trim: true },
        type: { type: String, enum: ["PDF", "SLIDE", "VIDEO", "LINK", "TEXT"], required: true },

        // nếu file upload:
        fileUrl: { type: String, default: null },
        storageKey: { type: String, default: null }, // dùng cho S3/MinIO sau này

        // nếu link:
        linkUrl: { type: String, default: null },

        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        visibility: { type: String, enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" },

        order: { type: Number, default: 0 },
        description: { type: String, default: "" },
    },
    { timestamps: true }
);

materialSchema.index({ sectionId: 1, createdAt: -1 });

module.exports = mongoose.model("Material", materialSchema);