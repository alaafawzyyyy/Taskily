import { z } from 'zod';

export type SignupFormData = z.infer<typeof signupSchema>;
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must be less than 64 characters')
  .refine((val) => !/\s/.test(val), {
    message: 'Password must not contain spaces',
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Must contain at least one uppercase letter',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Must contain at least one lowercase letter',
  })
  .refine((val) => /\d/.test(val), {
    message: 'Must contain at least one number',
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: 'Must contain at least one special character',
  });

export const signupSchema = z
  .object({
    // name validation
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[\p{L}\s]+$/u, 'Only letters and spaces are allowed')
      .refine((val) => !/\d/.test(val), {
        message: 'Name must not contain numbers',
      })
      .refine((val) => !/\s{2,}/.test(val), {
        message: 'No multiple consecutive spaces allowed',
      }),
    // email validation
    email: z.string().email('Invalid email format'),
    // passwords validation
    password: passwordSchema,

    // confirm password
    confirmPassword: z.string(),
    jobTitle: z.string().optional(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// resend password schema
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
