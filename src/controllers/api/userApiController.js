
const { uploadSingleFile } = require('../../services/fileService');
const { createUserService, createArrayUserService, putUpdateUserService, getAllUsersService, deleteUserService, deleteArrayUserService, getDetailUserService, getStudentMyCourseService, getTeacherMyCourseService } = require('../../services/userService');

module.exports = {
    postCreateUser: async (req, res) => {
        let User = await createUserService(req.body);
        return res.status(200).json({
            EC: 0,
            data: User
        })
    },
    postCreateArrayUser: async (req, res) => {
        let Users = await createArrayUserService(req.body.Users);
        return res.status(200).json({
            EC: 0,
            data: Users
        })
    },
    getAllUsers: async (req, res) => {
        try {
            let limit = req.query.limit ? Number(req.query.limit) : null;
            let page = req.query.page ? Number(req.query.page) : null;

            const data = await getAllUsersService(limit, page);

            return res.status(200).json({
                EC: 0,
                data,
            });
        } catch (error) {
            console.log("getAllUsers error:", error);
            return res.status(500).json({
                EC: 1,
                EM: "Lỗi server khi lấy danh sách người dùng",
                data: null,
            });
        }
    },
    getDetailUser: async (req, res) => {
        let user = await getDetailUserService(req.params.id);
        return res.json(user);
    },
    putUpdateUser: async (req, res) => {
        const id = req.params.id;
        let data = req.body;
        let result = await putUpdateUserService(id, data);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteUser: async (req, res) => {
        let result = await deleteUserService(req.params.id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    deleteArrayUser: async (req, res) => {
        // console.log(">>>>>>", req.body)
        let result = await deleteArrayUserService(req.body.UserID);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    getStudentMyCourse: async (req, res) => {
        let { courseId } = req.params;
        let data = await getStudentMyCourseService(courseId);
        return res.status(200).json({
            EC: 0,
            data: data
        })
    },
    getTeacherMyCourse: async (req, res) => {
        let { courseId } = req.params;
        let data = await getTeacherMyCourseService(courseId);
        return res.status(200).json({
            EC: 0,
            data: data
        })
    }

}