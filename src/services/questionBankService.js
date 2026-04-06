
const QuestionBank = require('../models/questionBank');
const csv = require('csv-parser');
const { Readable } = require('stream');
const mongoose = require("mongoose");

// tạo 1 QuestionBank
const createQuestionBankService = async (questionBank) => {
    try {
        // console.log(">>>>>>", questionBank);
        let data = await QuestionBank.create(questionBank);
        return data;

    } catch (error) {
        console.log(">>>>", error);

    }

}

// xóa 1 QuestionBank
const deleteQuestionBankService = async (questionBankId) => {
    try {
        let data = await QuestionBank.findByIdAndDelete(questionBankId);
        return data;

    } catch (error) {
        console.log(">>>>>", error);
    }
}

// Lấy ra tất cả QuestionBank
const getAllQuestionBankService = async (courseId) => {
    try {
        let data = await QuestionBank.find({ courseId: courseId });
        return data;

    } catch (error) {
        console.log(">>>>>", error);
    }
}

// Lấy ra tất cả câu hỏi trong 1 QuestionBank
const getListQuestionsService = async (questionBankId) => {
    try {
        let data = await QuestionBank.findById(questionBankId).select("questions");
        return data;

    } catch (error) {
        console.log(">>>>>", error);
    }
}
// thêm question cho question bank từ file csv
function buildQuestionFromRow(row, rowNumber) {
    const content = row.content?.trim();
    const explanation = row.explanation?.trim() || "";
    const level = row.level?.trim()?.toLowerCase() || "easy";
    const correctAnswer = row.correctAnswer?.trim()?.toUpperCase();

    if (!content) {
        return { error: `Dòng ${rowNumber}: thiếu content` };
    }

    if (!["easy", "medium", "hard"].includes(level)) {
        return { error: `Dòng ${rowNumber}: level không hợp lệ` };
    }

    const rawOptions = [
        { key: "A", text: row.optionA?.trim() || "" },
        { key: "B", text: row.optionB?.trim() || "" },
        { key: "C", text: row.optionC?.trim() || "" },
        { key: "D", text: row.optionD?.trim() || "" },
    ];

    const options = rawOptions.filter((opt) => opt.text);

    if (options.length < 2 || options.length > 4) {
        return {
            error: `Dòng ${rowNumber}: câu hỏi phải có từ 2 đến 4 đáp án`,
        };
    }

    if (!["A", "B", "C", "D"].includes(correctAnswer)) {
        return { error: `Dòng ${rowNumber}: correctAnswer không hợp lệ` };
    }

    const isCorrectAnswerExist = options.some(
        (opt) => opt.key === correctAnswer
    );

    if (!isCorrectAnswerExist) {
        return {
            error: `Dòng ${rowNumber}: correctAnswer không khớp với đáp án đang có`,
        };
    }

    return {
        question: {
            content,
            options,
            correctAnswer,
            explanation,
            level,
        },
    };
}

async function parseCsvBuffer(buffer) {
    const csvText = buffer.toString("utf8").replace(/^\uFEFF/, "");
    const rows = [];

    await new Promise((resolve, reject) => {
        Readable.from(csvText)
            .pipe(csv())
            .on("data", (data) => rows.push(data))
            .on("end", resolve)
            .on("error", reject);
    });

    return rows;
}

async function importQuestionsFromCsv({
    questionBankId,
    uploadedFile,
    userId,
}) {
    if (!mongoose.Types.ObjectId.isValid(questionBankId)) {
        return {
            EC: 1,
            EM: "questionBankId không hợp lệ",
            DT: null,
            status: 400,
        };
    }

    if (!uploadedFile) {
        return {
            EC: 1,
            EM: "Vui lòng chọn file CSV",
            DT: null,
            status: 400,
        };
    }

    if (!userId) {
        return {
            EC: 1,
            EM: "Bạn chưa đăng nhập",
            DT: null,
            status: 401,
        };
    }

    const isCsv =
        uploadedFile.mimetype === "text/csv" ||
        uploadedFile.name?.toLowerCase().endsWith(".csv");

    if (!isCsv) {
        return {
            EC: 1,
            EM: "File upload phải là CSV",
            DT: null,
            status: 400,
        };
    }

    const questionBank = await QuestionBank.findById(questionBankId);

    if (!questionBank) {
        return {
            EC: 1,
            EM: "Không tìm thấy ngân hàng câu hỏi",
            DT: null,
            status: 404,
        };
    }

    // check quyền cơ bản: chỉ người tạo bank mới được import
    if (String(questionBank.createdBy) !== String(userId)) {
        return {
            EC: 1,
            EM: "Bạn không có quyền import vào ngân hàng câu hỏi này",
            DT: null,
            status: 403,
        };
    }

    // uploadedFile.data chính là Buffer
    const rows = await parseCsvBuffer(uploadedFile.data);

    if (!rows.length) {
        return {
            EC: 1,
            EM: "File CSV không có dữ liệu",
            DT: null,
            status: 400,
        };
    }

    const errors = [];
    const questionsToInsert = [];

    rows.forEach((row, index) => {
        const result = buildQuestionFromRow(row, index + 2);

        if (result.error) {
            errors.push(result.error);
        } else {
            questionsToInsert.push(result.question);
        }
    });

    if (errors.length > 0) {
        return {
            EC: 1,
            EM: "File CSV có dữ liệu không hợp lệ",
            DT: errors,
            status: 400,
        };
    }

    await QuestionBank.findByIdAndUpdate(questionBankId, {
        $push: {
            questions: {
                $each: questionsToInsert,
            },
        },
    });

    return {
        EC: 0,
        EM: "Import câu hỏi thành công",
        DT: {
            totalImported: questionsToInsert.length,
        },
        status: 200,
    };
}

module.exports = { createQuestionBankService, getAllQuestionBankService, importQuestionsFromCsv, deleteQuestionBankService, getListQuestionsService }