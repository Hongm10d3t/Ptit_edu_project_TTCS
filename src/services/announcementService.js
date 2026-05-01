const Announcement = require("../models/announcement");

const postCreateAnnouncementService = async (data) => {
    try {
        let announcement = await Announcement.create(data);
        return announcement;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

const getAllAnnouncementsService = async (target) => {
    try {
        let query = {};

        if (target) {
            query.target = target;
        }

        let data = await Announcement.find(query)
            .populate("createdBy", "code fullName email role")
            .sort({ createdAt: -1 });

        return data;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

const getDetailAnnouncementService = async (id) => {
    try {
        let data = await Announcement.findById(id).populate(
            "createdBy",
            "code fullName email role"
        );
        return data;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

const putUpdateAnnouncementService = async (id, data) => {
    try {
        let result = await Announcement.findByIdAndUpdate(id, data, {
            returnDocument: "after",
        }).populate("createdBy", "code fullName email role");

        return result;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

const deleteAnnouncementService = async (id) => {
    try {
        let result = await Announcement.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

const getMyAnnouncementsService = async (role) => {
    try {
        let targets = [];

        if (role === "TEACHER") {
            targets = ["teacher", "all"];
        }

        if (role === "STUDENT") {
            targets = ["student", "all"];
        }

        let data = await Announcement.find({
            isPublished: true,
            target: { $in: targets },
        })
            .populate("createdBy", "code fullName email role")
            .sort({ createdAt: -1 });

        return data;
    } catch (error) {
        console.log(">>>> error", error);
        throw error;
    }
};

module.exports = {
    postCreateAnnouncementService,
    getAllAnnouncementsService,
    getDetailAnnouncementService,
    putUpdateAnnouncementService,
    deleteAnnouncementService,
    getMyAnnouncementsService,
};