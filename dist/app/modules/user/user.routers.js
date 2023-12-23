"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get('/', user_controller_1.UserController.getAllUser);
router.get('/:id', user_controller_1.UserController.getDataById);
router.post('/sign-up', (0, validateRequest_1.default)(user_validation_1.UserValidation.userZodSchema), user_controller_1.UserController.signup);
exports.UserRoutes = router;
