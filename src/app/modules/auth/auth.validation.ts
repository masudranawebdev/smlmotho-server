import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Last Name is Required!',
      })
      .email(),
    password: z.string({
      required_error: 'Password is Required!',
    }),
  }),
});

const refeshTokenZodSchema = z.object({
  cookies: z.object({
    refeshToken: z.string({
      required_error: 'RefeshToken is Required',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is Required!',
    }),
    newPassword: z.string({
      required_error: 'New Password is Required!',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refeshTokenZodSchema,
  changePasswordZodSchema,
};
