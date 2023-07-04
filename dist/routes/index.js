"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const UserControllers_1 = __importDefault(require("../controllers/UserControllers"));
const authenticate_1 = __importDefault(require("../shared/middlewares/authenticate"));
const validationsRegister_1 = __importDefault(require("../shared/middlewares/validationsRegister"));
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'Rota inicial' });
});
router.post('/registration', validationsRegister_1.default, UserControllers_1.default.createUser);
router.post('/login', UserControllers_1.default.login);
router.get('/home', UserControllers_1.default.ListAllStudents);
router.put('/registration/update', authenticate_1.default, UserControllers_1.default.updateRegister);
router.get('/findastudent', UserControllers_1.default.findAStudent);
router.get('/finduserbyjwt/:token', UserControllers_1.default.findUserByJWT);
exports.default = router;
