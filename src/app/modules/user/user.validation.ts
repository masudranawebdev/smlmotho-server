import { z } from 'zod';

const userZodSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First Name is Required!' }),
    lastName: z.string({ required_error: 'Last Name is Required!' }),
    email: z.string({ required_error: 'Email is Required!' }).email(),
    role: z.string({ required_error: 'Role is Required!' }).optional(),
    password: z.string({ required_error: 'Password is Required!' }),
  }),
});

export const UserValidation = { userZodSchema };
