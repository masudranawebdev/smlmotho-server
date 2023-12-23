"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (payload, secret, options) => {
    return (0, jsonwebtoken_1.sign)(payload, secret, options);
};
const verifyToken = (token, secret) => {
    return (0, jsonwebtoken_1.verify)(token, secret);
};
exports.jwtHelper = {
    createToken,
    verifyToken,
};
