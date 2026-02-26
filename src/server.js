require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const User = require('./models/user');
const configViewEngine = require("./config/viewEngine");
const connectDB = require("./config/database");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

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

// routes
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

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
