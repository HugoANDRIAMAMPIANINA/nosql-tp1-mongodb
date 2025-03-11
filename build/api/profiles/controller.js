"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInformation = exports.deleteSkill = exports.createSkill = exports.deleteExperience = exports.createExperience = exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfileById = exports.getProfiles = void 0;
const model_1 = __importDefault(require("./model"));
const mongoose_1 = require("mongoose");
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.getProfiles = getProfiles;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (error) {
        if (error instanceof mongoose_1.Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Server error" });
        }
    }
});
exports.getProfileById = getProfileById;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }
        const newUser = new model_1.default({ name, email });
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required." });
        }
        const updatedUser = yield model_1.default.findByIdAndUpdate(req.params.id, { name, email }, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    }
    catch (error) {
        console.log(error);
        if (error instanceof mongoose_1.Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Server error" });
        }
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield model_1.default.findByIdAndUpdate(req.params.id, {
            isDeleted: true,
        });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(204);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteProfile = deleteProfile;
const createExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { title, company, dates, description } = req.body;
        if (!title || !company || !(dates === null || dates === void 0 ? void 0 : dates.start) || !(dates === null || dates === void 0 ? void 0 : dates.end)) {
            return res
                .status(400)
                .json({ error: "Title, company, start and end dates are required." });
        }
        const newExperience = {
            _id: new mongoose_1.Types.ObjectId(),
            title,
            company,
            dates: {
                start: new Date(dates.start),
                end: new Date(dates.end),
            },
            description: description || "",
        };
        user.experience.push(newExperience);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Invalid data" });
    }
});
exports.createExperience = createExperience;
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.experience.pull({ _id: req.params.exp });
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteExperience = deleteExperience;
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.skills.push(req.body.skill);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Invalid data" });
    }
});
exports.createSkill = createSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.skills = user.skills.filter((skill) => skill !== req.params.skill);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteSkill = deleteSkill;
const updateInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.information = req.body.information;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Invalid data" });
    }
});
exports.updateInformation = updateInformation;
