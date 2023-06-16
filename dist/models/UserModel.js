"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    completeName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    phone: { type: Number, required: true, unique: true },
    period: { type: Number, required: true },
    turn: { type: String, required: true },
    course: { type: String, required: true },
    knowledge: [String],
    isAvaliable: { type: Boolean, required: true },
    interest: [String],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tutor: [String],
    student: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});
const User = mongoose_1.default.model('user', userModel);
exports.default = User;
