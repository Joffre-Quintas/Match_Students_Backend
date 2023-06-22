"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function cryptPassword(obj, password) {
    const passwordHashed = await bcrypt_1.default.hash(password, 10);
    const newObj = {
        ...obj,
        password: passwordHashed
    };
    return newObj;
}
exports.default = cryptPassword;
