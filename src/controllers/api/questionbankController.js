
const questionBankService = require('../../services/questionBankService');

const postCreateQuestionBank = async (req, res) => {
    let questionBank = {
        courseId: req.params.courseId,
        createdBy: req.session.user.id,
        title: req.body.title,
        description: req.body.description
    }
    // console.log(">>>>>", questionBank);
    let data = await questionBankService.createQuestionBankService(questionBank);
    return res.status(200).json({
        EC: 0,
        data: data
    })

}

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