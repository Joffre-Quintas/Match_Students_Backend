"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../models/UserModel"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verifyExist(prop) {
    const exist = await UserModel_1.default.findOne(prop);
    return !!exist;
}
exports.default = verifyExist;
