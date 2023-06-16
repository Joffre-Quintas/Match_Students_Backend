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
const http_status_codes_1 = require("http-status-codes");
//Utils
const ErrorMessages_1 = require("../utils/ErrorMessages");
const verifyExist_1 = __importDefault(require("../utils/verifyExist"));
const regex_1 = require("../utils/regex");
function validationRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        const { completeName, registrationNumber, birthday, phone, period, turn, course, isAvaliable, email, password } = newUser;
        if (!completeName || !registrationNumber || !birthday || !phone || !period || !turn || !course || !isAvaliable || !email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Preencha todos os campos.' });
        }
        if (yield (0, verifyExist_1.default)({ registrationNumber: registrationNumber })) {
            return res.status(422).json({ msg: ErrorMessages_1.ErrorMessages.userExist });
        }
        if (registrationNumber.lenght != 8) {
            return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({ msg: ErrorMessages_1.ErrorMessages.invalidFormat });
        }
        if (yield (0, verifyExist_1.default)({ phone: phone })) {
            return res.status(422).json({ msg: 'Telefone já cadastrado.' });
        }
        if (!regex_1.regex.phone.test(phone)) {
            return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({ msg: ErrorMessages_1.ErrorMessages.invalidFormat });
        }
        if (yield (0, verifyExist_1.default)({ email: email } || (yield (0, verifyExist_1.default)({ registrationNumber: registrationNumber })))) {
            return res.status(422).json({ msg: ErrorMessages_1.ErrorMessages.userExist });
        }
        if (!regex_1.regex.email.test(email)) {
            return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({ msg: ErrorMessages_1.ErrorMessages.invalidFormat });
        }
        if (period <= 0 || period > 8) {
            return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({ msg: ErrorMessages_1.ErrorMessages.invalidFormat });
        }
        next();
    });
}
exports.default = validationRegister;
