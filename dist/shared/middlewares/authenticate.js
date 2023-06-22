"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authenticate(req, res, next) {
    const auth = req.headers.token;
    const secret = process.env.SECRET;
    if (!auth) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Necessário realizar o login.' });
    }
    try {
        await jsonwebtoken_1.default.verify(auth, secret);
        next();
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: 'Token inválido!' });
    }
}
exports.default = authenticate;
