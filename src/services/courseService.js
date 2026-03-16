
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
        console.log("User không tồn tại");
    }
    if (user.role !== "ADMIN") {
        console.log("User này không phải teacher");
    }
    try {
        const course = await Course.findByIdAndUpdate(courseId,
            {
                $addToSet: { teacherIds: teacherId }
            },
            { new: true }
        )
        return course;

    } catch (error) {
        console.log(">>>", error);

    }
}

const addStudentService = async (courseId, studentId) => {
    const user = await User.findById(studentId);
    if (!user) {
        console.log("User không tồn tại");
    }
    if (user.role !== "STUDENT") {
        console.log("User này không phải là sinh viên");
    }
    try {
        let course = await Course.findByIdAndUpdate(courseId,
            {
                $addToSet: { studentIds: studentId }
            },
            { new: true }
        )
        return course;

    } catch (error) {
        console.log(">>>", error);
    }
}
module.exports = {
    createCourseService, getAllCoursesService, UpdateCourseService, deleteCourseService, addTeacherService, addStudentService, getAllMembersService
}