const authService = require('../../services/authService');

const getLoginPage = (req, res) => {
    return res.render('login', {
        error: null
    });
};

const handleLogin = async (req, res) => {
    try {
        const code = req.body.username;
        const password = req.body.password;

        if (!code || !password) {
            return res.render('login', {
                error: 'Vui lòng nhập đầy đủ mã đăng nhập và mật khẩu'
            });
        }

        const user = await authService.loginService(code, password);

        if (!user.success) {
            return res.render('login', {
                error: 'Tài khoản hoặc mật khẩu không đúng'
            });
        }

        // lưu session ở đây
        req.session.user = {
            id: user.data._id,
            code: user.data.code,
            role: user.data.role,
            name: user.data.name
        };


        if (user.data.role === "ADMIN") {
            return res.redirect('/admin');
        } else if (user.data.role === "STUDENT") {
            return res.redirect('/student');
        } else if (user.data.role === "TEACHER") {
            return res.redirect('/teacher');
        } else {
            return res.status(403).send("Role không hợp lệ");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Lỗi server");
    }
};

const handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Không thể đăng xuất');
        }
        res.redirect('/login');
    });
};

module.exports = {
    getLoginPage,
    handleLogin,
    handleLogout
};