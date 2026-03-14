const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            EC: 1,
            EM: "Bạn chưa đăng nhập",
            DT: null
        });
    }
    next();
};

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.status(401).json({
                EC: 1,
                EM: "Bạn chưa đăng nhập",
                DT: null
            });
        }

        const { role } = req.session.user;

        if (!roles.includes(role)) {
            return res.status(403).json({
                EC: 2,
                EM: "Bạn không có quyền truy cập",
                DT: null
            });
        }

        next();
    };
};

module.exports = {
    requireLogin,
    requireRole
};