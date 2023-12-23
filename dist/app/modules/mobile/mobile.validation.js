"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is Required!' }),
        thumbnail: zod_1.z.string({ required_error: 'Thumbnail is Required!' }),
        description: zod_1.z.string({ required_error: 'Description is Required!' }),
        slug: zod_1.z.string({ required_error: 'Slug is required!' }),
        content: zod_1.z.string({ required_error: 'Content is Required!' }),
        tags: zod_1.z.array(zod_1.z.string({ required_error: 'Tags is Required!' })),
        metaTitle: zod_1.z.string({ required_error: 'Meta Title is Required!' }),
        metaDescription: zod_1.z.string({
            required_error: 'Meta Description is Required!',
        }),
        metaKeyword: zod_1.z.array(zod_1.z.string({ required_error: 'Meta Keyword is Required!' })),
        category: zod_1.z.string({ required_error: 'Category is Required!' }),
        author: zod_1.z.string({ required_error: 'Author is Required!' }),
    }),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        metaTitle: zod_1.z.string().optional(),
        metaDescription: zod_1.z.string().optional(),
        metaKeyword: zod_1.z.array(zod_1.z.string()).optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.PostValidation = {
    createZodSchema,
    updateZodSchema,
};
