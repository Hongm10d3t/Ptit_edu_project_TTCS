
const authService = require('../../services/authService');

// const loginApi = async (req, res) => {
//     const code = req.body.username;
//     const password = req.body.password;
//     console.log(">>>>>", code, password);
//     let user = await authService.loginService(code, password);
//     // session
//     req.session.user = {
//         id: user.data._id,
//         code: user.data.code,
//         role: user.data.role,
//         name: user.data.name
//     };
//     // console.log(">>>>>", req.session.user);

//     return res.status(200).json(user.data);
// };
// const authService = require("../../services/authService");

const loginApi = async (req, res) => {
    try {
        const code = req.body.username;
        const password = req.body.password;

        const result = await authService.loginService(code, password);

        // login fail nhưng không phải lỗi server
        if (!result.success) {
            // Xử lí trả về trong trường hợp đăng nhập không thành công
            return res.status(200).json(result);
        }

        req.session.user = {
            id: result.data._id,
            code: result.data.code,
            role: result.data.role,
            name: result.data.name || result.data.fullName || result.data.code,
        };

        return res.status(200).json(result);
    } catch (error) {
        console.log("loginApi error:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi server khi đăng nhập",
            data: null,
        });
    }
};


const logoutApi = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                EC: -1,
                EM: "Đăng xuất thất bại",
                DT: null
            });
        }

        return res.status(200).json({
            EC: 0,
            EM: "Đăng xuất thành công",
            DT: null
        });
    });
};
const getMe = (req, res) => {
    if (req.session && req.session.user) {
        return res.status(200).json({
            EC: 0,
            user: req.session.user
        });
    }
    return res.status(401).json({
        EC: 1,
        user: null
    });
};

module.exports = {
    loginApi,
    logoutApi,
    getMe
};