const {
    postCreateAnnouncementService,
    getAllAnnouncementsService,
    getDetailAnnouncementService,
    putUpdateAnnouncementService,
    deleteAnnouncementService,
    getMyAnnouncementsService,
} = require("../../services/announcementService");

module.exports = {
    postCreateAnnouncement: async (req, res) => {
        try {
            let data = {
                title: req.body.title,
                content: req.body.content,
                target: req.body.target,
                isPublished: req.body.isPublished,
                createdBy: req.session.user.id,
            };

            let result = await postCreateAnnouncementService(data);

            return res.status(200).json({
                EC: 0,
                data: result,
            });
        } catch (error) {
            console.log("postCreateAnnouncement error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi tạo thông báo",
                data: null,
            });
        }
    },

    getAllAnnouncements: async (req, res) => {
        try {
            let target = req.query.target || "";
            let data = await getAllAnnouncementsService(target);

            return res.status(200).json({
                EC: 0,
                data: data,
            });
        } catch (error) {
            console.log("getAllAnnouncements error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi lấy danh sách thông báo",
                data: null,
            });
        }
    },

    getDetailAnnouncement: async (req, res) => {
        try {
            let data = await getDetailAnnouncementService(req.params.id);

            return res.status(200).json({
                EC: 0,
                data: data,
            });
        } catch (error) {
            console.log("getDetailAnnouncement error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi lấy chi tiết thông báo",
                data: null,
            });
        }
    },

    putUpdateAnnouncement: async (req, res) => {
        try {
            let id = req.params.id;
            let data = {
                title: req.body.title,
                content: req.body.content,
                target: req.body.target,
                isPublished: req.body.isPublished,
            };

            let result = await putUpdateAnnouncementService(id, data);

            return res.status(200).json({
                EC: 0,
                data: result,
            });
        } catch (error) {
            console.log("putUpdateAnnouncement error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi cập nhật thông báo",
                data: null,
            });
        }
    },

    deleteAnnouncement: async (req, res) => {
        try {
            let result = await deleteAnnouncementService(req.params.id);

            return res.status(200).json({
                EC: 0,
                data: result,
            });
        } catch (error) {
            console.log("deleteAnnouncement error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi xóa thông báo",
                data: null,
            });
        }
    },

    getMyAnnouncements: async (req, res) => {
        try {
            let role = req.session.user.role;
            let data = await getMyAnnouncementsService(role);

            return res.status(200).json({
                EC: 0,
                data: data,
            });
        } catch (error) {
            console.log("getMyAnnouncements error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi lấy thông báo",
                data: null,
            });
        }
    },
};