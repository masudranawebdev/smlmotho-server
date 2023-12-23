"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (payload) => {
    const { email, password } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, false, "user can't find");
    }
    if (isUserExist.password &&
        !(await bcrypt_1.default.compare(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, false, "password doesn't match");
    }
    const { id, userName, email: userEmail } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelper.createToken({ id, userName, userEmail }, config_1.default.jwt.access_secret, { expiresIn: config_1.default.jwt.access_expires });
    const refeshToken = jwtHelper_1.jwtHelper.createToken({ id, userName, userEmail }, config_1.default.jwt.refesh_secret, { expiresIn: config_1.default.jwt.refesh_expires });
    return {
        accessToken,
        refeshToken,
    };
};
exports.AuthService = {
    loginUser,
};
