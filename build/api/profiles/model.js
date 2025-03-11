"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: [
        {
            _id: Schema.Types.ObjectId,
            title: String,
            company: String,
            dates: {
                start: Date,
                end: Date,
            },
            description: String,
        },
    ],
    skills: [String],
    information: {
        bio: String,
        location: String,
        website: String,
    },
    isDeleted: { type: Boolean, default: false, select: false },
});
userSchema.pre("find", function () {
    this.where({ isDeleted: false });
});
userSchema.pre("findOne", function () {
    this.where({ isDeleted: false });
});
userSchema.pre("findOne", function () {
    this.where({ isDeleted: false });
});
const User = model("User", userSchema);
exports.default = User;
