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
        let skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            User.find({})
                .skip(skip)
                .limit(limit)
                .exec(),
            User.countDocuments({}),
        ]);

        return {
            items,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    } catch (error) {
        console.log(">>> error", error);
        throw error;
    }
};

const getDetailUserService = async (id) => {
    return await User.findById(id);
}

// const putUpdateUserService = async (id, data) => {
//     data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
//     return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
// }

const putUpdateUserService = async (id, data) => {
    const updateData = { ...data };
    console.log(">>>>>>", updateData);

    if (updateData.passwordHash && updateData.passwordHash.trim()) {
        updateData.passwordHash = await bcrypt.hash(updateData.passwordHash.trim(), 10);
    } else {
        delete updateData.passwordHash;
    }

    return await User.findByIdAndUpdate(id, updateData, {
        returnDocument: "after",
    });
};

const deleteUserService = async (id) => {
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
            .populate("studentIds", "code fullName email role department status");
        return course;

    } catch (error) {
        console.log(">>>>", error);
    }
}

const getTeacherMyCourseService = async (courseId) => {
    try {
        let data = Course.findById(courseId).populate("teacherIds", "code fullName email role ");
        return data;

    } catch (error) {
        console.log(">>>>", error);
    }
}

module.exports = {
    createUserService, createArrayUserService, getAllUsersService, putUpdateUserService, deleteUserService, deleteArrayUserService, getDetailUserService, getStudentMyCourseService, getTeacherMyCourseService
}