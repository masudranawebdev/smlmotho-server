"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mobile = void 0;
const mongoose_1 = require("mongoose");
const MobileSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    color: { type: [String], required: true },
    size: { type: String, required: true, },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    processor: { type: String, required: true },
    memory: { type: String, required: true },
    os: { type: String, required: true },
    status: {
        type: String,
        enum: ['in-stock', 'out-stock', 'comming'],
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Mobile = (0, mongoose_1.model)('Mobile', MobileSchema);
