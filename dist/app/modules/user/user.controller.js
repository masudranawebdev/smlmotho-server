"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_services_1 = require("./user.services");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const signup = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const result = await user_services_1.UserService.signup(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Signup is successfully',
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_services_1.UserService.getAlluser();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All data retrived is successfully',
        data: result,
    });
});
const getDataById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_services_1.UserService.getDataById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single data retrived is successfully',
        data: result,
    });
});
exports.UserController = {
    signup,
    getAllUser,
    getDataById,
};
