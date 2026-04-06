import z from 'zod';
import { Role } from '@prisma/client';

export const RegisterUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1).optional(),
  role: z.enum([Role.USER, Role.ADMIN]).optional().default(Role.USER),
  password: z.string().min(1),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
