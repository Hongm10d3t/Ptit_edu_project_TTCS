
const authService = require('../../services/authService');

const loginApi = async (req, res) => {
    const { code, password } = req.body;
    let user = await authService.loginService(code, password);
    return res.status(200).json({
        EC: 0,
        data: user
    })
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

module.exports = {
    loginApi,
    logoutApi
};