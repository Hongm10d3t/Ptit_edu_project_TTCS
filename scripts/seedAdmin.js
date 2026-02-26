require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/user"); // đổi đúng path model của bạn

(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ptitedu');

    const email = "admin@local.com";
    const code = "admin";
    const password = "Admin@123";

    const exists = await User.findOne({ email });
    if (exists) {
        console.log("Admin already exists:", exists.email);
        process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await User.create({
        code,
        fullName: "System Admin",
        email,
        passwordHash,
        role: "ADMIN",
        status: "ACTIVE",
    });

    console.log("✅ Seed admin:", { email: admin.email, password });
    process.exit(0);
})();