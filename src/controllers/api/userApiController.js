
const { uploadSingleFile } = require('../../services/fileService');
const { createUserService, createArrayUserService, getAllUsersService, putUpdateUserService, deleteUserService, deleteArrayUserService, getDetailUserService } = require('../../services/userService');
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
        let limit = req.query.limit;
        let page = req.query.page;
        let Users = null;
        if (limit && page) {
            Users = await getAllUsersService(limit, page);
        } else {
            Users = await getAllUsersService();
        }
        return res.json(Users);
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
    }

}