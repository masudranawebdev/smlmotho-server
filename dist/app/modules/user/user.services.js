"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const signup = async (user) => {
    // password hash
    const hashPassword = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
    user.password = hashPassword;
    //set role
    const result = await user_model_1.User.create(user);
    return result;
};
const getAlluser = async () => {
    const result = await user_model_1.User.find({});
    return result;
};
const getDataById = async (id) => {
    const result = await user_model_1.User.findById(id);
    return result;
};
exports.UserService = {
    signup,
    getAlluser,
    getDataById,
};
