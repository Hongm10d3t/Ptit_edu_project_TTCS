const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const requireGuest = (req, res, next) => {
    if (req.session.user) {
        const role = req.session.user.role;

        if (role === "ADMIN") return res.redirect('/admin');
        if (role === "STUDENT") return res.redirect('/student');
        if (role === "TEACHER") return res.redirect('/teacher');

        return res.redirect('/');
    }
    next();
};

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Bạn không có quyền truy cập');
        }

        next();
    };
};

module.exports = {
    requireLogin,
    requireGuest,
    requireRole
};