const mongoose = require("mongoose");

const USER_ROLES = ["ADMIN", "TEACHER", "STUDENT"];

const userSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true, trim: true },
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },

        role: { type: String, enum: USER_ROLES, required: true },
        status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },

        avatarUrl: { type: String, default: null },
        department: { type: String, default: null },
    },
    { timestamps: true }
);

userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
module.exports.USER_ROLES = USER_ROLES;