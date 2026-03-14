require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const configViewEngine = require("./config/viewEngine");
const connectDB = require("./config/database");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST_NAME || "localhost";

// config  fileUpload
app.use(fileUpload());

// body parsing (Express đã có sẵn)
// có tác dụng convert data về dạng object để xử lí trên code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// view engine + static
configViewEngine(app);

// config session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "my_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2 // 2 tiếng
        }
    })
);

// Truyền user từ session sang view
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user || null;
    next();
});

// liên kết FE
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.use("/v1/api", apiRoutes);
// app.use("/", webRoutes);


// connect database
(async () => {
    try {
        await connectDB();
        app.listen(PORT, HOST, () => {
            console.log(`Running: http://${HOST}:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
})();
