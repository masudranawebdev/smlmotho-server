"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string({ required_error: 'User Name is Required!' }),
        email: zod_1.z.string({ required_error: 'Email is Required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is Required!' }),
    }),
});
exports.UserValidation = { userZodSchema };
