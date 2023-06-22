"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
async function startDB() {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${user}:${password}@joffre.ckgez7n.mongodb.net/`);
        console.log('Banco conectado!');
    }
    catch (err) {
        console.error(err);
    }
}
exports.default = startDB;
