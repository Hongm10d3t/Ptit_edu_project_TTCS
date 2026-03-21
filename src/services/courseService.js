
const course = require('../models/course');
const Course = require('../models/course');
const Term = require('../models/term');
const User = require('../models/user');

const createCourseService = async (termId, course) => {
    try {
        let foundTerm = await Term.findById(termId);
        if (!foundTerm) {
            return "termId không hợp lệ";
        }
        let data = await Course.create({
            termId: termId,
            code: course.code,
            name: course.name,
            description: course.description,
            status: course.status,
            createdBy: course.createdBy
        });
        return data;
    } catch (error) {
        console.log(">>>>>", error);
    }
}

const getAllCoursesService = async (termId) => {
    try {
        let data = await Course.find({ termId: termId });
        return data;

    } catch (error) {
        console.log(">>>>>>", error);
    }

}

const UpdateCourseService = async (id, course) => {
    try {
        let data = await Course.findByIdAndUpdate(id, course, { returnDocument: "after" });
        return data;
    } catch (error) {
        console.log(">>>>", error);
    }
}

const deleteCourseService = async (id) => {
    try {
        let data = await Course.findByIdAndDelete(id);
        return data;

    } catch (error) {
        console.log(">>>>", error);
    }
}

const getAllMembersService = async (courseId) => {
    try {
        const course = await Course.findById(courseId)
            .populate('teacherIds', 'code fullName email role')
            .populate('studentIds', 'code fullName email role');
        return course;
    } catch (error) {
        console.log(">>>", error);
    }
}

const addTeacherService = async (courseId, teacherId) => {
    const user = await User.findById(teacherId);
    if (!user) {
        throw new Error("User này không tồn tại");
    }
    if (user.role !== "TEACHER") {
        throw new Error("User này không phải là giảng viên");
    }
    try {
        const course = await Course.findByIdAndUpdate(courseId,
            {
                $addToSet: { teacherIds: teacherId }
            },
            { returnDocument: 'after' }
        )
        return course;

    } catch (error) {
        console.log(">>>", error);

    }
}

const addStudentService = async (courseId, studentId) => {
    const user = await User.findById(studentId);
    if (!user) {
        throw new Error("User không tồn tại");
    }
    if (user.role !== "STUDENT") {
        throw new Error("User này không là sinh viên");
    }
    try {
        let course = await Course.findByIdAndUpdate(courseId,
            {
                $addToSet: { studentIds: studentId }
            },
            { returnDocument: 'after' }
        )
        return course;

    } catch (error) {
        console.log(">>>", error);
    }
}

const deleteStudentService = async (courseId, studentId) => {
    try {
        let course = Course.findByIdAndUpdate(courseId,
            {
                $pull: { studentIds: studentId }
            },
            { returnDocument: 'after' }
        )
        return course;

    } catch (error) {
        console.log(">>>>", error)
    }
}

const deleteTeacherService = async (courseId, teacherId) => {
    try {
        let course = await Course.findByIdAndUpdate(courseId,
            {
                $pull: { teacherIds: teacherId },
            },
            { returnDocument: 'after' }
        )
        return course;
    } catch (error) {
        console.log(">>>>", error);
    }
}
const getMyCourseService = async (userId, role, termId) => {
    console.log(">>>>>", userId, role);
    try {
        let courses = [];
        if (role === "STUDENT") {
            courses = await Course.find({
                studentIds: userId,
                termId: termId
            });
        }
        else if (role === "TEACHER") {
            courses = await Course.find({
                teacherIds: userId,
                termId: termId
            });
        }
        else {
            throw new Error("Role không hợp lệ");
        }
        return courses;

    } catch (error) {
        console.log(">>>>", error);
    }
}
module.exports = {
    createCourseService, getAllCoursesService, UpdateCourseService, deleteCourseService, addTeacherService, addStudentService, getAllMembersService, deleteStudentService, deleteTeacherService, getMyCourseService
}