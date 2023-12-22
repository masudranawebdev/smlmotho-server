import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required!' }),
    thumbnail: z.string({ required_error: 'Thumbnail is Required!' }),
    description: z.string({ required_error: 'Description is Required!' }),
    slug: z.string({ required_error: 'Slug is required!' }),
    content: z.string({ required_error: 'Content is Required!' }),
    tags: z.array(z.string({ required_error: 'Tags is Required!' })),
    metaTitle: z.string({ required_error: 'Meta Title is Required!' }),
    metaDescription: z.string({
      required_error: 'Meta Description is Required!',
    }),
    metaKeyword: z.array(
      z.string({ required_error: 'Meta Keyword is Required!' })
    ),
    category: z.string({ required_error: 'Category is Required!' }),
    author: z.string({ required_error: 'Author is Required!' }),
  }),
});
const updateZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeyword: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const PostValidation = {
  createZodSchema,
  updateZodSchema,
};
