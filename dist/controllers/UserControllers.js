"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Utils
const verifyExist_1 = __importDefault(require("../shared/utils/verifyExist"));
const cryptPassword_1 = __importDefault(require("../shared/utils/cryptPassword"));
const ErrorMessages_1 = require("../shared/utils/ErrorMessages");
class UserControllers {
    static async createUser(req, res) {
        const newUser = req.body;
        const { password } = newUser;
        try {
            //Crypt password. I do an util async function 'cryptPassword' and replace than newUser inside a create. Line '27'
            //Create User
            await UserModel_1.default.create(await (0, cryptPassword_1.default)(newUser, password));
            res.status(http_status_codes_1.StatusCodes.OK).json({ msg: ErrorMessages_1.ErrorMessages.userExist });
        }
        catch (err) {
            console.error(err);
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: ErrorMessages_1.ErrorMessages.emptyFields });
        }
        if (!(await (0, verifyExist_1.default)({ email: email }))) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: ErrorMessages_1.ErrorMessages.userNotExist });
        }
        try {
            const userData = await UserModel_1.default.findOne({ email: email });
            if (userData) {
                const checkPassword = await bcrypt_1.default.compare(password, userData.password);
                if (!checkPassword) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: ErrorMessages_1.ErrorMessages.incorrectPassword });
                }
                const secret = process.env.SECRET;
                if (!secret) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Secret não definido!' });
                }
                const token = jsonwebtoken_1.default.sign({
                    id: userData._id
                }, secret);
                res.status(http_status_codes_1.StatusCodes.OK).json({ token: token, completeName: userData.completeName });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    //Some camps was excluded for security
    static async ListAllStudents(req, res) {
        const allStudents = await UserModel_1.default.find({}, { password: 0, createdAt: 0, updatedAt: 0, birthday: 0 });
        const studentsByPeriod = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: []
        };
        allStudents.forEach(student => {
            const { period } = student;
            studentsByPeriod[period].push(student);
        });
        res.status(http_status_codes_1.StatusCodes.OK).json(studentsByPeriod);
    }
    //In frontend, the user let load using array of User on contextAPI. Verify which token match id and load data.
    static async updateRegister(req, res) {
        const secret = process.env.SECRET;
        const token = req.headers.token;
        const dataUpdated = req.body;
        const data = await jsonwebtoken_1.default.verify(token, secret);
        const userId = data.id;
        const userUpdated = await {
            ...dataUpdated,
            updatedAt: Date.now()
        };
        try {
            await UserModel_1.default.findOneAndUpdate({ _id: userId }, await (0, cryptPassword_1.default)(userUpdated, dataUpdated.password));
            res.status(201).json({ msg: 'Cadastro atualizado com sucesso!' });
        }
        catch (err) {
            console.log(err);
        }
    }
    static async findAStudent(req, res) {
        const { registrationNumber } = await req.body;
        const student = await UserModel_1.default.findOne({ registrationNumber: registrationNumber });
        res.json(student);
    }
}
exports.default = UserControllers;
