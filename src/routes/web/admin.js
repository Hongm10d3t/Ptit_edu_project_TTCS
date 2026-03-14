const express = require("express");
const router = express.Router();
const adminController = require('../../controllers/web/adminController');
const {
    requireLogin,
    requireGuest,
    requireRole
} = require('../../middleware/authMiddlewareWeb');

// admin
router.use(requireRole("ADMIN"));
router.get('/admin', adminController.getAdminPage);
router.get('/edit', adminController.getEditPage);

module.exports = router;