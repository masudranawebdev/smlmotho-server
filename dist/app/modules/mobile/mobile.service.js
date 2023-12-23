"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const mobile_constance_1 = require("./mobile.constance");
const mobile_model_1 = require("./mobile.model");
const insertIntoDB = async (data) => {
    const result = await mobile_model_1.Mobile.create(data);
    return result;
};
const getAllData = async (filters, paginationOptions) => {
    const { searchTerm, minPrice, maxPrice, color } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice", "color"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: mobile_constance_1.mobileSearchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (minPrice !== undefined) {
        andCondition.push({
            price: {
                $gte: Number(minPrice),
            },
        });
    }
    if (maxPrice !== undefined) {
        andCondition.push({
            price: {
                $lte: Number(maxPrice),
            },
        });
    }
    if (color && color.length > 0) {
        andCondition.push({
            color: {
                $in: color,
            },
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        if (sortBy === 'price') {
            sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        else {
            sortCondition[sortBy] = sortOrder;
        }
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = await mobile_model_1.Mobile.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = await mobile_model_1.Mobile.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleData = async (id) => {
    const result = await mobile_model_1.Mobile.findOne({ _id: id });
    return result;
};
exports.MobileService = {
    insertIntoDB,
    getAllData,
    getSingleData,
};
