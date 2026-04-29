
const { createCourseService, getAllCoursesService, UpdateCourseService, deleteCourseService, addTeacherService, addStudentService, getAllMembersService, deleteStudentService, deleteTeacherService, getMyCourseService, getDetailCourseService } = require('../../services/courseService');
const postCreateCourse = async (req, res) => {
    let termId = req.params.termId;
    const payload = { ...req.body, createdBy: req.session.user.id };
    console.log(">>>>>>> Đây là session", req.session.user.id);
    console.log(">>>>>>payload", payload);
    let data = await createCourseService(termId, payload);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

const getAllCourses = async (req, res) => {
    let termId = req.params.termId;
    let data = await getAllCoursesService(termId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

const putUpdateCourse = async (req, res) => {
    let courseId = req.params.courseId;
    let course = req.body;
    let data = await UpdateCourseService(courseId, course);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

const deleteCourse = async (req, res) => {
    let courseId = req.params.courseId;
    let data = await deleteCourseService(courseId);
    return res.status(200).json({
        EC: 0,
        data: data
    })

}

const getAllMembers = async (req, res) => {
    let courseId = req.params.courseId;
    let data = await getAllMembersService(courseId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

// const postAddTeacher = async (req, res) => {
//     let courseId = req.params.courseId;
//     let teacherId = req.body.teacherId;
//     let data = await addTeacherService(courseId, teacherId);
//     return res.status(200).json({
//         EC: 0,
//         data: data
//     });
// }
const postAddTeacher = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const teacherIds = req.body.teacherIds || req.body.teacherId;

        const data = await addTeacherService(courseId, teacherIds);

        return res.status(200).json({
            EC: 0,
            data: data,
        });
    } catch (error) {
        console.log("postAddTeacher error:", error);
        return res.status(500).json({
            EC: 1,
            EM: error.message || "Lỗi khi thêm giảng viên",
            data: null,
        });
    }
};

// const postAddStudent = async (req, res) => {
//     let courseId = req.params.courseId;
//     let studentId = req.body.studentId;
//     console.log(">>>>>", studentId);
//     let data = await addStudentService(courseId, studentId);
//     return res.status(200).json({
//         EC: 0,
//         data: data
//     });
// }
const postAddStudent = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const studentIds = req.body.studentIds || req.body.studentId;

        const data = await addStudentService(courseId, studentIds);

        return res.status(200).json({
            EC: 0,
            data: data,
        });
    } catch (error) {
        console.log("postAddStudent error:", error);
        return res.status(500).json({
            EC: 1,
            EM: error.message || "Lỗi khi thêm sinh viên",
            data: null,
        });
    }
};

const deleteStudent = async (req, res) => {
    let courseId = req.params.courseId;
    let studentId = req.params.studentId;
    console.log(">>>>>", courseId, studentId);
    let data = await deleteStudentService(courseId, studentId);
    return res.status(200).json({
        EC: 0,
        data: data
    });
}

const deleteTeacher = async (req, res) => {
    let courseId = req.params.courseId;
    let teacherId = req.params.teacherId;
    let data = await deleteTeacherService(courseId, teacherId);
    return res.status(200).json({
        EC: 0,
        data: data
    });
}

const getMyCourses = async (req, res) => {
    const userId = req.session.user.id;
    const role = req.session.user.role;
    const { termId } = req.params;
    let data = await getMyCourseService(userId, role, termId);
    return res.status(200).json({
        EC: 0,
        data: data
    });
}
const getDetailCourse = async (req, res) => {
    const { courseId } = req.params;
    let data = await getDetailCourseService(courseId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}


module.exports = {
    postCreateCourse, getAllCourses, putUpdateCourse, deleteCourse, postAddTeacher, postAddStudent, getAllMembers, deleteStudent, deleteTeacher, getMyCourses, getDetailCourse
}