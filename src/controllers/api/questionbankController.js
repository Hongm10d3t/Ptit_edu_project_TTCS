
const questionBankService = require('../../services/questionBankService');

// const postCreateQuestionBank = async (req, res) => {
//     let questionBank = {
//         courseId: req.params.courseId,
//         createdBy: req.session.user.id,
//         title: req.body.title,
//         description: req.body.description
//     }
//     // console.log(">>>>>", questionBank);
//     let data = await questionBankService.createQuestionBankService(questionBank);
//     return res.status(200).json({
//         EC: 0,
//         data: data
//     })

// }
const postCreateQuestionBank = async (req, res) => {
    try {
        const questionBank = {
            courseId: req.params.courseId,
            createdBy: req.session.user.id,
            title: req.body.title,
            description: req.body.description,
        };

        const uploadedFile = req.files?.file || null;

        const createdBank = await questionBankService.createQuestionBankService(questionBank);

        // nếu có file CSV thì import luôn
        if (uploadedFile) {
            const importResult = await questionBankService.importQuestionsFromCsv({
                questionBankId: createdBank._id,
                uploadedFile,
                userId: req.session.user.id,
            });

            // import lỗi -> rollback xóa bank vừa tạo
            if (importResult.EC !== 0) {
                await questionBankService.deleteQuestionBankService(createdBank._id);

                return res.status(importResult.status || 400).json({
                    EC: importResult.EC,
                    EM: importResult.EM || "Tạo ngân hàng câu hỏi thất bại khi import CSV.",
                    DT: importResult.DT || null,
                });
            }
        }

        return res.status(200).json({
            EC: 0,
            EM: uploadedFile
                ? "Tạo question bank và import CSV thành công."
                : "Tạo question bank thành công.",
            data: createdBank,
        });
    } catch (error) {
        console.log(">>> postCreateQuestionBank error:", error);
        return res.status(500).json({
            EC: 1,
            EM: "Lỗi server khi tạo question bank.",
            DT: error.message,
        });
    }
};

const deleteQuestionBank = async (req, res) => {
    const { questionBankId } = req.params;
    let data = await questionBankService.deleteQuestionBankService(questionBankId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

const getAllQuestionBank = async (req, res) => {
    const { courseId } = req.params;
    let data = await questionBankService.getAllQuestionBankService(courseId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

const getListQuestions = async (req, res) => {
    const { questionBankId } = req.params;
    let data = await questionBankService.getListQuestionsService(questionBankId);
    return res.status(200).json({
        EC: 0,
        data: data
    })
}

// const postCsvForQuestionBank = async (req, res) => {
//     return res.send("Test API thanh cong");
// }


const postCsvForQuestionBank = async (req, res) => {
    try {
        const { questionBankId } = req.params;
        const userId = req.session.user.id;
        const uploadedFile = req.files?.file;
        console.log(">>>>>>>>", userId);
        console.log(">>>>>>>>", questionBankId);
        const result = await questionBankService.importQuestionsFromCsv({
            questionBankId,
            uploadedFile,
            userId,
        });

        return res.status(result.status).json({
            EC: result.EC,
            EM: result.EM,
            DT: result.DT,
        });
    } catch (error) {
        console.log(">>> postCsvForQuestionBank error:", error);
        return res.status(500).json({
            EC: 1,
            EM: "Lỗi server khi import CSV",
            DT: error.message,
        });
    }
};


module.exports = { postCreateQuestionBank, postCsvForQuestionBank, getAllQuestionBank, deleteQuestionBank, getListQuestions }