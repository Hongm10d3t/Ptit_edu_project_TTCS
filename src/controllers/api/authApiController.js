
const authService = require('../../services/authService');

const loginApi = async (req, res) => {
    const code = req.body.username;
    const password = req.body.password;;
    let user = await authService.loginService(code, password);
    // session
    req.session.user = {
        id: user.data._id,
        code: user.data.code,
        role: user.data.role,
        name: user.data.name
    };
    // console.log(">>>>>", req.session.user);

    return res.status(200).json(user.data);
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