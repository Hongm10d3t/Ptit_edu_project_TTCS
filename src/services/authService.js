
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    loginService: async (code, password) => {
        let user = await User.findOne({ code });
        console.log(">>>>>>", user);
        if (!user) {
            return {
                success: false,
                message: "Tài khoản hoặc mật khẩu không đúng"
            }
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return {
                success: false,
                message: "Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng"
            }
        }
        if (user.status === 'INACTIVE') {
            return {
                success: false,
                message: "Đăng nhập thất bại. Tài khoản này đã bị khóa"
            }
        }
        return {
            success: true,
            message: "Đăng nhập thành công",
            data: user
        }
    }
}