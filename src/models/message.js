const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        type: { type: String, enum: ["TEXT", "FILE"], default: "TEXT" },
        content: { type: String, default: "" },

        fileUrl: { type: String, default: null },
        storageKey: { type: String, default: null },

        parentMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null }, // optional thread
    },
    { timestamps: true }
);

messageSchema.index({ sectionId: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);