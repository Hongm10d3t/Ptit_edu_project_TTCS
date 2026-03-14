const express = require("express");
const router = express.Router();
const authController = require('../../controllers/web/authController');;

const { requireGuest, requireLogin, requireRole } = require('../../middleware/authMiddlewareWeb');
// login/logout
router.get('/login', requireGuest, authController.getLoginPage);
router.post('/login', requireGuest, authController.handleLogin);
router.get('/logout', requireLogin, authController.handleLogout);

// nếu muốn từ "/" cũng phải login mới vào được
router.get('/', requireLogin, (req, res) => {
    return res.render('home');
});



module.exports = router;
