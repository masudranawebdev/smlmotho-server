import { z } from 'zod';

const userZodSchema = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is Required!' }),
    email: z.string({ required_error: 'Email is Required!' }).email(),
    password: z.string({ required_error: 'Password is Required!' }),
  }),
});

export const UserValidation = { userZodSchema };
