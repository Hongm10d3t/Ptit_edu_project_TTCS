const User = require('../models/user');
const Course = require('../models/course');
const bcrypt = require("bcryptjs");
const createUserService = async (UserData) => {
    try {
        let result = await User.create({
            code: UserData.code,
            fullName: UserData.fullName,
            email: UserData.email,
            passwordHash: await bcrypt.hash(UserData.passwordHash, 10),
            role: UserData.role,
            status: UserData.status,
            avatarUrl: UserData.avatarUrl,
            department: UserData.department
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayUserService = async (arr) => {
    try {
        let result = await User.insertMany(arr);
        return result;

    } catch (error) {
        console.log(">>>>error", error);
        return null;
    }
}

const getAllUsersService = async (limit, page) => {
    try {
        let result = null;
        if (limit && page) {
            let skip = (page - 1) * limit;
            result = await User.find({}).skip(skip).limit(limit).exec(); // thêm hàm exec() chạy các hàm liên tiếp (tránh bất đồng bộ)
        } else {
            result = await User.find({});
        }
        return result;

    } catch (error) {
        console.log(">>>>error", error);
        return null
    }
}

const getDetailUserService = async (id) => {
    return await User.findById(id);
}

const putUpdateUserService = async (id, data) => {
    // try {
    //     let User_new = await User.updateOne({ _id: id }, { name, email, address });
    //     return User_new;

    // } catch (error) {
    //     console.log(">>>>error", error);
    //     return null
    // }
    return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
}

const deleteUserService = async (id) => {
    // try {
    //     let result = await User.deleteById(id);
    //     return result;

    // } catch (error) {
    //     console.log(">>>>error", error);
    //     return null
    // }
    return await User.findByIdAndDelete(id);
}

const deleteArrayUserService = async (arr) => {
    try {
        let result = await User.delete({ _id: { $in: arr } });
        return result

    } catch (error) {
        console.log(">>>>error", error);
        return null;
    }
}

const getStudentMyCourseService = async (courseId) => {
    try {
        let course = Course.findById(courseId)
            .populate("studentIds", "code fullName email role");
        return course;

    } catch (error) {
        console.log(">>>>", error);
    }
}


module.exports = {
    createUserService, createArrayUserService, getAllUsersService, putUpdateUserService, deleteUserService, deleteArrayUserService, getDetailUserService, getStudentMyCourseService
}